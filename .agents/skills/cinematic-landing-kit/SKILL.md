---
name: cinematic-landing-kit
description: Universal AI Agent Skill — Builds single-file, scroll-driven luxury landing pages (Apple x Cartier aesthetic) as one index.html with CDN-only libraries (GSAP, Lenis, Tailwind), zero build step, no framework. Fully compatible out-of-the-box with Google Antigravity, Claude Code, Cursor, Windsurf, Roo Code, Cline, Codex, and all AGENTS.md compliant AI coding agents. Scrubbed canvas frame sequence product film. Reads brand.json as single source of truth for identity, colors, typography, voice, and localization. Supports 5 luxury layouts (fullbleed, editorial, spatial, interface, minimal) and curated luxury Arabic typography.
---

# Universal AI Agent Skill — Cinematic Landing Kit

Build a **single-file, scroll-driven luxury landing page** (Apple × Cartier aesthetic) for any product using any AI coding agent.

Output is one `index.html` with CDN libraries (GSAP 3.12, Lenis 1.0, Tailwind CSS), zero build step, zero framework, zero bundler.

---

## 🤖 Universal AI Agent Compatibility

This skill is designed as a **single source of truth** architecture centered around `AGENTS.md`, `memory/`, `templates/`, `scripts/`, and `brand.json`. It works out-of-the-box with all major AI coding agents:

- **Google Antigravity**: Discovers this skill automatically via `.agents/skills/cinematic-landing-kit/SKILL.md`, with native support for `generate_image`, `browser_subagent`, and `run_command`.
- **Claude Code / Claude.ai**: Discovers this skill via `AGENTS.md` and `.claude-skill/SKILL.md`.
- **Cursor / Windsurf / Roo Code / Cline**: Reads `AGENTS.md` and `.cursorrules` / `.windsurfrules` / `.clinerules`.
- **Codex / OpenCode / Kilo / Gemini CLI**: Reads `AGENTS.md` from the project root.

---

## 🏛️ Critical Architecture

- **Film Engine**: JPG frame-sequence (`assets/seq/f000.jpg … fNNN.jpg`) drawn on `<canvas>`, scrubbed smoothly by scroll progress. **NEVER scrub `video.currentTime`** — H.264 keyframe-seeking causes stutter.
- **Brand Source of Truth**: `brand.json` at project root overrides template defaults (colors, fonts, voice, identity, localization) per `memory/11-brand-json.md`.
- **Layout Selection**:
  - `fullbleed.html` — Long scroll film, aura + motes hero (High-ticket products, watches, luxury automotive)
  - `editorial.html` — Split-screen hero, specs film (Specs-heavy products, brand stories, founder pages)
  - `spatial.html` — Establishing shot hero, walkthrough film (Real estate, architecture, hospitality)
  - `interface.html` — Device mockup frame hero, UI flow film (SaaS, mobile apps, digital platforms)
  - `minimal.html` — Centered hero cutout, no canvas film (Digital products, books, creators)

---

## 🛠️ Step-by-Step Execution Workflow

### 1. Brand Identity & Direction
- Read `brand.json` if present. If absent, ask if the user wants to scaffold one or proceed with default luxury warm-gold + El Messiri / Tajawal typography.
- Select layout variant from `templates/layouts/` based on `memory/10-use-cases.md`.

### 2. Template Scaffolding
- Copy chosen template to project root as `index.html`.
- Override CSS variables in `:root` with `brand.json` tokens.
- Set `<html lang>` and `<html dir="rtl|ltr">`.
- Fill copy placeholders using `brand.json` voice rules (`voice.tone`, `voice.doNotUse`).

### 3. Media Asset Generation
- Formulate boundary-matched prompt list using provider templates in `templates/`.
- Generate keyframe stills using the active agent's available image tools or external APIs (`generate_image`, Nano Banana, Qwen/Wan, Higgsfield).
- Run Python extraction scripts to generate numbered JPEG frames (`assets/seq/f000.jpg … fNNN.jpg`).
- Run `scripts/remove_backgrounds.py` to generate transparent PNG cutout (`assets/hero-cutout.png`).

### 4. Frame Count Sync & Canvas Wiring
- Count total generated frames and update `FRAME_COUNT` variable inside `index.html`.

### 5. Preview & Verification Loop
- Launch a local HTTP server (`python -m http.server 8123`).
- Verify Lenis smooth scrolling and GSAP ScrollTrigger timeline execution in a visible browser tab or via browser evaluation tools.

---

## 📋 Quality Bar & Non-Negotiables

- **No `mix-blend-mode` on animated elements** — breaks under GSAP 3D transforms; use transparent PNG cutouts.
- **No manuscript / Amiri fonts** above 24px — use El Messiri for display headings, Tajawal for body copy.
- **Modesty mandatory** — conservative attire for human subjects in generated imagery.
- **`prefers-reduced-motion` fallback required** on canvas animations.
- **Canvas ARIA attributes** — `<canvas aria-hidden="true">` with container `aria-label`.
