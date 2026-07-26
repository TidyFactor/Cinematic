# Command: `media` — Provider Selection & Asset Pipeline

## Purpose
Turn the product brief + reference photos into the raw keyframes, video
clips, and cutouts the `film` and `hero` commands need. Kept separate from
`init` because re-running just the media step (a reshoot, a new reference
photo, a provider switch) shouldn't force re-scaffolding the whole page.

## When to run it
- Fresh `init` run reaches its asset-generation step.
- The user wants to regenerate assets with a different provider, or supply
  new reference photos without touching layout/copy.
- User phrasing: "generate the media", "redo the hero shot", "switch to
  Qwen for this one", `media`.

## What it does
1. **Pick the provider** from `brand.json`'s `mediaProvider` (default
   `nanobanana`) — see the selection matrix in `memory/06-media-pipeline.md`:
   - `nanobanana` — built-in `generate_image` tool, no extra dependency, no
     external paid API. Default whenever unspecified.
   - `qwen` — Qwen Image (stills) + Wan (i2v clips) via DashScope API. Needs
     `pip install dashscope` + an API key. Paid.
   - `higgsfield` — CLI (`nano_banana_2` + `seedance_2_0`), needs
     `higgsfield auth login`. Paid.
2. Load the matching template: `templates/MEDIA-PROMPTS-<provider>.template.md`.
   Fill numbered, boundary-matched prompts — every keyframe carries the
   modesty clause (`memory/07`) and identity-preservation clause when people
   or the product itself appear.
3. **Generate keyframes in parallel** where the provider allows it.
   **Verify each keyframe by looking at it** (identity, modesty, branding
   placement) before spending clip/video credits on it — this is the single
   highest-leverage check in the whole pipeline.
4. **Generate boundary-matched clips**: clip N's end-image == clip N+1's
   start-image, passed as both start and end reference (see `transitions`
   command for the full rule).
5. **Extract frames** via OpenCV (`scripts/*.py` — no ffmpeg needed): sample
   ~24–30 frames/clip, 1280px wide, JPEG q≈80, concatenated into
   `f000.jpg…fNNN.jpg`. Drop the duplicated first frame of clips 2..N.
6. **Background-remove** the hero cutout and logo via `scripts/remove_backgrounds.py`
   (`rembg`). Not needed for `spatial` (establishing shot) or `interface`
   (device mockup) layouts.
7. Guard against empty/failed downloads — a 0-frame mp4 means the clip
   generation silently failed; regenerate rather than extracting from it.

## Output convention
```
assets/
  seq/f000.jpg … fNNN.jpg
  hero-cutout.png
  logo-cutout.png
```

## Checklist
- [ ] Provider matches `brand.json.mediaProvider` (or the default was used
      and stated)
- [ ] Every people-containing prompt carries the modesty clause
- [ ] Every keyframe visually verified before clip generation
- [ ] No 0-frame / failed-download clip made it into the extracted sequence
