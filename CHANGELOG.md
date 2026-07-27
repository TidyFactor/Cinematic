# Changelog - Cinematic Landing Kit

All notable changes to the **[@alwkala/create-cinematic-kit](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)** package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

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
