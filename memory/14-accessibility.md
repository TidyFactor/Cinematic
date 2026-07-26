# 14 · Accessibility

`prefers-reduced-motion` is already a non-negotiable in the locked engine
(`SKILL.md` hard constraints). This file covers everything else that a
scroll-hijacked, canvas-driven, image-heavy page tends to break by default.

## What a cinematic build breaks if you don't check for it

1. **Canvas film has no text alternative.** The `<canvas>` element carries
   the product story visually with nothing for a screen reader to announce.
   Add an `aria-label` on the canvas's container summarizing the arc in one
   sentence (not a frame-by-frame description), and mark the canvas itself
   `aria-hidden="true"` so screen readers don't attempt to read pixel data.
2. **Scroll-triggered reveals can hide real content from assistive tech.**
   Any section that starts at `opacity:0` for its GSAP entrance must not
   also be `display:none`/`visibility:hidden` before the trigger fires — a
   screen reader or keyboard user who skips animation should still reach the
   content, not a blank region.
3. **Color contrast**, not just brand-token compliance. `memory/11-brand-json.md`
   already has a contrast-pass checklist item for hardcoded-hex avoidance —
   this one is the actual number: body text ≥ 4.5:1 against its background,
   large display text (≥24px or ≥19px bold) ≥ 3:1. Check both the light and
   dark palette from `brand.json`, not just whichever the demo happened to
   preview in.
4. **Every meaningful image needs `alt`.** Hero cutout, logo, and any static
   (non-film) product images get real `alt` text describing the product, not
   the filename and not empty `alt=""` unless the image is genuinely
   decorative (e.g. an ambient particle graphic).
5. **Keyboard scroll must still work.** Lenis smooth-scroll sometimes
   intercepts scroll in a way that breaks keyboard `Page Down`/arrow-key
   scrolling — verify a keyboard-only pass reaches the bottom of the page,
   not just a mouse-wheel pass.
6. **Focus states survive the custom styling.** CTA buttons and nav links
   need a visible focus ring — Tailwind's default outline is often removed
   for aesthetic reasons on luxury pages; if removed, it must be replaced
   with an equally visible custom one, never dropped silently.
7. **Header hide-on-scroll (`memory/01-build-playbook.md`) doesn't trap
   keyboard focus** inside a hidden header — if a nav link is focused when
   the header hides, focus must not become invisible/unreachable.

## What this does NOT ask for

Not a full WCAG audit tool integration — this is the auto-reject-style
checklist for the specific ways *this kit's* techniques (canvas film,
scroll-hijack reveals, custom focus styling) tend to fail, matching the
scope of `memory/09-quality-bar.md`.

## Checklist
- [ ] Canvas container has a one-sentence `aria-label`; canvas itself is
      `aria-hidden="true"`
- [ ] No section is `display:none`/`visibility:hidden` pre-trigger (opacity
      only)
- [ ] Body and display text pass contrast minimums in both light and dark
      palettes
- [ ] Every non-decorative image has real `alt` text
- [ ] Keyboard-only scroll (`Page Down`/arrows) reaches the page bottom
- [ ] Visible focus ring on every interactive element, including CTAs
- [ ] Hidden header state never traps focus
