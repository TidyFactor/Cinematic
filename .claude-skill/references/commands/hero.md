# Command: `hero` — The First-Impression Entrance

## Purpose
The top of the page decides everything — `memory/09-quality-bar.md` calls a
static-image-plus-fade the single most common rejection reason. This command
owns that entrance in isolation so it can be iterated hardest without
touching the rest of the build.

## When to run it
- Layout scaffolded (`init`) but the hero still reads as "just another
  website" — no entrance motion, no depth.
- User phrasing: "make the hero feel alive", "fix the opening", `hero`.

## What it does
1. **Layout-specific hero treatment** — never mix these:
   - `film` (`fullbleed`) / `story` (`editorial`) / `creator` (`minimal`) / `product`: transparent PNG cutout
     (`rembg` output from `media`), composited with a soft `drop-shadow`.
     **Never `mix-blend-mode`** on this element — it breaks the moment GSAP
     transforms it (new stacking context blends against white/black instead
     of the page).
   - `space` (`spatial`) / `store`: full-bleed establishing shot or store banner, no cutout needed.
   - `app` (`interface`): CSS device-mockup frame, no cutout needed.
2. Build the layer structure so each owns one transform channel (no
   conflicts): `.stage` (perspective) → `.aura` (gold radial light, CSS
   entrance + slow pulse + pointer parallax) → `.motes` (~8 drifting
   particles, CSS keyframes, varied delay/size) → `.hero-inner` (eyebrow,
   title, sub, CTAs).
3. Add continuous life, not a one-shot entrance: pointer-driven depth/tilt,
   a subtle sheen sweep, the aura's slow pulse — the hero must flow into the
   film below as one journey, not stop after the first animation.
4. Preserve exact product identity across the cutout and every later asset
   (`memory/07`).

## Output convention
```
index.html
  .stage / .aura / .motes / .hero-inner   ← nested wrappers, one transform channel each
assets/hero-cutout.png
```

## Checklist
- [ ] No `mix-blend-mode` on any element GSAP transforms
- [ ] Hero has continuous motion (pulse/parallax/sheen), not a one-shot
      fade-in
- [ ] Correct treatment for the chosen layout (cutout vs establishing shot
      vs device mockup) — not mixed
- [ ] Product identity in the hero matches every other generated asset
