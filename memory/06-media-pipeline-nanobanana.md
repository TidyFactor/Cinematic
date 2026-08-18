# 06 · Media Pipeline — Nano Banana (generate_image)

How to generate every asset reliably via **Nano Banana**, the AI assistant's built-in `generate_image` tool. No CLI, no MCP, no uploads — just prompt the tool with a detailed description and optional reference image paths.

## How it works
The `generate_image` tool takes a text **Prompt** and optional **ImagePaths** (up to 3 reference images). It saves the result as an artifact image file. No JSON parsing, no downloads, no retry loops needed — the tool handles everything.

## Generation strategies
- **Identity-preserving product shots** (logo / calligraphy / shape must stay identical) → pass the product reference image via `ImagePaths` and describe the desired scene. State explicitly: *"keep the exact product identity / emblem / calligraphy unchanged."* This is your workhorse for anything with the product in it. Also does re-skins (color/flavor variants) while keeping the same logo/text.
- **Standalone scenes/environments** with NO product identity to preserve (landscapes, backdrops) → prompt-only, no reference image needed. Describe the environment in detail.
- **Image-to-video** → `generate_image` produces stills only. For boundary-matched video clips (the scroll-film source), use a separate video generation workflow or tool. The keyframe images generated here serve as start/end frames for any video tool.

## Calling pattern
```
generate_image(
  Prompt = "detailed description of the desired image...",
  ImagePaths = ["/path/to/reference.jpg"],   // optional, up to 3
  ImageName = "descriptive_name"              // e.g. "product_hero_shot"
)
```
The tool saves the result automatically. Copy the output to `assets/` with the filename the HTML expects.

## Reference images
Save the client reference(s) under ASCII names, e.g. `assets/ref-product.jpg` (and `assets/ref-detail.jpg`). Pass these paths via `ImagePaths` on every product-related generation to maintain identity.

## Run in parallel
Image generations are independent — launch multiple `generate_image` calls in parallel. Fan out: generate all keyframes first, then section stills, then cutouts.

---

See [06-media-pipeline.md](06-media-pipeline.md) for the shared frame extraction, background removal (`rembg`), and web-optimization steps.
See [03-seamless-transitions.md](03-seamless-transitions.md) for boundary-matching and [07-modesty-and-identity.md](07-modesty-and-identity.md) for modesty rules.
