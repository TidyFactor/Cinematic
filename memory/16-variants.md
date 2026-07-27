# 16 · Variants (A/B pages from one built project)

Reference for the `variant` command: producing a second page from an
already-built project that shares the engine and (usually) the media assets,
but differs on specific `brand.json` tokens, copy angle, or layout choice —
without re-running the full asset pipeline from scratch.

## What can vary between `index.html` and `index-variant-b.html`

| Cheap to vary (no new media generation) | Expensive to vary (triggers `media` again) |
|---|---|
| `brand.json` color tokens (light/dark palette swap) | Different product photography subject |
| `voice.tone` / headline copy | A layout that needs a different hero treatment (e.g. `film` → `space`) |
| CTA wording/placement | A materially different story arc (different film beats) |
| Layout choice **within the same use-case's compatible set** (rare — most use-cases route to one layout in `memory/10-use-cases.md`) | Provider switch (`nanobanana` → `qwen`) mid-project |

Default to the cheap column. If the requested variant needs the expensive
column, say so explicitly and confirm before re-running `media` — that's a
new asset-generation cost, not a free variant.

## Procedure

1. Confirm what's actually varying — pull the specific `brand.json` fields
   or copy sections from the user, don't assume "make a variant" means
   everything changes.
2. **Reuse the existing `assets/seq/` frame sequence and hero cutout** unless
   the variant explicitly changes the subject or story arc. Point the new
   HTML file at the same `assets/` directory — don't duplicate binary assets
   per variant.
3. Copy the base `index.html` to a distinct file (e.g. `index-b.html`,
   `variant-warm.html` — agree the naming with the user, this kit doesn't
   prescribe an A/B testing framework or traffic-splitting mechanism).
4. Apply only the confirmed differences — swapped CSS variable values,
   changed copy strings, or (if in scope) a different `templates/layouts/`
   scaffold reusing the same brand tokens.
5. Run the same verification as any build: `memory/09-quality-bar.md` +
   `memory/11-brand-json.md` checklists, on the variant file specifically —
   a variant is a full build for verification purposes, not a shortcut that
   skips checks.

## What this command does not do

- No traffic-splitting, analytics wiring, or statistical significance
  tooling — this kit stays a static-output engine (`references/tidyfactor-vision.md`:
  "Portable before proprietary"). The user's own hosting/analytics stack
  owns the actual A/B mechanics; `variant` only produces the second HTML file.
- Not for unrelated pages — two genuinely different products are two
  separate `init` runs, not a `variant` of each other.

## Checklist
- [ ] Reused `assets/seq/`/cutout where the story arc didn't change (no
      redundant media generation)
- [ ] Only the confirmed-different tokens/copy actually differ from the base
      file — everything else matches byte-for-byte where possible
- [ ] Variant file passes the same quality-bar and brand.json checklists as
      any build
- [ ] Naming convention for the variant file agreed with the user, not
      assumed
