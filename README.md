# Roni Paul — Portfolio

A personal developer portfolio built around an interactive Developer ID Card,
with a real About/Experience/Education/Skills/Projects layout and a working
contact form backed by Brevo.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (CSS-first config, see `src/index.css`)
- Framer Motion for animation, Lenis for smooth scrolling
- A Vercel serverless function (`api/contact.ts`) for the contact form

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:8080`.

To build for production:

```bash
npm run build
npm run preview
```

## Contact form / Brevo setup

The contact form posts to `/api/contact`, a serverless function that sends
mail through [Brevo](https://www.brevo.com/) (formerly Sendinblue). The Brevo
API key is **only ever read on the server** — it is never bundled into
frontend code, so it's safe from exposure in the browser.

1. Create a Brevo account and generate an API key at
   `Settings → SMTP & API → API Keys`.
2. In Brevo, verify the sender address you plan to send from
   (`Senders, Domains & Dedicated IPs → Senders`). Brevo will reject sends
   from an unverified sender.
3. Copy `.env.example` to `.env` and fill in real values:

   ```bash
   cp .env.example .env
   ```

   ```
   BREVO_API_KEY=xkeysib-...
   BREVO_SENDER_EMAIL=ronipaul326@gmail.com
   BREVO_SENDER_NAME=Roni Paul
   CONTACT_RECEIVER_EMAIL=ronipaul326@gmail.com
   ```

4. Locally, serverless functions under `/api` are only executed by the
   Vercel runtime, not by plain `vite dev`. To test the contact form
   end-to-end locally, use the Vercel CLI:

   ```bash
   npm install -g vercel
   vercel dev
   ```

5. When deploying to Vercel, add the same environment variables in
   **Project Settings → Environment Variables** — do not commit a real
   `.env` file.

If `BREVO_API_KEY` is missing, the endpoint returns a clear error instead of
silently failing or leaking the key.

### What the form validates

- Client-side: required fields, email format, and a message length limit.
- Server-side (never trust the client alone): required fields re-checked,
  email format re-checked, all fields trimmed and length-capped, and a
  simple in-memory rate limit (5 requests/minute per IP on a given
  serverless instance) to slow down casual abuse.

## Project structure

```
src/
  data/profile.ts         # single source of truth for all real content
  theme/ThemeProvider.tsx # light/dark mode
  components/
    Header/                Navigation + theme toggle
    HeroSection/            Intro + CTA
    IDCard/                 The signature interactive ID card
    AboutSection/
    ExperienceSection/
    EducationSection/
    SkillsSection/
    ProjectsSection/
    ContactSection/         Form wired to /api/contact
    Footer/
    shared/                 Reveal, SectionHeading, AvatarMark
api/
  contact.ts               Brevo-backed serverless contact handler
```

## Projects shown

All three projects are real, live, and linked directly — no placeholder or
invented projects are included:

- **FinTrack** — https://fintrack-manager.vercel.app/
- **Weather App** — https://ronipaul1.github.io/Weather-App/
- **VoltCart** — https://voltcart-shop.vercel.app/

## Notes

- Dark mode is the default/primary experience; light mode is a fully
  designed alternative, not an inverted palette.
- Animations respect `prefers-reduced-motion`.
- No fabricated experience, employers, certifications, or statistics are
  included anywhere in the content.
