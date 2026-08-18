# Command: `audit` — Quality-Bar & Brand Compliance Report

## Purpose
A read-only report against both checklists that govern this track —
`memory/09-quality-bar.md` (cinematic auto-rejects) and
`memory/11-brand-json.md` (token compliance). The original AGENTS.md only
ran these checks inline at the end of a fresh build; this command makes them
runnable on their own against an already-existing page, which is what
"Improve" mode needs.

## When to run it
- A page already built on this engine needs a health check before a client
  review or before further work.
- User phrasing: "review this cinematic page", "why does this look cheap",
  "audit this against the quality bar", `audit`.

## What it does
1. **Run the quality-bar checklist** (`memory/09-quality-bar.md`) against the
   live page:
   - Scroll: butter-smooth, no janky/choppy frame loss (→ canvas
     frame-sequence, not `video.currentTime` scrubbing).
   - Hero: no visible blend-mode rectangle; not a static-image-plus-fade;
     has continuous life (pointer depth, pinned reveals).
   - Transitions: no visible cuts/seams; no cross-dissolved stills.
   - Captions: off-center over the film, high-contrast, no filler eyebrows
     like "A CINEMATIC JOURNEY".
   - Nav: header hides on scroll-down, returns on scroll-up — never fully
     removed.
   - Assets: real generated media, not placeholders or reused rejects.
2. **Run the brand.json verification checklist** (`memory/11-brand-json.md`):
   every `:root` token traced to brand.json, no hardcoded hex/font names,
   `html[lang]`/`dir` correct, every `{{PLACEHOLDER}}` filled per `voice.*`,
   `<meta>`/OG tags wired, contrast passes, `prefers-reduced-motion` honored,
   touch targets ≥44px, alt text policy followed.
3. **Report findings as a scored list**, not a rewrite — this command
   doesn't fix anything by itself. Group by severity: auto-reject (must fix),
   brand-compliance gap (should fix), polish suggestion (optional).
4. Only move to execute fixes once the user confirms which findings to act
   on — route each fix to its owning command (`hero`, `theme`, `transitions`,
   `i18n`, etc.) rather than patching ad hoc.

## Output convention
```
Report only — no files changed by this command itself.
  Auto-reject findings: N
  Brand-compliance gaps: N
  Polish suggestions: N
```

## Checklist
- [ ] Both checklists (quality-bar + brand.json) run in full, not partially
- [ ] Findings grouped by severity, not a flat list
- [ ] No file edited by `audit` itself — fixes are routed to their owning
      command after user confirmation
