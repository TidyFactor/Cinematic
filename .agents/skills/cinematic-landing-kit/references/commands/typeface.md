# Command: `typeface` — Distinctive Arabic Typography Selection

## Purpose
Pick an Arabic (+ Latin accent) font pairing that matches the brand's mood
instead of defaulting to `El Messiri`/`Tajawal`/`Cormorant Garamond` on
every project. Split out from `i18n` because font *selection* is a creative
decision made once, early — `i18n` then applies whichever pair was chosen
(RTL rules, caption placement) and shouldn't be the place that decision gets
made for the first time.

## When to run it
- Any `init` where the brand brief signals a specific mood (editorial,
  Art-Deco/fashion, tech-minimal, hospitality-warm, automotive) rather than
  generic luxury.
- User phrasing: "make the typography feel more [luxurious/editorial/bold/
  distinctive]", "the default font feels generic", "give me font options",
  `typeface`.
- `clone-brand` extracted a non-default font pairing from an existing site —
  `typeface` is where that pairing gets validated against the clean/no-Amiri
  hard constraint before being written to `brand.json`.

## What it does
1. Read `memory/12-arabic-typography.md`'s mood → pairing table.
2. Match the brand brief (or `brand.json`'s `voice.personality`) to a row —
   ask which mood fits if genuinely ambiguous, don't guess silently on a
   brief that could plausibly fit two rows.
3. Check the chosen layout (`fullbleed`/`editorial`/`spatial`/`interface`/
   `minimal`) against that row's "Best layouts"/"Avoid for" columns — flag a
   mismatch rather than silently proceeding (e.g. Art-Deco/Jomhuria on a
   `minimal` layout).
4. If the pick includes a display-only face (e.g. Jomhuria), confirm it's
   restricted to hero/display sizes — never assigned to body or caption
   roles.
5. Write the resolved families into `brand.json`'s `typography.families.*`
   (including the optional `display` token for the Latin accent face) — this
   command **writes brand.json**, it doesn't just recommend fonts in chat.
6. Update the Google Fonts `<link>` in `index.html`'s `<head>` to load only
   the chosen families/weights (see the performance note in
   `memory/12-arabic-typography.md` and the budget in
   `memory/13-performance-budget.md`).
7. Hand off to `i18n` for RTL/direction/caption-placement application using
   the now-resolved families.

## Output convention
```
brand.json
  typography.families.{heading,body,arabicHeading,arabicBody,display}  ← written here

index.html
  <head>
    <link rel="preconnect" ...>
    <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
  </head>
```

## Checklist
- [ ] Chosen pair matches a `memory/12-arabic-typography.md` mood row, or a
      deliberate override is stated explicitly (not silent)
- [ ] No manuscript/calligraphic face above ~24px; Amiri never used
- [ ] Display-only faces are not used for body/caption text
- [ ] `brand.json`'s `typography.families.*` reflects the final choice
- [ ] Font `<link>` loads only in-use families/weights, no leftover defaults
