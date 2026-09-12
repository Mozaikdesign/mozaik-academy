# Mozaik Academy — mozaikacademy.org

Internal training library for the Mozaik Design team. Static site, no build step,
no server, no database: every page is plain HTML that shares four files.

## Folder layout

```
index.html              Academy home — English   (course cards + progress)
tr.html                 Academy home — Turkish
colors_and_type.css     Kraken design tokens (colors, type, spacing, buttons)
shared/
  academy.css           Sign-in gate, welcome toast, tour, admin analytics, “mark complete”
  academy.js            All of the above, plus the roster, the password and the analytics calls
  course.css            Course page layout — hero, parts, concept cards, diagrams, nav
  course.js             Mobile menu, sliding menu, scroll progress, reveal animations
hidden-potential/       Course 01 — index.html (EN) · tr.html (TR) · golden-thirteen.png
happier-vacation/       Course 02 — index.html (EN) · tr.html (TR)
course-template/        Starter files for the next training — copy this folder
```

Every course lives in its own folder and always uses the same two filenames:
`index.html` for English, `tr.html` for Turkish. The language switch and the
“remember my language” redirect both depend on that convention.

## Sign-in, roster and password

One gate covers the whole site. Sign in once on any page and you stay signed in
across every course in that browser tab (the session is kept in `sessionStorage`).

Everything that decides who gets in is at the top of **`shared/academy.js`**:

| What | Where |
|---|---|
| Team password | `SITE_PASSWORD` |
| Who appears in the name list | `NAMES` |
| Who can open the Analytics view | `ADMINS` |
| Where usage is logged | `ANALYTICS_URL` (Google Apps Script web app) |

Change it once there and it changes on every page. This is a convenience gate,
not real security — the page source is readable by anyone who has the URL, so
treat the link as internal and don't post it publicly.

## Progress

Each person's progress is kept in their own browser (`localStorage`), per name:
opening a course marks it *in progress*, the button at the bottom marks it
*completed*, and the Academy home shows both. It does not sync between devices —
it's a personal checklist, not a compliance report. The analytics view is the
place to see actual usage across the team.

## Adding a new training

1. Copy `course-template/` to a new folder, e.g. `sales-playbook/`.
2. In both `index.html` and `tr.html`, work through the numbered comments ① – ⑦:
   title, `window.MOZAIK.id` (must equal the folder name), menu links, hero, cards.
3. Paste the `<svg class="iconsheet">…</svg>` block from any existing course page
   into the new pages so `<use href="#ic-…">` icons work.
4. Add a card for it on the Academy home, in **both** `index.html` and `tr.html`:

```html
<a class="ccard" data-course="sales-playbook" href="sales-playbook/index.html">
  <div class="cover"><span class="ghost">03</span>
    <svg viewBox="0 0 24 24"><use href="#ic-flag"/></svg>
    <span class="lang">EN · TR</span></div>
  <div class="cbody">
    <div class="ckick">Sales</div>
    <h3>The Mozaik Sales Playbook</h3>
    <p>One or two sentences.</p>
    <div class="meta"><span>9 sections</span><span>~25 min</span><span>Sales</span></div>
  </div>
  <div class="cfoot"><span class="cstatus"></span><span class="spacer"></span><span class="cgo"></span></div>
</a>
```

`data-course` must match the folder name and the `id` in `window.MOZAIK`; that is
what links the card to the progress state. On `tr.html` point the `href` at
`sales-playbook/tr.html`. Then delete the matching “coming soon” card.

## Drawing the figures

- Inline SVG at `viewBox="0 0 760 250"` (height varies), coloured only with design
  tokens — `var(--kraken-purple)`, `--d-grow`, `--d-bad`, `--d-good`, `--d-box`,
  `--d-axis`, `--cool-gray`. No raw hex.
- `class="fg" style="--i:N"` staggers the fade-in; `class="draw" pathLength="1"`
  gives the line-draw animation.
- Turkish labels run 20–30% longer than English — check every SVG label fits in
  `tr.html` specifically, not just in English.
- When screenshotting for review, wait ~2s after scrolling a card into view, or
  `.draw` paths get captured mid-animation and look truncated.
- New icons go in the inline `<svg class="iconsheet">` above the nav: outline style,
  `fill="none" stroke="currentColor" stroke-width="2"`, 24-grid.

## Writing style used in the courses

- One idea per card: a claim as the heading, a short paragraph, one bold phrase.
- Every card ends with a **Takeaway** (the behaviour change) and an **At Mozaik**
  note (what it looks like here). That second one is what makes it training
  rather than a book summary.
- Diagrams are inline SVG on a `0 0 760 ×` viewBox, drawn with the palette
  variables (`--d-grow`, `--d-dull`, `--d-good`, `--d-bad`, `--d-box`, `--d-axis`)
  so they follow the design system in both languages.

## Deployment

Repo: **github.com/Mozaikdesign/mozaik-academy** (the `Mozaikdesign` account — *not*
`balamirnazlica-tech`, which hosts mozaikinsights.com). GitHub Pages serves it from
`main` at mozaikacademy.org via the `CNAME` file in the repo root. Push to `main` and
the site updates in about a minute. Nothing to build.

If you ever edit through the GitHub web editor with browser automation: its CodeMirror
editor ignores paste events and simulated typing — reach the editor instance directly
(`document.querySelector('.cm-content').cmView.view`, then a range replacement through
`.dispatch()`), and click commit-dialog buttons with a JS `.click()`. For files this
size, a plain upload or a `git push` from a clone is far less fragile.

## Notes

- Fonts (IBM Plex Sans) load from Google Fonts, so the first load needs a connection.
- Animations respect `prefers-reduced-motion`; every page is readable with
  JavaScript disabled apart from the gate, which simply never opens.
- Photo of the Golden Thirteen is a U.S. Navy image (1944), public domain.
