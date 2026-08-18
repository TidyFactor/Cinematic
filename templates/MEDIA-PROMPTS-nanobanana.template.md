# Media Prompt List — Nano Banana (generate_image)

Fill in `{{PRODUCT}}`, `{{BRAND_MARK}}`, `{{ORIGIN}}`, the palette/edge color, and the story beats.
Numbered by order of appearance. All images generated via `generate_image` tool.
All assets land in `assets/` with the exact filenames the HTML expects.

## 0 · Setup
- Save the client reference(s) under ASCII names, e.g. `assets/ref-product.jpg` (and `assets/ref-detail.jpg`).
- These paths will be passed via `ImagePaths` on every product-related generation.

### Shared spec (paste into every product keyframe prompt)
- **Edge/background (theme-dependent, keep IDENTICAL across keyframes):**
  - Light: `Clean seamless warm off-white #FBF8F2 fading to the same paper tone at every edge and corner, soft natural daylight, gentle soft shadow.`
  - Dark: `Deep espresso near-black #0B0805 fading to pure black at every edge and corner, dramatic single warm raking light.`
- **Identity:** `Keep the exact {{PRODUCT}} identity and the {{BRAND_MARK}} unchanged.` (And: keep the mark where it really lives — on packaging vs on the product.)
- **Always:** `editorial luxury, hyper-detailed, no extra text, no watermark.`

---

## A · The transformation film (keyframes P1→P5 + clips V1→V4) — boundary-matched
> Beat list (edit to your product): raw/plain {{PRODUCT}} → it forms/assembles → the {{BRAND_MARK}} appears → final product → gallery reveal.

- **P1 / K1** — `assets/seq-src/k1.jpg` — `generate_image` with ref image, 16:9 — *plain {{PRODUCT}}, hero pose.* + shared spec.
- **P2 / K2** — `assets/seq-src/k2.jpg` — `generate_image` with ref image, 16:9 — *{{PRODUCT}} front-facing, centred.*
- **P3 / K3** — `assets/seq-src/k3.jpg` — `generate_image` with ref image, 16:9 — *the transition state (forming / blank packaging).*
- **P4 / K4** — `assets/seq-src/k4.jpg` — `generate_image` with ref image, 16:9 — *the FINISHED product with the {{BRAND_MARK}} in place.* (Often just the real reference, copied.)
- **P5 / K5** — `assets/seq-src/k5.jpg` — `generate_image` with ref image, 16:9 — *final product on a pedestal in a soft gallery (reveal).*
- **V1** `assets/v1.mp4` — image-to-video (separate tool) — start-image k1, end-image k2 — *slow orbit. Locked, slow motion, no cuts, no flicker.*
- **V2** `assets/v2.mp4` — start-image k2, end-image k3 — *the form/assembly beat.*
- **V3** `assets/v3.mp4` — start-image k3, end-image k4 — *the {{BRAND_MARK}} materializes (where it really lives).*
- **V4** `assets/v4.mp4` — start-image k4, end-image k5 — *pull back to the gallery.*
- All clips: aspect ratio 16:9, 1080p, ~5 seconds, high bitrate, no audio.
- Then extract → `assets/seq/f000.jpg…` (OpenCV, drop duplicate boundary frames) and set `FRAME_COUNT` in the HTML.

## B · Section stills
- **P6** — `assets/origin.jpg` — `generate_image` (no ref needed), 16:9 — *{{ORIGIN}} environment, no product.*
- **P7** — `assets/product-hero.jpg` — `generate_image` with ref image, 4:3/4:5 — *the product hero on the theme ground.* (Or use the real reference.)
- **P8 (opt)** — `assets/macro.jpg` — `generate_image` with ref image — *extreme macro detail.*
- **P9** — `assets/ritual.jpg` — `generate_image` with ref image, 16:9 — *lifestyle moment.* **If a woman appears: full hijab, conservative long sleeves, only face & hands (mandatory).** Realistic product scale.
- **P11/P12** — `assets/edition-1.jpg`, `assets/edition-2.jpg` — `generate_image` with ref image, re-skins/variants, keep the {{BRAND_MARK}}.

## C · Hero cutout + nav logo
- **CUT** — `assets/product-cut.png` — Run `rembg` + `Pillow` on the cleanest product/hero shot → transparent PNG for the hero (no blend trick).
  ```python
  from rembg import remove; from PIL import Image
  out = remove(Image.open("assets/product-hero.jpg")); out.save("assets/product-cut.png")
  ```
- **P13 (opt)** — `assets/logo.png` — `generate_image`: *"ONLY the {{BRAND_MARK}}, flat, on pure black/white"* → then `rembg` to remove background → transparent nav logo.

## D · CTA + lifestyle video
- **V5** — `assets/cta.mp4` — image-to-video (separate tool) — start-image k4, end-image k4 (seamless loop) — *the product rotating slowly.* Poster = `assets/product-hero.jpg`.
- **V6** — `assets/life1.mp4` — image-to-video (separate tool) — start-image ritual.jpg — *subtle modest lifestyle motion.*

---
### Run notes
- Call `generate_image(Prompt="...", ImagePaths=["assets/ref-product.jpg"], ImageName="descriptive_name")`.
- The tool saves the result automatically as an artifact — copy to `assets/` with the filename the HTML expects.
- Generate images in parallel (multiple `generate_image` calls). Videos require a separate tool/workflow.
- **Verify every asset by viewing it** (identity, modesty, mark placement, scale) before making video from it.
