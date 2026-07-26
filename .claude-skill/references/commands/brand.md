# Command: `brand` — Read/Scaffold `brand.json`

## Purpose
Establish the single source of truth every other command depends on. This is
the one command that must run before any visual or copy work — folding it
into `init` alone would hide the fact that `convert`/`improve` runs need it
just as much, and re-running it is how a rebrand propagates.

## When to run it
- Start of any `init`, `convert`, or `improve` session — always first.
- The user says "update the brand colors", "we rebranded", "generate
  brand.json for this client", or `brand`.
- brand.json exists but looks stale against a newer identity brief.

## What it does
1. Look for `brand.json` at the project root.
2. **If found**: read it once, hold it as the run's source of truth. Do not
   let any later command reference `colors`/`typography`/`voice` from
   anywhere else.
3. **If missing**: offer to scaffold one from the product brief — this is a
   3-minute task per `memory/11-brand-json.md` and prevents the build from
   drifting into generic aesthetics. If the user declines, proceed on the
   template's hardcoded warm-gold + El Messiri/Tajawal defaults and say so
   explicitly in the report (this is the legacy fallback path, not a silent
   default).
4. Validate the fields every later command needs exist: `meta.*`,
   `colors.light`/`colors.dark`, `colors.primary`, `typography.families.*`,
   `voice.*`, `identity.logo.*`, `identity.socialPreview.*`,
   `localization.*`, `mediaProvider`.
5. **If brand.json changed since the last build on this project**: flag every
   previously generated page as stale (per the override protocol) — the fix
   is re-scaffolding from the template with the new tokens, not patching CSS
   by hand.

## Output convention
```
project-root/
  brand.json     ← read or scaffolded here; every other command reads this
```

## Checklist
- [ ] brand.json's presence/absence is stated explicitly in the report (never
      silently assumed)
- [ ] All fields other commands need are present, or their absence is flagged
      per field
- [ ] If brand.json changed, prior generated pages are flagged stale
