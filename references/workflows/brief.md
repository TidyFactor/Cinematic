# Workflow: brief

Discovers and records luxury visual aesthetic baselines before building the cinematic landing page.

---

## Steps

1. **Check Existing State**:
   - Inspect `brand.json` and `.tidyfactor/cinematic-brief.md` for existing colors and layout targets.

2. **Conduct Structured Discovery (Max 3 Questions)**:
   - If not specified, ask:
     1. **Media Pipeline (C1)**: Use built-in `nanobanana` or external API?
     2. **Layout Architecture (C2)**: Fullbleed Film vs Editorial Story vs Product Showcase?
     3. **Mood Theme & Typography (C3/C4)**: Warm Gold Luxury, Emerald Oasis, or Platinum Tech?

3. **Record Decisions**:
   - Save `.tidyfactor/cinematic-brief.md` with confirmed parameters.

4. **Report Summary**:
   - Confirm baseline parameters and prompt user to invoke `/init` or `/film`.

---

## Validation checklist

- [ ] `.tidyfactor/cinematic-brief.md` exists and contains confirmed values for C1–C5.
- [ ] No more than 3 questions were asked in a single round.
- [ ] Visual baseline adheres to Apple x Cartier luxury principles in `references/memory/quality-bar.md`.
