
# Intersys Solutions — Corporate Engineering Website

A polished, multi-page corporate site inspired by the reference. Dark navy + white with vibrant red accents, bold geometric typography, 12-column grids, and smooth scroll/hover motion via Framer Motion.

## Pages (separate routes for SSR + SEO)
- `/` Home — hero, metrics strip, services preview, featured projects, ecosystem, testimonial, CTA
- `/about` — mission, values, leadership profiles
- `/services` — full services grid with hover cards
- `/portfolio` — project grid with image overlays
- `/products` — product/technology catalog
- `/contact` — contact form + info cards + map placeholder

## Global
- **Navbar**: sticky, transparent → solid on scroll, logo + links + red CTA button, mobile drawer
- **Footer**: 4-column structured nav, brand block, social, legal strip
- Shared **Section**, **Container (12-col grid)**, **Card**, **AnimatedCounter**, **SectionHeading** components

## Home sections
1. **Hero** — huge headline "Smart Building Solutions for a Safer Future." with red accent word, subhead, two CTAs, animated grid/dot background, subtle gradient orbs
2. **Metrics strip** — 500+ / 15+ / 120+ animated counters on scroll
3. **Integrated Technologies** — 3-card row with icon, title, body, hover lift + red underline
4. **Services** — 6 cards (BMS, Fire Safety, Security, HVAC, Lighting, IoT) with hover image reveal
5. **Featured Projects** — 4-tile portfolio grid, image + dark overlay → red overlay on hover, project name slides up
6. **Ecosystem / Tech blocks** — modular bento grid (large + small tiles) with stats and gradients
7. **Leadership/Testimonial** — dark band, large quote, profile photo, name + title
8. **CTA band** — "Need a Custom Industrial System?" red button
9. Footer

## Design system
- Colors: navy `#0B1530`, deep navy `#060B1F`, white, off-white `#F5F6F8`, red accent `#E63946`, muted gray
- Typography: Space Grotesk (headings, tight tracking, large) + Inter (body)
- Radius: subtle (md), soft shadows, thin borders, glass panels on dark sections
- 12-column grid via Tailwind, generous whitespace

## Animations (Framer Motion)
- Scroll-triggered fade + slide-up with stagger for section reveals
- Counter animation on metric strip
- Card hover: lift, border glow, accent line grow
- Project tiles: image scale + overlay fade
- Hero: subtle floating gradient orbs, animated grid background

## Images
Generate **one** high-quality engineering/architecture image and reuse it across all project/service tiles (user will swap later). Stored in `src/assets/`.

## Tech
- TanStack Start routes (`__root.tsx` shared Navbar/Footer via layout)
- Tailwind v4 tokens added to `styles.css` (navy, accent red, fonts)
- `framer-motion` dependency added
- Fully responsive (mobile nav drawer, stacked grids)
