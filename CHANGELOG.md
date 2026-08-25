# Changelog - Cinematic Landing Kit

All notable changes to the **[@alwkala/create-cinematic-kit](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)** package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.5.0] - 2026-08-25

### Added
- **Contextual Decision Layer (CDL v1.0)**: Added `references/memory/decision-points.md` with thin arbitration protocol (C1–C5: Media Provider, Layout Architecture, Arabic Typography Pairing, Mood Theme, Output Scope).
- **Brief Command (`/brief`)**: Added `references/commands/brief.md` and `references/workflows/brief.md` for pre-flight luxury design discovery.
- **7-Axis Luxury Quality Gate (`P/H/E/S/R/V/D`)**: Added `references/memory/quality-bar.md` enforcing Apple x Cartier aesthetic, frame sequence scrubbing, and anti-slop typography.
- **Structured References & Workflows Architecture**: Migrated memory into `references/memory/`, created `references/workflows/` (init, convert, polish, audit, variant), and scaffolded all command references in `references/commands/`.
- **Validation & Release Suite**: Created `tools/validate_skill.py`, updated `package.json` `"bin"` map, and synchronized `brand.json` version.

---

## [3.4.0] - 2026-08-23

### 📜 License & Ecosystem Parity Synchronization
- **Apache-2.0 License Standardization**: Synchronized license badge in `README.md` and `README.ar.md` to `Apache-2.0`, aligning with `package.json`, `.tidyfactor`, and `LICENSE`.
- **Ecosystem Package Parity**: Standardized canonical NPM package name as `@alwkala/tidyfactor-cinematic` (with `@alwkala/create-cinematic-kit` compatibility).

### Added & Enhanced from Test Learnings (`arome-royal-landing`)
- **AI Background Removal & Cutout Refinement Tool (`scripts/refine_assets.py`)**:
  - Integrated Python AI background removal script using `rembg` to remove square background box artifacts across product cutouts and build 93-frame canvas scroll sequences with ambient luxury color shifts.
- **New Skill Command (`polish`)**:
  - Registered command 17 (`polish`) and specification `references/commands/polish.md` for UI conversion polish.
  - Glassmorphic mobile navigation drawer overlay (`#mobileNavOverlay`) with blur backdrop (`backdrop-filter: blur(24px)`) and auto-dismiss link handlers.
  - Floating WhatsApp pulse button (`#waBubble` / `#wa-float`) with pre-filled deep links (`wa.me/<NUMBER>?text=...`).
  - Floating scroll-to-top button (`#scrollTopBtn`) appearing past 300px scroll depth with Lenis smooth ticker scroll.
  - Touch momentum physics configured in Lenis (`smoothTouch: true`, `touchMultiplier: 1.5`).

---

## [3.3.3] - 2026-07-28

### 🌟 Added New Automotive Layout & Skill Memory Enhancements
- **New 8th Layout Template (`auto` / `auto.html`)**:
  - Added new high-octane automotive & performance magazine layout (`templates/layouts/auto.html`) tested via `masrmotors-landing`.
  - Features Dark Graphite & Egyptian Racing Red theme (`#0A0A0A` / `#E53935`), animated tachometer/gauge preloader overlay (`#loader`), interactive 3D car slider stage (`.v-car-stage`) with HUD spec tooltips (`.v-hud-tooltip`), and custom brand scrollbar.
- **Skill Memory & Routing Hardening**:
  - Updated `memory/10-use-cases.md`, `memory/12-arabic-typography.md`, `AGENTS.md`, `SKILL.md` to support 8 layout options (`film`, `story`, `space`, `app`, `creator`, `product`, `store`, `auto`).
  - Standardized interactive AI Agent prompts to present all 8 layout options consistently with clear Arabic & English descriptions.
  - Floating WhatsApp pulse button (`#waBubble` / `#wa-float`) with pre-filled deep links (`wa.me/<NUMBER>?text=...`).
  - Floating scroll-to-top button (`#scrollTopBtn`) appearing past 300px scroll depth with Lenis smooth ticker scroll.
  - Touch momentum physics configured in Lenis (`smoothTouch: true`, `touchMultiplier: 1.5`).

## [3.3.2] - 2026-07-28

### Audited & Verified
- **Unified Layout Registry & Agent Prompt Consistency**:
  - Fully standardized layout aliases (`film`, `story`, `space`, `app`, `creator`, `product`, `store`) across all command specifications, memory files, CLI scripts, and AI agent interactive prompt questions.
- **Skill Reference Parity**:
  - Synchronized all 16 command specs and memory references between `.agents/skills/cinematic-landing-kit/` and `.claude-skill/`.
- **Distribution Bundle Re-packaging**:
  - Rebuilt clean distribution archives (`dist/tidyfactor-cinematic.skill` and `dist/cinematic-landing-kit.agents.zip`).

## [3.3.1] - 2026-07-28

### Fixed & Enhanced
- **Subcommand Delegation & `npx` Resolution (`bin/create-kit.js`)**:
  - Added automatic CLI subcommand delegation so running `npx @alwkala/create-cinematic-kit add-skill` (or `add-cinematic-skill`, `skill`) directly invokes `bin/add-skill.js`.
  - Solved `404` npm registry lookup errors caused by executing un-scoped `npx add-cinematic-skill`.
- **Installer Consistency & In-Place Upgrades (`bin/add-skill.js`)**:
  - Added `--force` (`-f`), `--yes` (`-y`), `--version` (`-v`), and `--help` (`-h`) CLI flags.
  - Automatically updates existing workspace `AGENTS.md` rules and `.claude-skill` wrappers to version `3.3.1` definitions.
- **Documentation Alignment**:
  - Updated `README.md`, `README.ar.md`, `AGENTS.md`, and `SKILL.md` to reflect the correct `npx @alwkala/create-cinematic-kit add-skill` execution command.

## [3.3.0] - 2026-07-28

### Added
- **Expanded 7-Layout System & E-Commerce / WhatsApp Conversion Templates**:
  - `product.html`: Single-product high-conversion layout featuring above-fold price & WhatsApp CTA, short scroll film, features grid, social proof reviews, FAQ accordion, floating WhatsApp bubble, and sticky mobile purchase bar.
  - `store.html`: Multi-product catalog layout with category filter bar, product grid cards with per-item WhatsApp order deep links, featured product spotlight, trust strip, and floating WhatsApp bubble.
  - Intuitive CLI layout aliases: `film` (`fullbleed`), `story` (`editorial`), `space` (`spatial`), `app` (`interface`), `creator` (`minimal`), `product` (`product`), `store` (`store`).
- **CLI Interactive UI/UX Redesign (`bin/create-kit.js` & `bin/add-skill.js`)**:
  - Stylized ASCII branding banners, rich layout selection menu with emojis and contextual descriptions, UX tips, and structured post-setup summary boxes.
- **AI Agent Token Usage Optimization (Lazy Memory Load Routing)**:
  - Routing table mapping each slash command to ONLY its required memory module (~80% reduction in context overhead).

## [3.2.2] - 2026-07-28

### Fixed & Hardened
- **Cross-Platform Skill Zip Building (`tools/build-skill.js` & `tools/build-antigravity.js`)**:
  - Implemented Python standard library `zipfile` module fallback (`python -m zipfile -c`) for 100% reliable zip archive creation across Linux (`ubuntu-latest`), macOS, and Windows.
- **CI/CD Workflow Resilience ([.github/workflows/release.yml](file:///b:/Dev-Studio/Cinematic%20Landing%20Kit/.github/workflows/release.yml) & [static.yml](file:///b:/Dev-Studio/Cinematic%20Landing%20Kit/.github/workflows/static.yml))**:
  - Added step failure resilience (`continue-on-error: true`) to ensure GitHub release asset publication completes cleanly even if NPM packages are pre-published manually or repository settings lack secrets.

## [3.2.1] - 2026-07-27

### Fixed & Enhanced
- **Python Asset Pipeline Audit**:
  - Updated `scripts/prepare_images.py` to use `split_spec` from `_utils.py` for Windows drive-letter path compatibility (`C:\path\src.png:C:\path\dest.jpg`).
- **Build & Skill Validation Auto-Sync**:
  - Integrated `--sync` flag into `tools/build-skill.js` and `tools/build-antigravity.js` to automatically keep reference command specs in 100% parity across targets.

## [3.2.0] - 2026-07-27

### Added
- **Create-Vite Style TTY Automation & CLI Resilience**:
  - `isInteractiveTerminal()` detection (`process.stdin.isTTY`, `process.stdout.isTTY`, `CI`, `NO_PROMPT`).
  - Added `--yes` (`-y`) and `--defaults` automation flags for non-interactive AI Agent / CI execution.
  - Added CLI layout validation with helpful list of valid layouts (`fullbleed`, `editorial`, `spatial`, `interface`, `minimal`).
  - Added `safePrompts()` wrapper with interactive input timeout fallback to prevent hanging in non-responsive embedded TTYs.

## [3.1.2] - 2026-07-27

### Changed
- **Workflow & Packaging Polish**:
  - Updated release action secrets handling for workflow syntax compliance.
  - Re-packaged distribution skill archives (`tidyfactor-cinematic.skill` and `cinematic-landing-kit.agents.zip`).

## [3.1.1] - 2026-07-27

### Added
- **Enhanced Bilingual Documentation (`README.md` & `README.ar.md`)**:
  - Overhauled Getting Started & Quick Start sections with clear step-by-step installation options (`npx @alwkala/create-cinematic-kit`, `npm install -g`, interactive mode).
  - Detailed Agent Skill Injection guide (`npx add-cinematic-skill`) covering all production lifecycle use cases (Init, Convert, Audit/Improve, Variant).
  - Complete 16-Command Reference Table in both Arabic and English documenting purpose, function, and reference specs (`references/commands/*.md`).
- **Fixes**:
  - Fixed syntax error in `.github/workflows/release.yml` line 53 for GitHub Actions workflow compatibility.

## [3.1.0] - 2026-07-27

### Added
- **Dynamic Versioning in CLI Tools**:
  - `bin/create-kit.js` (`npx @alwkala/create-cinematic-kit`) and `bin/add-skill.js` (`npx add-cinematic-skill`) now dynamically load version from `package.json` instead of hardcoded version strings.
- **Universal 16-Command Modular Skill Architecture**:
  - Upgraded `.agents/skills/cinematic-landing-kit/SKILL.md` with complete 16-command trigger system (`init`, `brand`, `clone-brand`, `media`, `film`, `hero`, `theme`, `typeface`, `transitions`, `i18n`, `perf`, `a11y`, `convert`, `audit`, `variant`, `deploy`).
  - Added `.agents/skills/cinematic-landing-kit/references/commands/` containing all 18 reference specification files.
  - Native tool mappings for Google Antigravity & Agentic IDEs (`generate_image`, `browser_subagent`, `run_command`).
- **Automated Skill Validation & Pre-Build Checks**:
  - Created `tools/validate-skill.js` to verify YAML frontmatter, command completeness, broken file references, and directory structure.
  - Pre-build validation integrated into `tools/build-skill.js` and `tools/build-antigravity.js`.
- **Automated Skill Scaffolding**:
  - `npx @alwkala/create-cinematic-kit` now automatically embeds `.agents/skills/cinematic-landing-kit/` and `.claude-skill/` into scaffolded projects.
- **GitHub Release & CI/CD Workflows**:
  - Added `.github/workflows/skill-ci.yml` for automated PR/branch validation.
  - Added `.github/workflows/release.yml` for automated package builds and publishing on GitHub release/tag creation.

## [3.0.0] - 2026-07-26

### Added
- **Google Antigravity & Gemini Native Integration**:
  - Dedicated Google Antigravity Agent Skill wrapper under `.agents/skills/cinematic-landing-kit/SKILL.md`.
  - Direct integration with Antigravity native tools: `generate_image` (Nano Banana / Imagen 3) for keyframes and transparent hero PNG cutouts, and `browser_subagent` for automated visual preview & 60FPS scroll verification.
  - Dedicated Google Gemini media pipeline reference: `memory/06-media-pipeline-gemini.md` leveraging multimodal visual feedback loops.
- **Dual-Agent Packaging Tooling**:
  - Added `tools/build-antigravity.js` and `npm run build:antigravity` / `npm run build:all` to produce distributable packages for both Claude Code (`dist/tidyfactor-cinematic.skill`) and Google Antigravity (`dist/cinematic-landing-kit.agents.zip`).
- **Updated Documentation**:
  - Updated English & Arabic documentation (`README.md`, `README.ar.md`, `AGENTS.md`) highlighting Google Antigravity & Gemini 1.5/2.0/Flash native compatibility.

## [2.0.0] - 2026-07-26

### Added
- **Claude Skill Integration & Packaging Tooling**:
  - Dedicated Claude Skill wrapper (`.claude-skill/SKILL.md` + 17 interactive command definitions under `.claude-skill/references/commands/`).
  - Distributable packaging tool (`tools/build-skill.js`) that packages single-source repo files into `dist/tidyfactor-cinematic.skill` with cross-platform (Linux/macOS/Windows PowerShell) zip compression support.
  - 5 new interactive agent commands: `typeface`, `perf`, `a11y`, `clone-brand`, `variant`.
- **5 New Specialized Memory Files (`memory/12` through `16`)**:
  - `12-arabic-typography.md`: Luxury Arabic font pairings by emotional register & layout (Markazi Text, Jomhuria, Cairo, Almarai, Oswald for numerals).
  - `13-performance-budget.md`: Performance budget & rules for frame sequence JPGs, asset optimization, and 60FPS scroll performance.
  - `14-accessibility.md`: RTL/LTR accessibility (A11y) standards, focus management, color contrast, and `prefers-reduced-motion` compliance.
  - `15-brand-extraction.md`: Automated workflow for extracting complete `brand.json` token sets from existing sites/identity assets.
  - `16-variants.md`: Guidelines and architectures for generating A/B design variants and regional/localized versions of builds.
- **Documentation**:
  - Updated English & Arabic documentation (`README.md`, `README.ar.md`, `AGENTS.md`) reflecting 16 memory reference files, Claude Skill integration, and build commands.

## [1.0.0] - 2026-07-26

### Added
- **NPM Package Release**: Published package to NPM registry as [`@alwkala/create-cinematic-kit`](https://www.npmjs.com/package/@alwkala/create-cinematic-kit).
- **Project Scaffold CLI (`npx @alwkala/create-cinematic-kit`)**:
  - Interactive project generator supporting 5 cinematic layout templates (`fullbleed`, `editorial`, `spatial`, `interface`, `minimal`).
  - Supports non-interactive flags (`--layout=editorial`).
  - Scaffolds complete landing page workspace with `index.html`, `brand.json`, `AGENTS.md`, `memory/`, `scripts/`, and python asset processing pipeline.
- **Agent Skill Installer CLI (`npx add-cinematic-skill`)**:
  - Automatically installs Cinematic Landing Kit skill into `.agents/skills/cinematic-landing-kit/SKILL.md` for AI coding agents (Antigravity, Cursor, Claude Code, Windsurf, Roo, etc.).
  - Updates workspace `AGENTS.md` rules.
- **Documentation & Badges**:
  - Added bilingual NPX Quick Start documentation in English ([`README.md`](README.md)) and Arabic ([`README.ar.md`](README.ar.md)).
  - Added official NPM version and downloads badges.
