# 06 · Media Pipeline — Google Gemini & Antigravity Native (`generate_image`)

This reference details the media pipeline workflow when running within **Google Antigravity** using Gemini models and the native `generate_image` tool (Nano Banana / Imagen 3).

---

## 🌟 Why Antigravity Native (`generate_image`)

When running inside Google Antigravity:
1. **Zero External API Setup**: No need for third-party API keys (DashScope, Replicate) — uses built-in agent tools directly.
2. **High-Fidelity Product Still Generation**: Excellent prompt compliance for luxury materials (brushed gold, sapphire crystal, obsidian glass, polished marble).
3. **Multimodal Visual Verification**: Gemini 1.5 Pro / 2.0 inspects generated images directly to verify modesty compliance, transparent cutout edge quality, and product identity consistency before embedding into `index.html`.

---

## 🎨 Prompt Engineering Rules for Gemini / Imagen 3

### 1. Subject & Modesty Clauses
Always append non-negotiable identity and modesty clauses to every visual prompt:
- **Modesty clause**: `"Modest conservative attire, full hijab if female model, elegant luxury styling."`
- **Product consistency clause**: `"Ultra-sharp studio macro lighting, 8k resolution, photorealistic, luxury commercial photography, no text overlays."`

### 2. Keyframe Prompt Structure
```text
[Subject Action / Transformation State], [Luxury Environment & Lighting],
[Material Details & Reflection], ultra-sharp studio commercial photography, 8k, photorealistic --no blur, distortion, text
```

---

## 🔄 Antigravity Native Asset Pipeline Workflow

```
┌─────────────────────────────────────────────────────────┐
│ 1. Agent calls generate_image tool for keyframe stills   │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ 2. Python script (prepare_images.py / remove_backgrounds)│
│    converts images & generates transparent hero cutout  │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Frame sequence generated into assets/seq/f000.jpg     │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ 4. browser_subagent navigates to local preview server   │
│    and captures screenshots for Gemini visual audit     │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Verification Checklist

- [ ] Keyframes generated using native `generate_image` tool.
- [ ] Modesty and exact product identity preserved across all images.
- [ ] Hero PNG cutout background cleanly removed via `rembg` (no residual fringes).
- [ ] `browser_subagent` visual audit confirms 60FPS canvas scrubbing without visual artifacts.
