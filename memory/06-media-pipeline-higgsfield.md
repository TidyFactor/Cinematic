# 06 · Media Pipeline — Higgsfield CLI

How to generate every asset reliably via the `higgsfield` CLI (Higgsfield MCP / `higgsfield-generate` skill). Auth via `higgsfield auth login`; check with `higgsfield account status`.

## Model picks
- **`nano_banana_2`** (Nano Banana Pro) → reference-driven, **identity-preserving** product shots (logo / calligraphy / shape must stay identical). Pass the reference with `--image`. Params: `aspect_ratio` (1:1,3:2,2:3,4:3,3:4,4:5,5:4,9:16,16:9,21:9), `resolution` 1k/2k/4k. This is your workhorse for anything with the product in it. Also does re-skins (color/flavor variants) while keeping the same logo/text.
- **`gpt_image_2`** → standalone scenes/environments with NO product identity to preserve (landscapes, backdrops). `quality high`, `resolution 2k`.
- **`seedance_2_0`** → image-to-video. Flags: `--start-image`, `--end-image`, `--aspect_ratio` (16:9/9:16/4:3/3:4/1:1/21:9), `--resolution 1080p`, `--duration <int>`, `--bitrate_mode high`, **`--generate_audio false`** (underscore!). The flaky one — retry.
- **`image_background_remover`** → transparent cutouts (for the hero / floating product). Just `--image`.

## Submit pattern
```bash
higgsfield generate create <model> ... --wait --wait-timeout 25m --json > out.json
```
`--wait` blocks until done and the JSON contains the result. **The result is `result_url` (top-level).**

## Parse the result WITHOUT jq (jq is usually NOT installed)
The job JSON also lists the INPUT image URLs, so a naive "first URL" grab can return the input. **Extract `result_url` specifically:**
```bash
grep -oE '"result_url":[[:space:]]*"[^"]+"' out.json | grep -oE 'https://[^"]+' | head -1
```
Then download with a retry loop and verify the file exists & is non-empty:
```bash
for d in 1 2 3; do curl -fsSL "$URL" -o asset.jpg && [ -s asset.jpg ] && break; sleep 3; done
```

## Transient errors — RETRY, don't give up
Intermittent `HTTP 502` and "Cannot reach …cloudfront…/<uuid>.png" (backend couldn't fetch the just-uploaded input) are flaky, not misuse — re-running succeeds. **Wrap every generation in a 3–4× retry loop.** The CLI exit code can be 0 even when the download branch failed → always verify the output file.

## Reuse uploads
Pre-upload references once: `higgsfield upload create ref.jpg --json` → capture `id`. Pass that UUID to `--image <id>` on every later call to skip re-upload and dodge the flaky re-fetch.

## Run in parallel, in the background
Image gens are reliable; Seedance video is the slow/flaky one. Fan out: launch all image gens with `&` + `wait` in one background script; do the boundary-matched videos in a second pass (they depend on the keyframes). Verify each output, then retry only the failures.

---

See [06-media-pipeline.md](06-media-pipeline.md) for the shared frame extraction, background removal (`rembg`), and web-optimization steps.
See [03-seamless-transitions.md](03-seamless-transitions.md) for boundary-matching and [07-modesty-and-identity.md](07-modesty-and-identity.md) for modesty rules.
