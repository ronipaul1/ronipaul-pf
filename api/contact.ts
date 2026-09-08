// Vercel serverless function: POST /api/contact
//
// This is the ONLY place the Brevo API key is used. It is read from the
// server-side environment variable BREVO_API_KEY and is never sent to,
// or bundled into, the frontend. Do not move this logic into client code.

type ContactBody = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const MAX_LENGTHS = {
  name: 120,
  email: 160,
  subject: 150,
  message: 2000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple in-memory rate limiter. Serverless instances are ephemeral, so this
// is a best-effort throttle for a single warm instance, not a hard global
// guarantee — but combined with Brevo's own sending limits it meaningfully
// slows down casual abuse without needing an extra service.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const ip =
    (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again in a minute." });
  }

  let body: ContactBody;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
  } catch {
    return res.status(400).json({ error: "Malformed request body." });
  }

  const name = sanitize(body.name, MAX_LENGTHS.name);
  const email = sanitize(body.email, MAX_LENGTHS.email);
  const subject = sanitize(body.subject, MAX_LENGTHS.subject);
  const message = sanitize(body.message, MAX_LENGTHS.message);

  if (!name || name.length < 2) {
    return res.status(400).json({ error: "Please enter your name." });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (!subject || subject.length < 2) {
    return res.status(400).json({ error: "Please enter a subject." });
  }
  if (!message || message.length < 5) {
    return res.status(400).json({ error: "Please write a short message." });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "ronipaul326@gmail.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Roni Paul";
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "ronipaul326@gmail.com";

  if (!apiKey) {
    console.error("BREVO_API_KEY is not set. Contact form cannot send email.");
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }

  const submittedAt = new Date().toISOString();

  const htmlContent = `
    <div style="font-family: sans-serif; font-size: 14px; color: #14151a;">
      <h2 style="margin-bottom: 4px;">New portfolio contact message</h2>
      <p style="color:#5b5d66; margin-top:0;">Submitted: ${escapeHtml(submittedAt)}</p>
      <table cellpadding="6">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Subject</strong></td><td>${escapeHtml(subject)}</td></tr>
      </table>
      <p><strong>Message</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: receiverEmail, name: senderName }],
        replyTo: { email, name },
        subject: `Portfolio contact: ${subject}`,
        htmlContent,
      }),
    });

    if (!brevoRes.ok) {
      const errBody = await brevoRes.text().catch(() => "");
      console.error("Brevo API error:", brevoRes.status, errBody);
      return res.status(502).json({ error: "Something went wrong. Please try again." });
    }

    return res.status(200).json({ ok: true, message: "Thanks! Your message has been sent successfully." });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
