# Command: `film` — Canvas Frame-Sequence & Scroll Sync

## Purpose
Build (or re-sync) the scroll-driven "film" — the single most important
technique in this track, and the one `memory/09-quality-bar.md` auto-rejects
most often when done wrong. Isolated as its own command because a
`FRAME_COUNT` drift is a common, narrow bug that shouldn't require touching
layout or media generation to fix.

## When to run it
- After `media` produces a new/updated frame sequence.
- The scroll film feels janky, stutters, or drops frames.
- User phrasing: "the scroll animation is choppy", "sync the frame count",
  "fix the film", `film`.

## What it does
1. **Never** scrub `video.currentTime` — confirm the page draws frames onto
   `<canvas>`, not a `<video>` element seeking by time.
2. Preload all frames into an `Image[]` array; show a % preloader; promote
   to "ready" at ~60% loaded OR all-settled, with a ~9s safety timeout so a
   stalled frame can't hang the page. If 0 frames load, fall back to a
   static still rather than a blank canvas.
3. Scrub with a single ScrollTrigger keyed to scroll progress — drive frame
   index as `Math.floor(progress * (FRAME_COUNT - 1))`, drawn via
   `ctx.drawImage`.
4. **Sync `FRAME_COUNT`** in `index.html` to the actual extracted frame
   count (typical: 4 clips × 24 frames − 3 duplicated boundary frames = 93).
   Applies to `film` (`fullbleed`), `story` (`editorial`), `space` (`spatial`), `app` (`interface`), `product` — **not** `creator` (`minimal`) or `store` (no canvas film).
5. Confirm hidden-tab behavior doesn't corrupt state: `requestAnimationFrame`
   pauses when `document.hidden === true` — this is expected OS behavior,
   not a bug to "fix" (see `memory/08-preview-and-env-gotchas.md`).

## Output convention
```
index.html
  <script> const FRAME_COUNT = 93; </script>   ← must equal assets/seq/ file count
```

## Checklist
- [ ] No `video.currentTime` scrubbing anywhere in the page
- [ ] `FRAME_COUNT` matches `ls assets/seq/ | wc -l` exactly
- [ ] Preloader has both a completion threshold and a safety timeout
- [ ] Scroll driven via one ScrollTrigger, positioned by pixel range
      (`st.start + progress * (st.end - st.start)`), not `offsetTop`
