# 06 · Media Pipeline Router & Selection Guide

How to select, setup, and run the media generation pipeline. Choose your provider from the three options below depending on your available models and interface (API, CLI, or built-in tools).

## Provider selection matrix

| Feature | Qwen Image + Wan | Higgsfield CLI | Nano Banana |
| :--- | :--- | :--- | :--- |
| **Best For** | Parallel, API-driven workflows | CLI-driven workflows, high-res | Native built-in tool execution |
| **Still Images** | Qwen Image (DashScope API) | `nano_banana_2` / `gpt_image_2` | `generate_image` tool |
| **Video Clips** | Wan i2v (DashScope API) | `seedance_2_0` i2v | External / separate tool |
| **BG Removal** | `rembg` (Python) | `image_background_remover` | `rembg` (Python) |
| **Complexity** | Medium (needs API key) | High (requires CLI installation) | Low (built-in tool) |
| **Reference File** | [06-media-pipeline-qwen.md](06-media-pipeline-qwen.md) | [06-media-pipeline-higgsfield.md](06-media-pipeline-higgsfield.md) | [06-media-pipeline-nanobanana.md](06-media-pipeline-nanobanana.md) |

## Decision Tree

1. **Do you want native execution within the AI assistant workspace without installing external dependencies or APIs?**
   - Use **Nano Banana** ([06-media-pipeline-nanobanana.md](06-media-pipeline-nanobanana.md)).
2. **Do you have the `higgsfield` CLI installed and authenticated?**
   - Use **Higgsfield CLI** ([06-media-pipeline-higgsfield.md](06-media-pipeline-higgsfield.md)).
3. **Do you have DashScope API credentials and the `dashscope` python package installed?**
   - Use **Qwen/Wan** ([06-media-pipeline-qwen.md](06-media-pipeline-qwen.md)).

---

## Shared Pipeline Procedures

Regardless of the provider chosen, the following background removal, frame extraction, and optimization workflows must be executed.

### 1. Background removal / transparent cutouts
For the floating product hero cutout (where `mix-blend-mode` is prohibited), run **Python `rembg` + `Pillow`** to generate a clean alpha-channel PNG.
```python
from rembg import remove
from PIL import Image
img = Image.open("assets/product-hero.jpg")
out = remove(img)
out.save("assets/product-cut.png")
```
This is far more reliable than prompting for transparency. Works on any generated or reference image.

### 2. Frame extraction (Python + OpenCV — no ffmpeg)
After the four video clips land, extract one continuous sequence (dropping the shared duplicate first frame of clips 2..N to maintain seamless transitions):
```python
import cv2, os, glob
clips = ["v1.mp4","v2.mp4","v3.mp4","v4.mp4"]; out="assets/seq"; os.makedirs(out, exist_ok=True)
for f in glob.glob(out+"/f*.jpg"): os.remove(f)
PER, W, idx = 24, 1280, 0
for ci, p in enumerate(clips):
    cap = cv2.VideoCapture(p); total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) or 0
    if total <= 0: print("WARN empty", p); cap.release(); continue   # a failed download = 0-frame mp4
    picks = [round(i*(total-1)/(PER-1)) for i in range(PER)]
    if ci > 0: picks = picks[1:]                                     # drop the duplicate boundary frame
    for fr_i in picks:
        cap.set(cv2.CAP_PROP_POS_FRAMES, fr_i); ok, fr = cap.read()
        if not ok: continue
        h, w = fr.shape[:2]; fr = cv2.resize(fr, (W, round(h*W/w)))
        cv2.imwrite(f"{out}/f{idx:03d}.jpg", fr, [cv2.IMWRITE_JPEG_QUALITY, 80]); idx += 1
    cap.release()
print("frames:", idx)   # set FRAME_COUNT in the HTML to this number
```
*(4 clips × 24, dropping 3 duplicates = **93** frames. Keep the HTML's `FRAME_COUNT` in sync with this actual count.)*

### 3. Web-optimize before shipping
Generated stills can be large (6–10 MB). Downscale display images to ~2000–2600px JPEG q≈87 (cv2) so the page stays fast. Keep full-res keyframes only as video sources.
Use `scripts/optimize_assets.py` to downscale cutouts and logos.

---

See [03-seamless-transitions.md](03-seamless-transitions.md) for boundary-matching and [07-modesty-and-identity.md](07-modesty-and-identity.md) for modesty rules.
