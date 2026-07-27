# Command: `convert` — Retrofit an Existing Page onto the Engine

## Purpose
Bring an existing static landing page, a different generator's output, or a
client-supplied design onto the cinematic engine. This is the lifecycle mode
the original AGENTS.md flow didn't cover — that flow only ever built fresh
(`init`). Every other TidyFactor track ships Init/Convert/Improve; this
command is what completes the set here.

## When to run it
- The user has an existing page (any stack — plain HTML, WordPress export, a
  page-builder output) and wants the scroll-driven cinematic treatment
  applied to it, not a from-scratch rebuild.
- User phrasing: "turn this into a cinematic page", "give our current
  landing page the Apple treatment", "convert this to the cinematic kit",
  `convert`.

## What it does
1. **Audit the source first** (per `references/workflow.md`): identify what
   it actually has — hero image, feature sections, specs, testimonials,
   footer/CTA — before proposing a target shape. Don't assume; read it.
2. **Map source sections onto one of the seven fixed layouts**
   (`memory/10-use-cases.md`) — the target is one of `film` (`fullbleed`),
   `story` (`editorial`), `space` (`spatial`), `app` (`interface`), `creator` (`minimal`),
   `product`, or `store`, chosen by the same use-case fit test as `init`.
3. **Flag, don't silently drop**, any source section that doesn't fit the
   chosen layout's shape (e.g. a pricing table on a `fullbleed` transformation
   story). Confirm with the user whether it becomes an extra section within
   the layout, moves to a follow-up page, or is cut.
4. Extract whatever's reusable: existing copy → run through `voice.*` rules
   if brand.json exists; existing product photography → source material for
   `media`'s keyframe prompts (a re-shoot is not always necessary if the
   source photos boundary-match well enough).
5. Hand off into the normal Phase 1→3 sequence (`brand` → `media`/`film`/
   `hero`/`theme`/`transitions` → `i18n`/`deploy`) once the target shape is
   agreed — `convert` itself doesn't build the film, it decides what gets
   built.
6. Treat the source page as reference material, not a file to edit in place
   — the deliverable is still one fresh `index.html` on the cinematic
   engine, not the old file patched with GSAP.

## Output convention
```
project-root/
  index.html.bak         ← original page, kept for reference/rollback
  index.html             ← rebuilt on the cinematic engine
```

## Checklist
- [ ] Source page audited and its sections inventoried before layout choice
- [ ] Layout chosen via the same use-case fit test as `init`, not invented
- [ ] Every source section explicitly kept, folded in, or cut — none
      silently dropped
- [ ] Original page preserved (not overwritten in place) until the new one
      is verified
