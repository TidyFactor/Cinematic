# TidyFactor Cinematic — Workflow Discipline

Applies underneath every command in `commands/`.

## 1. Audit
- Check for `brand.json` at the project root first — its presence/absence
  changes every later step (see `memory/11-brand-json.md` load order).
- Map the file tree against the locked engine shape: is there an
  `index.html` already? An `assets/seq/` frame sequence? A `templates/`
  layout choice already made?
- Report findings and the proposed changes.
- **Stop for confirmation** before generating paid-API media calls
  (`qwen`/`higgsfield`), unless told to proceed automatically — `nanobanana`
  calls don't need this pause since there's no external billing.

## 2. Execute in batches
- One command/concern at a time — brand tokens first (`brand`/`clone-brand`),
  then layout scaffold, then media, then film sync, then polish
  (hero/theme/typeface/transitions), then i18n, then perf/a11y, then deploy.
- Generate keyframe images in parallel where the provider allows it; never
  start clip generation before keyframes are verified.
- Never touch two layout templates in the same pass — one layout per
  project, chosen once in Step 0/`init`.

## 3. Verify
- Serve locally (`python -m http.server 8123` or `npx serve`) and check in a
  **visible** browser tab — hidden tabs pause `requestAnimationFrame` and
  will produce false failure reports.
- Run both checklists: the cinematic verification (memory/09) and the
  brand.json verification (memory/11) — they check different things and
  both must pass.
- Report: which checklist items pass/fail, `FRAME_COUNT` vs actual extracted
  frames, and any hardcoded hex/font that slipped past brand.json overrides.

## Mode-specific notes

**Init** — audit step is replaced by Step 0's answers (product, reference
photos, brand.json if present). Layout choice and provider choice happen
here, once, and aren't re-litigated mid-build.

**Convert** — audit the *source* (existing static page, a different
landing-page generator's output, or a design mockup) before proposing the
target layout. Converting an existing page's sections onto one of the five
fixed layouts still means fitting into that layout's shape — flag (don't
silently drop) any source section that doesn't fit `fullbleed` /
`editorial` / `spatial` / `interface` / `minimal`, and confirm with the user
whether it becomes an extra section within the chosen layout or is cut.

**Improve** — audit is the primary deliverable if the user just wants a
report; only move to execute once they confirm which findings to act on.
Always run the `memory/09-quality-bar.md` auto-reject checklist regardless
of what was asked — visual-quality regressions don't wait to be requested,
same principle as `secure` on the PHP tracks.
