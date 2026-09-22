# Vaishnavi Gupta — Portfolio

A dark, glass-heavy developer portfolio built with React, Vite, Tailwind CSS and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle locally
```

Requires Node 16+ (the toolchain is pinned to Vite 4 / Tailwind 3 to stay compatible).

## Editing the content

**All copy lives in one file: [`src/data/content.js`](src/data/content.js).** Nothing is hardcoded
in the components — change the text there and every section updates.

| Export          | Drives                                        |
| --------------- | --------------------------------------------- |
| `profile`       | Name, role, blurb, socials, résumé link       |
| `navLinks`      | Navbar + footer links and scroll-spy sections |
| `about`         | About narrative and highlight cards           |
| `skillGroups`   | Skills grid                                   |
| `experience`    | Expandable timeline                           |
| `education`     | Degree card inside About                      |
| `projects`      | Project cards and their detail modals         |
| `techStack`     | Scrolling marquee                             |
| `achievements`  | Achievements grid                             |
| `contact`       | Contact details                               |

## Two things to finish

1. **Add your résumé PDF.** The "View Resume" button opens `profile.resumeUrl` in a new tab, currently
   `/Vaishnavi-Gupta-Resume.pdf`. Drop that file into `public/` with exactly that name, or change
   the path in `content.js`.
2. **Add project links.** Each project has an empty `links: []`. Fill it in to get buttons in the
   detail modal:
   ```js
   links: [
     { type: 'github', label: 'Source', url: 'https://github.com/...' },
     { type: 'live',   label: 'Live site', url: 'https://...' },
   ]
   ```

## Contact form

The form composes a prefilled `mailto:` in the visitor's mail client — no backend, no API keys.
To collect submissions server-side instead, swap `handleSubmit` in
[`src/components/Contact.jsx`](src/components/Contact.jsx) for a `fetch` to Formspree, EmailJS or
your own endpoint.

## Deploying

The build output is fully static, so any host works.

- **Vercel / Netlify** — import the repo; build command `npm run build`, output directory `dist`.
- **GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.js` first, then publish `dist/`.

## Design notes

- Theming lives in `tailwind.config.js` (`accent`, `accent-soft`, `accent-warm`) and the
  `:root` tokens in `src/index.css`. Change those three colours to re-skin the whole site.
- Reusable pieces: `Reveal` (scroll entrance), `SpotlightCard` (glass card with cursor spotlight
  and tilt), `Background` (aurora + grid), `SectionHeading`.
- Every animation is wrapped in a `prefers-reduced-motion` check.
