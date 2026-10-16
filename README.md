# PDFix Product Website

A responsive, animated product landing page for PDFix built with React + Vite. It uses the supplied PDFix logo, CSS-generated app mockups, scroll reveals, reduced-motion support, responsive navigation, persistent dark/light theme toggle, detailed feature guide, creator profile, FAQ accordion, and working links to the Windows installer, GitHub repository, and release notes.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Deploy to Vercel

### Git-based deployment (recommended)

1. Push this folder to a new GitHub repository (or add it to your existing website repository).
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the repository.
4. Vercel should detect Vite. Confirm these settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
5. Click **Deploy**. Vercel will provide a `*.vercel.app` URL.
6. Later pushes to the connected production branch trigger new deployments automatically.

### Vercel CLI

```bash
npm install
npm install -g vercel
vercel
vercel --prod
```

Follow the CLI prompts to link your Vercel account and project.

## Add a custom domain later

In Vercel, open the project **Settings → Domains**, add your domain, then apply the DNS records Vercel shows at your domain provider.

## Customize

- Replace `public/pdfix-logo.png` to update the brand icon.
- Update download/repository URLs near the top of `src/main.jsx`.
- Main styling and responsive behavior live in `src/styles.css`.
- The dark/light theme toggle is in the header and persists the selected theme in browser local storage.
- The feature guide and creator profile are authored in `src/main.jsx`; update them there when product capabilities or public creator information changes.
- Product copy is based on the repository README. The central app preview is a CSS mockup, not a screenshot of the running desktop app.

## Notes

- The Windows download button points directly to PDFix Setup v1.0.0 x64.
- The website honors `prefers-reduced-motion` and includes keyboard-accessible navigation and FAQ controls.
- This static website does not collect form data or include analytics.
