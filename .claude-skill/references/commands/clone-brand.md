# Command: `clone-brand` — Extract `brand.json` From an Existing Identity

## Purpose
`brand` (the command) scaffolds `brand.json` from a brief or template
defaults. `clone-brand` is for when an identity already exists — a live
site, a brand guideline PDF, a logo and reference photos — and re-typing
tokens by hand from memory risks drifting from the real brand. This command
extracts and proposes; `brand` still owns validating and applying the result.

## When to run it
- The user provides a URL, brand guideline PDF, or existing site to match
  ("build this in the style of our current site", "match our existing
  brand", "here's our brand guideline PDF").
- `convert` is retrofitting an existing page and its current styling should
  inform (not necessarily survive as-is, but inform) the new `brand.json`.
- User phrasing: "extract our brand", "clone the brand from [url]",
  `clone-brand`.

## What it does
Follow `memory/15-brand-extraction.md`'s extraction table and procedure:
1. Confirm the source (URL to inspect, or uploaded files).
2. Extract candidate `colors.*`, `typography.families.*`, `voice.tone`/
   `doNotUse`, `identity.logo.*`, and `localization.*` tokens per the source
   priority in `memory/15-brand-extraction.md`.
3. Route any extracted Arabic typography choice through
   `memory/12-arabic-typography.md`'s clean/no-Amiri constraint — a source
   site's font is not exempt from that hard constraint just because it's
   "the real brand font."
4. Explicitly flag anything not extractable (media provider, non-Google
   licensed fonts, layout structure) rather than fabricating a value.
5. **Present the draft `brand.json` back to the user for confirmation**
   before writing it — every extracted value is inference from a rendered
   page or PDF, not verified ground truth.
6. On confirmation, write `brand.json` and hand off to `brand` (command) for
   the standard field-completeness validation.

## Output convention
```
project-root/
  brand.json     ← written only after user confirms the extracted draft
```

## Checklist
Same as `memory/15-brand-extraction.md`:
- [ ] Every extracted token's source is stated, nothing presented as certain
      when it was inferred
- [ ] Non-Google fonts in the source are flagged, not silently substituted
- [ ] Arabic typography choice passes the clean/no-Amiri constraint even if
      the source site itself uses a calligraphic face
- [ ] Draft confirmed by the user before `brand.json` is written
- [ ] Layout structure and literal copy were not carried over — tokens only
