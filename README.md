<div align="center">

# 🎬 Cinematic Landing Kit `v2.0.0`

**Apple × Cartier Aesthetic — Scroll-Driven Luxury Product Landing Pages for Any AI Agent**

[![npm version](https://img.shields.io/npm/v/@alwkala/create-cinematic-kit.svg?color=gold&style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)
[![npm downloads](https://img.shields.io/npm/dm/@alwkala/create-cinematic-kit.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![RTL Ready](https://img.shields.io/badge/RTL-Native%20Arabic-emerald.svg?style=for-the-badge)](README.ar.md)
[![Zero Build](https://img.shields.io/badge/Build-Zero%20Step-purple.svg?style=for-the-badge)](#stack)

[✨ Live Demo](https://alwkala.com/design-system-kit/) • [🚀 Quick Start](#-quick-start) • [🤖 Claude Skill](#-claudeai--claude-code-users) • [📖 Read in Arabic (بالعربية)](README.ar.md)

</div>

---

## 🌟 Overview

**Cinematic Landing Kit** is an engine and memory package that instructs **any AI coding agent** (Claude Code, Cursor, Antigravity, Windsurf, etc.) to produce high-impact, scroll-driven product films and luxury landing pages. 

Instead of generating basic, static websites, your AI agent follows strict production-tested patterns to build single-file HTML landing pages powered by HTML5 `<canvas>` frame sequences, GSAP animations, and Lenis smooth scrolling — **with zero build step, no bundler, and pure CDN speed.**

```
AI Agent reads AGENTS.md  →  Loads memory/ DNA  →  Generates index.html  →  Ready to launch 🚀
```

---

## 📺 Visual Showcase & Live Demo

> 🌐 **Experience the Live Interactive Demo:** [alwkala.com/design-system-kit](https://alwkala.com/design-system-kit/)

<div align="center">
  <img src="https://github.com/alwkala/Cinematic-Landing-Kit/blob/main/CinematicLandingKit.jpg" width="100%" alt="Cinematic Landing Kit Hero Showcase" style="border-radius: 8px; margin-bottom: 12px;"/>
</div>

<table align="center">
  <tr>
    <td width="50%">
      <img src="https://github.com/alwkala/Cinematic-Landing-Kit/blob/main/screenshot-1.jpg" alt="Scroll Film Demo 1" style="border-radius: 6px;"/>
      <p align="center"><b>Scroll-Driven Canvas Film</b></p>
    </td>
    <td width="50%">
      <img src="https://github.com/alwkala/Cinematic-Landing-Kit/blob/main/screenshot-2.jpg" alt="Scroll Film Demo 2" style="border-radius: 6px;"/>
      <p align="center"><b>Aura & Transparent PNG Hero Cutout</b></p>
    </td>
  </tr>
</table>

---

## 🚀 Quick Start via NPX

Published on NPM as [**`@alwkala/create-cinematic-kit`**](https://www.npmjs.com/package/@alwkala/create-cinematic-kit).

### Option A: Create a New Cinematic Landing Project
Scaffold a complete luxury landing page project in seconds:
```bash
npx @alwkala/create-cinematic-kit my-luxury-landing
```

### Option B: Inject Agent Skill into an Existing Project
Inject the agent memory, rules, and skills into your current workspace:
```bash
npx add-cinematic-skill
```

---

## 🤖 Compatible AI Coding Agents

Works seamlessly out of the box with any AI agent that reads workspace instruction files (`AGENTS.md`, `.cursorrules`, system prompts, etc.):

| AI Agent | Integration Method | Supported |
| :--- | :--- | :---: |
| **Claude Code** | Automatic (`AGENTS.md` / `.claude-skill/`) | ✅ |
| **Google Antigravity** | Automatic (`AGENTS.md` / `.agents/`) | ✅ |
| **Cursor** | Automatic (`AGENTS.md` / `.cursorrules`) | ✅ |
| **Windsurf** | Automatic (`AGENTS.md` / `.windsurfrules`) | ✅ |
| **Roo Code / Cline** | Automatic (`AGENTS.md` / `.clinerules`) | ✅ |
| **Codex / OpenCode** | Automatic (`AGENTS.md`) | ✅ |
| **Kilo / Gemini CLI** | Automatic (`AGENTS.md`) | ✅ |

---

## ⚡ Why AI Agents Fail Without This Kit

| Pitfall Without This Kit | Solution With Cinematic Landing Kit |
| :--- | :--- |
| ❌ Scrubs `video.currentTime` (causes severe stutter) | ✅ **Canvas frame-sequence film** (60 FPS smooth scrubbing) |
| ❌ `mix-blend-mode` glitches under GSAP transform | ✅ **Transparent PNG hero cutouts** via `rembg` |
| ❌ Ghosting/cross-dissolve transition jumps | ✅ **Boundary-matched AI keyframe clips** |
| ❌ Default system fonts or illegible calligraphy | ✅ **El Messiri + Tajawal + Cormorant** curated typography |
| ❌ Inconsistent/placeholder images | ✅ **Multi-provider pipeline** (Nano Banana, Qwen/Wan, Higgsfield) |
| ❌ Background tab `requestAnimationFrame` freezes | ✅ **`eval`-based programmatic verification** |

### Traditional vs. Cinematic Experience

| Feature | Traditional Landing Page | Cinematic Landing Kit `v2.0.0` |
| :--- | :--- | :--- |
| **Hero Treatment** | Static banner + simple fade-in | Dynamic aura, depth tilt & scroll narrative |
| **Product Motion** | Passive CSS transitions | Canvas film scrubbed smoothly by scroll |
| **User Experience** | Ordinary static web page | Luxury TV advertisement feel (Apple × Cartier) |
| **Brand Adaptation** | Manual CSS rewriting | Single source of truth via **`brand.json`** |
| **Localization** | Text translation overlay | Native LTR/RTL, typography & cultural adaptation |
| **Build Setup** | Webpack / Vite / React / Node build | **Single `index.html` file via CDN — Zero Build** |

---

## 📦 What's Inside

```
├── AGENTS.md                         ← Cross-agent entry point read automatically
├── brand.json                        ← Single source of truth for brand identity & tokens
├── memory/                           ← 16 Reference Files (The DNA of the look & feel)
│   ├── 01-build-playbook.md             Architecture & GSAP + Lenis scroll stack
│   ├── 02-scroll-film-canvas.md         ★ Canvas frame-sequence scrubbing technique
│   ├── 03-seamless-transitions.md       Boundary-matched video clip generation
│   ├── 04-cinematic-hero.md             Hero entrance, aura, depth tilt & sheen
│   ├── 05-theming.md                    Light/dark modes & blend-mode rules
│   ├── 06-media-pipeline.md             ★ Provider selection & shared Python pipeline
│   ├── 06-media-pipeline-nanobanana.md  Nano Banana (generate_image tool)
│   ├── 06-media-pipeline-qwen.md        Qwen Image + Wan (DashScope API)
│   ├── 06-media-pipeline-higgsfield.md  Higgsfield CLI
│   ├── 07-modesty-and-identity.md       Non-negotiable product & identity constraints
│   ├── 08-preview-and-env-gotchas.md    Hidden-tab quirks & eval-based verification
│   ├── 09-quality-bar.md                Auto-reject checklist & quality assurance
│   ├── 10-use-cases.md                  ★ 15 Use-cases → layout routing table
│   ├── 11-brand-json.md                 ★ brand.json schema, CSS var mapping & voice rules
│   ├── 12-arabic-typography.md          Luxury Arabic typography pairings & mood matrix
│   ├── 13-performance-budget.md         Performance budget, frame caps & 60fps rules
│   ├── 14-accessibility.md              RTL/LTR accessibility (A11y), contrast & focus
│   ├── 15-brand-extraction.md           Automated brand.json extraction from existing sites
│   └── 16-variants.md                   A/B design variants & regional/localized versions
├── .claude-skill/                    ← Claude Skill wrapper (SKILL.md + 17 command references)
├── tools/                            ← build-skill.js distributable packaging utility
├── templates/
│   ├── layouts/                       ← 5 Layout Variants
│   │   ├── fullbleed.html                Long scroll film + aura hero (Transformation stories)
│   │   ├── editorial.html                Split-screen hero + specs film (Specs-heavy products)
│   │   ├── spatial.html                  Establishing-shot hero + walkthrough film (Real Estate)
│   │   ├── interface.html                Device mockup hero + UI flow film (SaaS & Apps)
│   │   └── minimal.html                  Centered cutout hero, no canvas film (Digital products)
│   ├── MEDIA-PROMPTS-higgsfield.template.md   Higgsfield prompt list
│   ├── MEDIA-PROMPTS-nanobanana.template.md   Nano Banana prompt list
│   ├── MEDIA-PROMPTS-qwen.template.md         Qwen/Wan prompt list
│   └── launch.json                    Preview server configuration
└── scripts/                          ← Python helper scripts (No ffmpeg/jq required)
    ├── remove_backgrounds.py            rembg → transparent PNG cutouts
    ├── prepare_images.py                PNG → JPEG conversion
    ├── optimize_assets.py               Resize hero cutout & logo for web
    ├── generate_transitions.py          Transition keyframe generator
    ├── check_alpha.py                   Verify PNG transparency
    ├── create_mock_videos.py            Placeholder video generation
    └── inspect_images.py                Inspect image metadata
```

---

## 💡 Claude.ai / Claude Code Users

`AGENTS.md` is the universal cross-agent entry point. For **Claude Code** and **Claude.ai**, `.claude-skill/` packages the kit as an installable Claude Skill featuring **17 interactive slash commands** (`init`, `brand`, `media`, `film`, `hero`, `theme`, `transitions`, `i18n`, `convert`, `audit`, `deploy`, `typeface`, `perf`, `a11y`, `clone-brand`, `variant`).

Build the distributable `.skill` package anytime with:
```bash
node tools/build-skill.js
# → Produces dist/tidyfactor-cinematic.skill
```

---

## 🎨 Layouts & Supported Use Cases

Five layout variants cover 15 distinct luxury use cases automatically routed by `memory/10-use-cases.md`:

| Layout Template | Hero Style | Film Experience | Primary Use Cases |
| :--- | :--- | :--- | :--- |
| **`fullbleed.html`** | Product cutout + aura + motes | Long transformation film (640vh) | High-ticket products, launches, rebrands, luxury automotive, fashion, watches |
| **`editorial.html`** | Split-screen (Image + Copy) | Story focus film (420vh) | Brand stories, events, conferences, founder stories |
| **`spatial.html`** | Full-bleed establishing shot | Spatial walkthrough film (500vh) | Real estate, architecture, luxury travel, hospitality |
| **`interface.html`** | CSS Device mockup frame | UI workflow film (420vh) | SaaS launches, mobile apps, digital platforms |
| **`minimal.html`** | Centered cutout, clean background | Section-based (No film) | Personal brands, creators, ebooks, digital products |

---

## 🛠️ Stack & Zero-Build Architecture

The generated output is a **pure single `index.html` file** requiring no build tools, compilers, or server-side runtimes:

| Component | Technology | Delivery |
| :--- | :--- | :--- |
| **Scroll Engine** | Lenis 1.0 | CDN |
| **Animation Stack** | GSAP 3.12 + ScrollTrigger | CDN |
| **CSS Utilities** | Tailwind CSS | CDN |
| **Typography** | Google Fonts (El Messiri, Tajawal, Cormorant) | CDN |
| **Product Film** | `<canvas>` + Numbered JPG frame sequence | Local `assets/seq/` |
| **Hero Cutout** | Transparent PNG (`rembg`) | Local `assets/` |

---

## 🔧 Optional Asset Pipeline Helpers

The landing page itself has **zero dependencies**. The Python scripts are optional helpers for asset generation and optimization:

```bash
# Install optional python dependencies for asset optimization
pip install rembg Pillow opencv-python dashscope
```

---

## 🤝 Contributing & Community Standards

Contributions are welcome! If you discover a new edge case or gotcha, add it to `memory/` — every lesson learned prevents future AI agents from repeating the issue.

Please review our:
* 📜 [Code of Conduct](CODE_OF_CONDUCT.md)
* 🛠️ [Contributing Guide](CONTRIBUTING.md)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Created by [alwkala](https://github.com/alwkala). Free to use in personal and commercial projects.
