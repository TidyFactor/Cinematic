# 12 · Arabic Typography — Beyond the Default Pair

The locked default (`El Messiri` headings + `Tajawal` body + `Cormorant
Garamond` Latin accents) is safe, clean, and correct for most builds — it
stays the fallback when `brand.json` doesn't specify otherwise. This file is
for when the brand mood calls for something more distinctive: a font
personality that matches the layout's emotional register instead of the
generic "Arabic luxury sans" default.

**The hard constraint from `memory/09-quality-bar.md` still applies to every
option below: clean over calligraphic for large display text. Never Amiri,
never a manuscript/Naskh face above ~24px, regardless of which pair is
chosen.** A face may appear below only as a small accent (eyebrow text,
numerals, a single pull-quote) if noted — never as a heading or body face.

All fonts below are confirmed available on Google Fonts (CDN-only, matches
the locked engine — no self-hosting, no build step).

## Mood → pairing table

| Mood | Arabic heading | Arabic body | Latin accent | Best layouts | Avoid for |
|---|---|---|---|---|---|
| **Default luxury** (safe, warm) | El Messiri | Tajawal | Cormorant Garamond | any | — |
| **Editorial / literary** | Markazi Text | IBM Plex Sans Arabic | Fraunces | `story` (`editorial`) | `app` (too soft for UI chrome) |
| **Art-Deco / high fashion** | Jomhuria *(display sizes only, ≥48px)* | Cairo | Bodoni Moda | `film` (`fullbleed`) | `creator` (too loud for a quiet page) |
| **Modern minimal / tech-luxury** | Cairo | Cairo (weight-differentiated) | Marcellus | `app` (`interface`), `creator` (`minimal`) | `space` (reads cold for real estate) |
| **Warm hospitality / travel** | El Messiri | Almarai | Prata | `space` (`spatial`) | — |
| **E-Commerce & Conversion** | El Messiri | Tajawal | Cormorant Garamond | `product`, `store` | — |
| **Automotive / performance** | El Messiri (branding) + Oswald (numerals) | Tajawal | Oswald | `film`, `story` (auto use case) | non-automotive builds |

## Notes on the less obvious picks

- **Markazi Text** — an Arabic serif with real editorial weight; pairs
  naturally with a Latin serif (`Fraunces`) instead of the default sans
  pairing. Use when the brand voice reads as a story/founder narrative, not
  a product spec sheet.
- **Jomhuria** — a bold condensed Arabic display face with genuine Art-Deco
  character. **Display sizes only** (hero title, big numerals) — it has no
  real "body" weight and becomes illegible below ~48px or in long copy.
  Pair it with `Cairo` for every other text role on the page, never with
  itself for body copy.
- **Cairo** — the modern-minimal option when the brand wants a single
  geometric family across both heading and body instead of a heading/body
  contrast pair. Good default swap-in for `interface`/`minimal` layouts
  wanting a tech-forward (not warm-luxury) register.
- **Almarai** — rounder and friendlier than Tajawal; use for skincare,
  wellness, hospitality briefs where "warm" outranks "sharp."
- **Oswald for numerals** — condensed Latin, used only for spec numbers
  (horsepower, dimensions, pricing) inside an automotive/performance build,
  layered alongside the primary Arabic pair, never replacing it.

## What NOT to add without a real reason

Per `references/tidyfactor-vision.md` — "Small before bloated" — this table
is deliberately short. Do not add a font pairing to satisfy a one-off
request; if a client brief needs something outside this table, treat it as a
`brand.json` override (below), not a new locked default. Confirmed additions
to this table happen when the same need recurs across projects, not on
first ask.

## brand.json override (always the source of truth when present)

```json
"typography": {
  "families": {
    "heading":       { "primary": "Markazi Text", "fallback": "Georgia, serif" },
    "body":          { "primary": "IBM Plex Sans Arabic", "fallback": "Inter, system-ui, sans-serif" },
    "arabicHeading": "Markazi Text",
    "arabicBody":    "IBM Plex Sans Arabic",
    "display":       "Fraunces"
  }
}
```

`display` is a new optional token for the Latin accent face — until
`brand.json`'s schema is updated project-wide, fall back to `Cormorant
Garamond` when `typography.families.display` is absent (same rule as the
existing `arabicHeading`/`arabicBody` fallback in `memory/11-brand-json.md`).

## Google Fonts `<link>` reference

Swap only the families actually in use — never load every family in this
file on every build (page-weight budget, see `memory/13-performance-budget.md`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Markazi+Text:wght@400..700&family=IBM+Plex+Sans+Arabic:wght@300..700&family=Fraunces:ital,opsz,wght@0,9..144,300..700&display=swap" rel="stylesheet">
```

## Verification checklist (in addition to `memory/09-quality-bar.md`)

- [ ] No manuscript/calligraphic face (Amiri or otherwise) above ~24px
- [ ] Display-only faces (e.g. Jomhuria) are not used for body copy or long
      captions
- [ ] Chosen pair matches the layout's mood table row, or the deviation is a
      deliberate `brand.json` override (stated in the report, not silent)
- [ ] `<link>` loads only the families actually referenced in CSS —
      no unused font weights/families shipped
- [ ] Latin accent face pairs intentionally with the Arabic heading face
      (serif-with-serif, geometric-with-geometric), not mismatched by default
