# AGENTS.md — Cinematic Luxury Landing-Page Engine

Build a **single-file, scroll-driven luxury landing page** (Apple × Cartier aesthetic) for any product using a choice of media provider — default to Nano Banana (`generate_image` tool) or choose Qwen Image (stills) + Wan (video clips) / Higgsfield CLI if configured. This is a single-file web app (`index.html`) with CDN libraries (GSAP, Lenis, Tailwind) — no build step, no framework, no bundler.

---

## ⚡ Skill & Modular Slash Commands

This project exposes an Agentic Skill under `.agents/skills/cinematic-landing-kit/SKILL.md` (and `.claude-skill/SKILL.md`). When working with an Agentic IDE, the following 16 modular sub-commands are supported:

| Command | Purpose | Reference Spec |
|---|---|---|
| `init` | **Primary deliverable** — full working cinematic page in one pass | `.agents/skills/cinematic-landing-kit/references/commands/init.md` |
| `brand` | Read/scaffold `brand.json` token mappings | `.agents/skills/cinematic-landing-kit/references/commands/brand.md` |
| `clone-brand` | Extract `brand.json` tokens from an existing site/PDF | `.agents/skills/cinematic-landing-kit/references/commands/clone-brand.md` |
| `media` | Provider selection + asset generation pipeline | `.agents/skills/cinematic-landing-kit/references/commands/media.md` |
| `film` | Canvas frame-sequence build + `FRAME_COUNT` sync | `.agents/skills/cinematic-landing-kit/references/commands/film.md` |
| `hero` | Hero entrance — cutout/establishing-shot/device-mockup | `.agents/skills/cinematic-landing-kit/references/commands/hero.md` |
| `theme` | Light/dark palette derivation + ambient layer tween | `.agents/skills/cinematic-landing-kit/references/commands/theme.md` |
| `typeface` | Distinctive Arabic & Latin luxury typography pairing | `.agents/skills/cinematic-landing-kit/references/commands/typeface.md` |
| `transitions` | Boundary-matched clip transitions | `.agents/skills/cinematic-landing-kit/references/commands/transitions.md` |
| `i18n` | Arabic/English RTL, modesty & identity rules | `.agents/skills/cinematic-landing-kit/references/commands/i18n.md` |
| `perf` | Performance budget check (assets, fonts, FPS) | `.agents/skills/cinematic-landing-kit/references/commands/perf.md` |
| `a11y` | Accessibility check (canvas alt-text, contrast, focus) | `.agents/skills/cinematic-landing-kit/references/commands/a11y.md` |
| `convert` | Retrofit an existing static page onto the cinematic engine | `.agents/skills/cinematic-landing-kit/references/commands/convert.md` |
| `audit` | Comprehensive quality-bar & brand verification report | `.agents/skills/cinematic-landing-kit/references/commands/audit.md` |
| `variant` | Produce an A/B layout variant from a built project | `.agents/skills/cinematic-landing-kit/references/commands/variant.md` |
| `deploy` | Asset optimization, local preview, static export | `.agents/skills/cinematic-landing-kit/references/commands/deploy.md` |
| `polish` | Mobile nav drawer, WhatsApp CTA, scroll-to-top & favicon | `.agents/skills/cinematic-landing-kit/references/commands/polish.md` |

---

## Critical architecture (the #1 thing)

The product "film" is a **JPG frame-sequence drawn on `<canvas>`**, scrubbed by scroll progress.
**NEVER scrub `video.currentTime`** — H.264 keyframe-seeking causes stutter. Convert videos to ~90–120 numbered JPGs (`assets/seq/f000.jpg … fNNN.jpg`) at 1280px wide, JPEG q≈80.

## Build order

0. **Read brand identity source.** Check for `brand.json` at the project root (or wherever the host project declares its brand tokens). If it exists, read it once and treat it as the **single source of truth** for colors, fonts, voice, identity assets, and localization. It overrides all template defaults per the mapping in `memory/11-brand-json.md`. If no `brand.json` is found, fall back to each template's hardcoded defaults (warm gold + El Messiri/Tajawal palette).
1. **Decide direction** from the product + reference photos + brand.json (if present): theme (light/dark — derived from `colors.light` vs `colors.dark` in brand.json), story beats, palette tokens, and voice register from `voice.tone`. Don't ask the user to specify unless genuinely blocked.
2. **Choose a layout** from `templates/layouts/` — see the decision table there. Pick based on product type:
   - `fullbleed.html` — long scroll film, aura+motes hero (transformation stories: perfume, food, watches)
   - `editorial.html` — split-screen hero, shorter film, two-column sections (specs-heavy: furniture, auto, skincare)
   - `spatial.html` — establishing-shot hero, walkthrough film, experience/location sections (real estate, architecture, luxury travel, hospitality)
   - `interface.html` — device mockup hero, UI-flow film, feature/workflow sections (SaaS, apps, digital platforms)
   - `minimal.html` — centered hero, no canvas film, section-based (fast/lightweight: digital products, books)
   - `product.html` — single-product high-conversion e-commerce: price above fold, WhatsApp CTA, social proof, FAQ, sticky mobile bar
   - `store.html` — multi-product WhatsApp catalog: product grid, category filter, per-card WhatsApp links, floating WhatsApp bubble

   | CLI alias | Template file | Best for |
   |-----------|--------------|----------|
   | `film` | `fullbleed.html` | Luxury goods, perfume, watches, automotive, fashion, rebrands |
   | `story` | `editorial.html` | Founder pages, events, skincare, spec-heavy products |
   | `space` | `spatial.html` | Real estate, architecture, hospitality, travel |
   | `app` | `interface.html` | SaaS, mobile apps, digital platforms |
   | `creator` | `minimal.html` | Personal brands, ebooks, digital products, creators |
   | `product` | `product.html` | Single-product e-commerce with WhatsApp conversion |
   | `store` | `store.html` | Multi-product WhatsApp catalog & boutique stores |
3. **Scaffold**: copy the chosen template to root as `index.html`, then:
   - Override the template's `:root` CSS variables with brand.json tokens using the mapping table at the top of each layout's `<style>` section (or see `memory/11-brand-json.md` for the full reference).
   - Set `<html lang>` and `<html dir>` from `localization.*`.
   - Wire `<meta>` tags, favicon, and header logo from `meta.*` and `identity.*`.
   - Fill every `{{PLACEHOLDER}}` (copy, CTAs, captions) using `voice.*` rules — in particular, never use any word from `voice.doNotUse`, and always write in the voice's `preferredPerson`.
   - The engine is correct — override tokens + fill placeholders, don't rewrite the architecture.
4. **Write the prompt list** from the appropriate media prompts template based on `mediaProvider` in `brand.json` (or default to Nano Banana if not specified):
   - `templates/MEDIA-PROMPTS-nanobanana.template.md` — Nano Banana (default, uses built-in `generate_image` tool)
   - `templates/MEDIA-PROMPTS-qwen.template.md` — Qwen Image + Wan (DashScope API)
   - `templates/MEDIA-PROMPTS-higgsfield.template.md` — Higgsfield CLI
   Ensure prompts are numbered, boundary-matched, and include identity + modesty clauses. Apply `voice.tone` and `voice.doNotUse` to any generated caption text. Skip the film-section prompts if building from `minimal.html`, `product.html` (film is optional), or `store.html` (no canvas film).
   For `product.html` and `store.html`: generate product images + one lifestyle/banner image. No video pipeline needed unless the client requests it.
5. **Generate assets** (see `memory/06-media-pipeline.md` for selection and the provider-specific guide): keyframe images in parallel → boundary-matched video clips (after keyframes verified) → extract frames → transparent hero cutout via `rembg`. Source product identity from `identity.logo.*` and `meta.product` to preserve brand accuracy.
6. **Sync `FRAME_COUNT`** in `index.html` to the actual extracted frame count (4 clips × 24 frames − 3 duplicates = 93 is typical). Applies to `fullbleed`, `editorial`, `spatial`, and `interface` templates (not `minimal`).
7. **Preview locally & verify** (see "Preview & verification" below). Run the brand.json verification checklist from `memory/11-brand-json.md` (no hardcoded hex values, contrast passes, voice compliance, etc.) in addition to the cinematic verification. Web-optimize heavy assets via `scripts/optimize_assets.py`.

## Non-negotiables

- **Cinematic hero**, not a static image + fade. For product/brand layouts (`fullbleed`, `editorial`, `minimal`): transparent PNG cutout (no `mix-blend-mode` — it breaks under GSAP `transform`). For `spatial`: full-bleed establishing shot. For `interface`: device mockup frame.
- **Boundary-matched clips**: clip N end-frame == clip N+1 start-frame. Never cross-dissolve two stills.
- **Ambient `#ambient` layer** shifts color per section via GSAP tween.
- **Header** hides on scroll-down (`.hidden`), returns on scroll-up. Never removed.
- **Typography**: Arabic = El Messiri (headings) + Tajawal (body). **Never Amiri**. Captions off-center (right in RTL).
- **Modesty mandatory** for any person (full hijab, conservative). **Exact product identity** preserved across all assets.
- **Graceful fallbacks**: `prefers-reduced-motion` + missing-asset gradient on a container (not `::after` on `<img>` — `::after` doesn't render on replaced elements).
- **brand.json is authoritative** when present: colors, fonts, voice, identity assets, and localization all derive from it. Never hardcode a hex or font name in `index.html` when a `brand.json` token exists. If `brand.json` is absent, the template's defaults (warm gold + El Messiri/Tajawal) apply.

## Preview & verification

Serve: `python -m http.server 8123` or open `index.html` directly in the browser.

**Hidden browser tabs pause `requestAnimationFrame`** — GSAP tweens freeze, screenshots time out, bulk image preloads stall. This is the OS, not a bug. Verify via:
- `eval` in the preview: check DOM structure, `getComputedStyle`, console errors.
- Force end-states: `gsap.set('.elem', { ... })` to confirm layout.
- Drive scroll programmatically: `window.lenis.scrollTo(y, {immediate:true, force:true}); ScrollTrigger.update();` — plain `window.scrollTo` doesn't update ScrollTrigger when Lenis owns scroll.
- Position by trigger's pixel range: `st.start + progress * (st.end - st.start)`, not `offsetTop`.

## Asset pipeline (Python)

**Dependencies vary by provider:**
- **All providers:** `pip install rembg pillow opencv-python`
- **Qwen/Wan:** + `pip install dashscope`
- **Higgsfield:** + `higgsfield` CLI (auth via `higgsfield auth login`)
- **Nano Banana:** no extra deps (uses built-in `generate_image` tool)

| Script | Purpose |
|--------|---------|
| `scripts/remove_backgrounds.py` | `rembg` → transparent PNG cutouts (logo, product hero) |
| `scripts/prepare_images.py` | PNG → JPEG q=87 conversion for web |
| `scripts/optimize_assets.py` | Resize hero cutout (max 1200px), logo (max 240px) |
| `scripts/generate_transitions.py` | Generate transition keyframes |

The frame extraction recipe (no ffmpeg needed) is in `memory/06-media-pipeline.md` — uses OpenCV `VideoCapture`. Guard against empty mp4s (failed download = 0-frame file).

## Tooling constraints

- **No `jq`** — parse JSON with `grep -oE` if needed.
- **No `ffmpeg`/`ffprobe`** — use Python + OpenCV.
- `<picture>` 404 pitfall: if a matched `<source>` 404s, the `<img>` fallback does NOT render. Use a single `<img>` until responsive assets are actually generated.
- Muted autoplay: call `video.play().catch(()=>{})` on first user gesture; don't set the `loop` attribute if you rely on the `ended` event (looping elements never fire `ended`).

## Deep reference — read these before building

- `memory/02-scroll-film-canvas.md` — the canvas frame-sequence technique in detail
- `memory/04-cinematic-hero.md` — the blend-mode trap; entrance + aura + particles + 3D tilt + sheen
- `memory/05-theming.md` — light vs dark multiply/screen
- `memory/06-media-pipeline.md` — provider selection guide + shared pipeline (frame extraction, optimization)
- `memory/06-media-pipeline-qwen.md` — Qwen Image + Wan via DashScope API
- `memory/06-media-pipeline-higgsfield.md` — Higgsfield CLI (nano_banana_2 + seedance_2_0)
- `memory/06-media-pipeline-nanobanana.md` — Nano Banana via generate_image tool
- `memory/06-media-pipeline-gemini.md` — Google Gemini & Antigravity native generate_image + browser_subagent loop
- `memory/08-preview-and-env-gotchas.md` — all the env quirks above, with full explanations
- `memory/09-quality-bar.md` — the auto-reject checklist (what gets thrown out)
- `memory/10-use-cases.md` — use-case routing: which layout, which sections, which media prompts for all 15 use cases
- `memory/11-brand-json.md` — brand token schema, CSS variable → brand.json mapping, voice/identity/localization rules, verification checklist
- `memory/12-arabic-typography.md` — Arabic luxury font pairings by layout & emotional register
- `memory/13-performance-budget.md` — performance budget, frame sequence caps, 60fps rules
- `memory/14-accessibility.md` — accessibility (A11y), RTL/LTR standards, high contrast, reduced motion
- `memory/15-brand-extraction.md` — brand.json extraction workflow from existing sites/identity
- `memory/16-variants.md` — A/B design variants and regional/localized versions
