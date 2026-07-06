# Council review output template (standalone runs)

The shared output shape for `operator-council-review`, `design-council-review`, and `leadership-subcommittee-review` when they run standalone (not inside `convene-vpc` or `jpd-loop`). Inside a full council run, the Chair's decision record (`skills/convene-vpc/references/decision-record-format.md`) is the format; inside jpd-loop, the recording contract (1–3 key decisions only) is. This template covers the case where a user asks for one panel directly and needs a complete, readable result.

Substitute "persona" / "lens" / "seat" for the panel being run.

```
## <Panel name> review: <subject, one line>

**Date:** <YYYY-MM-DD>
**Convened:** <the personas / lenses / seats run, and the segment or surface that selected them>
**Deliberately left out:** <who was not run, and why in a few words>

### Verdicts

| Persona / Lens / Seat | Verdict | Why (in its own terms) |
|---|---|---|
| <name> | Pass / Pass with changes / Fail | <the specific reason, one or two lines> |

### Clashes

1. **<lens A> vs <lens B>** — <each side's position in its own terms, two lines>.
   Resolution: <how the decision rule resolves it, or "unresolved, needs the Chair">.

(If no genuine clash surfaced, say so and say why that is credible rather than a sign the panel was too narrow.)

### Changes required

Ranked. Each change names the verdict it would move.

1. <change> — moves <persona/lens/seat> from Fail to Pass.
2. …

### Summary

<Two or three sentences: the overall read, what must be true before this moves, and the sharpest risk if it ships as-is.>

**Confidence:** High / Medium / Low — <one line on what drives it>
**Recommended next step:** <present to the Chair via convene-vpc / apply the changes and re-run / proceed>
```

Rules:

- Every verdict carries a reason in the persona's, lens's, or seat's own terms. A bare Pass is worthless.
- Clashes are the value. Never resolve one quietly; either apply the panel's decision rule visibly or hand it up.
- Changes are ranked and specific enough to act on without re-reading the whole review.
- House style throughout (`references/house-style.md` at the plugin root).
