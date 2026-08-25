# Memory: decision-points (Contextual Decision Layer — CDL v1.0)

A thin arbitration protocol for resolving high-impact luxury aesthetic and media pipeline ambiguities before generating cinematic landing pages.

---

## 🏛️ Decision Matrix (C1–C5)

| Code | Decision Dimension | Options (Reference SSOT) | Default Fallback | Trigger / Ambiguity Condition |
|:---:|---|---|---|---|
| **C1** | **Media Pipeline & Provider** | • `nanobanana` (Built-in `generate_image`, zero API key)<br>• `qwen` (Qwen Image + Wan via DashScope)<br>• `higgsfield` (Higgsfield Video CLI) | `nanobanana` | When prompt asks to generate visual assets without declaring an external API key. |
| **C2** | **Cinematic Layout Pattern** | • `film` (`fullbleed` hero with canvas frame scrub)<br>• `story` (`editorial` narrative layout)<br>• `space` (`spatial` floating 3D cards)<br>• `app` (`interface` interactive product walkthrough)<br>• `creator` (`minimal` luxury portfolio)<br>• `product` (`product` 360 degree showcase)<br>• `store` (`store` high-conversion direct checkout)<br>• `auto` (`auto` dynamic routing) | `film` (`fullbleed`) | When request describes product page without specifying layout structure. |
| **C3** | **Arabic Luxury Typography Pairing** | • `classic-luxury` (El Messiri + Tajawal)<br>• `modern-bold` (Alexandria + Readex Pro)<br>• `heritage-editorial` (Amiri + Aref Ruqaa)<br>• `minimal-tech` (Reem Kufi + Noto Sans Arabic) | `classic-luxury` | When targeting Arabic/MENA luxury market. |
| **C4** | **Color Harmony & Mood Theme** | • `warm-gold` (Obsidian black `#0a0a0a` + Gold `#d4af37`)<br>• `emerald-royal` (Deep forest `#051b11` + Emerald `#10b981`)<br>• `sapphire-midnight` (Midnight `#060b1e` + Electric `#3b82f6`)<br>• `monochrome-platinum` (Pure black `#000000` + Platinum `#e2e8f0`) | `warm-gold` | When brand colors are not specified in `brand.json`. |
| **C5** | **Output Scope & Depth** | • `single-file-html` (Self-contained `index.html` with canvas mock scrub)<br>• `complete-asset-kit` (`index.html` + `assets/seq/` 60 JPG frame-sequence) | `single-file-html` | When user asks for a quick preview vs a full production export. |

---

## ⚡ Boolean Skip Conditions (Deterministic Bypass)

Skip interactive elicitation and proceed silently when ANY of the following are true:
1. **Cached Brief Exists**: `.tidyfactor/cinematic-brief.md` or root `brand.json` exists with complete tokens.
2. **Explicit User Declaration**: Prompt explicitly declares layout and theme (e.g. `"Build a fullbleed gold cinematic landing page using nanobanana"`).
3. **Direct Command Invocation**: User invokes explicit commands (`/brand`, `/film`, `/typeface`, `/hero`).
4. **Maintenance / Polish Task**: Auditing (`/audit`), performance profiling (`/perf`), or CSS styling silently preserves existing page architecture.

---

## 🎯 Single-Round Batching & Priority Overflow

When elicitation is required:
1. **Max 3 Questions**: Ask at most 3 concise questions in a single round.
2. **Priority Order**:
   $$\mathbf{C1 \text{ (Media Provider)}} > \mathbf{C2 \text{ (Layout Pattern)}} > \mathbf{C3 \text{ (Typography)}} > \mathbf{C4 \text{ (Mood Theme)}} > \mathbf{C5 \text{ (Scope)}}$$
3. **Conservative Default**: Any unasked or unanswered dimensions automatically adopt the **Default Fallback**.

---

## 💾 Brief Persistence Protocol

When `/brief` runs, save confirmed decisions to `.tidyfactor/cinematic-brief.md`:
```markdown
# Cinematic Landing Page Brief
- Media Provider: [nanobanana | qwen | higgsfield]
- Layout Pattern: [film | story | space | app | creator | product | store | auto]
- Typography Pairing: [classic-luxury | modern-bold | heritage-editorial | minimal-tech]
- Mood Theme: [warm-gold | emerald-royal | sapphire-midnight | monochrome-platinum]
- Output Scope: [single-file-html | complete-asset-kit]
- Confirmed At: YYYY-MM-DD
```
Downstream commands read `.tidyfactor/cinematic-brief.md` and `brand.json` first.
