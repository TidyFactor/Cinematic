# 11 · Brand Token Integration (brand.json)

`brand.json` at the project root is the **single source of truth** for design tokens, voice, identity, and layout rules. It governs every surface built with this kit (and any future kits that consume it). Agents must read it **before** scaffolding any template, and override the template's hardcoded CSS variable defaults with the tokens defined here.

## Load order

1. Read `brand.json` from the project root.
2. Read `AGENTS.md` + relevant `memory/` files for the kit's cinematic architecture.
3. Pick a layout from `templates/layouts/`.
4. **Override** the template's default CSS variables with brand.json tokens (mapping below).
5. Fill `{{PLACEHOLDER}}`s using `meta.*` + `voice.*` rules.
6. Wire asset paths from `identity.*`.
7. Set `html[lang]` and `html[dir]` from `localization.*`.
8. Read `mediaProvider` to determine prompt template and media generation guidelines.

## Token → CSS variable mapping

The templates define a `:root{}` block with **hardcoded defaults** (the gold/warm-luxury fallback palette). When `brand.json` is present, override those defaults using the mapping below. Pick the `light` or `dark` block from brand.json based on the chosen page theme (most cinematic pages are dark; most product/sales pages are light).

### Color tokens

| CSS variable | light theme source | dark theme source |
|--------------|-------------------|-------------------|
| `--paper`  | `colors.light.background` | `colors.dark.background` |
| `--mist`   | `colors.light.surface`    | `colors.dark.surface` |
| `--cream`  | `colors.light.surface2`   | `colors.dark.surface2` |
| `--sand`   | `colors.light.border` (or derive 8% lighter) | `colors.dark.border` |
| `--ink`    | `colors.light.text`       | `colors.dark.text` |
| `--ink-soft` | `colors.light.textMuted` | `colors.dark.textMuted` |
| `--ink-faint` | derive 40% opacity of `textMuted` | derive 40% opacity of `textMuted` |
| `--gold`     | `colors.primary`          | `colors.primary` (never swap brand color per theme — see `usage.rules`) |
| `--gold-deep`  | derive: darken `primary` 15% | derive: darken `primary` 15% in HSL while keeping contrast |
| `--gold-bright` | derive: lighten `primary` 12% | derive: lighten `primary` 12% |
| `--accent`    | `colors.secondary` or `colors.accent` | same |
| `--line`      | `colors.light.border` at ~30% extra opacity | `colors.dark.border` at ~30% extra opacity |
| `--line-soft` | `colors.light.border` at ~15% extra opacity | `colors.dark.border` at ~15% extra opacity |
| `--ambient`   | start with `colors.light.background` (tweens per section) | start with `colors.dark.background` |
| `--maxw`      | `breakpoints.xl` (default 1280px) — use `breakpoints.2xl` for very wide layouts | same |
| `--ease`      | `motion.easing.emphasized` for cinematic motion | same |

### Derived colors

Brand.json only defines `primary`, not the three gold variants. Generate them programmatically:

```python
import colorsys
def hsl(hex_color):
    r,g,b = int(hex_color[1:3],16)/255, int(hex_color[3:5],16)/255, int(hex_color[5:7],16)/255
    return colorsys.rgb_to_hls(r,g,b)
def darker(hex_color, pct):
    h,l,s = hsl(hex_color); l = max(0, l - pct/100)
    r,g,b = colorsys.hls_to_rgb(h,l,s)
    return f"#{int(r*255):02X}{int(g*255):02X}{int(b*255):02X}"
def lighter(hex_color, pct):
    h,l,s = hsl(hex_color); l = min(1, l + pct/100)
    r,g,b = colorsys.hls_to_rgb(h,l,s)
    return f"#{int(r*255):02X}{int(g*255):02X}{int(b*255):02X}"
# --gold-deep  = darker(primary, 15)
# --gold-bright = lighter(primary, 12)
```

Or do it in CSS with `color-mix()`:
```css
--gold-deep:   color-mix(in hsl, var(--gold) 70%, black);
--gold-bright: color-mix(in hsl, var(--gold) 70%, white);
```

## Typography mapping

Template defaults assume the Arabic luxury stack (El Messiri + Tajawal + Cormorant Garamond). Override with brand.json when a different language or brand font is specified.

| Template usage | brand.json path |
|----------------|-----------------|
| Heading display (`h1`, `h2`, `h3`, `.display`) | `typography.families.heading.primary` + fallback |
| Body text (`.body`, `p`, `.sub`, `.lead`) | `typography.families.body.primary` + fallback |
| Latin accent (`.latin`, `.eyebrow`, `.idx`, scroll cue) | **brand.json does not ship a latin accent font** — keep `Cormorant Garamond` unless the brand overrides it via a future `typography.families.display` token. Check before using. |
| Arabic headings (when `localization.defaultLocale === "ar"`) | `typography.families.arabicHeading` |
| Arabic body (when `localization.defaultLocale === "ar"`) | `typography.families.arabicBody` |
| Code blocks (`.code-block`, `<code>`) | `typography.families.mono` |

**Weights** — use `typography.weights.*` instead of hardcoding:
- `font-weight: 300` → `weights.regular` or `weights.light` if present
- `font-weight: 500` → `weights.medium`
- `font-weight: 600` → `weights.semibold`
- `font-weight: 700` → `weights.bold`

When a weight is not defined in brand.json, fall back to the closest defined one.

**Scale** — `typography.scale.*` maps directly to `clamp()` recipes in templates:
- Hero h1 → `clamp(scale.5xl, 12.5vw, scale.6xl)` or use `4xl–6xl` for tighter hero
- Section h2 → `clamp(scale.3xl, 5.6vw, scale.4xl)`
- Eyebrow / latin → `scale.xs`
- Body / sub → `scale.lg`
- Small UI → `scale.sm`

**Contrast** — the cinematic kit uses `gold-text` gradient (`--gold-bright` → `--gold` → `--gold-deep`). Verify the resulting gradient text maintains **WCAG AA (4.5:1)** against its section background per `colors.contrastPolicy`. If contrast fails, swap `--gold` for `--gold-deep` or `--gold-bright` on that section.

## Voice → copy rules

Every string the agent writes into a `{{PLACEHOLDER}}` must follow `voice.*`:

| Token | Rule |
|-------|------|
| `voice.tone` | The overall register. "confident, plain, teacher-not-salesperson" → no hype, no clichés, no exclamation marks. |
| `voice.personality` | Adjectives that filter word choice. `["direct", "practical"]` → avoid poetic filler. |
| `voice.readingLevel` | Simple words, short sentences. No jargon unless audience is technical. |
| `voice.doNotUse` | **Hard block list.** Never use these words in any placeholder, caption, CTA, or generated copy. |
| `voice.preferredPerson` | "second person (you)" → write "Build your page" not "Building a page". Applies to all CTAs and feature copy. |
| `voice.examplePhrase` | Use as a **calibration reference**. If unsure whether a draft line fits the voice, rewrite it to sound like this phrase. |

### Specific placeholder voice guidance

| Placeholder | Voice treatment |
|-------------|-----------------|
| `{{LATIN_LABEL}}` | Short, uppercase, 3–5 words. English only even in RTL. Example: "ESTABLISHED 2024". |
| `{{TAGLINE}}` | One sentence, max 14 words. Direct, specific. Never "Experience the future of...". |
| `{{SCROLL_WORD}}` | Single word. `{{LOCALIZED_SCROLL_WORD}}` in Arabic: "اكتشف". Default: "Discover". |
| `{{FILM_CAP_1..5}}` | 2–5 words each. Descriptive, not emotional. Captions anchor moments, not feelings. |
| `{{*_EYEBROW}}` | Short category label. No filler like "JOURNEY". Example: "The Craft". |
| `{{CTA_PRIMARY}}` | Imperative verb + benefit. "Start Free", "Book a Tour", not "Click Here" or "Get Started". |
| `{{CTA_SECONDARY}}` | Supportive action. "View Floor Plan", "See Demo", "Read More". |
| `{{FEATURES_TITLE}}`, `{{*_LEAD}}` | Use voice.preferredPerson. "You get X" or "Build with Y" — not "We offer" or "Featuring". |

## Identity → asset wiring

| HTML location | brand.json path | Notes |
|---------------|-----------------|-------|
| `<link rel="icon" href="...">` | `identity.logo.favicon` | SVG if available; fallback to PNG |
| Header `.brand` wordmark | `meta.product` as `<span class="wm">` text | Use `identity.logo.full` as an `<img>` if logo has a graphic mark |
| Favicon alternate (dark tab) | `identity.logo.favicon` | SVGs handle this automatically; PNGs need `media="(prefers-color-scheme: dark)"` |
| `<meta property="og:image">` | `identity.socialPreview.ogImage` | Must exist at the declared dimensions (1200x630) |
| `<meta property="og:image:width">` / `height` | derive from `identity.socialPreview.ogDimensions` | e.g., 1200 / 630 |
| `<meta property="og:title">` | `meta.product` + " — " + `meta.tagline` | Follow voice.tone |
| `<meta property="og:description">` | `meta.description` | Reuse verbatim |
| `<meta name="twitter:card">` | `"summary_large_image"` if `ogImage` exists | |

Asset paths use the `/assets/` prefix as declared; adjust if the kit is served from a subpath.

## Media Provider Configuration

The `mediaProvider` token determines which model pipeline and prompts template the agent will use when generating assets. If not specified, the system defaults to `nanobanana`.

| `mediaProvider` value | Target Prompts Template | Target Pipeline Reference |
|-----------------------|-------------------------|---------------------------|
| `"nanobanana"` (default)| `templates/MEDIA-PROMPTS-nanobanana.template.md` | `memory/06-media-pipeline-nanobanana.md` |
| `"qwen"` | `templates/MEDIA-PROMPTS-qwen.template.md` | `memory/06-media-pipeline-qwen.md` |
| `"higgsfield"` | `templates/MEDIA-PROMPTS-higgsfield.template.md` | `memory/06-media-pipeline-higgsfield.md` |

### brand.json Schema Extension

```json
{
  "mediaProvider": "nanobanana"
}
```

## Localization

| HTML attribute | Rule |
|----------------|------|
| `<html lang="...">` | `localization.defaultLocale` unless the page targets a non-default locale |
| `<html dir="...">` | `"rtl"` if lang is in `localization.rtlLocales`, else `"ltr"` |
| Section text alignment | RTL: `text-align: right` on copy panes; captions position to right in film overlays |
| `mirrorOnRtl` components | Not applicable to cinematic landing pages (no sidebar/breadcrumb) — ignore for this kit |
| Date display | If showing a launch/event date in copy, format per `localization.dateFormat[lang]` |

## Motion

| Template usage | brand.json path |
|----------------|-----------------|
| `--ease` CSS variable (main motion curve) | `motion.easing.emphasized` for cinematic scroll-driven motion, NOT `motion.easing.standard` |
| Hero entrance (1.5s–2s) | Exceeds `motion.duration.slow` (400ms) — this is intentional for cinematic effect. Brand.json motion durations apply to **UI micro-interactions**, not scroll-driven reveals. |
| Ambient color tween per section | Use `motion.duration.slow` (or longer, cinematic) |
| Header scroll-transition | `motion.easing.standard`, `transition: .5s` |
| `prefers-reduced-motion` | Honor `motion.reducedMotion` rule: disable scroll-driven effects and parallax; keep only opacity/color transitions. Already implemented in all templates. |
| Cinematic motion scope | `motion.scope` explicitly says cinematic motion is **marketing-only**. This landing kit IS a marketing surface → cinematic motion is appropriate. Don't port the scroll-film technique to docs/dashboards later. |

## Accessibility enforcement

These rules override template defaults and are non-negotiable:

| Rule | Source |
|------|--------|
| Focus ring visibility | `accessibility.focusVisible` — never `outline: none` without replacement. Use `shadows.focusRing` for button/interactive focus. |
| Touch-target size | `accessibility.minTouchTarget` — buttons, nav-cta, anchor links must be at least 44px on mobile. |
| Alt text | `accessibility.altTextPolicy` — every meaningful `<img>` has descriptive alt. Pure decorative images (grain, ambient overlays) use `alt=""` + `aria-hidden="true"`. |
| Contrast | `colors.contrastPolicy` — WCAG AA minimum. Test gradient `gold-text` against both light and dark section backgrounds. |

## Component tokens (bonus — not used by cinematic templates)

`components.*` in brand.json defines button, input, card, codeBlock tokens. The cinematic kit uses its own `.btn`, `.btn-primary`, `.btn-ghost` styles; these could be aligned with `components.button.*` tokens for consistency when the brand has a stricter design system. For example:

| Cinematic class | Could align with |
|-----------------|------------------|
| `.btn` border-radius | `components.button.radius` → `radius.md` (12px) instead of `9999px` (pill) |
| `.btn` padding | `components.button.paddingX` / `paddingY` |
| `.btn-primary` hover | `components.button.hoverOpacity` instead of `translateY(-3px)` |

**Decision point:** if the brand demands strict component-token adherence (e.g., for a design-system audit), override the cinematic `.btn` defaults. Otherwise, preserve the cinematic pill style — it's part of the luxury signature.

## Override protocol

These are the `usage.rules`, enforced here:

1. **Never hardcode** a hex value or font name inline in any template copy. Always reference the CSS variable (which itself is mapped from brand.json).
2. **Brand colors don't flip per theme.** `primary`, `logo.*`, and derived gold variants are theme-independent — only surfaces/text/backgrounds swap between light/dark.
3. **If brand.json changes**, treat every previously-generated landing page as **stale**. Re-scaffold from the template with the new token set rather than patching CSS manually.
4. **Extend, don't override.** If a new cinematic token is needed (e.g., `--ink-faint`), derive it from existing brand.json tokens instead of adding a brand.json override. The kit's tokens are a **projection** of brand.json, not a separate source.

## Verification checklist

After scaffolding from a template with brand.json:

- [ ] `:root` CSS variables all match the appropriate brand.json block (light or dark)
- [ ] No hardcoded hex values or font names remain in the `<style>` block
- [ ] `html[lang]` and `html[dir]` reflect `localization.*`
- [ ] Every `{{PLACEHOLDER}}` was filled per `voice.*` rules — grep for `doNotUse` words
- [ ] `<meta>` tags (description, og:*, twitter:*) use `meta.*` + `identity.socialPreview.*`
- [ ] Favicon `<link>` and header brand logo both point to `identity.logo.*` assets
- [ ] Gold gradient (`gold-text`) passes contrast check against the chosen theme's `--paper`
- [ ] `prefers-reduced-motion` behavior matches `motion.reducedMotion` rule
- [ ] All interactive elements (buttons, nav links) meet `accessibility.minTouchTarget`
- [ ] Decorative overlays have `alt="" aria-hidden="true"`; meaningful images have descriptive alt

If any check fails, fix before serving.

## Example: light-theme luxury page

Given this brand.json fragment:
```json
{
  "meta": { "product": "Aromé", "tagline": "Slow-scented perfumes, one bottle at a time." },
  "colors": {
    "light": {
      "background": "#FBF8F2", "surface": "#F7F4EC", "surface2": "#F3EEE2",
      "text": "#241812", "textMuted": "#6E5C4B",
      "primary": "#A97B33", "secondary": "#A8632E"
    }
  },
  "typography": {
    "families": {
      "heading": { "primary": "El Messiri", "fallback": "Georgia, serif" },
      "body": { "primary": "Tajawal", "fallback": "Inter, system-ui, sans-serif" }
    }
  },
  "localization": { "defaultLocale": "ar", "rtlLocales": ["ar"] }
}
```

The agent produces:
```css
:root{
  --paper:#FBF8F2; --mist:#F7F4EC; --cream:#F3EEE2; --sand:#ECE2CF;
  --ink:#241812; --ink-soft:#6E5C4B; --ink-faint:#9A8975;
  --gold:#A97B33; --gold-deep:#8A6128; --gold-bright:#C2974A; --accent:#A8632E;
  --maxw:1280px; --ease:cubic-bezier(.22,.61,.36,1);
}
```

And in HTML:
```html
<html lang="ar" dir="rtl">
<head>
  <title>Aromé</title>
  <meta name="description" content="Slow-scented perfumes, one bottle at a time." />
  <meta property="og:title" content="Aromé — Slow-scented perfumes, one bottle at a time." />
  <meta property="og:description" content="Slow-scented perfumes, one bottle at a time." />
  <meta property="og:image" content="/assets/og-default.png" />
  <link rel="icon" href="/assets/favicon.svg" />
</head>
...
<h1>Aromé</h1>
<div class="sub">Slow-scented perfumes, one bottle at a time.</div>
```

## Example: dark-theme tech SaaS page

```json
{
  "meta": { "product": "Nimbus", "tagline": "Infrastructure monitoring that gets out of your way." },
  "colors": {
    "dark": {
      "background": "#0F172A", "surface": "#1E293B", "surface2": "#2D3B4E",
      "text": "#F8FAFC", "textMuted": "#CBD5E1",
      "primary": "#3B82F6", "accent": "#818CF8"
    }
  },
  "localization": { "defaultLocale": "en", "rtlLocales": ["ar"] }
}
```

Produces:
```html
<html lang="en" dir="ltr">
```

```css
:root{
  --paper:#0F172A; --mist:#1E293B; --cream:#2D3B4E; --sand:#3D4D63;
  --ink:#F8FAFC; --ink-soft:#CBD5E1; --ink-faint:#94A3B8;
  --gold:#3B82F6; --gold-deep:#2563EB; --gold-bright:#60A5FA; --accent:#818CF8;
  --maxw:1280px;
}
```

Note how `--gold` picks up the brand `primary` — the cinematic gold accent is **the brand's primary color**, not necessarily literal gold. The kit is brand-adaptive.

## When brand.json is missing

If no `brand.json` exists at the project root, the templates' hardcoded defaults (warm gold + El Messiri/Tajawal) apply. This is the legacy fallback path. **Recommend creating brand.json first** — it's a 3-minute task that prevents the agent from drifting into generic aesthetics.

## Cross-kit portability

The `usage.sharedBy` field lists this kit alongside Documentation Kit and future kits (Dashboard, Admin, LMS, Commerce). Brand.json is intentionally kit-agnostic. **Don't add cinematic-specific tokens to brand.json** — derive them here (as `--gold-deep`, `--gold-bright`, `--ink-faint`). Brand.json stays universal; the cinematic kit projects what it needs.
