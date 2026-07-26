# 15 · Brand Extraction (building `brand.json` FROM an existing identity)

`memory/11-brand-json.md` covers `brand.json` as an input — this file covers
producing that input from something that already exists: a live site, a
brand guideline PDF, a logo + a couple of reference photos. This is the
`clone-brand` command's reference; `brand` (the command) still owns reading
and applying the file once it exists.

## When this applies vs. plain `brand`

- **`brand`** — no existing identity, or the user is happy to answer a short
  brief. Scaffolds `brand.json` from template defaults + user answers.
- **`clone-brand`** — an existing site/PDF/asset set already encodes the
  identity, and re-typing it by hand risks drift from the real brand. Extract
  first, confirm with the user, then write `brand.json`.

## What to extract, and from where

| Token | Primary source | Fallback if unavailable |
|---|---|---|
| `colors.primary`, `colors.light`, `colors.dark` | Computed styles of the existing site's key surfaces (buttons, header background, body text) — sample actual rendered hex values, not guesses from a screenshot's visual impression | Ask the user for 2–3 hex values they consider "on-brand" |
| `typography.families.*` | `<link>`/`@font-face` declarations in the existing site's HTML/CSS, or a brand guideline PDF's typography page | Route through `memory/12-arabic-typography.md`'s mood table based on the product category |
| `voice.tone`, `voice.doNotUse` | Read 3–5 paragraphs of existing marketing copy; infer register (formal/casual, technical/plain) rather than assuming | Ask the user to describe the brand in three adjectives |
| `identity.logo.*` | Existing logo file, ideally SVG or high-res PNG with transparency already present | Flag as missing — do not fabricate a logo |
| `localization.defaultLocale`/`rtlLocales` | `<html lang>`/`dir` on the existing site | Ask which locales the new page must support |
| `mediaProvider` | Not extractable — always ask, default `nanobanana` per `memory/06-media-pipeline.md` | — |

## What NOT to extract

- **Layout or page structure** — the existing site's section order/spacing is
  not a `brand.json` token and does not transfer; the cinematic engine's
  locked layouts (`templates/layouts/`) own that decision via
  `memory/10-use-cases.md`, not the source site.
- **Exact copy text** — voice *rules* transfer (tone, banned words), the
  literal sentences don't; `init`/`convert` write new copy that follows the
  extracted voice, they don't paste the old site's paragraphs.
- **Font files themselves** — only the family *names*, resolved against
  Google Fonts. If the existing brand uses a licensed non-Google font, flag
  this explicitly rather than substituting silently; the engine is CDN-only
  by design (`references/tidyfactor-vision.md`).

## Procedure

1. Confirm the source: a live URL to inspect, or files the user uploads
   (guideline PDF, logo, screenshots).
2. Extract candidate tokens per the table above.
3. **Present the extracted `brand.json` draft back to the user before
   writing it** — extraction is inference, not ground truth; a wrong color
   sampled from a compressed screenshot silently becomes the new "source of
   truth" for every later command if not confirmed.
4. Once confirmed, write `brand.json` and hand off to `brand` (command) for
   the standard validation pass in `memory/11-brand-json.md`.

## Checklist
- [ ] Every extracted token's source is stated (computed style / guideline
      PDF page / user answer) — nothing presented as certain when it was
      inferred
- [ ] Non-Google fonts in the source identity are flagged, not silently
      substituted
- [ ] Draft `brand.json` was confirmed by the user before being written as
      final
- [ ] Layout structure and literal copy from the source were **not** carried
      over — only tokens
