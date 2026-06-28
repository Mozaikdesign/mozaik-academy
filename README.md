# Hidden Potential — Mozaik Academy

An interactive, single-page training guide adapting the twelve core frameworks from Adam Grant's *Hidden Potential* for the Mozaik sales, marketing, and operations team. Styled in the Kraken-inspired design system (purple on white, IBM Plex Sans), with animated diagrams and scroll reveals.

## What's in this folder

```
index.html                 The site (open this)
colors_and_type.css        Design tokens (colors, type, spacing)
images/golden-thirteen.png Photo used in Concept 10
README.md                  This file
```

It's a **static site** — no server, build step, or database. Open `index.html` in any modern browser and it just works.

---

## Deploy it

### Option A — GitHub Pages (free, but PUBLIC)
1. Create a new GitHub repository and upload everything in this folder (keep the structure — `index.html` at the repo root).
2. Repo **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**, branch = `main`, folder = `/ (root)`. Save.
4. Wait ~1 minute. Your site is live at `https://<your-username>.github.io/<repo-name>/`.

> ⚠️ **GitHub Pages has no password protection.** A private repo only hides the *source code* — the published page is reachable by anyone with the URL. If you need a login wall, use Option B.

### Option B — Cloudflare Pages + Access (free, PASSWORD-GATED) — recommended for internal use
1. Push this folder to a GitHub repo (private is fine).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick the repo. No build command; output directory = `/`.
3. After it deploys, go to **Zero Trust → Access → Applications → Add an application → Self-hosted**, point it at your Pages URL, and add an **Allow** policy (e.g. emails ending in `@mozaikdesign.com`, or a one-time PIN). Now visitors must authenticate.

### Option C — Netlify (drag-and-drop, password on paid plan)
1. Go to app.netlify.com → **Add new site → Deploy manually**, then drag this whole folder in.
2. Live instantly at a `*.netlify.app` URL.
3. For a password: **Site settings → Access control → Password protection** (requires a paid plan), or use Netlify Identity for per-user logins.

---

## Custom domain
All three hosts let you attach a subdomain like `academy.mozaikdesign.com` — add a CNAME record at your DNS provider pointing to the host, then register the domain in the host's dashboard.

---

## Editing the content
- All copy and diagrams live in `index.html`. Text is plain HTML; diagrams are inline SVG.
- Colors and fonts come from `colors_and_type.css` (CSS custom properties — change a value once, it updates everywhere).
- To swap the two placeholder story images (Raging Rooks, Tadao Ando) for real photos: drop a `.jpg`/`.png` into `images/`, then in `index.html` replace the matching `<div class="ph">…</div>` with `<img class="photo" src="images/your-file.jpg" alt="…">` (the Golden Thirteen banner is already done this way as a reference).

---

## Notes
- Fonts load from Google Fonts (IBM Plex Sans) — needs an internet connection on first load. The real Kraken typefaces are proprietary and not included.
- Animations respect `prefers-reduced-motion` and degrade gracefully; the page is fully readable with motion off or JavaScript disabled.
- Photo of the Golden Thirteen is a U.S. Navy image (1944), public domain.
