<div align="center">

# 🎬 Cinematic Landing Kit `v3.2.1`
## We are building the open ecosystem for AI-ready business websites.

**The official marketing website starter for the TidyFactor Ecosystem.**
TidyFactor (Open Web Development Ecosystem)
├── Design System
├──── Cinematic Landing Kit   ← You are here
├── CMS
└── other products 

**Apple × Cartier Aesthetic — Scroll-Driven Luxury Product Landing Pages for Any AI Agent**

[![npm version](https://img.shields.io/npm/v/@alwkala/create-cinematic-kit.svg?color=gold&style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)
[![npm downloads](https://img.shields.io/npm/dm/@alwkala/create-cinematic-kit.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Universal AI Agents](https://img.shields.io/badge/AI%20Agents-Universal%20Compatibility-4285F4.svg?style=for-the-badge)](README.md)
[![RTL Ready](https://img.shields.io/badge/RTL-Native%20Arabic-emerald.svg?style=for-the-badge)](README.ar.md)
[![Zero Build](https://img.shields.io/badge/Build-Zero%20Step-purple.svg?style=for-the-badge)](#-stack--zero-build-architecture)

[✨ Live Demo](https://alwkala.com/design-system-kit/) • [🚀 Quick Start](#-quick-start--usage-guide) • [⚡ Slash Commands](#-universal-16-slash-commands) • [📖 Read in Arabic (بالعربية)](README.ar.md)

</div>

---

## 🌟 Overview

**Cinematic Landing Kit** is an engine and memory package that instructs **any AI coding agent** (Google Antigravity, Claude Code, Cursor, Windsurf, Roo Code, Cline, Codex, etc.) to produce high-impact, scroll-driven product films and luxury landing pages. 

Instead of generating basic, static websites, your AI agent follows strict production-tested patterns to build single-file HTML landing pages powered by HTML5 `<canvas>` frame sequences, GSAP animations, and Lenis smooth scrolling — **with zero build step, no bundler, and pure CDN speed.**

```
AI Agent reads AGENTS.md  →  Loads memory/ & SKILL.md  →  Generates index.html  →  Ready to launch 🚀
```

<div dir="rtl" align="right">

### 🇸🇦 نبذة عن النظام 
سواءً كنت تبني صفحة هبوط لمنتج أو خدمة فاخرة، أو تسعى لبناء نموذج أولي (Prototype) مبهر، فقد صُممت هذه الأداة من فريق الوكالة للبرمجيات (**Alwkala**) بخبرة تمتد لأكثر من 20 عاماً في تصميم وتطوير تجارب المستخدم.

تُزوّد هذه الحزمة أي مساعد برمجيات بالذكاء الاصطناعي (مثل Claude Code, Cursor, Antigravity) بالخبرات والأنماط الإنتاجية لبناء صفحات هبوط تفاعلية تُعرض فيها المنتجات كأفلام تفاعلية تتحرك مع تمرير الشاشة، بدون أي تعقيدات تقنية أو أدوات بناء برمجية (ملف `index.html` واحد يعمل فوراً).

> 📖 **للاطلاع على التوثيق والدليل الكامل باللغة العربية:** **[انقر هنا لفتح الدليل بالعربية (README.ar.md)](README.ar.md)**

</div>

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

## 🚀 Quick Start & Usage Guide

Published on NPM as [**`@alwkala/create-cinematic-kit`**](https://www.npmjs.com/package/@alwkala/create-cinematic-kit).

### Option 1: Create a Brand New Project (Scaffold)
Scaffold a complete, ready-to-build luxury landing page project with all layout templates:

```bash
# Interactive execution (Real terminal TTY)
npx @alwkala/create-cinematic-kit

# Direct scaffolding with target directory & layout choice
npx @alwkala/create-cinematic-kit my-luxury-landing --layout interface

# Non-interactive / AI Agent / CI mode (automated defaults, zero prompts)
npx @alwkala/create-cinematic-kit my-luxury-landing --yes

# Or install globally and run anytime
npm install -g @alwkala/create-cinematic-kit
create-cinematic-kit my-luxury-landing
```

### Option 2: Inject Agent Skill into an Existing Project
Inject the Agent Skill, rules, memory, and references into an existing workspace:

```bash
npx add-cinematic-skill
```

This installs `.agents/skills/cinematic-landing-kit/` and `AGENTS.md`, enabling your AI coding agent to construct and maintain the page using `brand.json` as the single source of truth for design tokens.

---

## ⚡ Universal 16 Slash Commands

When working with any Agentic IDE (Google Antigravity, Claude Code, Cursor, Windsurf, Roo Code, Cline, etc.), the following **16 modular commands** are available:

| Command | Purpose & Function | Reference Spec |
| :--- | :--- | :--- |
| `init` | **Full Page Generation** — Build complete luxury landing page in one pass | `references/commands/init.md` |
| `brand` | **Brand Setup** — Read/scaffold `brand.json` token mapping (colors, fonts, voice) | `references/commands/brand.md` |
| `clone-brand` | **Extract Brand** — Extract `brand.json` tokens from an existing site, PDF, or logo | `references/commands/clone-brand.md` |
| `media` | **Media Pipeline** — AI keyframe stills, background removal, and video clip generation | `references/commands/media.md` |
| `film` | **Scroll Canvas** — Frame sequence build & `FRAME_COUNT` sync | `references/commands/film.md` |
| `hero` | **Hero Entrance** — 3D tilt, float, aura, and PNG cutout setup | `references/commands/hero.md` |
| `theme` | **Color Palette** — Light/Dark mode derivation & ambient layer GSAP tween | `references/commands/theme.md` |
| `typeface` | **Typography** — Curated Arabic (El Messiri + Tajawal) & Latin font pairings | `references/commands/typeface.md` |
| `transitions` | **Transitions** — Boundary-matched AI video clip transitions | `references/commands/transitions.md` |
| `i18n` | **Localization** — Arabic/English RTL/LTR, modesty, & identity rules | `references/commands/i18n.md` |
| `perf` | **Performance Audit** — 60FPS scroll performance & asset weight budget check | `references/commands/perf.md` |
| `a11y` | **Accessibility Pass** — High contrast, ARIA canvas labels, & keyboard scroll check | `references/commands/a11y.md` |
| `convert` | **Retrofit Static Page** — Convert an existing legacy page onto the cinematic engine | `references/commands/convert.md` |
| `audit` | **Quality Report** — Comprehensive brand.json & luxury quality bar audit report | `references/commands/audit.md` |
| `variant` | **A/B Testing** — Produce alternative design variants from a completed page | `references/commands/variant.md` |
| `deploy` | **Export & Preview** — Asset web optimization, local preview, and static deploy | `references/commands/deploy.md` |

---

## 🤖 Compatible AI Coding Agents

Works seamlessly out of the box with any AI agent that reads workspace instruction files (`AGENTS.md`, `.agents/skills/`, `.claude-skill/`, `.cursorrules`, etc.):

| AI Agent | Integration Method | Supported |
| :--- | :--- | :---: |
| **Google Antigravity** | Automatic (`AGENTS.md` / `.agents/`) | ✅ |
| **Claude Code** | Automatic (`AGENTS.md` / `.claude-skill/`) | ✅ |
| **Cursor** | Automatic (`AGENTS.md` / `.cursorrules`) | ✅ |
| **Windsurf** | Automatic (`AGENTS.md` / `.windsurfrules`) | ✅ |
| **Roo Code / Cline** | Automatic (`AGENTS.md` / `.clinerules`) | ✅ |
| **Codex / OpenCode** | Automatic (`AGENTS.md`) | ✅ |
| **Kilo / Gemini CLI** | Automatic (`AGENTS.md`) | ✅ |

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
| **Scroll Animation** | GSAP 3.12 + ScrollTrigger | CDN (`cdnjs.cloudflare.com`) |
| **Smooth Scroll** | Lenis 1.0 | CDN (`cdn.jsdelivr.net`) |
| **Styling** | Tailwind CSS | CDN (`cdn.tailwindcss.com`) |
| **Film Engine** | HTML5 `<canvas>` + JPEG Frame Sequences | Local `assets/seq/f000.jpg` |
| **Typography** | Google Fonts (El Messiri, Tajawal, Cormorant Garamond) | CDN (`fonts.googleapis.com`) |

---

## 📄 License & Ecosystem

Licensed under the [MIT License](LICENSE). Built with ❤️ by [Alwkala](https://alwkala.com).
