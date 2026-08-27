---
name: tidyfactor-cinematic
description: "Universal AI Agent Skill for building single-file, scroll-driven luxury landing pages (Apple x Cartier aesthetic) with zero build step, GSAP, Lenis, and scrubbed canvas frame sequence films. Trigger on commands 'brief', 'init', 'brand', 'media', 'film', 'hero', 'theme', 'typeface', 'transitions', 'i18n', 'perf', 'a11y', 'deploy', or requests for cinematic product launch pages."
---
# TidyFactor Cinematic (Scroll-Driven Luxury Landing Pages)

A command dispatcher for luxury scroll-driven landing pages (Apple × Cartier aesthetic). This router declares commands and workflows without performing execution directly.

## Commands

| User intent | Command | What it loads |
|---|---|---|
| Strategic Luxury Discovery & Brief Resolution | `references/commands/brief.md` | `references/workflows/brief.md` + `references/memory/decision-points.md` + `references/memory/quality-bar.md` |
| Primary deliverable — full working cinematic page | `references/commands/init.md` | `references/workflows/init.md` + `references/memory/10-use-cases.md` + `references/memory/11-brand-json.md` |
| Read/scaffold `brand.json` and tokens | `references/commands/brand.md` | `references/commands/brand.md` + `references/memory/11-brand-json.md` |
| Extract `brand.json` tokens from an existing site | `references/commands/clone-brand.md` | `references/commands/clone-brand.md` + `references/memory/15-brand-extraction.md` |
| Media pipeline providers (Nano Banana, Qwen, Higgsfield) | `references/commands/media.md` | `references/commands/media.md` + `references/memory/06-media-pipeline.md` |
| Canvas frame sequence scrubbing engine | `references/commands/film.md` | `references/commands/film.md` + `references/memory/02-scroll-film-canvas.md` |
| Cinematic hero fold, luxury badges, CTAs | `references/commands/hero.md` | `references/commands/hero.md` + `references/memory/04-cinematic-hero.md` |
| Color themes, dark obsidian, gold radial glows | `references/commands/theme.md` | `references/commands/theme.md` + `references/memory/05-theming.md` |
| Luxury Arabic & Latin typography pairings | `references/commands/typeface.md` | `references/commands/typeface.md` + `references/memory/12-arabic-typography.md` |
| GSAP ScrollTrigger section pinning & reveals | `references/commands/transitions.md` | `references/commands/transitions.md` + `references/memory/03-seamless-transitions.md` |
| Bilingual support & Arabic RTL typography | `references/commands/i18n.md` | `references/commands/i18n.md` + `references/memory/12-arabic-typography.md` |
| Performance budget & image asset compression | `references/commands/perf.md` | `references/commands/perf.md` + `references/memory/13-performance-budget.md` |
| Accessibility audit & keyboard navigation | `references/commands/a11y.md` | `references/commands/a11y.md` + `references/memory/14-accessibility.md` |
| Convert existing page into cinematic engine | `references/commands/convert.md` | `references/workflows/convert.md` + `references/memory/decision-points.md` |
| Complete 7-axis luxury & performance audit | `references/commands/audit.md` | `references/workflows/audit.md` + `references/memory/quality-bar.md` |
| Generate high-converting A/B variants | `references/commands/variant.md` | `references/workflows/variant.md` + `references/memory/16-variants.md` |
| Static deploy preparation (GitHub Pages, cPanel) | `references/commands/deploy.md` | `references/commands/deploy.md` + `references/memory/08-preview-and-env-gotchas.md` |
| Micro-animations, glow shaders, physics polish | `references/commands/polish.md` | `references/workflows/polish.md` + `references/memory/quality-bar.md` |

Read only the command file that matches the request. Do not load all commands simultaneously.

## Non-Negotiable Invariants

1. **Contextual Decision Layer (CDL)**: Resolve visual baselines via `/brief` or `.tidyfactor/cinematic-brief.md` before emitting code.
2. **Canvas Frame Scrubbing**: Product films are JPG frame sequences drawn on `<canvas>` and scrubbed by Lenis/GSAP scroll. Never use `<video>` currentTime.
3. **Zero Build Dependency**: Single-file deliverable (`index.html`) using CDN-only libraries (GSAP 3.12, Lenis 1.0, Tailwind CSS).
4. **Arabic Typography Rigor**: Never use Amiri for headings larger than 24px. Use El Messiri or curated luxury display pairings.
5. **7-Axis Pre-Emit Critique**: All generated pages must be evaluated with `/* Pre-emit critique: P5 H5 E5 S5 R5 V5 D5 */`.
