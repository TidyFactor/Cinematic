# Workflow: init

Builds a single-file, zero-build, luxury scroll-driven landing page using GSAP 3.12, Lenis 1.0, and Tailwind CSS.

---

## Steps

0. **Step 0: CDL Resolution & Brief Check**:
   - Check `.tidyfactor/cinematic-brief.md` and `brand.json`. If missing, apply default `film` layout and `warm-gold` palette.

1. **Assemble Single-File HTML**:
   - Load CDNs: Tailwind CSS, GSAP 3.12, ScrollTrigger, Lenis smooth scroll.
   - Inject Google Fonts (e.g. `El Messiri` + `Tajawal` or confirmed pair).

2. **Canvas Frame Scrubbing Engine**:
   - Create `<canvas id="film-canvas">` pinned with GSAP ScrollTrigger.
   - Load frame sequence (`assets/seq/f000.jpg` ... `fNNN.jpg`) or interactive gradient shader fallback.

3. **Luxury Section Assembly**:
   - Assemble Hero, Product Transformation Arc, Feature Highlights, Specs Grid, and Call to Action.

4. **Pre-Emit Self-Critique**:
   - `/* Pre-emit critique: P5 H5 E5 S5 R5 V5 D5 */`

---

## Validation checklist

- [ ] Single file `index.html` runs directly without build step.
- [ ] Lenis smooth scroll and GSAP ScrollTrigger initialized cleanly.
- [ ] Canvas renders frame-sequence or procedural luxury shader.
- [ ] RTL and Arabic typography correctly formatted.
- [ ] Pre-emit critique stamp included.
