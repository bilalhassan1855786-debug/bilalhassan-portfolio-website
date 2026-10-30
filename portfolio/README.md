# Bilal Hassan – Portfolio

Next.js · React · TypeScript · Tailwind CSS · EmailJS

## Run
```bash
npm install
npm run dev
```

## Add real project screenshots
```bash
npx playwright install chromium
npm run screenshots   # saves public/screens/<slug>.jpg for every project
```
Until you do, cards fall back to a live screenshot service.

## Contact form (EmailJS)
Copy `.env.example` to `.env.local` and fill in your EmailJS service ID, template ID and public key.
Your EmailJS template should use: `{{from_name}}`, `{{reply_to}}`, `{{message}}`.
Without the keys, the form opens the visitor's mail app instead.

## Add or edit a project
Edit `src/data/projects.json`. Each entry becomes a card and its own page at `/projects/<slug>`.

## Deploy
Push to GitHub and import the repo in Vercel. Add the three `NEXT_PUBLIC_EMAILJS_*` variables in Vercel project settings.
