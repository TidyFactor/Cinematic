# Command: `perf` — Performance Budget Check

## Purpose
Turn "optimized" from a feeling into a number. `scripts/optimize_assets.py`
resizes assets; this command verifies the *result* against explicit budgets
and reports where the page stands, catching the case where optimization ran
but the source frame count or font list was already over budget going in.

## When to run it
- Always, as part of `deploy` (Phase 3) — never skip it silently even when
  the build "feels fast."
- User phrasing: "is this too heavy", "check page speed", "optimize
  loading", `perf`.
- After any `media` re-run that changes frame count or asset resolution.

## What it does
1. Sum `assets/seq/*.jpg` total size and per-frame average; compare against
   the frame-sequence and per-frame budgets in
   `memory/13-performance-budget.md`.
2. Check hero cutout and logo file sizes against their budgets (post
   `optimize_assets.py`, not pre-optimization).
3. Count Google Fonts families and weights actually referenced in the
   `<head>` `<link>` versus what's declared in CSS — flag any loaded-but-
   unused weight.
4. Confirm `<link rel="preconnect">` exists for font and CDN script origins.
5. Scan for dead `<script>`/`<link>` tags — common after a `convert` run
   that didn't fully strip the source page's own dependencies.
6. Confirm below-the-fold non-film images use `loading="lazy"`.
7. Report every number against its budget — don't just say "looks good."

## Output convention
```
Performance report
  Frame sequence:  4.2 MB / 6 MB      ✅
  Per-frame avg:   38 KB / 60 KB      ✅
  Hero cutout:     340 KB / 400 KB    ✅
  Logo:            22 KB / 40 KB      ✅
  Fonts:           2 families, 3 weights  ✅
  Preconnect:      present            ✅
  Dead tags:       none found         ✅
```

## Checklist
- [ ] Every budget line in `memory/13-performance-budget.md` reported with
      an actual number, not a pass/fail-only verdict
- [ ] Any over-budget item names the specific cause (frame count / JPEG
      quality / source resolution / unused font weight)
- [ ] Preconnect present for font and CDN origins
- [ ] No dead `<script>`/`<link>` tags remain from a `convert` source
- [ ] Below-the-fold images confirmed lazy-loaded
