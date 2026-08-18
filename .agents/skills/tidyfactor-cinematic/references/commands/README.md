# Command Library Reference — `.claude-skill/references/commands/`

This directory contains the reference specifications for all **17 interactive agent commands** packaged within the TidyFactor Cinematic Claude Skill.

---

## 🧭 Command Taxonomy & Phases

Commands are categorized into **3 execution phases** plus **standalone mode entry points**:

```
                  ┌─────────────────────────────────────────┐
                  │              Build Modes                │
                  │   Init | Convert | Improve | Variant    │
                  └────────────────────┬────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌───────────────────┐        ┌───────────────────┐        ┌───────────────────┐
│ Phase 1: Brand    │        │ Phase 2: Engine   │        │ Phase 3: Delivery │
├───────────────────┤        ├───────────────────┤        ├───────────────────┤
│ • brand           │        │ • media           │        │ • i18n            │
│ • clone-brand     │        │ • film            │        │ • perf            │
│                   │        │ • hero            │        │ • a11y            │
│                   │        │ • theme           │        │ • deploy          │
│                   │        │ • typeface        │        │                   │
│                   │        │ • transitions     │        │                   │
└───────────────────┘        └───────────────────┘        └───────────────────┘
```

---

## 📑 Command Master Index

| Command | Purpose | Phase | Reference File |
| :--- | :--- | :---: | :--- |
| **`init`** | Full deliverable: build complete scroll-driven landing page in one pass | Standalone | [`init.md`](init.md) |
| **`brand`** | Read & scaffold `brand.json`; map design tokens to CSS variables | Phase 1 | [`brand.md`](brand.md) |
| **`clone-brand`** | Extract `brand.json` tokens from an existing website or brand PDF | Phase 1 | [`clone-brand.md`](clone-brand.md) |
| **`media`** | Provider selection & media asset pipeline (keyframes → clips → frames → cutout) | Phase 2 | [`media.md`](media.md) |
| **`film`** | Canvas frame-sequence scroll engine & `FRAME_COUNT` sync | Phase 2 | [`film.md`](film.md) |
| **`hero`** | Hero entrance section (cutout / establishing shot / CSS device mockup) | Phase 2 | [`hero.md`](hero.md) |
| **`theme`** | Light/dark mode palette derivation & ambient background color shift | Phase 2 | [`theme.md`](theme.md) |
| **`typeface`** | Distinctive luxury Arabic (+ Latin accent) font pairing selection by mood | Phase 2 | [`typeface.md`](typeface.md) |
| **`transitions`** | Boundary-matched video clip transitions between film segments | Phase 2 | [`transitions.md`](transitions.md) |
| **`i18n`** | Localization, RTL/LTR layout, modesty & product identity rules | Phase 3 | [`i18n.md`](i18n.md) |
| **`perf`** | Performance budget check (frame sequence caps, asset sizes, font weights) | Phase 3 | [`perf.md`](perf.md) |
| **`a11y`** | Accessibility pass (canvas ARIA labels, contrast, focus rings, keyboard scroll) | Phase 3 | [`a11y.md`](a11y.md) |
| **`convert`** | Retrofit an existing static landing page onto the cinematic engine | Standalone | [`convert.md`](convert.md) |
| **`audit`** | Standalone quality-bar & `brand.json` compliance audit report | Standalone | [`audit.md`](audit.md) |
| **`variant`** | Produce an A/B test or regional variant from an already-built project | Standalone | [`variant.md`](variant.md) |
| **`deploy`** | Web optimization, asset compression, preview & static hosting export | Phase 3 | [`deploy.md`](deploy.md) |
| **`_template`** | Template for registering new commands into the skill library | Reference | [`_template.md`](_template.md) |

---

## 🔄 Command Execution Flow

1. **`Init Mode` (New Project from scratch):**
   * Run `init` standalone. It reads `brand.json`, selects layout, triggers media pipeline, scaffolds `index.html`, and syncs `FRAME_COUNT` in one pass.
2. **`Convert Mode` (Existing Site Retrofit):**
   * Phase 1: `clone-brand` → `brand`
   * Phase 2: `media` → `film` → `hero` → `theme` → `typeface` → `transitions`
   * Phase 3: `i18n` → `perf` → `a11y` → `deploy`
3. **`Improve Mode` (Quality & Audit Pass):**
   * Run `audit` first to generate report → execute target commands (`perf`, `a11y`, `typeface`) based on findings.
4. **`Variant Mode` (A/B Test Page):**
   * Run `variant` to produce `index-<variant>.html` reusing base frame sequence (`assets/seq/`).
