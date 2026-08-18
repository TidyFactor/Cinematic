# Skill Registry — TidyFactor-Cinematic

> Part of the **[TidyFactor Skills-LAB](../)** ecosystem.  
> Vision: **[TidyFactor-VISION.md](../TidyFactor-VISION.md)**

---

## Identity

| Field | Value |
|---|---|
| **Skill Name** | `TidyFactor-Cinematic` |
| **Track Alias** | `tidyfactor-cinematic` |
| **Version** | `3.3.3` |
| **Category** | Marketing / Landing Pages |
| **Output** | Single `index.html` file |
| **NPM Package** | [`@alwkala/create-cinematic-kit`](https://www.npmjs.com/package/@alwkala/create-cinematic-kit) |
| **GitHub** | [TidyFactor/Cinematic](https://github.com/TidyFactor/Cinematic) |
| **Commercial Partner** | [Alwkala](https://alwkala.com) |

---

## What This Skill Does

Produces a **single-file, scroll-driven luxury landing page** (Apple × Cartier aesthetic) for any product using an AI coding agent — zero build step, zero framework, zero bundler.

The product "film" is a JPG frame-sequence drawn on `<canvas>`, scrubbed by scroll progress. Never `video.currentTime` scrubbing.

---

## 8 Layout Templates

| Alias | File | Best For |
|---|---|---|
| `film` | `fullbleed.html` | Luxury goods, perfume, watches, brand campaigns |
| `story` | `editorial.html` | Founder pages, specs-heavy, editorial |
| `space` | `spatial.html` | Real estate, architecture, hospitality |
| `app` | `interface.html` | SaaS, mobile apps, digital platforms |
| `creator` | `minimal.html` | Personal brands, ebooks, digital creators |
| `product` | `product.html` | Single product high-conversion + WhatsApp |
| `store` | `store.html` | Multi-product WhatsApp catalog |
| `auto` | `auto.html` | Automotive, racing, car community showpieces |

---

## 17 Skill Commands

```
init · brand · clone-brand · media · film · hero · theme · typeface
transitions · i18n · perf · a11y · convert · audit · variant · deploy · polish
```

Full specs: `references/commands/`

---

## Trigger Phrases

Agent triggers on any of:
- Commands: `init`, `brand`, `clone-brand`, `media`, `film`, `hero`, `theme`, `typeface`, `transitions`, `i18n`, `perf`, `a11y`, `convert`, `audit`, `variant`, `deploy`, `polish`
- Phrases: "build a cinematic landing page", "scroll-driven product page", "luxury Apple-style landing page", "صفحة هبوط سينمائية"

---

## Compatible Agent IDEs

Google Antigravity · Claude Code · Cursor · Windsurf · Roo Code · Cline · Codex · all AGENTS.md-compliant agents

---

## Skill Files (this folder)

```
TidyFactor-Cinematic/
├── AGENTS.md                         ← root rules file (all AI agents)
├── VISION.md                         ← TidyFactor vision reference
├── SKILL-REGISTRY.md                 ← this file
├── .tidyfactor                       ← ecosystem JSON marker
├── brand.json                        ← default brand token schema
├── requirements.txt                  ← Python deps (rembg, pillow, opencv)
├── package.json                      ← CLI package config
├── .agents/skills/cinematic-landing-kit/ ← Antigravity skill
│   ├── SKILL.md
│   └── references/commands/          ← 17 command specs
├── .claude-skill/                    ← Claude/Cursor/Windsurf skill
│   ├── SKILL.md
│   └── references/commands/          ← 17 command specs (synced)
├── memory/                           ← 20 deep reference files
├── templates/layouts/                ← 8 layout HTML templates
└── scripts/                          ← Python asset pipeline tools
```

---

## Single Source of Truth & Build Workflow

This folder (`TidyFactor-Cinematic`) inside `Skills-LAB` is the **canonical Single Source of Truth** for the skill.

To validate and rebuild the packaged skill archive (`tidyfactor-cinematic.skill`):
```bash
node tools/build-skill.js
```

---

## Related Skills (TidyFactor Ecosystem)

| Skill | Focus |
|---|---|
| `tidyfactor-html` | Static content sites |
| `tidyfactor-php` | Full-stack PHP server-rendered |
| `tidyfactor-js` | Framework-free SPAs |
| `tidyfactor-htmx` | Server-driven interactivity |
| **`TidyFactor-Cinematic`** | **Luxury scroll-driven landing pages** |
