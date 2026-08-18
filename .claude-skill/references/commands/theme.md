# Command: `theme` — Light/Dark Palette & the Blend Trap

## Purpose
Decide and apply the color system — separate from `brand` because `brand`
establishes the *tokens*, while `theme` decides *which* theme (light/dark)
fits this product and derives the palette variants brand.json doesn't ship
(gold-deep, gold-bright, ambient tween start).

## When to run it
- After `brand` (tokens available) and before/alongside `hero` (the theme
  decides the blend strategy the hero must NOT use).
- The product pops the wrong way (looks washed out, or the hero has a
  visible rectangle around it).
- User phrasing: "switch to dark mode", "the colors feel off", `theme`.

## What it does
1. **Decide light vs dark from the reference photography**, not by default:
   - Dark luxury (espresso/black grounds, dramatic light) → product pops via
     `mix-blend-mode: screen` on **static, non-transformed** shots only.
   - Light gallery (warm ivory/sand, soft daylight) → pops via
     `mix-blend-mode: multiply` on static shots only.
   - White-on-white "art object" photography → light is usually correct.
2. **The blend trap**: `mix-blend-mode` breaks on any element GSAP
   transforms — symptom is a sharp light/dark rectangle where the image
   should vanish into the background. Fix: reserve blend modes for static
   shots; anything animated (especially the hero) uses a transparent cutout
   instead (see `hero` command).
3. **Derive the variants** brand.json doesn't define: `--gold-deep` (darken
   `primary` 15%), `--gold-bright` (lighten `primary` 12%) — via
   `color-mix()` in CSS or the `colorsys` recipe in `memory/11-brand-json.md`.
4. Set the `--ambient` starting value (background color) that the
   section-scroll GSAP tween shifts from.
5. Verify the `gold-text` gradient (`--gold-bright → --gold → --gold-deep`)
   passes WCAG AA (4.5:1) against the section background per
   `colors.contrastPolicy`; swap toward `--gold-deep`/`--gold-bright` on that
   section if it fails.

## Output convention
```
index.html
  :root{ --paper; --ink; --gold; --gold-deep; --gold-bright; --ambient; ... }
```

## Checklist
- [ ] Theme choice (light/dark) justified by the reference photography, not
      assumed
- [ ] `mix-blend-mode` used only on non-transformed elements
- [ ] `--gold-deep`/`--gold-bright` derived from `colors.primary`, not
      invented
- [ ] `gold-text` gradient passes contrast check against the section
      background in the chosen theme
