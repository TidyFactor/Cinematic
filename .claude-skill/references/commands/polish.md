# Command: `polish` — Mobile Glassmorphism Drawer, WhatsApp Integration & UI Refinement

## Purpose
Apply the final production polish to the landing page deliverable: responsive mobile glassmorphic navigation overlay (`#mobileNavOverlay`), touch momentum physics (Lenis `smoothTouch`), high-conversion WhatsApp deep links & floating pulse button (`#waBubble`), floating scroll-to-top button (`#scrollTopBtn`), and custom SVG favicon.

## When to run it
- Page architecture and hero are complete, but mobile navigation, touch physics, or conversion CTAs need final refinement.
- User phrasing: "add mobile navigation", "add scroll to top button", "add whatsapp floating button", "polish UI", `polish`.

## What it does
1. **Glassmorphism Mobile Navigation Drawer (`#mobileNavOverlay`)**:
   - Touch-friendly hamburger toggle (`#mobileMenuBtn`) with minimum 44px × 44px tap targets.
   - Fullscreen glassmorphic overlay with `backdrop-filter: blur(24px)` and smooth slide transition.
   - Auto-dismiss event listeners on all nav item links.
2. **Touch Momentum Physics (Lenis)**:
   - Configure Lenis instance with `smoothTouch: true`, `touchMultiplier: 1.5`, `wheelMultiplier: 0.95`.
3. **High-Conversion WhatsApp Integration**:
   - Floating pulse button (`#waBubble` / `#wa-float`) with animated ring, WhatsApp icon, and tooltip label.
   - Pre-filled WhatsApp URLs (`wa.me/<NUMBER>?text=<ENCODED_TEXT>`) on Header CTA, Hero CTA, Card CTAs, and Footer.
4. **Scroll-to-Top Button (`#scrollTopBtn`)**:
   - Floating button styled with border and glass background, appearing past 300px scroll depth.
   - Smooth Lenis scroll to top on click.
5. **Custom Vector SVG Favicon (`assets/favicon.svg`)**:
   - Brand vector emblem favicon with transparent background and crisp rendering across all DPR scales.

## Output convention
```
index.html
  #mobileMenuBtn / #mobileNavOverlay   ← Responsive glassmorphic drawer
  #waBubble / #wa-float                ← Floating WhatsApp pulse button
  #scrollTopBtn                        ← Smooth scroll-to-top button
assets/favicon.svg                     ← Custom vector favicon
```

## Checklist
- [ ] Mobile navigation hamburger tap target is ≥44px × 44px
- [ ] Glassmorphism overlay backdrop blur (`backdrop-filter: blur(20px+)`) functions smoothly
- [ ] Mobile nav overlay dismisses automatically when any link is tapped
- [ ] WhatsApp deep links contain valid phone format (E.164 without `+`) and URI-encoded pre-filled copy
- [ ] `#scrollTopBtn` appears past 300px scroll depth and scrolls smoothly to hero
