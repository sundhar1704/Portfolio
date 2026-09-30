# Sundharavel G — Portfolio

React + Vite + Tailwind v4 + Framer-Motion-ready + lucide-react.

## 1. Install & run

```bash
npm install
npm run dev
```

## 2. Add your CV

Drop your resume PDF at:

```
public/cv/Sundharavel-G-Resume.pdf
```

The "Download CV" button in the Hero already points here (see `src/data/content.ts` → `profile.cvUrl`).
If you name the file differently, update `cvUrl` to match.

## 3. Wire up the contact form (EmailJS — free, no backend)

The form in `src/components/Contact.tsx` uses EmailJS to send messages straight to
**ganesans0407@gmail.com** without exposing any password.

1. Go to https://www.emailjs.com and create a free account.
2. **Email Services** → Add New Service → connect your Gmail (ganesans0407@gmail.com).
   Copy the **Service ID**.
3. **Email Templates** → Create New Template. Use these variables in the template body:
   `{{from_name}}`, `{{from_email}}`, `{{topic}}`, `{{message}}`.
   Copy the **Template ID**.
4. **Account → API Keys** → copy your **Public Key**.
5. Open `src/components/Contact.tsx` and replace:
   ```ts
   const SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
   const TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
   const PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
   ```
   with the three values above.

That's it — every submission lands in your inbox. The free EmailJS tier covers 200 emails/month.

## 4. Voice assistant

`src/components/VoiceAssistant.tsx` is a free, no-backend assistant built on the browser's
native Web Speech API (works in Chrome/Edge). It answers from the Q&A list in
`src/data/content.ts` → `assistantFaq`. Add more entries there any time you want it to know
more about you — no code changes needed elsewhere.

If you'd rather it use real generative AI instead of scripted answers (so it can handle any
question, not just the ones you've written), that needs a small serverless backend to hold an
API key safely — let me know and I'll wire that version in instead.

## 5. Project live previews

`src/components/Projects.tsx` renders each project's *actual live site* via a screenshot
service (Microlink) — it's not a static image, so it always reflects whatever's currently
deployed at your Vercel/GitHub Pages URLs. No setup needed, but note the free Microlink tier
has a request-rate limit, so under heavy traffic previews may briefly need to reload.

## 6. Deploy

Standard Vite app — push to GitHub and import into Vercel as usual. No environment variables
are required (EmailJS's public key is safe to ship client-side by design).
