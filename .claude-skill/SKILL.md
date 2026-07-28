---
name: tidyfactor-cinematic
description: TidyFactor Cinematic track — builds single-file, scroll-driven luxury landing pages (Apple x Cartier aesthetic) as one index.html with CDN-only libraries (GSAP, Lenis, Tailwind), no build step, no framework. The product "film" is a JPG frame-sequence drawn on canvas and scrubbed by scroll, not a scrubbed video element. Reads brand.json as the single source of truth for colors, typography, voice, identity, and localization when present. Supports three media providers (Nano Banana default, Qwen+Wan, Higgsfield), eight layouts (film, story, space, app, creator, product, store, auto) selected via use-case routing, and a curated set of distinctive luxury Arabic typography pairings beyond the default El Messiri/Tajawal. Trigger on commands "init", "brand", "clone-brand", "media", "film", "hero", "theme", "typeface", "transitions", "i18n", "perf", "a11y", "convert", "audit", "variant", "deploy", "polish", or requests like "build a cinematic landing page", "scroll-driven product page", "luxury Apple-style landing page", "صفحة هبوط سينمائية", "convert this landing page to a cinematic one", "audit this cinematic page", "make the Arabic typography more distinctive/luxurious", "check page performance", "accessibility check", "clone our brand from this site", "make an A/B variant". Covers three modes — Init, Convert, Improve.
---

# TidyFactor Cinematic (Scroll-Driven Luxury Landing Pages)

Part of the TidyFactor skill library (see `references/tidyfactor-vision.md` for
the shared philosophy and this track's relationship to [[alwkala]]). Unlike
the hosting-stack tracks (`tidyfactor-html`, `tidyfactor-php`...), this skill
doesn't ship a backend — it produces one `index.html` per project: a
scroll-driven cinematic film + a luxury landing page, CDN-only, zero build.

If the request wants a standard multi-product catalog, a spec-comparison
page, or an A/B-tested funnel — that's a normal `tidyfactor-html` job, not
this one. **Fit test:** one clear subject + a transformation arc + the user
wants to inspire, not just list features → this skill.

## The locked engine (never re-litigated per project)

- **Film**: JPG frame-sequence (`assets/seq/f000.jpg … fNNN.jpg`) drawn on
  `<canvas>`, scrubbed by scroll progress. **Never** `video.currentTime`
  scrubbing — H.264 keyframe-seeking stutters.
- **Stack**: GSAP 3.12 + ScrollTrigger, Lenis 1.0, Tailwind CSS — all CDN.
  Typography via Google Fonts.
- **Brand source of truth**: `brand.json` at the project root, when present,
  overrides every template default (colors, fonts, voice, identity,
  localization) — see `memory/11-brand-json.md`. Absent brand.json → the
  warm-gold + El Messiri/Tajawal fallback applies.
- **Layouts**: `film` (`fullbleed`), `story` (`editorial`), `space` (`spatial`), `app` (`interface`), `creator` (`minimal`), `product` (`product`), `store` (`store`), `auto` (`auto`) — picked via `memory/10-use-cases.md`.
- **Media providers**: `nanobanana` (default, built-in `generate_image`
  tool, no extra deps), `qwen` (Qwen Image + Wan via DashScope, paid API),
  `higgsfield` (CLI, paid). Provider comes from `brand.json`'s
  `mediaProvider` field.

## Memory Routing

| Memory File | Purpose |
|---|---|
| `memory/10-use-cases.md` | Layout logic & user-case mapping |
| `memory/11-brand-json.md` | Schema definition & override precedence |
| `memory/12-arabic-typography.md` | Luxury pairings & mood classification |
| `memory/13-performance-budget.md` | Asset constraints & optimization targets |
| `memory/14-accessibility.md` | Canvas standards & keyboard navigation |

## Step 0 — Identify the mode (ask if not obvious)

> "What are we doing?
> 1. **Init** — build a brand-new cinematic landing page for a product
> 2. **Convert** — bring an existing static/standard landing page onto the
>    cinematic engine
> 3. **Improve** — audit and harden a page already built on this kit"

## Command Index

| Command | Purpose | Reference | Phase |
|---|---|---|---|
| `init` | **Primary deliverable** — full working cinematic page, one pass | `references/commands/init.md` | — |
| `brand` | Read/scaffold `brand.json`; token → CSS variable mapping | `references/commands/brand.md` | 1 |
| `clone-brand` | Extract `brand.json` tokens from an existing site/PDF/logo instead of a manual brief | `references/commands/clone-brand.md` | 1 |
| `media` | Provider selection + asset pipeline (keyframes → clips → frames → cutout) | `references/commands/media.md` | 2 |
| `film` | Canvas frame-sequence build + `FRAME_COUNT` sync | `references/commands/film.md` | 2 |
| `hero` | Hero entrance — cutout/establishing-shot/device-mockup per layout | `references/commands/hero.md` | 2 |
| `theme` | Light/dark palette derivation (gold-deep/gold-bright, ambient tween) | `references/commands/theme.md` | 2 |
| `typeface` | Distinctive Arabic (+ Latin accent) font pairing selection beyond the default | `references/commands/typeface.md` | 2 |
| `transitions` | Boundary-matched clip transitions between film segments | `references/commands/transitions.md` | 2 |
| `i18n` | Arabic/English direction, RTL, modesty & identity rules (applies the `typeface` choice) | `references/commands/i18n.md` | 3 |
| `perf` | Performance budget check — frame sequence, asset, and font weight against explicit limits | `references/commands/perf.md` | 3 |
| `a11y` | Accessibility pass — canvas alt-text, contrast, focus states, keyboard scroll | `references/commands/a11y.md` | 3 |
| `convert` | Retrofit an existing landing page onto the cinematic engine | `references/commands/convert.md` | — |
| `audit` | Quality-bar + brand.json verification checklist as a standalone report | `references/commands/audit.md` | — |
| `variant` | Produce an A/B page from an already-built project, reusing engine + media where possible | `references/commands/variant.md` | — |
| `deploy` | Preview, asset optimization, static-hosting export | `references/commands/deploy.md` | 3 |

New commands follow `references/commands/_template.md`.

## Command Sequencing & Phases

`init` runs standalone and produces the full page in one pass — see "Running
a full mode" below. For `convert`/`improve` work on an existing project:

1. **Phase 1 — Brand foundation.** `brand` (or `clone-brand` when an
   existing identity should be extracted rather than briefed) always first —
   every later command reads its tokens. No brand.json means every visual
   command below falls back to the legacy gold palette; flag that explicitly
   rather than silently proceeding.
2. **Phase 2 — Engine.** `media` generates the raw assets → `film` builds the
   scroll canvas from them → `hero` builds the entrance → `theme` applies the
   derived palette → `typeface` resolves the Arabic/Latin font pairing (skip
   only if the default El Messiri/Tajawal/Cormorant pair is confirmed fine)
   → `transitions` verifies boundary matches.
3. **Phase 3 — Scale & delivery.** `i18n` (localization/RTL/modesty, applies
   whichever pair `typeface` resolved) → `perf` (asset/font budget check) →
   `a11y` (accessibility pass) → `deploy` (optimize + preview) — always last.

`convert`, `audit`, and `variant` are entry points, not phase members —
`convert` hands off into Phase 1→3 once the target shape is agreed; `audit`
can run standalone at any time as a read-only report; `variant` runs against
an already-completed project and only re-enters Phase 1→3 for the specific
fields that changed (see `references/commands/variant.md`).

Never run two commands "at the same time" — each finishes, gets verified via
`references/workflow.md`, and gets reported before the next starts.

## Running a single command
1. Confirm mode (Step 0).
2. Read the matching reference file in full before acting.
3. Read `brand.json` if present (`brand` command) — every other command
   depends on it.
4. Execute per that reference file's steps.
5. Report using that command's checklist.

## Running a full mode end-to-end
- **Init**: run `init` alone — it reads brand.json (or triggers `clone-brand`
  if the user hands over an existing identity instead of a brief), picks a
  layout, scaffolds, writes the media prompt list, generates assets, and
  syncs the film, in one pass (mirrors the original `AGENTS.md` build
  order). `typeface` runs inline if the brief signals a non-default mood;
  `perf`/`a11y` run as part of `deploy` at the end, always.
- **Convert**: `convert` first (map the source onto the engine + agree
  scope; `clone-brand` if the source site's identity should carry over),
  then Phase 1→3 in full.
- **Improve**: `audit` first (read-only report), then only the phases whose
  findings the user confirms. A performance or accessibility regression
  found by `audit` routes to `perf`/`a11y` specifically, not a full rebuild.
- **Variant** (not a full mode — a targeted follow-up on a finished
  project): `variant` alone, per `references/commands/variant.md`.

## Hard constraints (apply to every command)
- Never scrub `video.currentTime` — canvas frame-sequence only.
- Never `mix-blend-mode` on animated elements — transparent PNG cutouts.
- Never cross-dissolve two stills — boundary-matched clips only (clip N
  end-frame == clip N+1 start-frame).
- Never hardcode a hex value or font name in `index.html` when a brand.json
  token exists.
- Arabic typography: El Messiri (headings) + Tajawal (body) by default, or a
  `memory/12-arabic-typography.md` mood pairing chosen via `typeface`.
  **Never Amiri, and no manuscript/calligraphic face above ~24px, regardless
  of which pair is chosen.**
- Modesty is mandatory for any human subject (full hijab, conservative);
  product identity is preserved exactly across all generated assets.
- `prefers-reduced-motion` and a missing-asset gradient fallback are
  non-negotiable on every build.
- Canvas film container carries an `aria-label`; the `<canvas>` itself is
  `aria-hidden="true"` — see `memory/14-accessibility.md`.
- Frame sequence, font, and image weight stay inside
  `memory/13-performance-budget.md`'s budgets, or the overage and its cause
  are stated explicitly.
- `brand`/`clone-brand` always runs first on Convert/Improve; `deploy`
  (which includes `perf` and `a11y`) always runs last.

## Related skills
- Needs a real backend (forms that persist, an admin panel, a database)
  behind this landing page → `tidyfactor-php-micro` or `tidyfactor-php`,
  this skill still owns the front-of-house single page.
- Wants a standard multi-page marketing site, not one cinematic page →
  `tidyfactor-html`.
- Building the brand.json itself from scratch for a client → pair with
  `website-copywriting-mena` for the voice/copy tokens.
