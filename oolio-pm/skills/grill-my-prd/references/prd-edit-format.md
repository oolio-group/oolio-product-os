# PRD in-place edit — format reference

How to write the grill decisions back onto the PRD itself. The goal is a PRD that reads as a living document: the original intent is still visible, every change is obvious, and the reasoning is one click away. A reviewer should be able to skim the badges and strikethroughs and understand exactly what the grill changed and why.

## Contents

1. [The five rules](#the-five-rules)
2. [Status badge vocabulary](#status-badge-vocabulary)
3. [The header banner](#the-header-banner)
4. [Per-section edit patterns](#per-section-edit-patterns)
5. [Decision blocks and grill references](#decision-blocks-and-grill-references)
6. [First-run vs multi-run](#first-run-vs-multi-run)
7. [Mechanics and safety](#mechanics-and-safety)

---

## The five rules

1. **Never delete.** Every word of the original stays. Superseded text is struck through, not removed.
2. **Strike, then replace.** Wrap superseded text in `<s>...</s>` and add the new text immediately after, prefixed with a status badge.
3. **Tag every change** with a status badge so it is visible at a glance.
4. **Record the decision** as a decision component under the amended section.
5. **Reference the grill** — a header banner linking the child page, and a "Source: Grill-me session N" link under each decision block.

These make the edit reversible in the reader's mind: they can always see what it used to say.

## Status badge vocabulary

Inline status nodes: `<span data-type="status" data-color="COLOUR">LABEL</span>`

| Label | Colour | Use |
|---|---|---|
| `GRILLED · SESSION N` | green | header banner, marks the PRD as grilled |
| `GRILL` | blue | header banner note line prefix |
| `AMENDED` | green | replacement text for something struck through |
| `ADDED` | green | brand-new content (section, bullet, requirement) |
| `RESOLVED` | green | an open question now answered |
| `OPEN` | yellow | a question still genuinely open / deferred |

Keep the labels exactly these words so the PRD reads consistently across sessions.

## The header banner

Add, inside the PRD's existing top info panel (preserve the existing status nodes and their `data-local-id`), two things:

1. A `GRILLED · SESSION N` green status beside the existing DRAFT/status line.
2. A new paragraph marking the amendment:

```html
<p><span data-type="status" data-color="blue">GRILL</span> Amended on <time datetime="YYYY-MM-DD">D Month YYYY</time> from grill-me session N. Superseded text is struck through, decisions are recorded inline, and full rationale sits in the child page: <a href="CHILD_PAGE_URL">Grill-me — PRD_SHORT_TITLE, session N</a>. [PRD-specific deferral note.]</p>
```

Also add the child page to the PRD's **Related** line at the bottom.

## Per-section edit patterns

Work section by section. The common shapes:

**Replace a phrase inside a sentence:**
```html
... can create <strong>multiple brand profiles</strong> and <s>assign them to specific locations or concepts</s> <span data-type="status" data-color="green">AMENDED</span> stamp them onto whatever consumes them: venues, campaigns, journeys, or audiences.
```

**Replace a whole bullet:**
```html
<li><p><s><strong>Profile resolution:</strong> a clear order for which profile applies to a given send.</s> <span data-type="status" data-color="green">AMENDED</span> <strong>Profile stamping:</strong> every created object carries a mandatory profile stamped at creation, auto-pre-filled and overridable, stored as a live reference.</p></li>
```

**Extend a bullet (keep original, add nuance):**
```html
<li><p>Original text kept verbatim. <span data-type="status" data-color="green">AMENDED</span> The added nuance from the decision.</p></li>
```

**Add a brand-new bullet:**
```html
<li><p><span data-type="status" data-color="green">ADDED</span> <strong>Governance:</strong> role-based control — org-admin edits, assignment delegable to venue managers.</p></li>
```

**Add a brand-new section:**
```html
<h2>Governance <span data-type="status" data-color="green">ADDED</span></h2>
<p>The new section body.</p>
```

**Resolve / re-open an open question:**
```html
<li><p><s>The original open question.</s> <span data-type="status" data-color="green">RESOLVED</span> The short answer.</p></li>
<li><p><span data-type="status" data-color="yellow">OPEN</span> A question genuinely still open, with why it is deferred.</p></li>
```

## Decision blocks and grill references

After each section you amended, add a decision list capturing the decisions that touched that section, then a source link:

```html
<ul data-type="decision-list">
  <li data-type="decision-item" data-state="DECIDED">The decision, one line.</li>
</ul>
<p><em>Source: <a href="CHILD_PAGE_URL">Grill-me session N</a>.</em></p>
```

Put decision lists at the top level (after the section's content), not inside panels — panels cannot contain them reliably. Decision items are inline-only: one line each, no nested blocks.

Also fix the PRD's own **Success metrics**, **Non-goals**, **Dependencies**, and **Open questions** where the grill changed them — these are the sections most often amended, because they are where a grill does its sharpest work.

## First-run vs multi-run

**First run (session 1):**
- Add the header banner with `GRILLED · SESSION 1`.
- Strike and replace superseded text; add `AMENDED`/`ADDED`/`RESOLVED`/`OPEN` badges.
- Add decision blocks + "Source: Grill-me session 1" links.

**Multi-run (session N, N > 1):**
- **Do not re-strike or overwrite text that a previous session already amended.** Leave prior `AMENDED`/`ADDED` blocks and their strikethroughs as they are — they are the record of session N-1.
- Update the header banner: change/append the status to `GRILLED · SESSION N`, and add a new `GRILL` note line for session N (keep the prior session's note line above it) linking session N's child page. The banner should show the PRD has been grilled multiple times, with links to each session.
- For new changes this session, use fresh badges. If this session **supersedes an earlier amendment**, strike the earlier *amended* text too (yes, you can strike a previous AMENDED block) and add the new one tagged `AMENDED` with a note like "(session N)" so it is clear which sitting changed it. The rule "never delete" still holds — you strike the superseded amendment, you do not remove it.
- Add new decision blocks with "Source: Grill-me session N" links. Leave prior sessions' decision blocks in place.
- Move any newly resolved `OPEN` items to `RESOLVED`; add any newly opened questions as `OPEN`.

The effect over time: the PRD accumulates a visible, layered history — original text, then session 1's amendments, then session 2's, each tagged and sourced, nothing ever lost.

## Mechanics and safety

- **Fetch the PRD as `html` first** (`getConfluencePage`, contentFormat `html`) so you edit the real body and keep existing `data-local-id` attributes on nodes you retain. Preserve those ids; omit `data-local-id` on new nodes.
- Update with `updateConfluencePage`, `contentFormat` `html`, and a `versionMessage` naming the session, e.g. `Amended from grill-me session 1: strikethroughs, decision components, grill references`.
- After updating, re-fetch (markdown is fine) and confirm strikethroughs (`~~...~~` in markdown export), badges, decision lists, and links are present. In the flattened markdown view decision-item lines run together — that is only the export; they render as proper decision blocks in the Confluence UI.
- If the update is rejected for invalid HTML, the error is descriptive — most often a nesting violation (decision list inside a panel, or a block inside a decision/task item). Move the offending node to the top level and retry.
