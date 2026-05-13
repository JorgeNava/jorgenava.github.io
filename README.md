# jorgenava.github.io

Personal portfolio and digital identity of **Jorge Nava** — Software Architect & CEO of [One Spark](https://one-spark.com.mx), based in Guadalajara, México.

**Live site:** [jorgenava.github.io](https://jorgenava.github.io)

---

## Overview

A luxury-minimalist portfolio built with Next.js 16 and exported as fully static HTML, deployed to GitHub Pages via GitHub Actions. The site showcases client projects, services, interactive experiments, and the tech stack — all behind a cohesive dark/gold aesthetic.

Key design decisions:
- **Static export** (`output: "export"`) — zero server runtime, deploys anywhere, fast CDN delivery
- **Motion-first** — every section uses scroll-triggered reveal animations via Motion v12
- **Touch-aware** — hover effects have mobile equivalents (IntersectionObserver scroll-reveal, touch spotlight, pointer events)
- **Luxury aesthetic** — Cormorant Garamond display font, DM Sans body, `#C4995F` gold accent on a near-black `#060608` base

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router, static export) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS v4 (CSS-first, `@theme inline`) |
| Animation | Motion v12 (`motion/react`) |
| Smooth scroll | @studio-freight/lenis |
| Canvas FX | Web Canvas API (aurora mesh) |
| Fonts | Cormorant Garamond · DM Sans · Geist Mono (via `next/font/google`) |
| Deployment | GitHub Actions → GitHub Pages |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 @theme inline — design tokens
│   ├── layout.tsx           # Root layout: fonts, metadata, providers
│   ├── page.tsx             # Home page (all sections)
│   └── repos/
│       └── page.tsx         # Server Component: GitHub public repos listing
│
├── components/
│   ├── cursor/
│   │   └── CustomCursor.tsx # Magnetic custom cursor (desktop only)
│   ├── experiments/
│   │   ├── AuroraCard.tsx   # Canvas aurora mesh (interactive)
│   │   ├── KineticCard.tsx  # Letter spring animation (pointer events)
│   │   ├── MagneticCard.tsx # Magnetic spring pill (mouse + touch)
│   │   └── MorphCard.tsx    # CSS clip-path shape morph (click/hover)
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx  # Lenis smooth scroll wrapper
│   ├── sections/
│   │   ├── Hero.tsx          # Canvas aurora hero with animated headline
│   │   ├── Marquee.tsx       # Infinite scrolling marquee strip
│   │   ├── Intro.tsx         # About me: stats grid + photo + bio
│   │   ├── WorkSection.tsx   # Client projects with scroll-reveal descriptions
│   │   ├── ServicesSection.tsx # Services accordion with expand animation
│   │   ├── Experiments.tsx   # Interactive playground (4 cards)
│   │   ├── SpotlightSection.tsx # Tech stack with cursor/touch spotlight
│   │   ├── Manifesto.tsx     # Philosophy statement
│   │   └── Contact.tsx       # Contact form (mailto) + social links
│   └── ui/
│       ├── Container.tsx     # Max-width responsive wrapper
│       └── ScrollProgress.tsx # Gold top progress bar
│
├── hooks/
│   ├── useIsMobile.ts        # Detects touch-first devices via media query
│   └── usePrefersReducedMotion.ts
│
└── lib/
    └── utils.ts              # cn() helper (clsx + tailwind-merge)
```

---

## Design Tokens

Defined in `src/app/globals.css` via Tailwind v4 `@theme inline`:

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#060608` | Page background |
| `bg-2` | `#0D0B12` | Card background |
| `surface` | `#13111A` | Elevated surfaces |
| `gold` | `#C4995F` | Primary accent |
| `gold-light` | `#D9B97A` | Lighter accent |
| `fg` | `#EDE8DF` | Primary text |
| `fg-muted` | `#7A7570` | Secondary text |
| `fg-subtle` | `#2E2C32` | Tertiary / disabled |
| `border` | `rgba(255,255,255,0.07)` | Subtle borders |

---

## Pages

### `/` — Portfolio
All sections rendered in a single-page layout:

| # | Section | Description |
|---|---------|-------------|
| 01 | Sobre mí | Stats, photo, bio |
| 02 | Proyectos | Client work with scroll-reveal cards |
| 03 | Servicios | Service accordion |
| 04 | Experimentos | Interactive playground |
| 05 | Stack Tecnológico | Cursor/touch spotlight over 30 tools |
| 06 | Manifiesto | Design philosophy |
| 07 | Contacto | Form (mailto) + social links |

### `/repos/` — Repositorios
Server Component page that fetches all public GitHub repos from `JorgeNava` at build time and renders them as a searchable card grid. Each card shows:
- Repo name and description
- Primary language badge (color-coded)
- Topic chips
- Star count
- Last updated date
- Link to GitHub

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (with Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Build & Deploy

### Manual build

```bash
npm run build
# Static output lands in /out
```

### GitHub Actions (automatic)

Every push to `main` triggers `.github/workflows/deploy.yml`:

1. Checkout → Install → `npm run build`
2. Static output from `/out` uploaded as GitHub Pages artifact
3. Deployed to `https://jorgenava.github.io`

The `/repos` page fetches the GitHub API during step 1 (build time), so the repo list is always current as of the last deploy. Re-deploy to refresh it.

---

## SSH Setup (multi-account)

This repo uses a `github-personal` SSH host alias to avoid conflicts with a work GitHub account:

```ssh
# ~/.ssh/config
Host github-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes
```

Remote is configured as:
```
git remote set-url origin git@github-personal:JorgeNava/jorgenava.github.io.git
```

---

## Key Implementation Notes

### Aurora mesh (Hero + AuroraCard)
Canvas 2D radial gradients animated with `requestAnimationFrame`. Five blobs with independent speed vectors (`sx`, `sy`) and phase offsets (`px`, `py`) create an organic flowing background. Alpha values are kept low for the hero (`0.08–0.28`) and slightly higher in the experiment card.

### Spotlight section
On desktop: `window.addEventListener('mousemove')` with `getBoundingClientRect()` computes cursor position relative to the words grid, then drives `useMotionTemplate` clip-path. On mobile: equivalent `onTouchStart`/`onTouchMove` events on the same grid drive an identical touch-based spotlight.

### Project scroll-reveal
Each non-featured project card sets up an `IntersectionObserver` with `rootMargin: "-32% 0px -32% 0px"` — it fires when the card enters the center third of the viewport. `showDesc = featured || hovered || centerVisible` covers all interaction modes (always-on for featured, hover on desktop, scroll on any device).

### Static export + Server Components
`output: "export"` in `next.config.ts` generates pure HTML/CSS/JS. Server Components (like `/repos/page.tsx`) execute their `fetch` calls during `npm run build`, embedding the API response in the static HTML. No runtime server needed.

---

## License

Personal portfolio — all rights reserved. Code structure may be referenced for learning purposes; design, content, and assets are not licensed for reuse.
