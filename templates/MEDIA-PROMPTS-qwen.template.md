# Media Prompt List — Qwen Image + Wan

Fill in `{{PRODUCT}}`, `{{BRAND_MARK}}`, `{{ORIGIN}}`, the palette/edge color, and the story beats.
Numbered by order of appearance. Stills generated via **Qwen Image**, video clips via **Wan**.
All assets land in `assets/` with the exact filenames the HTML expects.

## 0 · Setup
- **Read `brand.json` at the project root first**, if it exists. It is the single source of truth for:
  - `meta.product` → fill `{{PRODUCT}}`
  - `meta.tagline` → use `voice.*` to write any generated captions/eyebrows/CTAs
  - `voice.tone` + `voice.doNotUse` + `voice.preferredPerson` → govern every text string in the page (including film captions)
  - `identity.logo.*` → paths for the nav logo, favicon, OG image; use the actual logo file if high-quality, don't re-generate
  - `colors.light.*` or `colors.dark.*` → pick the theme-appropriate hex palette for keyframe backgrounds; never invent a new color
  - `identity.socialPreview.ogImage` → reuse, don't generate a separate one unless the cinematic hero is specifically needed
- Save the client reference(s) under ASCII names, e.g. `assets/ref-product.jpg` (and `assets/ref-detail.jpg`).
- These paths will be passed as reference images to Qwen Image on every product-related generation.

### Shared spec (paste into every product keyframe prompt)
- **Edge/background (theme-dependent, keep IDENTICAL across keyframes; derive from `colors.<theme>.background` + `colors.<theme>.surface`):**
  - Light: `Clean seamless warm off-white <LIGHT_BKGD_HEX> fading to the same paper tone at every edge and corner, soft natural daylight, gentle soft shadow.`
  - Dark: `Deep espresso near-black <DARK_BKGD_HEX> fading to pure black at every edge and corner, dramatic single warm raking light.`
  - *(Replace `<LIGHT_BKGD_HEX>` with `colors.light.background` from brand.json, `<DARK_BKGD_HEX>` with `colors.dark.background` — e.g. `#FBF8F2` / `#0B0805` for the default palette.)*
- **Identity:** `Keep the exact {{PRODUCT}} identity and the {{BRAND_MARK}} unchanged.` (And: keep the mark where it really lives — on packaging vs on the product.) Use the logo asset from `identity.logo.full`/`mark` as the canonical reference; do not re-generate the mark via Qwen Image.
- **Always:** `editorial luxury, hyper-detailed, no extra text, no watermark.`

---

## A · The transformation film (keyframes P1→P5 + clips V1→V4) — boundary-matched
> Beat list (edit to your product): raw/plain {{PRODUCT}} → it forms/assembles → the {{BRAND_MARK}} appears → final product → gallery reveal.

- **P1 / K1** — `assets/seq-src/k1.jpg` — **Qwen Image** with ref image, 16:9 — *plain {{PRODUCT}}, hero pose.* + shared spec.
- **P2 / K2** — `assets/seq-src/k2.jpg` — **Qwen Image** with ref image, 16:9 — *{{PRODUCT}} front-facing, centred.*
- **P3 / K3** — `assets/seq-src/k3.jpg` — **Qwen Image** with ref image, 16:9 — *the transition state (forming / blank packaging).*
- **P4 / K4** — `assets/seq-src/k4.jpg` — **Qwen Image** with ref image, 16:9 — *the FINISHED product with the {{BRAND_MARK}} in place.* (Often just the real reference, copied.)
- **P5 / K5** — `assets/seq-src/k5.jpg` — **Qwen Image** with ref image, 16:9 — *final product on a pedestal in a soft gallery (reveal).*
- **V1** `assets/v1.mp4` — **Wan** image-to-video — start-image k1, end-image k2 — *slow orbit. Locked, slow motion, no cuts, no flicker.*
- **V2** `assets/v2.mp4` — **Wan** image-to-video — start-image k2, end-image k3 — *the form/assembly beat.*
- **V3** `assets/v3.mp4` — **Wan** image-to-video — start-image k3, end-image k4 — *the {{BRAND_MARK}} materializes (where it really lives).*
- **V4** `assets/v4.mp4` — **Wan** image-to-video — start-image k4, end-image k5 — *pull back to the gallery.*
- All clips: aspect ratio 16:9, 1080p, ~5 seconds, high bitrate, no audio.
- Then extract → `assets/seq/f000.jpg…` (OpenCV, drop duplicate boundary frames) and set `FRAME_COUNT` in the HTML.

## B · Section stills
- **P6** — `assets/origin.jpg` — **Qwen Image** (no ref needed), 16:9 — *{{ORIGIN}} environment, no product.*
- **P7** — `assets/product-hero.jpg` — **Qwen Image** with ref image, 4:3/4:5 — *the product hero on the theme ground.* (Or use the real reference.)
- **P8 (opt)** — `assets/macro.jpg` — **Qwen Image** with ref image — *extreme macro detail.*
- **P9** — `assets/ritual.jpg` — **Qwen Image** with ref image, 16:9 — *lifestyle moment.* **If a woman appears: full hijab, conservative long sleeves, only face & hands (mandatory).** Realistic product scale.
- **P11/P12** — `assets/edition-1.jpg`, `assets/edition-2.jpg` — **Qwen Image** with ref image, re-skins/variants, keep the {{BRAND_MARK}}.

## C · Hero cutout + nav logo
- **CUT** — `assets/product-cut.png` — Run `rembg` + `Pillow` on the cleanest product/hero shot → transparent PNG for the hero (no blend trick).
  ```python
  from rembg import remove; from PIL import Image
  out = remove(Image.open("assets/product-hero.jpg")); out.save("assets/product-cut.png")
  ```
- **P13 (opt)** — `assets/logo.png` — **Qwen Image**: *"ONLY the {{BRAND_MARK}}, flat, on pure black/white"* → then `rembg` to remove background → transparent nav logo.

## D · CTA + lifestyle video
- **V5** — `assets/cta.mp4` — **Wan** image-to-video — start-image k4, end-image k4 (seamless loop) — *the product rotating slowly.* Poster = `assets/product-hero.jpg`.
- **V6** — `assets/life1.mp4` — **Wan** image-to-video — start-image ritual.jpg — *subtle modest lifestyle motion.*

---

### Run notes
- Call Qwen Image with `prompt="..."`, reference images as your API specifies, and save to `assets/` with the filename the HTML expects.
- Call Wan image-to-video with keyframe images as start/end frames, and save to `assets/` with the filename the HTML expects.
- Generate Qwen Image stills in parallel (multiple calls). Wan video calls depend on keyframes — run them after all Qwen Image keyframes are done and verified.
- **Verify every asset by viewing it** (identity, modesty, mark placement, scale) before making video from it.

---

## Use-case-specific media prompt variants

> **How to use this section.** Each Use Case (UC-N) is a self-contained media plan.
> When building a landing page, copy the relevant UC's beat list into the sections above (A, B, C, D), replace the generic example prompts with the ones here, update filenames to match what the HTML template references, and run the asset pipeline.
> All keyframes use **Qwen Image**, 16:9 unless noted otherwise, with the *shared spec** (Section 0) pasted at the end of every product-related prompt.
> All clips use **Wan image-to-video**, 16:9, ~5 s, 1080p, high bitrate, no audio. Boundary-matched: clip N end-frame = clip N+1 start-frame.
> All stills land in `assets/` with the exact filename the HTML template references.

---

### UC-1 · Product Launch (physical goods)
**Layout:** `fullbleed.html` · **Theme:** light or dark (product dependent) · **Asset budget:** 5 keyframes + 4 clips + 6 section stills + 1 cutout

**Film keyframes (Qwen Image, all 16:9, with shared spec):**
- **K1**: `assets/seq-src/k1.jpg` — Plain raw {{PRODUCT}} in a neutral hero pose, no branding, no packaging. Isolated on the theme ground colour. + shared spec.
- **K2**: `assets/seq-src/k2.jpg` — {{PRODUCT}} front-facing, centred, slightly more defined lighting than K1. Brand mark absent. + shared spec.
- **K3**: `assets/seq-src/k3.jpg` — Transition state: the product mid-formation — blank packaging material folding around it, or the surface mid-finishing. Motion blur hints at transformation. + shared spec.
- **K4**: `assets/seq-src/k4.jpg` — The finished, branded {{PRODUCT}} with the {{BRAND_MARK}} clearly visible in its correct real-world placement. Sharp, confident key light. + shared spec. (Often the client's hero reference photo.)
- **K5**: `assets/seq-src/k5.jpg` — Final product on a minimal pedestal, soft gallery lighting, shallow depth of field, negative space around it. Sense of arrival. + shared spec.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — Slow orbital push in, the form solidifying. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — Material begins to fold and form around the product. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — The {{BRAND_MARK}} materialises onto the surface in the correct position (where it really lives on the physical product). Locked, slow motion, no cuts, no flicker.
- **V4** start=K4 end=K5 — Camera pulls back to reveal the product on its pedestal in the soft gallery. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/origin.jpg` — {{ORIGIN}} environment (field, lab, source, workshop), no product visible. Wide establishing shot. 16:9.
- P2 `assets/product-hero.jpg` — {{PRODUCT}} hero on theme ground, 4:3. Sharp, confident key light. + shared spec. (Or use client's real reference.)
- P3 `assets/macro.jpg` — Extreme macro detail of material, seam, clasp, or signature element. 1:1.
- P4 `assets/ritual.jpg` — The product in a lifestyle moment of use. 16:9. If a person appears: full hijab, conservative long sleeves, only face and hands visible (mandatory per 07-modesty-and-identity.md). Realistic product scale, product clearly visible.
- P5 `assets/edition-1.jpg` — Variant or colour 1 of the product, same composition as K5. + shared spec.
- P6 `assets/edition-2.jpg` — Variant or colour 2 of the product, same composition as K5. + shared spec.

**Hero treatment:** Transparent cutout of K4 via `rembg` → `assets/product-cut.png`. Use `scripts/remove_backgrounds.py` from the reference photo or K4 output. Optimise with `scripts/optimize_assets.py` (max 1200 px wide).

**Ambient direction:**
- Light theme: `#FBF8F2 → #F2EDE4 → #E8DFCF` (warm paper → deeper cream)
- Dark theme: `#0B0805 → #1A1208 → #0B0805` (near-black pulse)
- The `#ambient` layer starts at the lightest tone and deepens one step per section.

**Gotchas:**
- If the real product photo is high quality, skip generating K4 and use the reference directly. Saves one Qwen Image call and eliminates AI identity drift.
- Verify {{BRAND_MARK}} placement before running V3 — Wan will faithfully reproduce wrong placement if the end-frame is wrong.

---

### UC-2 · Flagship Brand Story
**Layout:** `editorial.html` · **Theme:** dark (heritage) transitioning to light (modern) · **Asset budget:** 5 keyframes + 4 clips + 4 section stills + 1 cutout

**Film keyframes (Qwen Image, all 16:9, with shared spec where product appears):**
- **K1**: `assets/seq-src/k1.jpg` — Heritage origin environment: old workshop, founder's desk, vintage tools, sepia-toned natural light. No product. Warm, nostalgic. + shared spec edge.
- **K2**: `assets/seq-src/k2.jpg` — The challenge visualised: empty shelf, broken tool, gap in the market, a problem waiting for a solution. Dramatic chiaroscuro. + shared spec edge.
- **K3**: `assets/seq-src/k3.jpg` — The innovation appearing: a spark of light, a new form emerging, first prototype on the workbench. Optimistic directional light.
- **K4**: `assets/seq-src/k4.jpg` — Modern flagship product or brand environment in a premium setting. Sharp contemporary lighting, clean composition. + shared spec.
- **K5**: `assets/seq-src/k5.jpg` — Brand legacy horizon: the product in a forward-looking environment, expansive, architectural scale, sense of future. + shared spec.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — Slow drift through the heritage space, light fading, revealing the gap. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — The challenge dissolves as the innovation light appears and fills the frame. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — The spark becomes the full flagship product. Camera pushes in. Locked, slow motion, no cuts, no flicker.
- **V4** start=K4 end=K5 — Pull back from the product to reveal the legacy horizon. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/founder.jpg` — Founder portrait or founder-era photograph aesthetic. 4:3. No product. Editorial, dignified.
- P2 `assets/brand-modern.jpg` — Modern brand moment: product in contemporary premium context. 4:3. + shared spec.
- P3 `assets/press-backdrop.jpg` — Press testimonial or endorsement setting: a desk, a stage, a shelf of accolades. 16:9. Neutral.
- P4 `assets/legacy.jpg` — Brand legacy visual: the product's impact in the wider world. 16:9. Aspirational.

**Hero treatment:** Brand symbol cutout via `rembg` on the brand mark reference photo → `assets/brand-cut.png`. If no standalone symbol, use the flagship product cutout.

**Ambient direction:** `#2C2824 → #3C3830 → #8B7A64 → #FBF8F2` (deep heritage → transitional warm → bright modern)

**Gotchas:**
- Heritage keyframes (K1-K2) should not include the modern brand mark. This is the "before" chapter.
- The transition from dark heritage to light modern should happen in the ambient layer as the user scrolls, not just in the film.

---

### UC-3 · High-Ticket Single-Offer Sales
**Layout:** `fullbleed.html` · **Theme:** dark, luxurious · **Asset budget:** 4 keyframes + 3 clips + 5 section stills + 1 cutout

**Film keyframes (Qwen Image, all 16:9, with shared spec):**
- **K1**: `assets/seq-src/k1.jpg` — Aspirational lifestyle moment with the {{PRODUCT}} visible but not dominant. A setting that implies wealth, taste, exclusivity. Low-key ambient lighting. + shared spec.
- **K2**: `assets/seq-src/k2.jpg` — Extreme macro close-up of craftsmanship: stitching, grain, engraving, mechanism, texture. The quality signal. Studio macro lighting. + shared spec.
- **K3**: `assets/seq-src/k3.jpg` — {{PRODUCT}} in a premium exclusive setting: velvet, marble, private gallery. Sense of rarity and access. + shared spec.
- **K4**: `assets/seq-src/k4.jpg` — Dramatic final hero pose. {{PRODUCT}} alone, centred, maximum authority. The one image that justifies the price. + shared spec.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — Slow push from the lifestyle scene into the macro detail. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — The detail pulls back to reveal the product in its premium setting. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — Camera settles into the final hero composition. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/feature-1.jpg` — Feature highlight 1: specific quality differentiator, isolated. 1:1.
- P2 `assets/feature-2.jpg` — Feature highlight 2. 1:1.
- P3 `assets/feature-3.jpg` — Feature highlight 3. 1:1.
- P4 `assets/testimonial.jpg` — Press endorsement or testimonial backdrop. 16:9.
- P5 `assets/specs.jpg` — Product specifications or materials diagram context. 16:9. Clean.

**Hero treatment:** Product cutout with maximum aura. Use `assets/seq-src/k4.jpg` → `rembg` → `assets/product-cut.png`. In the HTML, set a strong ambient glow and large shadow.

**Ambient direction:** `#0B0805 → #12090A → #1A1210 → #0B0805` (deep dark with a warm mid-tone pulse, never bright)

**Gotchas:**
- Every image must justify the premium price. No flat lighting, no ordinary settings. When in doubt, darken and add a single strong key light.
- The lifestyle moment (K1) must not overpower the product. The product is the hero; the setting is its frame.

---

### UC-4 · Real Estate / Architecture
**Layout:** `spatial.html` · **Theme:** light (daytime property) or dark (evening/luxury) · **Asset budget:** 5 keyframes + 4 clips + 4 section stills, NO cutout

**Film keyframes (Qwen Image, all 16:9, NO shared spec — no product identity):**
- **K1**: `assets/seq-src/k1.jpg` — Wide exterior approach: driveway, facade, landscape framing the property. Golden hour or blue hour. Architectural wide. Establishing shot.
- **K2**: `assets/seq-src/k2.jpg` — Threshold moment: main gate, front door, entry archway. The crossing from outside to inside. Symmetrical, inviting.
- **K3**: `assets/seq-src/k3.jpg` — Signature interior room: main living area or grand hall. Natural light from large windows. The architectural statement space.
- **K4**: `assets/seq-src/k4.jpg` — Signature architectural detail: staircase, fireplace material junction, custom joinery, or bespoke fixture. Macro-to-medium.
- **K5**: `assets/seq-src/k5.jpg` — The view from the property: balcony panorama, terrace outlook, or window framed view. The reason the property exists.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — Slow approach toward the threshold. Locked, slow motion, no cuts, no flicker. Sense of arrival.
- **V2** start=K2 end=K3 — Cross the threshold into the signature interior. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — Drift from the main room to the architectural detail. Locked, slow motion, no cuts, no flicker.
- **V4** start=K4 end=K5 — Pull back from the detail to reveal the full view. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/exterior.jpg` — Hero establishing shot, full facade or aerial approach. This is the hero image, not a cutout. 16:9. Golden hour.
- P2 `assets/interior-hero.jpg` — Main hero room, the one that sells the property. 16:9. Natural light.
- P3 `assets/experience.jpg` — Signature lifestyle moment in the space: dining, reading, pool. 16:9. For parallax section.
- P4 `assets/location.jpg` — Neighbourhood, district, or destination context. 16:9. Map-adjacent.

**Hero treatment:** NO cutout. Full-bleed `assets/exterior.jpg` with a gradient overlay (`linear-gradient`) for text legibility. The property itself is the hero.

**Ambient direction:**
- Warm stone: `#C8B89A → #B8A888 → #A89878` (sandstone, travertine)
- Cool concrete: `#E8E6E2 → #D8D4CE → #C8C4BC` (polished concrete, marble)
- Lush garden: `#4A6B47 → #5A7B57 → #3A5B37` (mature landscaping)
- Match the architecture material in the reference photos.

**Gotchas:**
- AI generation of architectural photography is surprisingly good for exteriors but can invent impossible structural details in interiors. Verify every interior keyframe for plausibility.
- The threshold (K2) must feel like a physical crossing. Avoid flat doorways; prefer arches, covered entries, or dramatic door frames.
- The view (K5) must be genuinely impressive. If the property's real view is modest, lean into a garden or courtyard detail instead.

---

### UC-5 · Personal Brand / Creator
**Layout:** `minimal.html` · **Theme:** light (portfolios) or dark (tech/night-economy brands) · **Asset budget:** 0 keyframes, 0 clips, 5 section stills + 1 person cutout

**Film:** None. This use case uses the `minimal.html` layout (no canvas film, no frame sequence).

**Section stills:**
- P1 `assets/portrait.jpg` — Best editorial portrait of the person. 4:3 or 4:5. Confident, direct gaze. The hero.
- P2 `assets/statement.jpg` — Second portrait, different angle or expression. For the vision statement section. 4:3.
- P3 `assets/work-1.jpg` — Portfolio grid image 1: representative project, output, case study. 1:1.
- P4 `assets/work-2.jpg` — Portfolio grid image 2. 1:1.
- P5 `assets/work-3.jpg` — Portfolio grid image 3. 1:1.
- P6 `assets/environment.jpg` — The person's environment: studio, workspace, city, stage. 16:9. Contextualising.

**Hero treatment:** Transparent person cutout via `rembg` on the best portrait → `assets/portrait-cut.png`. The `minimal.html` hero uses this cutout with a subtle text overlay to the side (editorial split-screen).

**Ambient direction:**
- Light: `#FBF8F2 → #F5F0E8` (clean editorial white)
- Dark: `#0A0A0A → #141414` (focused tech dark)

**Gotchas:**
- No Wan clips needed. No frame sequence needed. This is the lightest-weight build.
- The portrait cutout must have clean hair edges. Run `rembg` at high quality and verify — hair is where transparency most often fails.
- Portfolio grid images (P3-P5) should feel cohesive in style, not randomly sourced. Generate them all in one Qwen Image session with consistent prompts.

---

### UC-6 · SaaS / App Launch
**Layout:** `editorial.html` · **Theme:** dark (tech) · **Asset budget:** 4 keyframes + 3 clips + 4 section stills, NO cutout (device frame instead)

**Film keyframes (Qwen Image, all 16:9, NO shared spec):**
- **K1**: `assets/seq-src/k1.jpg` — The problem state visualised: an empty, outdated, or frustrating interface. Blank spreadsheet, manual process, before-state dashboard. Grey, flat, uninviting. Must be a RECOGNISABLE screen or workflow state.
- **K2**: `assets/seq-src/k2.jpg` — The app interface loaded: clean, modern dashboard or main screen of {{PRODUCT}}. The "aha" moment. Bright, confident UI. Must show recognisable functional UI, not an abstract gradient.
- **K3**: `assets/seq-src/k3.jpg` — Key workflow in action: a user creating something, data flowing through the system, an automation completing. Motion implied in the static frame (cursor visible, data in transit). Must be a RECOGNISABLE product screen.
- **K4**: `assets/seq-src/k4.jpg` — Delighted result screen: finished output, analytics win, green confirmation state, success metric. Triumphant UI. Must be a RECOGNISABLE product screen.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — The old state dissolves and the new app UI assembles itself. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — The user begins the key workflow; UI elements animate to show action. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — The workflow completes, revealing the delighted result. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/device-hero.png` — UI screenshot of the main dashboard inside a device frame (phone, laptop, or both). This is the hero image. 16:9 container, device frame applied in CSS.
- P2 `assets/workflow-1.jpg` — Step 1 of the primary workflow, screenshot style. 1:1.
- P3 `assets/workflow-2.jpg` — Step 2 of the primary workflow, screenshot style. 1:1.
- P4 `assets/integrations.jpg` — Integration logos or ecosystem visual. 16:9. Clean grid of partner logos.

**Hero treatment:** CSS device frame (phone mockup, laptop mockup, or both) with `assets/device-hero.png` placed inside. No `rembg` needed. The device frame creates depth and context. Build with CSS `border-radius`, `box-shadow`, and a `::before` pseudo-element for the notch/stand.

**Ambient direction:** `#0F172A → #1E293B → #2563EB` (deep navy → slate → electric blue accent). Success moments shift to `#059669` (emerald green).

**Gotchas:**
- **Every keyframe must be a RECOGNISABLE screen state.** Do not generate abstract UI transformations. Wan will blur abstract gradients; it needs concrete screen content to interpolate well.
- Verify UI fidelity on K2 and K3 against the real product. If the generated UI doesn't resemble the real app, use actual screenshots and skip Qwen Image for these frames.
- The device frame must be CSS, not baked into the image. This allows the device to sit correctly in the responsive layout.

---

### UC-7 · Rebrand Reveal
**Layout:** `fullbleed.html` · **Theme:** dark (dramatic transition) · **Asset budget:** 5 keyframes + 4 clips + 3 section stills + 1 cutout

**Film keyframes (Qwen Image, all 16:9, with shared spec for product keyframes):**
- **K1**: `assets/seq-src/k1.jpg` — Current (old) brand identity on the product or packaging. Familiar, established, soon-to-be-retired. Documented clearly. + shared spec.
- **K2**: `assets/seq-src/k2.jpg` — Old identity dissolving: the familiar mark fading, fragmenting, or abstracting. A moment of dissolution. Particles, blur, or material breakdown. + shared spec edge.
- **K3**: `assets/seq-src/k3.jpg` — New identity materialising: sharp forms emerging from blur or fragmentation. The new mark coalescing. Optimistic light breaking through. + shared spec.
- **K4**: `assets/seq-src/k4.jpg` — New branded product or packaging, sharp and complete. The new {{BRAND_MARK}} clearly visible in its correct placement. Confident, contemporary. + shared spec.
- **K5** (optional): `assets/seq-src/k5.jpg` — New identity in real-world context: on a shelf, in a hand, on a building. The rebrand living in the world. + shared spec.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — The old identity begins to dissolve and fragment. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — Dissolution reverses into materialisation: the new form emerges from the fragments. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — The new brand solidifies, mark and product becoming sharp and complete. Locked, slow motion, no cuts, no flicker.
- **V4** start=K4 end=K5 — Camera pulls back to reveal the new identity in its real-world context. Locked, slow motion, no cuts, no flicker. (If K5 is skipped, loop K4.)

**Section stills:**
- P1 `assets/brand-values.jpg` — Brand values pillars visual: typography and colour of the new system, no product. 16:9. Clean.
- P2 `assets/visual-system.jpg` — New visual system examples: colour palette, type specimens, application mockups. 16:9.
- P3 `assets/press-release.jpg` — Press release moment: the new brand unveiled, launch event context. 16:9.

**Hero treatment:** NEW brand symbol cutout via `rembg` on the new brand mark reference → `assets/brand-cut.png`. The entire page is a reveal of this new identity.

**Ambient direction:** `#1A0808 → #0B0805 → #1A1208` (dissolution red → void dark → emergence warm)

**Gotchas:**
- The old identity keyframes (K1, K2) must be generated from the client's current brand brief. Use their old logo/packaging as reference.
- Wan clips for the metamorphosis (V2 especially) are the most artistically challenging in this toolkit. Budget extra Wan runs and select the best.
- Do not show both old and new marks in the same frame — the transition should be sequential, not simultaneous.

---

### UC-8 · Premium Event / Conference
**Layout:** `editorial.html` · **Theme:** dark (dramatic) · **Asset budget:** 4 keyframes + 3 clips + 4 section stills, no cutout (brand image hero)

**Film keyframes (Qwen Image, all 16:9, NO shared spec):**
- **K1**: `assets/seq-src/k1.jpg` — Empty venue, pre-event: chairs in rows, lights on but no audience, stage set but untested. Clean, anticipatory. Architectural photography.
- **K2**: `assets/seq-src/k2.jpg` — Setup in progress: stage being built, AV testing, crew working, cables being run. Controlled activity. Documentary style.
- **K3**: `assets/seq-src/k3.jpg` — Doors opening, first guests arriving: anticipation energy, people entering the space, the moment before. Low-key with emerging warmth.
- **K4**: `assets/seq-src/k4.jpg` — Event at full energy: crowd engaged, speaker lit, peak moment. Maximum intensity. Dramatic event lighting, depth of field isolating the action.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — The empty space begins to show signs of setup; lights flicker on, first equipment appears. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — Setup complete, the first attendees cross the threshold. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — The crowd and energy build to peak intensity. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/speakers.jpg` — Speakers grid: 3-4 portrait crops in a unified grid. 1:1 each, composite 16:9 or stacked.
- P2 `assets/agenda.jpg` — Agenda or timeline visual: clean, on-brand, information-dense. 16:9.
- P3 `assets/venue.jpg` — Venue atmosphere: the space as experienced, not as marketed. 16:9. Documentary.
- P4 `assets/sponsors.jpg` — Sponsor or brand logos grid: clean arrangement, consistent background. 16:9.

**Hero treatment:** Event brand image + key information (date, location, headline). The `editorial.html` split-screen hero: brand visual on one side, event details on the other. No cutout; the venue image with text overlay works best.

**Ambient direction:** `#0B0805 → #1A1812 → #FF6B2B` (pre-event void → mid-event warmth → energy accent colour, customise to brand)

**Gotchas:**
- Do not generate people in the keyframes with identifiable faces. Crowd shots should use silhouettes, backs-of-heads, or depth-of-field blur.
- The empty venue (K1) must feel anticipatory, not abandoned. Lighting is the difference: lights on and warm, not flat and dead.

---

### UC-9 · Automotive / Luxury Goods
**Layout:** `fullbleed.html` · **Theme:** dark · **Asset budget:** 4 keyframes + 3 clips + 4 section stills + 1 cutout

**Film keyframes (Qwen Image, all 16:9, with shared spec):**
- **K1**: `assets/seq-src/k1.jpg` — Design origin: concept sketch, wireframe, or clay model of the {{PRODUCT}}. Studio, process, intention. + shared spec edge.
- **K2**: `assets/seq-src/k2.jpg` — Engineering detail: engine, chassis, movement mechanism, precision internals. Technical, exact. + shared spec.
- **K3**: `assets/seq-src/k3.jpg` — {{PRODUCT}} in motion: driving, operating, dynamic angle, sense of power and speed. Environmental context. + shared spec.
- **K4**: `assets/seq-src/k4.jpg` — {{PRODUCT}} at rest, hero pose in a premium environment. The definitive product shot. Maximum gloss. + shared spec.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — The sketch dissolves into the engineering reality. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — The engineering gives way to motion; the product moves for the first time. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — Motion decelerates and the product settles into its hero pose. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/spec-1.jpg` — Specification highlight 1: engine, material, or performance metric context. 1:1.
- P2 `assets/spec-2.jpg` — Specification highlight 2. 1:1.
- P3 `assets/craft.jpg` — Craftsmanship macro: stitching, machining, finishing detail. 1:1.
- P4 `assets/lifestyle.jpg` — The {{PRODUCT}} in its aspirational habitat. 16:9. Modest lifestyle per identity constraints.

**Hero treatment:** Vehicle or product cutout via `rembg` — automotive needs crisp edges; use high-quality source image and verify the edge quality. → `assets/product-cut.png`. In the hero, pair with a strong ambient glow and deep shadow.

**Ambient direction:** `#0A0A0A → #141414 → #E8E6E2 → #0A0A0A` (pure dark → subtle lift → chrome highlight → dark return). Accent: customise to brand colour.

**Gotchas:**
- AI generation of automotive photography is unreliable for photorealism. Every generated keyframe must be verified against the reference. If the generated image doesn't pass, use the real reference photo as that keyframe.
- Wan interpolation of vehicles in motion (V2) can produce unrealistic wheel arches, reflections, or proportions. Budget extra runs.
- The cutout edge quality on cars is the hardest in this toolkit. Use the real product photo for the rembg source, never the AI-generated keyframe.

---

### UC-10 · Luxury Travel / Hospitality
**Layout:** `spatial.html` · **Theme:** light (resort day) or dark (evening luxury) · **Asset budget:** 5 keyframes + 4 clips + 4 section stills, NO cutout

**Film keyframes (Qwen Image, all 16:9, NO shared spec):**
- **K1**: `assets/seq-src/k1.jpg` — Wide approach shot: exterior of the property, aerial sense of arrival. Driveway, shoreline, mountain approach. The establishing postcard.
- **K2**: `assets/seq-src/k2.jpg` — Threshold and lobby: first impression interior. Reception, atrium, entry sequence. The welcome.
- **K3**: `assets/seq-src/k3.jpg` — Signature room or suite: the key interior moment. Bed with a view, signature chair with natural light, the room that justifies the rate.
- **K4**: `assets/seq-src/k4.jpg` — Bathroom, spa, or amenity detail: soaking tub, infinity edge, treatment room, signature fixture. Sensory.
- **K5**: `assets/seq-src/k5.jpg` — The view or panorama from a signature space: the reason to stay. Balcony, window, terrace looking out. The money shot.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — The approach dissolves into the threshold arrival. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — Cross from the public lobby into the private signature room. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — Drift from the room to the spa or amenity detail. Locked, slow motion, no cuts, no flicker.
- **V4** start=K4 end=K5 — Pull back from the detail to reveal the full panorama. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/exterior.jpg` — Hero establishing shot of the property. This is the hero image. 16:9. Best light, iconic angle.
- P2 `assets/interior-hero.jpg` — Signature room: the one room that defines the experience. 16:9.
- P3 `assets/experience.jpg` — Dining, pool, spa, or signature activity. The lifestyle moment. 16:9.
- P4 `assets/location.jpg` — Destination context: the city, region, or landscape that frames the property. 16:9.

**Hero treatment:** NO cutout. Full-bleed `assets/exterior.jpg` with a gradient overlay for text legibility, same as UC-4. The property itself is the hero.

**Ambient direction:**
- Tropical/warm: `#F4E4C8 → #E8D4B0 → #D4C4A0`
- Mountain cool: `#B8C8D4 → #A8B8C8 → #98A8B8`
- Desert gold: `#D4B896 → #C4A886 → #B49876`
- Match the destination climate and material palette from reference photos.

**Gotchas:**
- AI-generated hospitality interiors tend to over-light and over-furnish. Specify "natural light only, minimal furnishing, editorial restraint" in keyframe prompts.
- The panorama (K5) must be genuinely extraordinary. If the generated image falls short, use the real reference photo.
- Same architectural plausibility verification as UC-4: interiors must be structurally coherent.

---

### UC-11 · Fashion / Jewelry Drops
**Layout:** `fullbleed.html` · **Theme:** dark (dramatic product focus) · **Asset budget:** 4 keyframes + 3 clips + 4 section stills + 1 piece cutout

**Film keyframes (Qwen Image, all 16:9, with shared spec, modesty mandatory for any person):**
- **K1**: `assets/seq-src/k1.jpg` — Extreme macro of raw material: gem facets catching light, leather grain under magnification, thread weave at fibre level. Material as abstract landscape. + shared spec edge.
- **K2**: `assets/seq-src/k2.jpg` — Artisan hands at work: tools visible (pliers, loom shuttle, polishing wheel, needle). Hands only, no face identity required. Workshop detail, focused light. + shared spec edge.
- **K3**: `assets/seq-src/k3.jpg` — The piece being worn or held: hands, wrist, collarbone, or neck shot. NO face. Piece clearly visible and in focus. + shared spec.
- **K4**: `assets/seq-src/k4.jpg` — Editorial lifestyle full-body with the piece as the focal point. Full body visible, modestly dressed per 07-modesty-and-identity.md (full coverage, conservative, no exposed midriff, no sheer fabric). Piece dominates the frame. + shared spec.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — The material zooms out from macro to reveal the artisan's hands working it. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — The artisan's work transitions to the finished piece being picked up and held. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — The piece settles into its editorial context, worn by the model in full modest attire. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/piece-hero.jpg` — Piece hero cutout source: the piece alone on neutral ground, studio lit. 1:1. Used for rembg.
- P2 `assets/collection-1.jpg` — Collection grid piece 1. 1:1. Consistent background.
- P3 `assets/collection-2.jpg` — Collection grid piece 2. 1:1. Same background as P2.
- P4 `assets/lookbook.jpg` — Full-bleed lookbook image: piece styled in context. 16:9.

**Hero treatment:** Piece cutout via `rembg` → `assets/piece-cut.png`. Jewelry requires ultra-clean transparency; verify edge quality under magnification. Use high-res source image. In the HTML hero, use a strong ambient color that complements the metal/gem colour.

**Ambient direction:**
- Rose gold: `#B76E79 → #A86070 → #985060`
- Platinum cool: `#E8E6E2 → #D8D4CE → #C8C4BC`
- Gemstone: customise to the dominant stone in the collection.

**Gotchas:**
- **ANY person in any keyframe or still must be modestly dressed per memory/07:** full hijab, conservative long sleeves, only face and hands visible. No exceptions. Focus on the piece, not the wearer.
- No face close-ups unless modesty is verified in the generated image frame by frame.
- AI generation of jewelry product photography often misrepresents metal colour and gem saturation. Verify every keyframe against the real piece reference.
- The rembg cutout for jewelry is the hardest in this toolkit due to delicate chains and prong settings. Use the highest quality source and zoom in to verify the edge at 400%.

---

### UC-12 · Documentary / Cause Campaign
**Layout:** `editorial.html` · **Theme:** dark (problem) transitioning to light (hope) · **Asset budget:** 4 keyframes + 3 clips + 4 section stills, optional cutout

**Film keyframes (Qwen Image, all 16:9, NO shared spec — no product identity):**
- **K1**: `assets/seq-src/k1.jpg` — The problem at scale: environmental damage, social challenge, systemic gap. Wide establishing shot, weighty, documentary. Gravitas without exploitation.
- **K2**: `assets/seq-src/k2.jpg` — Close-up impact: an affected person or community in their real setting. Human-scale documentation. Dignified, not voyeuristic.
- **K3**: `assets/seq-src/k3.jpg` — The intervention in action: volunteers working, a solution deployed, hands helping, infrastructure being built. Optimistic, active.
- **K4**: `assets/seq-src/k4.jpg` — Hopeful resolution: healing landscape, thriving community, visible progress. Bright, forward-looking. The future the campaign enables.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — Camera pushes into the human impact from the wide establishing. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — Impact meets intervention; help arrives, the solution begins. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — The intervention transforms into resolution. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/impact-stat.jpg` — Impact statistics backdrop: abstract, data-adjacent, supports the numbers that appear in the HTML text. 16:9.
- P2 `assets/testimonial.jpg` — Testimonial portrait: a person whose story the campaign tells. 4:3. Dignified.
- P3 `assets/mission.jpg` — Mission or values imagery: what the organisation stands for, visual. 16:9.
- P4 `assets/act-cta.jpg` — Donate or act CTA backdrop: the moment of contribution, or an abstract hand reaching out. 16:9.

**Hero treatment:** Powerful image, no cutout unless the cause has a mascot or symbol. Full-bleed K2 (human impact) or K1 (problem) with strong gradient overlay for headline text. The emotion is the hero.

**Ambient direction:** `#2C2824 → #8B7A64 → #FBF8F2` (weighted problem dark → transitional warm → bright hopeful light). The ambient shifts are narrative: start dark, end bright.

**Gotchas:**
- Do not generate exploitative or poverty-tourism imagery. Keyframes must be dignified even when depicting hardship.
- People in keyframes should not be identifiable as real individuals. Use generic faces, silhouettes, or documentary-standard back-of-head compositions.
- The tonal shift from dark to light across the page is narrative; configure the ambient layer to shift per section, not per scroll tick.

---

### UC-13 · Founder Story Page
**Layout:** `editorial.html` · **Theme:** light (warm heritage to bright modern) · **Asset budget:** 4 keyframes + 3 clips + 3 section stills + 1 person cutout

**Film keyframes (Qwen Image, all 16:9, NO shared spec unless product appears):**
- **K1**: `assets/seq-src/k1.jpg` — Origin environment: garage, first office, hometown street, kitchen table. Where the founder started. Warm, unassuming, authentic. No product polish.
- **K2**: `assets/seq-src/k2.jpg` — The struggle: late nights, prototype failures, early rejection, the grind. Documentary weight, not glamour. The cost of building something.
- **K3**: `assets/seq-src/k3.jpg` — Breakthrough moment: first sale, first customer, pivot success, eureka. Light breaking through. Optimistic.
- **K4**: `assets/seq-src/k4.jpg` — Today's reality: the scaled business, the founder in their current role, the outcome. Confident, professional, earned.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — The origin space deepens into the struggle; light dims, effort increases. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — The struggle reaches the breakthrough; light shifts, momentum changes. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — The breakthrough becomes today's reality; camera pulls back to the full picture. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/founder-portrait.jpg` — Editorial founder portrait for the hero split-screen. 4:3 or 4:5. Used for rembg.
- P2 `assets/origin-photo.jpg` — Origin environment photograph: where the story actually happened. 16:9. Real, not staged.
- P3 `assets/vision.jpg` — Vision statement backdrop: what the founder is building toward. 16:9. Aspirational.

**Hero treatment:** Founder portrait cutout via `rembg` → `assets/founder-cut.png`. The `editorial.html` split-screen hero places the cutout on one side with the headline and founder's name on the other.

**Ambient direction:** `#F2EDE4 → #8B7A64 → #2C2824 → #FBF8F2` (warm cream heritage → darkened struggle → breakthrough → bright modern). Matches the narrative arc.

**Gotchas:**
- Authenticity is non-negotiable for founder stories. Avoid glamorising the origin. The real environment — however modest — carries more weight than a produced version.
- If the founder is a real person, use their actual portrait for the rembg cutout. Do not generate a fictional founder portrait.
- The struggle keyframes (K2) should feel real, not performative. Late nights over messy desks, not dramatic silhouettes.

---

### UC-14 · Artisan / Handmade Brands
**Layout:** `fullbleed.html` · **Theme:** light (natural, workshop warmth) · **Asset budget:** 4 keyframes + 3 clips + 5 section stills + 1 product cutout

**Film keyframes (Qwen Image, all 16:9, with shared spec):**
- **K1**: `assets/seq-src/k1.jpg` — Extreme macro of raw material: wood grain at fibre scale, wet clay surface, fabric weave close-up, stone texture with chisel marks. Abstract, material. + shared spec edge.
- **K2**: `assets/seq-src/k2.jpg` — Artisan hands with tools at work: lathe turning wood, needle through fabric, chisel on stone, hands at the loom. Hands in focus, tools visible. Workshop ambient light. + shared spec edge.
- **K3**: `assets/seq-src/k3.jpg` — Piece halfway complete: rough form visible, detail emerging, the product taking shape. Workbench setting. Process, not finished. + shared spec.
- **K4**: `assets/seq-src/k4.jpg` — Finished piece in its natural context: set on a table, resting on a shelf, being used as intended. Natural light from a window. The work is done. + shared spec.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — The raw material pulls back to reveal the artisan's hands beginning to work it. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — The work progresses; the piece takes form under the hands. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — The piece completes and settles into its natural context; light shifts from workshop to home. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/process-1.jpg` — Process step 1: material preparation. 1:1.
- P2 `assets/process-2.jpg` — Process step 2: primary forming. 1:1.
- P3 `assets/process-3.jpg` — Process step 3: finishing detail. 1:1.
- P4 `assets/materials.jpg` — Raw materials or ingredients close-up: what goes into the piece. 16:9.
- P5 `assets/maker.jpg` — Maker portrait: the artisan in their workshop. 4:3. Authentic.
- P6 `assets/gallery-1.jpg` — Finished piece gallery image 1. 4:3. Natural light, simple background.
- P7 `assets/gallery-2.jpg` — Finished piece gallery image 2. 4:3.

**Hero treatment:** Finished product cutout via `rembg` → `assets/product-cut.png`. Wood and ceramic pieces cut cleanly; textiles may need manual edge cleanup. Optimise with `scripts/optimize_assets.py`.

**Ambient direction:** `#3C2E1C → #6E5C4B → #A89878 → #FBF8F2` (dark wood workshop → raw material warmth → mid-tone process → finished bright). Matches the material journey from raw to refined.

**Gotchas:**
- Artisan hands (K2, P1-P3) should not show identifiable face information. Focus on hands, tools, and the work.
- Workshop environments should feel real, not staged. Mess, dust, and tool marks add authenticity.
- The material macro (K1) should be genuinely abstract — it's the texture that tells the material story, not a literal shot of a raw log.

---

### UC-15 · Limited Drops / Countdown
**Layout:** `fullbleed.html` · **Theme:** dark (mystery, build-up) · **Asset budget:** 4 keyframes + 3 clips + 3 section stills + 1 cutout

**Film keyframes (Qwen Image, all 16:9, with shared spec):**
- **K1**: `assets/seq-src/k1.jpg` — Obscured, mostly dark. A shape edge, a material texture hint, nothing identifiable. Pure mystery. Dramatic low-key lighting. + shared spec edge.
- **K2**: `assets/seq-src/k2.jpg` — Partial reveal: approximately one-third of the {{PRODUCT}} visible, dramatic raking light revealing surface detail. The shape is forming but not complete. + shared spec.
- **K3**: `assets/seq-src/k3.jpg` — Near-reveal: {{PRODUCT}} from an unusual angle, a signature detail visible (clasp, logo corner, distinctive curve). Recognition without full view. + shared spec.
- **K4**: `assets/seq-src/k4.jpg` — Full clean reveal: {{PRODUCT}} in its hero pose, complete, maximum dramatic impact. The drop moment. + shared spec.

**Film clips (Wan image-to-video, 16:9, ~5 s, high bitrate, no audio):**
- **V1** start=K1 end=K2 — The darkness begins to yield a shape. Light finds an edge. Locked, slow motion, no cuts, no flicker.
- **V2** start=K2 end=K3 — The partial form rotates to reveal a signature detail. Locked, slow motion, no cuts, no flicker.
- **V3** start=K3 end=K4 — The rotation completes and the full product is revealed. Locked, slow motion, no cuts, no flicker.

**Section stills:**
- P1 `assets/countdown-bg.jpg` — Countdown section background: dark, atmospheric, supports the live countdown timer. 16:9. Can be abstract or a dark product environment.
- P2 `assets/preview-card-1.jpg` — Feature preview card 1: intentionally blurred or partial view of a product feature. 4:5.
- P3 `assets/preview-card-2.jpg` — Feature preview card 2: another partial or blurred feature. 4:5.

**Hero treatment:** Partial or silhouetted product cutout via `rembg` → `assets/product-cut.png`. Two options:
- A full cutout displayed at reduced opacity (30-40%) initially, with scroll-driven opacity tween to 100% at the reveal section.
- OR a deliberately silhouetted source image (product shot against strong backlight) before rembg, giving a true reveal-on-scroll effect.

**Ambient direction:** `#050505 → #0B0805 → #1A1210 → #050505` (pure black → faint reveal → slight lift → dark return). An accent burst of the brand colour at the final reveal frame is optional.

**Gotchas:**
- **The scroll IS the countdown.** Frame count (FRAME_COUNT) combined with section pixel heights controls the real pacing tension. More frames = slower reveal. Tune this against the section heights.
- If there is a real drop date, add a live HTML/CSS countdown timer in the `#cta` section. Use `id="countdown"` and document where to place the JavaScript initialiser. The countdown JS is not part of this toolkit's HTML templates but should be a simple `setInterval` on `#countdown`.
- K1 must not be a black frame — it must be a black frame with a hint. Verify that Wan can interpolate from a near-black K1 to a partial K2 without producing a blank intermediate.
- The preview cards (P2, P3) should be intentionally degraded: blur, crop, or low opacity. They create anticipation without satisfying it.
