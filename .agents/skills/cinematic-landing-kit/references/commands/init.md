# Command: `init` — Full Cinematic Page, One Pass

## Purpose
The primary deliverable: a complete scroll-driven cinematic landing page for
a product, from brief + reference photos to a served, verified `index.html`.
This is the only command that runs the full build order end-to-end in one go
— every other command is a focused re-entry point into one stage of it.

## When to run it
- No project exists yet on this engine — a brand-new product needs a page.
- User phrasing: "build a cinematic landing page for X", "make this feel
  like an Apple ad", "صفحة هبوط سينمائية لمنتج جديد".

## What it does
1. **Read `brand.json`** at the project root if present (see `brand`
   command) — single source of truth for the rest of this run. Absent →
   flag it, offer to scaffold one, and fall back to the warm-gold/El
   Messiri/Tajawal defaults if declined.
2. **Decide direction**: theme (light/dark from `colors.light` vs
   `colors.dark`), story beats, voice register — from the product + brand.json,
   not by asking unless genuinely blocked.
3. **Choose a layout** from `templates/layouts/` via `memory/10-use-cases.md`
   routing: `film` (`fullbleed`), `story` (`editorial`), `space` (`spatial`),
   `app` (`interface`), `creator` (`minimal`), `product` (single product e-commerce),
   `store` (multi-product catalog store).
4. **Scaffold**: copy the chosen template to `index.html`, override `:root`
   tokens per `memory/11-brand-json.md`'s mapping, wire `<meta>`/favicon/logo,
   fill every `{{PLACEHOLDER}}` per `voice.*`.
5. **Write the media prompt list** from `templates/MEDIA-PROMPTS-<provider>.template.md`
   matching `brand.json`'s `mediaProvider` (default `nanobanana`) — see
   `media` command.
6. **Generate assets** — see `media` command.
7. **Sync `FRAME_COUNT`** — see `film` command. Skip for `minimal`.
8. **Preview & verify** both checklists (`memory/09`, `memory/11`) — see
   `deploy` command.

## Output convention
```
project-root/
  brand.json           (read, not written, unless scaffolded fresh)
  index.html            ← the deliverable
  assets/
    seq/f000.jpg … fNNN.jpg
    hero-cutout.png
    og-default.png
  MEDIA-PROMPTS.md      (filled from the provider template)
```

## Checklist
- [ ] Layout choice matches `memory/10-use-cases.md` routing for this product
- [ ] Every `:root` token traced to brand.json (or explicitly flagged as
      fallback-default)
- [ ] No `{{PLACEHOLDER}}` left unfilled
- [ ] `FRAME_COUNT` matches actual extracted frame count (skip for `minimal`)
- [ ] Served and verified in a visible browser tab per `references/workflow.md`
