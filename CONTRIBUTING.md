# Contributing to Cinematic Landing Kit

Thank you for your interest in contributing! This project is an **agent-instruction kit** — its value lives in the hard-won lessons captured in `memory/` and the battle-tested templates in `templates/`. Every contribution that makes this harder-to-get-wrong is welcome.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [What to Contribute](#what-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## How to Contribute

### Reporting Bugs

If a layout template produces broken output, or an agent follows a `memory/` instruction and gets a bad result:

1. Check existing issues to avoid duplicates.
2. Open a new issue with:
   - **Which agent** triggered it (Claude Code, Cursor, Codex, Kilo, etc.)
   - **Which layout** (`fullbleed`, `editorial`, `spatial`, `interface`, `minimal`)
   - **Steps to reproduce**: exact prompt you gave the agent, or the sequence of commands
   - **What you expected** vs. **what you got** (screenshots or DOM snippets help)
   - **Any `memory/` file** that was involved

### Suggesting Features

Open an issue with the `[feature]` prefix in the title. Describe:
- The production problem you hit
- Why the current kit doesn't solve it
- A rough idea for the fix (even a one-liner counts)

## What to Contribute

The highest-value contributions to this kit, in order of impact:

### 1. New Gotchas (`memory/` files)

This is the **core DNA** of the project. If you discovered a pitfall that costs you 30 minutes to fix:

- **Write it down** in the existing relevant `memory/` file, or propose a new one
- Include: the mistake → why it happens → the fix → how to verify
- Number new files sequentially (`11-*.md`)
- Cross-link from `AGENTS.md` under the "Deep reference" section

Example format:
```markdown
## The Trap
You might do X because it seems obvious.

## Why It Fails
Explanation of the underlying cause.

## The Fix
Specific, actionable solution.

## Verification
How to check it's actually working.
```

### 2. New Layout Templates (`templates/layouts/`)

If you built a layout variant that solves a use case not covered by the existing 5:

- Base it on the **same engine** (Lenis + GSAP + ScrollTrigger pipeline, hide/show header, ambient-per-section tweening, canvas frame-sequence for film)
- Use the `{{PLACEHOLDER}}` pattern so agents can fill it
- Keep it a **single HTML file** with CDN-only dependencies
- Add a section to `memory/10-use-cases.md` explaining when to use it
- Update `AGENTS.md` layout decision table
- Update `README.md` layouts section

### 3. Media Pipeline Improvements (`scripts/` or `memory/06-media-pipeline*.md`)

If you found a better way to:
- Extract frames (faster, higher quality)
- Generate boundary-matched clips (more reliable)
- Remove backgrounds (cleaner edges)
- Optimize assets (smaller files, same quality)

Document the recipe in the appropriate `memory/06-media-pipeline-*.md` file and/or improve the Python scripts in `scripts/`.

### 4. Use-Case Additions (`memory/10-use-cases.md`)

If you built a cinematic landing for a use case not yet listed:
- Add it to the decision table
- Document which layout, which sections, and which media strategy worked
- Note any gotchas specific to that use case

### 5. Typographic & Localization Extensions

If you adapted the kit for a language other than Arabic/English:
- Document font pairing decisions
- Update the typography notes in `memory/01-build-playbook.md`
- Consider if `dir` handling needs adjustment in templates

## Development Setup

```bash
# Clone
git clone https://github.com/TidyFactor/Cinematic.git
cd cinematic-landing-kit

# Install Python dependencies for scripts
pip install rembg Pillow opencv-python dashscope

python -m http.server 8123
```

Open `http://localhost:8123` in a **visible** (not backgrounded) browser tab. Hidden tabs pause `requestAnimationFrame`, which freezes GSAP tweens and makes the page look broken.

## Pull Request Process

1. **Fork** the repository and create a feature branch from `main`.
2. **Make your changes** following the style guide below.
3. **Test locally** — preview the affected layout with a real agent if possible.
4. **Open a PR** with a clear description of what changed and why.
5. **Respond to review** — keep the conversation constructive.

### Before You Open

- [ ] Changes tested with at least one AI agent (any from the "Works with" list)
- [ ] New `memory/` entries cross-linked from `AGENTS.md`
- [ ] New layouts registered in `AGENTS.md` layout decision table
- [ ] Python scripts still pass a smoke test (`python scripts/optimize_assets.py` with dummy assets)
- [ ] No secrets, API keys, or personal data committed

## Style Guide

### Markdown Files

- **Headings**: sentence case, no trailing periods
- **Code**: use fenced code blocks with language identifiers
- **Filenames**: reference them with backticks, relative to project root
- **Memory files**: number sequentially, use descriptive slug after number (e.g., `06-media-pipeline-qwen.md`)

### HTML Templates

- **Single file**: all CSS in `<style>`, all JS in `<script>`, no external files except CDNs
- **Placeholders**: use `{{PLACEHOLDER_NAME}}` with a default value after the pipe: `{{LANG|ar}}`
- **Sections**: give each `<section>` a unique `id`, `data-ambient` color, and `data-glow` value
- **Comments**: minimal — only structural block comments (section separators)
- **Indent**: consistent with existing templates (2 spaces in HTML, 2 spaces in CSS)

### Python Scripts

- **Python 3.8+** compatible (match the minimum in README)
- **CLI-friendly**: argparse for arguments, sensible defaults
- **No ffmpeg/jq** dependencies — use `opencv-python` and pure Python instead
- **Guard empty inputs**: check for 0-frame mp4s before processing

### Commit Messages

- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- Reference the affected area: `docs(memory): add gotcha for Safari autoplay`
- Keep subject line under 72 characters

## Reporting Issues

### Security Vulnerabilities

**Do NOT open a public issue.** Email **development@alwkala.com** directly with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

We will acknowledge receipt within 48 hours and work toward a fix.

### General Issues

Use the [GitHub issue tracker](https://github.com/TidyFactor/Cinematic/issues) for bugs, feature requests, and questions. Label your issue appropriately:
- `bug` — something is broken
- `gotcha` — a new pitfall to add to `memory/`
- `layout` — new layout template or layout fix
- `pipeline` — asset generation or script improvement
- `docs` — documentation improvement
- `question` — asking for help

---

**Thanks for helping make cinematic landing pages less wrong, for everyone.**
