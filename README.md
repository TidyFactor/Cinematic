# Cinematic Landing Kit

[![npm version](https://img.shields.io/npm/v/@alwkala/create-cinematic-kit.svg?color=gold&style=flat-square)](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)
[![npm downloads](https://img.shields.io/npm/dm/@alwkala/create-cinematic-kit.svg?style=flat-square)](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

A context-and-memory package that instructs **any AI coding agent** to produce
scroll-driven, cinematic product landing pages — the kind that feel like a
luxury TV ad, not a website. One HTML file, CDN libraries, zero build step.

```
AI agent reads AGENTS.md  →  follows memory/  →  produces index.html  →  done.
```

## Quick Start via NPX 🚀

Published on NPM: [**@alwkala/create-cinematic-kit**](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)

### 1. Create a New Cinematic Landing Project
Create a new project scaffold directly using `npx`:
```bash
npx @alwkala/create-cinematic-kit my-luxury-landing
```

### 2. Install Agent Skill in an Existing Project / Workspace
Inject the Cinematic Landing Kit agent skill into your current project:
```bash
npx add-cinematic-skill
```

<img align="right" width="180" src="https://github.com/alwkala/Cinematic-Landing-Kit/blob/main/CinematicLandingKit.jpg" alt="Cinematic-Landing-Kit"/>

# Demo 
check the output of the design-system-kit live on : 
https://alwkala.com/design-system-kit/

<img align="right" width="180" src="https://github.com/alwkala/Cinematic-Landing-Kit/blob/main/screenshot-1.jpg" alt="Screenshot"/>

<img align="right" width="180" src="https://github.com/alwkala/Cinematic-Landing-Kit/blob/main/screenshot-2.jpg" alt="Screenshot"/>

<div dir="rtl" align="right">

## 🇸🇦 دعم اللغة العربية

هذا النظام مصمم بدعم كامل للغة العربية منذ البداية — ليس مجرد ترجمة، بل هيكل بصري وتقني يراعي اتجاه الكتابة (RTL)، والطباعة العربية، والهوية الثقافية. كل قالب يدعم `dir="rtl"` و `lang="ar"` تلقائياً عبر ملف `brand.json`، مع خطوط عربية احترافية (El Messiri للعناوين + Tajawal للنص) بدلاً من الخطوط الافتراضية التي تفسد المظهر الفاخر.

### ✨ أبرز المزايا

- **ملف HTML واحد** — لا يحتاج إلى أي أدوات بناء أو تبعيات. فقط افتح الملف في المتصفح
- **تجربة سينمائية** — صفحات هبوط بأسلوب Apple × Cartier مع فيلم منتج يُعرض بالتمرير
- **٥ قوالب جاهزة** — `fullbleed` · `editorial` · `spatial` · `interface` · `minimal` لتغطية ١٥ حالة استخدام
- **٣ مزودين للوسائط** — Nano Banana (افتراضي) · Qwen/Wan · Higgsfield CLI يمكنك اختيار الانسب حسب رغبتك
- **هوية العلامة التجارية** — ملف `brand.json` يتحكم بكل شيء: الألوان، الخطوط، النبرة، الشعار، والتوطين
- **يعمل مع أي وكيل ذكاء اصطناعي** — Claude Code, Cursor, Codex, Gemini CLI, Antigravity وغيرهم
- **اضافة الضوابط** — يمكنك اضافة وتحديث اي ضوابط إلزامية يتم مراعاتها فى مخرجات التصميم والمحتوى 
- **أدوات مساعدة اختيارية** — سكربتات Python لمعالجة الصور وإزالة الخلفيات واستخراج الإطارات

> 📖 للاطلاع على التوثيق الكامل باللغة العربية: **[README بالعربية](README.ar.md)**

</div>

---

Works with any AI coding agent that auto-reads project-level instruction files
(`AGENTS.md`, `.cursorrules`, system prompts, etc.).

### Compatible Agents

| Agent | Agent | Agent |
|-------|-------|-------|
| **Claude Code** | **Codex** | **Cursor** |
| **Kilo** | **Windsurf** | **Roo** |
| **Continue** | **Cline** | **OpenCode** |
| **Gemini CLI** | **OpenHands** | **Google Antigravity** |

> Not seeing yours? If your agent can read `AGENTS.md` from the project root,
> it works. Drop the kit into your project and prompt away.

---

## Why AI Agents Fail

Most AI coding agents can generate a landing page.

Very few can generate an Apple-style cinematic experience.

Cinematic Landing Kit teaches any AI coding agent how to build scroll-driven
product films using production-tested patterns instead of generic templates.

| Without this kit | With this kit |
|------------------|---------------|
| ❌ Scrubs `video.currentTime` (stutter) | ✅ Canvas frame-sequence film |
| ❌ `mix-blend-mode` glitches under GSAP | ✅ Transparent PNG cutouts |
| ❌ Broken transitions (cross-dissolve ghosting) | ✅ Boundary-matched Wan clips |
| ❌ Random typography (Amiri, system fonts) | ✅ El Messiri + Tajawal + Cormorant |
| ❌ Inconsistent or placeholder assets | ✅ Multi-provider pipeline (Qwen/Wan, Higgsfield, Nano Banana) |
| ❌ Hidden-tab `requestAnimationFrame` mystery | ✅ `eval`-based verification workflow |

### Traditional vs. Cinematic

| | Traditional Landing Page | Cinematic Landing Kit |
|---|------------------------|----------------------|
| **Hero** | Static image + fade-in | Scroll-driven storytelling |
| **Motion** | CSS `opacity` transition | Canvas film scrubbed by scroll |
| **Scroll** | Passive, just reveals content | Directed, cinematic motion |
| **Feel** | Static page, fades on scroll | Continuous narrative journey |
| **Result** | Generic, looks like every other site | Luxury — Apple x Cartier aesthetic |
| **Assets** | Stock photos, placeholder gradients | AI-generated (provider choice) + rembg cutouts |
| **Build** | Framework + bundler + dependencies | Single HTML file, CDN only, zero build |

---

## Quick start

```bash
# 1 — Copy into your project root (next to your code):
cp -r AGENTS.md memory/ templates/ scripts/   /path/to/your-project/

# 2 — Tell your AI agent:
"Build a cinematic luxury landing page for [product].
  Reference photos are in assets/. Follow AGENTS.md."

# 3 — Preview:
python -m http.server 8123
# Or open index.html directly in the browser
```

That's it. The agent reads `AGENTS.md`, follows the build order, and produces a
working `index.html` on the first attempt.

### Claude.ai / Claude Code users

`AGENTS.md` above is the cross-agent source of truth and works as-is. If you
use Claude specifically, `.claude-skill/` packages this same kit — unchanged
— as an installable Claude Skill with 11 discoverable commands
(`init`, `brand`, `media`, `film`, `hero`, `theme`, `transitions`, `i18n`,
`convert`, `audit`, `deploy`) instead of one linear build order. Build the
distributable package with:

```bash
node tools/build-skill.js
# → dist/tidyfactor-cinematic.skill
```

See `.claude-skill/SKILL.md` for what it adds and why it's a separate,
generated artifact rather than a duplicate of `memory/`/`templates/`/`scripts/`.

---

## What's inside

```
├── AGENTS.md                         ← entry point any agent reads automatically
├── brand.json                        ← single source of truth for brand identity (colors, fonts, voice, assets)
├── memory/                           ← 16 reference files (the "DNA" of the look)
│   ├── 01-build-playbook.md             page structure, Lenis + GSAP motion stack
│   ├── 02-scroll-film-canvas.md         ★ canvas frame-sequence technique
│   ├── 03-seamless-transitions.md       boundary-matched video clips
│   ├── 04-cinematic-hero.md             hero entrance, tilt, sheen, cutout
│   ├── 05-theming.md                    light/dark themes, the blend-mode trap
│   ├── 06-media-pipeline.md             ★ provider selection + shared pipeline
│   ├── 06-media-pipeline-qwen.md        Qwen Image + Wan (DashScope API)
│   ├── 06-media-pipeline-higgsfield.md  Higgsfield CLI
│   ├── 06-media-pipeline-nanobanana.md  Nano Banana (generate_image)
│   ├── 07-modesty-and-identity.md       non-negotiable constraints on people/products
│   ├── 08-preview-and-env-gotchas.md    hidden-tab quirks, eval-based verification
│   ├── 09-quality-bar.md                what gets auto-rejected
│   ├── 10-use-cases.md                  ★ use-case routing: 15 use cases → layout + beats + media
│   ├── 11-brand-json.md                 ★ brand.json schema, CSS var mapping, voice/identity rules
│   ├── 12-arabic-typography.md          luxury Arabic font pairings by layout & register
│   ├── 13-performance-budget.md         performance budget, frame sequence caps, 60fps rules
│   ├── 14-accessibility.md              RTL/LTR accessibility (A11y) standards & focus rules
│   ├── 15-brand-extraction.md           brand.json extraction workflow from existing sites
│   └── 16-variants.md                   A/B design variants & regional/localized versions
├── .claude-skill/                    ← Claude Skill wrapper (SKILL.md + 17 command references)
├── tools/                            ← build-skill.js packaging utility
├── templates/
│   ├── layouts/                       ← choose one layout variant per project
│   │   ├── fullbleed.html                long scroll film + aura hero (1,2,3,7,9,11,12,14,15)
│   │   ├── editorial.html                split-screen hero + shorter film (2,8,13)
│   │   ├── spatial.html                  establishing-shot hero + walkthrough film (4,10)
│   │   ├── interface.html                device mockup hero + UI-flow film (6)
│   │   └── minimal.html                  centered hero, no canvas film (5)
│   ├── MEDIA-PROMPTS-higgsfield.template.md   ← Higgsfield prompt list
│   ├── MEDIA-PROMPTS-nanobanana.template.md   ← Nano Banana prompt list
│   ├── MEDIA-PROMPTS-qwen.template.md         ← Qwen/Wan prompt list
│   └── launch.json                    ← preview-server config
└── scripts/                          ← Python helpers (no ffmpeg/jq required)
    ├── remove_backgrounds.py            rembg → transparent cutouts
    ├── prepare_images.py                PNG → JPEG conversion
    ├── optimize_assets.py               resize hero cutout + logo for web
    ├── generate_transitions.py          transition keyframes
    ├── check_alpha.py                   verify PNG transparency
    ├── create_mock_videos.py            generate placeholder clips
    └── inspect_images.py                inspect image properties
```

---

## Requirements

The landing page itself has **zero requirements** — it is a single-file, zero-build HTML page that can be opened directly in any modern web browser or served using any static web server (e.g. `python -m http.server 8123`).

The Python dependencies and CLI tools are **fully optional helpers** used for generating, extracting, or optimizing the media assets:

| Tool / Package | Why | Install |
|---|---|---|
| Python 3.8+ | running helper scripts | Any 3.8+ |
| `rembg` | transparent cutouts | `pip install rembg` |
| `Pillow` | image resize/convert | `pip install Pillow` |
| `opencv-python` | frame extraction | `pip install opencv-python` |
| `dashscope` *(opt)* | Qwen/Wan API calls | `pip install dashscope` |
| `higgsfield` CLI *(opt)* | Higgsfield media generation | `higgsfield auth login` |

One-shot helper scripts install:

```bash
pip install rembg Pillow opencv-python dashscope
```

---

## Stack

The output is a **single `index.html`** — no build, no bundler, no framework.

| Layer | Technology | Source |
|-------|-----------|--------|
| Scroll engine | Lenis 1.0 | CDN |
| Animation | GSAP 3.12 + ScrollTrigger | CDN |
| Styling | Tailwind CSS | CDN |
| Typography | Google Fonts (El Messiri, Tajawal) | CDN |
| Film | `<canvas>` + JPG frame sequence | local assets |
| Hero cutout | transparent PNG (rembg) | local assets |

Visual assets are generated via your chosen provider: **Nano Banana** (`generate_image` tool), **Qwen Image + Wan** (DashScope API), or **Higgsfield CLI**. Any equivalent model or setup can substitute.

---

## Layouts & supported use cases

Five layout variants cover 15 distinct use cases. The agent reads the use-case
routing guide (`memory/10-use-cases.md`) to pick the right layout automatically.

| Layout | Hero treatment | Film | Use cases |
|--------|---------------|------|-----------|
| `fullbleed` | Product cutout + aura + motes | Long transformation (640vh) | Product launches, high-ticket sales, rebrands, automotive, fashion, causes, artisan, limited drops |
| `editorial` | Split-screen (image + copy) | Shorter film (420vh) | Brand stories, events/conferences, founder pages |
| `spatial` | Full-bleed establishing shot | Spatial walkthrough (500vh) | Real estate, architecture, luxury travel, hospitality |
| `interface` | Device mockup (CSS frame) | UI flow film (420vh) | SaaS launches, app launches, digital platforms |
| `minimal` | Centered cutout, no aura | No film | Personal brands, creators, digital products |

**Fit test:** one clear subject + transformation arc + user in inspire mode → cinematic kit.
Multi-product catalogs, spec comparison pages, and A/B-tested funnels → standard landing page.

---

## brand.json — single source of truth

Each project's brand identity lives in **`brand.json`** at the project root. When present, agents read it **before** scaffolding the template, and its tokens override all template defaults. The kit is fully brand-adaptive — change `primary` from gold to blue, and the entire cinematic experience recolors while keeping its motion architecture intact.

### What it governs

| Token group | Kit behavior |
|-------------|--------------|
| `meta.*` | Fills `{{PRODUCT}}`, `<title>`, `<meta description>`, OG tags |
| `colors.light.*` / `colors.dark.*` | Maps to the template's `:root` CSS variables (`--paper`, `--ink`, `--gold`, etc.) |
| `voice.*` | Governs every generated string — captions, CTAs, eyebrows. Words in `voice.doNotUse` are hard-blocked. |
| `identity.logo.*` | Paths to favicon, nav logo, OG image — wired into HTML `<head>` and header |
| `typography.families.*` | Heading and body fonts. Latin accent (`Cormorant Garamond`) stays unless overridden. |
| `localization.*` | Sets `<html lang>` and `<html dir>` for RTL/LTR rendering |
| `motion.*` | Easing curves and reduced-motion behavior |
| `accessibility.*` | Focus-ring, touch-target, and alt-text policies |

Full token → CSS variable mapping: `memory/11-brand-json.md`.

### Why brand.json matters

- **Reproducibility** — regenerate any landing page from the same brand.json and get pixel-identical results
- **Cross-kit portability** — the same `brand.json` powers the Cinematic Landing Kit, Documentation Kit, and future kits (Dashboard, Admin, LMS, Commerce)
- **No hardcoding** — agents are explicitly forbidden from inlining a hex value or font name that has a brand.json equivalent
- **Voice consistency** — every caption, CTA, and eyebrow is written in the brand's register

A minimal `brand.json` (under 50 lines) takes about 3 minutes to author and eliminates every "default warm-gold" AI landing page drift.

---

## What the agent knows before it starts

These are the hard-won lessons encoded in `memory/` — the things agents
typically get wrong on the first attempt without guidance:

- **Read `brand.json` first** when present — its colors, fonts, voice, and
  identity files override every template default. Never hardcode a hex or
  font name that has a brand.json equivalent.
- **Never scrub `video.currentTime`** — the scroll "film" is a canvas frame
  sequence, not a video element. H.264 seeking stutters.
- **Never use `mix-blend-mode`** on animated elements — it breaks under GSAP
  transforms. Use transparent PNG cutouts instead.
- **Never cross-dissolve two stills** — seamless transitions require
  boundary-matched video clips.
- **Sync `FRAME_COUNT`** in the HTML to the actual extracted frame count.
- **Hidden browser tabs pause `requestAnimationFrame`** — verify via `eval`,
  not screenshots.
- **Arabic typography:** El Messiri (headings) + Tajawal (body). Never Amiri.
- Modesty is mandatory for any human subject. Product identity is preserved
  exactly across all generated assets.
- Layout-specific heroes: `fullbleed`/`editorial`/`minimal` use a transparent
  PNG cutout. `spatial` uses a full-bleed establishing shot. `interface` uses
  a CSS device mockup frame — no cutout needed for either.

---

## How it works

```
  reference photo + product brief
           │
           ▼
  ┌─────────────────────┐
  │  AI agent reads      │
  │  AGENTS.md           │
  │  + memory/ files     │
  │  (inc. 10-use-cases) │
  └─────────┬───────────┘
            │
            ▼
  pick layout: fullbleed | editorial
               spatial   | interface
               minimal
            │
            ▼
  templates/layouts/*.html  ←  scaffold, fill placeholders
            │
            ▼
   Keyframe images      →  Video clips
   (chosen provider)       (chosen provider)
            │                    │
            └──────┬─────────────┘
                   ▼
        opencv frame extraction
        → assets/seq/f000.jpg … fNNN.jpg
                   │
                   ▼
        rembg → hero cutout (not needed for spatial/interface)
                   │
                   ▼
              index.html  (opened or served locally)
```

---

## Preview

```bash
python -m http.server 8123
```

Open `http://localhost:8123` in a **visible** browser tab. Hidden or
backgrounded tabs pause `requestAnimationFrame`, which freezes GSAP tweens and
breaks visual testing. See `memory/08-preview-and-env-gotchas.md` for the
full verification workflow.

---

## Community Standards

| Document | Purpose |
|----------|---------|
| [Code of Conduct](CODE_OF_CONDUCT.md) | Contributor Covenant v2.1 — expected behavior in all community spaces |
| [Contributing Guide](CONTRIBUTING.md) | How to report bugs, add gotchas, propose layouts, and submit PRs |

## Contributing

If you find a gotcha that isn't in `memory/` yet, add it. The value of this
kit grows with every hard-won lesson captured here instead of forgotten.

The highest-impact contributions are new pitfall entries in `memory/` files —
each one saves the next person (and the next agent) from the same 30-minute
debug loop. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide on
submitting gotchas, layouts, media pipeline improvements, and pull requests.

## Credits

Built from real production experience. Created by
[alwkala](https://github.com/alwkala). Use freely.

## License

This project is licensed under the [MIT License](LICENSE).

