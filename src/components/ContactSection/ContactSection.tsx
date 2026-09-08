import { useState, type FormEvent } from "react";
import { Mail, Github, Linkedin, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";
import { Reveal } from "../shared/Reveal";
import { profile } from "../../data/profile";

type Status = "idle" | "loading" | "success" | "error";

const MAX_MESSAGE_LENGTH = 2000;

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
  const isValid =
    values.name.trim().length > 1 &&
    emailValid &&
    values.subject.trim().length > 1 &&
    values.message.trim().length > 4 &&
    values.message.length <= MAX_MESSAGE_LENGTH;

  const handleChange = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setStatus("error");
      setErrorMessage("Please fill in every field with a valid value before sending.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="w-full max-w-7xl mx-auto container-px py-24">
      <SectionHeading kicker="Contact" title="Let's talk" description="Open to internships and happy to hear from teams building interesting things." />

      <div className="grid md:grid-cols-5 gap-10 mt-10">
        <Reveal delay={0.1} className="md:col-span-2">
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 surface rounded-2xl p-4 hover:border-accent transition-colors group"
            >
              <span className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-accent" />
              </span>
              <span className="text-sm font-medium text-fg group-hover:text-accent transition-colors break-all">
                {profile.email}
              </span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-4 surface rounded-2xl p-4 hover:border-accent transition-colors group"
            >
              <span className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
                <Github className="w-4 h-4 text-accent" />
              </span>
              <span className="text-sm font-medium text-fg group-hover:text-accent transition-colors">GitHub</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-4 surface rounded-2xl p-4 hover:border-accent transition-colors group"
            >
              <span className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
                <Linkedin className="w-4 h-4 text-accent" />
              </span>
              <span className="text-sm font-medium text-fg group-hover:text-accent transition-colors">LinkedIn</span>
            </a>
            <div className="flex items-center gap-4 surface rounded-2xl p-4">
              <span className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-accent" />
              </span>
              <span className="text-sm font-medium text-fg">{profile.location}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="md:col-span-3">
          <form onSubmit={handleSubmit} noValidate className="surface rounded-2xl p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  value={values.name}
                  onChange={handleChange("name")}
                  className="w-full rounded-xl px-4 py-3 bg-transparent border border-border text-fg placeholder:text-muted/60 focus-visible:outline-none focus-visible:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={160}
                  value={values.email}
                  onChange={handleChange("email")}
                  className="w-full rounded-xl px-4 py-3 bg-transparent border border-border text-fg placeholder:text-muted/60 focus-visible:outline-none focus-visible:border-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-muted mb-1.5">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                maxLength={150}
                value={values.subject}
                onChange={handleChange("subject")}
                className="w-full rounded-xl px-4 py-3 bg-transparent border border-border text-fg placeholder:text-muted/60 focus-visible:outline-none focus-visible:border-accent transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={MAX_MESSAGE_LENGTH}
                value={values.message}
                onChange={handleChange("message")}
                className="w-full rounded-xl px-4 py-3 bg-transparent border border-border text-fg placeholder:text-muted/60 focus-visible:outline-none focus-visible:border-accent transition-colors resize-none"
                placeholder="Tell me a bit about the opportunity or your message..."
              />
              <p className="mono text-[10px] text-muted mt-1 text-right">
                {values.message.length}/{MAX_MESSAGE_LENGTH}
              </p>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fg text-bg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
              Send Message
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-accent-2 font-medium" role="status">
                <CheckCircle2 className="w-4 h-4" /> Thanks! Your message has been sent successfully.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-500 font-medium" role="alert">
                <AlertCircle className="w-4 h-4" /> {errorMessage || "Something went wrong. Please try again."}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
