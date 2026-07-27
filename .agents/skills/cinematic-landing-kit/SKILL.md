---
name: cinematic-landing-kit
description: Universal AI Agent Skill — Builds single-file, scroll-driven luxury landing pages (Apple x Cartier aesthetic) as one index.html with CDN-only libraries (GSAP, Lenis, Tailwind), zero build step, no framework. Fully compatible out-of-the-box with Google Antigravity, Claude Code, Cursor, Windsurf, Roo Code, Cline, Codex, and all AGENTS.md compliant AI coding agents. Scrubbed canvas frame sequence product film. Reads brand.json as single source of truth for identity, colors, typography, voice, and localization. Supports 7 luxury layouts (film, story, space, app, creator, product, store) and curated luxury Arabic typography. Trigger on commands "init", "brand", "clone-brand", "media", "film", "hero", "theme", "typeface", "transitions", "i18n", "perf", "a11y", "convert", "audit", "variant", "deploy", "polish", or requests like "build a cinematic landing page", "scroll-driven product page", "luxury Apple-style landing page", "صفحة هبوط سينمائية".
---

# Universal AI Agent Skill — Cinematic Landing Kit

Build a **single-file, scroll-driven luxury landing page** (Apple × Cartier aesthetic) for any product using any AI coding agent or agentic IDE.

Output is one `index.html` with CDN libraries (GSAP 3.12, Lenis 1.0, Tailwind CSS), zero build step, zero framework, zero bundler.

---

## 🤖 Agentic Tool Integration & Native Capabilities

This skill leverages native Agentic IDE capabilities:

- **Image Generation (`generate_image`)**: Used for Nano Banana keyframes, hero product stills, cutouts, and visual assets.
- **Browser Subagent / Visual Verification (`browser_subagent`)**: Used to drive programmatic scrolling (`window.lenis.scrollTo`), evaluate DOM timelines, test responsive breakpoints, and record preview video demos.
- **Local Shell Execution (`run_command`)**: Used to execute background removal (`scripts/remove_backgrounds.py`), image optimization (`scripts/optimize_assets.py`), transition keyframe generation (`scripts/generate_transitions.py`), and launch preview HTTP servers.

---

## 🏛️ Critical Architecture (The Locked Engine)

- **Film Engine**: JPG frame-sequence (`assets/seq/f000.jpg … fNNN.jpg`) drawn on `<canvas>`, scrubbed smoothly by scroll progress. **NEVER scrub `video.currentTime`** — H.264 keyframe-seeking causes stutter.
- **Brand Source of Truth**: `brand.json` at project root overrides template defaults (colors, fonts, voice, identity, localization) per `memory/11-brand-json.md`.
- **Layout Selection** (via `memory/10-use-cases.md`):
  - `film` (`fullbleed.html`) — Long scroll film, aura + motes hero (Perfume, watches, luxury automotive)
  - `story` (`editorial.html`) — Split-screen hero, specs film (Specs-heavy products, brand stories, founder pages)
  - `space` (`spatial.html`) — Establishing shot hero, walkthrough film (Real estate, architecture, hospitality)
  - `app` (`interface.html`) — Device mockup frame hero, UI flow film (SaaS, mobile apps, digital platforms)
  - `creator` (`minimal.html`) — Centered hero cutout, no canvas film (Digital products, books, creators)
  - `product` (`product.html`) — Single product high-conversion e-commerce with price above fold & WhatsApp CTA
  - `store` (`store.html`) — Multi-product catalog grid with category filter & per-card WhatsApp links
- **Media Providers**: `nanobanana` (default, built-in `generate_image` tool), `qwen` (Qwen Image + Wan via DashScope API), `higgsfield` (Higgsfield CLI).

---

## 🧭 Operational Modes

> "What are we doing?
> 1. **Init** — build a brand-new cinematic landing page for a product
> 2. **Convert** — bring an existing static/standard landing page onto the cinematic engine
> 3. **Improve** — audit and harden a page already built on this kit"

---

## ⚡ Command Index & Reference Architecture

All detailed command specs reside in `references/commands/`:

| Command | Purpose | Reference File | Phase |
|---|---|---|---|
| `init` | **Primary deliverable** — full working cinematic page, one pass | `references/commands/init.md` | — |
| `brand` | Read/scaffold `brand.json`; token → CSS variable mapping | `references/commands/brand.md` | 1 |
| `clone-brand` | Extract `brand.json` tokens from an existing site/PDF/logo | `references/commands/clone-brand.md` | 1 |
| `media` | Provider selection + asset pipeline (keyframes → clips → frames → cutout) | `references/commands/media.md` | 2 |
| `film` | Canvas frame-sequence build + `FRAME_COUNT` sync | `references/commands/film.md` | 2 |
| `hero` | Hero entrance — cutout/establishing-shot/device-mockup per layout | `references/commands/hero.md` | 2 |
| `theme` | Light/dark palette derivation (gold-deep/gold-bright, ambient tween) | `references/commands/theme.md` | 2 |
| `typeface` | Distinctive Arabic (+ Latin accent) font pairing selection | `references/commands/typeface.md` | 2 |
| `transitions` | Boundary-matched clip transitions between film segments | `references/commands/transitions.md` | 2 |
| `i18n` | Arabic/English direction, RTL, modesty & identity rules | `references/commands/i18n.md` | 3 |
| `perf` | Performance budget check — frame sequence, asset, and font weight | `references/commands/perf.md` | 3 |
| `a11y` | Accessibility pass — canvas alt-text, contrast, focus states, keyboard scroll | `references/commands/a11y.md` | 3 |
| `convert` | Retrofit an existing landing page onto the cinematic engine | `references/commands/convert.md` | — |
| `audit` | Quality-bar + brand.json verification checklist as a standalone report | `references/commands/audit.md` | — |
| `variant` | Produce an A/B page from an already-built project | `references/commands/variant.md` | — |
| `deploy` | Preview, asset optimization, static-hosting export | `references/commands/deploy.md` | 3 |
| `polish` | Mobile nav drawer, WhatsApp CTA, scroll-to-top & favicon | `references/commands/polish.md` | 3 |

---

## ⚡ Memory Load Routing (Token Budget Optimization)

To keep AI agent token usage minimal (~80% reduction), read **ONLY** the specific memory module required for the current command:

| Command | Load ONLY these memory files |
|---|---|
| `init` | `memory/10-use-cases.md` + `memory/11-brand-json.md` + chosen layout file |
| `brand` | `memory/11-brand-json.md` |
| `clone-brand` | `memory/11-brand-json.md` + `memory/15-brand-extraction.md` |
| `media` | `memory/06-media-pipeline.md` + provider file (`nanobanana`/`qwen`/`higgsfield`) |
| `film` | `memory/02-scroll-film-canvas.md` |
| `hero` | `memory/04-cinematic-hero.md` |
| `theme` | `memory/05-theming.md` |
| `typeface` | `memory/12-arabic-typography.md` |
| `perf` | `memory/13-performance-budget.md` |
| `a11y` | `memory/14-accessibility.md` |
| `convert` | `memory/15-brand-extraction.md` + `memory/10-use-cases.md` |
| `audit` | `memory/09-quality-bar.md` |
| `variant` | `memory/16-variants.md` |
| `deploy` | `memory/08-preview-and-env-gotchas.md` |
| `polish` | `memory/08-preview-and-env-gotchas.md` + `memory/09-quality-bar.md` |

---

## 🔄 Command Sequencing & Execution Phases

For `convert`/`improve` work on an existing project:

1. **Phase 1 — Brand Foundation**: `brand` (or `clone-brand` when extracting an identity).
2. **Phase 2 — Engine Build**: `media` → `film` → `hero` → `theme` → `typeface` → `transitions`.
3. **Phase 3 — Scale & Delivery**: `i18n` → `perf` → `a11y` → `deploy` (always last).

---

## 📋 Quality Bar & Non-Negotiables

- **No `video.currentTime` scrubbing** — canvas frame-sequence only.
- **No `mix-blend-mode` on animated elements** — breaks under GSAP 3D transforms; use transparent PNG cutouts.
- **No manuscript / Amiri fonts** above 24px — use El Messiri for display headings, Tajawal for body copy (or mood pair from `memory/12-arabic-typography.md`).
- **Modesty mandatory** — conservative attire for human subjects in generated imagery.
- **`prefers-reduced-motion` fallback required** on canvas animations.
- **Canvas ARIA attributes** — `<canvas aria-hidden="true">` with container `aria-label`.
- **Strict brand.json compliance** — no hardcoded hex colors or font families when brand tokens exist.
