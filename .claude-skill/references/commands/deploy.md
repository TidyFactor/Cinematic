# Command: `deploy` — Preview, Optimize, Export

## Purpose
The last step in every sequence: verify the page actually behaves correctly
in a browser, optimize heavy assets, and hand off a static bundle any host
can serve — no build step, no server runtime, matching the zero-dependency
output every TidyFactor track promises regardless of what the build step
needed.

## When to run it
- Always last, after `i18n`, in a full Init/Convert sequence.
- User phrasing: "get this ready to ship", "optimize the assets", "preview
  it", `deploy`.

## What it does
1. **Serve locally**: `python -m http.server 8123` or `npx -y serve -l 8123 .`
   (config in `templates/launch.json`). Open in a **visible** browser tab —
   backgrounded tabs pause `requestAnimationFrame`, which freezes GSAP tweens
   and makes screenshot-based verification hang or lie.
2. **Verify programmatically**, not just visually:
   - `eval` in the page: DOM structure, `getComputedStyle`, console errors.
   - Force end-states: `gsap.set('.elem', {...})` to confirm layout without
     waiting on scroll.
   - Drive scroll: `window.lenis.scrollTo(y, {immediate:true, force:true});
     ScrollTrigger.update();` — plain `window.scrollTo` doesn't update
     ScrollTrigger when Lenis owns scroll.
3. **Optimize heavy assets** via `scripts/optimize_assets.py`: resize hero
   cutout to max 1200px, logo to max 240px; `scripts/prepare_images.py` for
   PNG → JPEG q=87 web conversion.
4. **Confirm graceful fallbacks**: `prefers-reduced-motion` disables
   scroll-driven effects and parallax, keeping only opacity/color
   transitions; missing-asset fallback is a gradient on the *container*, not
   `::after` on `<img>` (`::after` doesn't render on replaced elements).
5. **Run `perf`** (`references/commands/perf.md`) — asset/frame/font budget
   check. Not optional; report the numbers even if everything is under
   budget.
6. **Run `a11y`** (`references/commands/a11y.md`) — canvas alt-text,
   contrast, focus, keyboard-scroll pass. Same rule: always run, always
   report.
7. **Export**: the deliverable is `index.html` + `assets/` — no bundler, no
   framework, no server process required. Confirm it runs identically from a
   plain static host (matches the same static-hosting story as
   `tidyfactor-html`).

## Output convention
```
project-root/
  index.html
  assets/            ← optimized, web-ready
  templates/launch.json   (preview server config, not shipped to the host)
```

## Checklist
- [ ] Verified in a visible browser tab, not a hidden/backgrounded one
- [ ] Scroll driven and confirmed via Lenis + `ScrollTrigger.update()`, not
      raw `window.scrollTo`
- [ ] Hero cutout ≤1200px, logo ≤240px, images web-optimized
- [ ] `prefers-reduced-motion` and missing-asset fallback both confirmed
      working
- [ ] `perf` run, budget numbers reported (`memory/13-performance-budget.md`)
- [ ] `a11y` run, checklist reported (`memory/14-accessibility.md`)
- [ ] Runs correctly served as plain static files, no build step
