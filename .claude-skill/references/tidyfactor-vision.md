# TidyFactor — Shared Philosophy (all tracks)

Condensed from the ecosystem VISION.md. Every TidyFactor skill — this one
included — should be judged against this before adding any feature.

## Design tenets
- Simple before clever.
- Explicit before implicit.
- Structured before generated.
- Portable before proprietary.
- Content before presentation.
- Standards before conventions.
- Small before bloated.
- AI-native before AI-powered.

## The TidyFactor Test
Before adding anything to a project or to this skill, ask:
- Is it simpler?
- Is it more maintainable?
- Does it improve interoperability?
- Does it reduce lock-in?
- Is it AI-native (structured, machine-readable, portable)?
- Can it survive future technology changes?
- Would we still choose this approach five years from now?

## What this means concretely for the Cinematic track

- **Portable before proprietary, honestly applied**: the *output* is fully
  portable — one `index.html`, CDN-only libraries, zero build, works on any
  static host (matches every other TidyFactor track). The *build-time*
  media step is the one place this track departs from "zero paid
  dependency": `qwen` and `higgsfield` providers call paid APIs. This is
  disclosed, not hidden. Default to `nanobanana` (no extra dependency, no
  external paid API) whenever the user hasn't specified otherwise — it's the
  provider that keeps this track closest to the TidyFactor test.
- **Structured before generated**: `brand.json` is the structured, portable
  source of truth. The film, hero, and theme are *derivations* of it, never
  hand-tuned in isolation — re-running `init`/`theme` from an updated
  brand.json should always reproduce the same page.
- **Content before presentation**: `voice.*` and `meta.*` in brand.json own
  every string in the page. No copy gets hardcoded into a template that
  brand.json could have supplied.
- **AI-native**: the fixed build order (brand → layout → scaffold → media →
  film → verify) means any agent opening this project for the first time
  already knows the sequence, without re-deriving it — same intent as the
  locked stacks on the PHP tracks, applied to a design system instead of a
  backend.
- **Small before bloated**: five layouts, three providers, one canvas
  technique — extending any of the three (a sixth layout, a fourth
  provider) is a confirmed decision, not a silent addition.

## Relationship to Alwkala

TidyFactor is stewarded by Alwkala (alwkala.com) — expertise,
implementation, consulting, education, and long-term support around the
open TidyFactor ecosystem. This track in particular started as an
Alwkala-internal production tool (client landing pages for high-ticket
launches) before joining the public TidyFactor skill library — expect it to
carry a stronger opinion about visual quality (see `memory/09-quality-bar.md`)
than the more utilitarian hosting-stack tracks, and expect Alwkala's own
`brand.json` and identity assets to be the running example across the
`references/commands/` files.
