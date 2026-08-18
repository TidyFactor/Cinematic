# 13 · Performance Budget

`scripts/optimize_assets.py` already resizes the hero cutout and logo. This
file is the missing piece: an explicit, checkable budget so "optimized"
means a number, not a feeling.

## Budgets (per project, not per asset)

| Asset class | Budget | Why |
|---|---|---|
| Total frame sequence (`assets/seq/*.jpg`) | ≤ 6 MB for ~90–120 frames | Frames stream in as the user scrolls; this is the single biggest payload on the page |
| Single frame JPG | ≤ 60 KB at 1280px wide, q≈80 | Matches the `memory/01-build-playbook.md` extraction spec — a heavier single frame usually means the source clip wasn't downscaled before extraction |
| Hero cutout PNG | ≤ 400 KB after `optimize_assets.py` (max 1200px) | Transparent PNGs compress poorly; resize before optimizing, not instead of |
| Logo PNG | ≤ 40 KB (max 240px) | |
| Google Fonts payload | ≤ 3 families, ≤ 4 weights total across the page | See `memory/12-arabic-typography.md` — load only families actually referenced in CSS |
| CDN scripts (GSAP + ScrollTrigger + Lenis + Tailwind) | Fixed — these are the locked engine, not counted against the budget | Don't add a second animation or scroll library on top of them |

## What to check

1. **Frame count vs `FRAME_COUNT`.** A mismatch here isn't just a bug (see
   `memory/08-preview-and-env-gotchas.md`) — extra unused frames are wasted
   payload, and a short count means the film degrades to a static freeze
   before scroll ends.
2. **Sum the `assets/seq/` directory.** If over budget, the fix is fewer
   frames or lower JPEG quality — never lowering canvas render resolution
   (that's a visual-quality regression, checked separately in
   `memory/09-quality-bar.md`).
3. **`<link rel="preconnect">` present** for `fonts.googleapis.com` and
   `fonts.gstatic.com` (and the CDN script origins) — connection setup, not
   asset weight, but it's the cheapest win on this list.
4. **No duplicate/unused CDN `<script>` tags** left over from a `convert`
   run (e.g. a leftover jQuery or animation library from the source page).
5. **Lazy-load anything below the fold that isn't the film itself** — hero
   assets and above-the-fold film frames load eager; everything else
   (testimonial images, footer logos) gets `loading="lazy"`.

## Output convention

Report as a table, not a pass/fail line — the number matters more than the
verdict:

```
Frame sequence: 4.2 MB / 6 MB budget   ✅
Hero cutout:     340 KB / 400 KB       ✅
Fonts:           2 families, 3 weights ✅
```

## Checklist
- [ ] `assets/seq/` total size stated and under budget (or over-budget flagged
      with the specific cause: frame count, JPEG quality, or source resolution)
- [ ] Hero cutout and logo sizes stated against their budgets
- [ ] Font `<link>` loads only in-use families/weights
- [ ] `preconnect` present for font and CDN origins
- [ ] No dead `<script>`/`<link>` tags from a `convert` source page
