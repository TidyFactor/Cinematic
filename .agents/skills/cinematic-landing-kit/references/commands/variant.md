# Command: `variant` — A/B Page From an Already-Built Project

## Purpose
Produce a second HTML file from an already-built project — a different
palette, headline angle, or CTA — reusing the engine and (where possible)
the generated media assets, instead of re-running `init` from scratch and
paying for new media generation that isn't actually needed.

## When to run it
- The project already has a working `index.html` built by this kit.
- User phrasing: "make an A/B variant", "try a warmer palette version",
  "test a different headline", `variant`.
- Explicitly **not** for a genuinely different product — that's a new `init`.

## What it does
Follow `memory/16-variants.md`'s cheap/expensive distinction and procedure:
1. Confirm exactly what should vary — specific `brand.json` fields, specific
   copy sections, or (rarely) a layout swap. Don't assume "make a variant"
   means regenerating everything.
2. Classify the request: does it stay in the "cheap" column (palette, copy,
   CTA — no new media) or does it touch the "expensive" column (different
   subject, different story arc, provider switch)? If expensive, confirm
   explicitly before triggering `media` again.
3. Reuse `assets/seq/` and the hero cutout unmodified when the story arc is
   unchanged.
4. Copy the base `index.html` to a new file with a name agreed with the
   user; apply only the confirmed differences.
5. Run the same verification any build gets — `memory/09-quality-bar.md`
   and `memory/11-brand-json.md` checklists — on the variant file, not just
   a diff against the base.

## Output convention
```
project-root/
  index.html          ← base, unchanged
  index-<variant>.html ← new file, differences only
  assets/seq/          ← shared, not duplicated, unless story arc changed
```

## Checklist
Same as `memory/16-variants.md`:
- [ ] Reused media assets where the story arc didn't change
- [ ] Only confirmed-different tokens/copy actually differ from the base
- [ ] Variant passes the same quality-bar and brand.json checklists as any
      build
- [ ] File naming agreed with the user, not assumed
- [ ] This kit does not wire traffic-splitting/analytics — confirmed out of
      scope if the user expected that
