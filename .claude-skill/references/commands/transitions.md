# Command: `transitions` — Boundary-Matched Clip Handoffs

## Purpose
Guarantee no visible cut or ghosting between film segments — the eye should
never leave the subject. Isolated from `media` because a seam is usually a
prompting/matching bug caught after generation, not a re-shoot.

## When to run it
- After `media` generates clips, before/during `film` frame extraction.
- A visible seam, band, or "ghosting" double-exposure appears between
  segments.
- User phrasing: "the transition is jumpy", "fix the seam between clips",
  `transitions`.

## What it does
1. **Never cross-dissolve two different stills** to fake a morph — any
   transformation must be a real generated video clip.
2. **Boundary match**: clip N's end-image must equal clip N+1's start-image
   — literally the same keyframe file, passed as both references when
   generating each clip. This makes the handoff frame identical, so
   scrubbing across the join is invisible.
3. **Match edges and background across every keyframe** — identical
   background spec and explicit edge color in every prompt (e.g. "seamless
   warm off-white #FBF8F2 fading to the same tone at every edge" for light,
   or "deep near-black #0B0805 at every edge" for dark). Mismatched edges
   show as a visible band once stitched.
4. **Bridge big composition jumps** (e.g. full-screen object → small object)
   with an intermediate "gather" keyframe and split into two clips rather
   than forcing one hard morph.
5. Keep camera/motion slow and locked; prompt "no cuts, no flicker, slow
   motion, no morphing artifacts" — add "no face distortion" for any clip
   with people.
6. When extracting frames (`film`/`media`), **drop the duplicated first
   frame** of clips 2..N so the boundary match doesn't double up a frame.

## Output convention
```
Keyframe pattern:
K1 ──V1──▶ K2 ──V2──▶ K3 ──V3──▶ K4     (K2 = end of V1 = start of V2)
```

## Checklist
- [ ] No cross-dissolved stills anywhere in the film
- [ ] Every clip boundary uses the identical keyframe file on both sides
- [ ] Edge/background color spec identical across all keyframes in the
      sequence
- [ ] Duplicated boundary frames dropped during extraction
