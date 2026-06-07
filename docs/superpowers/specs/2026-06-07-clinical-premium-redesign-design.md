# OptiLife Wellbeing — Clinical Premium Redesign

**Date:** 2026-06-07 · **Status:** Approved by user

## Goal

Full visual redesign of every page, keeping all content, products, and page
structure. Direction: **clinical premium** — bright, science-led, crisp white
space, emerald accents (Ritual/Thorne territory). All 3D/canvas effects
(Three.js, Vanta, Zdog, D3) removed; motion is Framer Motion only. Component
sourcing via Magic MCP (21st.dev), re-skinned to the token system below.

## Design Foundation

### Palette — "Clinical Green"

| Token | Value | Use |
|---|---|---|
| `ink` | `#0C1F17` | Headings, body text |
| `surface` | `#FFFFFF` / `surface-alt` `#F6F9F7` | Backgrounds |
| `primary` | `#0E7C5B` | CTAs, links, accents |
| `primary-soft` | `#DFF0E8` | Badges, icon chips, hover fills |
| `line` | `#E4EAE6` | Hairline borders, dividers |
| `gold` | `#C8A24B` | Star ratings only |

### Typography

- **Display/headings:** Inter Tight
- **Body:** Inter
- **Eyebrows/labels/data:** Geist Mono, uppercase, letter-spaced — the
  "lab data" signature (e.g. `CLINICALLY DOSED · 1300MG`)

### Primitives (`components/ui/`)

`Button` (primary/outline/ghost), `Card` (white, 1px line border, hover-only
shadow), `Badge` (mono pill), `SectionHeading` (mono eyebrow + display title +
lede), `Container`/`Section` (one spacing rhythm), `Reveal` (simplified
fade-up).

### Removals

`components/three/*`, `VantaBackground`, `ZdogIcon`, `BotanicalMotif`, `Tilt`;
uninstall `three`, `vanta`, `zdog`, `d3`, `vanilla-tilt`, `@react-three/*`,
related `@types`.

## Page Plan

**Header:** slim mono announcement bar (`FREE UK SHIPPING OVER £30`), sticky
white header with blur-on-scroll, emerald Shop CTA, full-screen mobile menu.
**Footer:** 4 columns (brand+mission / Shop / Company / Legal), newsletter
input, mono compliance line.

**Home:**
1. Hero — split: mono eyebrow + Inter Tight headline + lede + dual CTAs +
   star-rating proof line · product image on soft sage radial; staggered
   fade-up.
2. TrustStrip — hairline band of cert marks (GMP, Made in UK, Vegan,
   3rd-party tested) in mono.
3. "The OptiLife Standard" — 3-up feature cards, sage icon chips, mono data
   points.
4. FeaturedProducts — new ProductCard: photo, mono badge, rating, price +
   hover-revealed Add button.
5. Stats band — full-width emerald, animated counters + mission line.
6. Testimonials — card grid, verified-buyer mono tag, gold stars.
7. Final CTA band (new) — headline + Shop CTA.

**Shop:** compact PageHero + 4-product grid (same ProductCard). No filters —
YAGNI.
**About:** PageHero + editorial two-column story + values row (feature cards).
**Expertise:** numbered mono `01–04` steps (Source → Formulate → Test →
Deliver) + quality-standards grid.
**Objectives:** numbered manifesto list, mono indices, one-line details.
**Contact:** split — info card (mono labels) / clean form, emerald submit.
**Legal pages:** shared template — narrow prose column, sticky desktop TOC,
mono `LAST UPDATED` stamp; content unchanged.

## Build Order

Tokens + primitives → Header/Footer → Home → Shop →
About/Expertise/Objectives → Contact → Legal → remove 3D deps → final pass
(lint, build, responsive check).
