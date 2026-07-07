# Johor Straits Advisory — Landing Page

A responsive, production-ready single-page landing site for **Johor Straits Advisory**, a
corporate services firm helping Singapore businesses expand into Johor Bahru and the
Johor-Singapore Special Economic Zone (JS-SEZ).

Built with **React** + **Vite** + **Tailwind CSS**. Typography- and color-driven design — no
heavy image assets, no JS animation libraries. Total app JS is well under 100 KB (excluding React).

## Design

- **Mood:** "Where the Strait Meets the Future" — tranquil blues and deep teals, clean serif
  headings, monospaced accents.
- **Signature motif:** a thin animated gradient "waterline" divider between content chapters.
- **Fonts:** DM Serif Display (headings), Inter (body/UI), Space Mono (accents) — loaded via
  Google Fonts in `index.html`.
- **Accessibility:** semantic HTML, visible focus styles, `aria-*` labelling, form validation,
  WCAG-AA contrast, and full `prefers-reduced-motion` support (ambient + scroll animations off).

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

Requires Node.js 18+.

## Deployment

The `dist/` output is fully static and deploys to Vercel, Netlify, GitHub Pages, or any static
host with zero configuration.

- **Vercel / Netlify:** import the repo; build command `npm run build`, output directory `dist`.

## Contact form configuration

The contact form works out of the box with **no setup** via a `mailto:` fallback to
`amber@adptv.xyz`.

To collect submissions through a form backend instead:

1. Create a free form at [Formspree](https://formspree.io).
2. In `src/components/Contact.jsx`, replace the `FORMSPREE_ID` placeholder (`'your_form_id'`)
   with your form's ID (the part after `/f/` in your Formspree endpoint).

When a real ID is present the form POSTs JSON to Formspree; if that request fails, it falls back
to `mailto:` automatically. Either way, the user sees the confirmation message on success.

## Project structure

```
johor-straits-advisory/
├── index.html                 # HTML shell, meta/OG tags, Google Fonts
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Page composition + section dividers
│   ├── index.css              # Tailwind layers, animations, reduced-motion
│   ├── hooks/
│   │   └── useIntersectionObserver.js   # scroll-reveal hook
│   └── components/
│       ├── Navbar.jsx         # sticky nav, scroll transition, mobile drawer
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── Services.jsx
│       ├── JSSEZ.jsx
│       ├── WhyJohor.jsx
│       ├── Contact.jsx        # form + validation + success state
│       ├── Footer.jsx
│       ├── Reveal.jsx         # scroll-reveal wrapper
│       └── Waterline.jsx      # animated gradient divider
├── tailwind.config.js         # brand colors, fonts, keyframes
├── postcss.config.js
└── vite.config.js
```

---

*This website provides general corporate advisory information and does not constitute legal,
tax, or investment advice.*
