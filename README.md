# PDFCatalyst Product Website
Site : https://pdfcatalyst.vercel.app/

A responsive, animated product landing page for PDFCatalyst built with React + Vite. It features Apple-inspired glassmorphism, CSS-generated interactive app mockups, scroll reveals, reduced-motion support, responsive navigation, persistent dark/light theme toggle, detailed feature guide, creator profile, FAQ accordion, and working links to the Windows installer, GitHub repository, and release notes.

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

1. Push this folder to your website repository.
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

## Continuous GitHub Release Synchronization

This website is automatically synchronized with the application repository **[SarthAyush/PDFcatalyst-App](https://github.com/SarthAyush/PDFcatalyst-App)**:

1. **Instant Client-Side Auto-Sync**:
   - When visitors load the site, it queries the GitHub Releases API (`https://api.github.com/repos/SarthAyush/PDFcatalyst-App/releases`).
   - The latest release tag (e.g. `v1.0.0`, `v1.1.0`), release notes, publish date, and installer binaries (`PDFcatalyst-Setup-*.exe` and `PDFcatalyst.exe`) are extracted automatically.
   - Result is cached in `localStorage` for 5 minutes with fallback data for offline visits.
   - Visitors can manually trigger **"Check for Updates"** at any time.

2. **What's New & Release Changelog**:
   - The **"What's New"** section (`#updates`) presents the latest version highlights and asset downloads.
   - The interactive **Changelog Modal** allows users to read complete release notes, verify SHA-256 hashes, and browse previous versions.
   - Primary download buttons across the Hero, Navigation, and Download Hub automatically bind to the newest built assets with zero manual site edits required.

3. **Automated CI/CD Deployment**:
   - A GitHub Actions workflow (`.github/workflows/deploy.yml`) is included for automatic GitHub Pages deployment and supports `repository_dispatch` triggers from the main `PDFcatalyst-App` repo.

## Customize

- Replace `public/pdfix-logo.png` to update the brand icon.
- Fallback URLs and metadata are defined near the top of `src/main.jsx`.
- Main styling and responsive behavior live in `src/styles.css`.
- The dark/light theme toggle is in the header and persists the selected theme in browser local storage.

## Notes

- All download links dynamically link to the latest verified release binaries from `SarthAyush/PDFcatalyst-App`.
- The website honors `prefers-reduced-motion` and includes keyboard-accessible navigation, modal ESC handling, and FAQ controls.
- This static website does not collect user data, cookie tracking, or telemetry.
