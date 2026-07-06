# Child decision-record page — format reference

The "Grill-me" page that hangs under the PRD. Its job is to capture, in one glance, every decision reached in the session plus what was deferred, so it can be handed to the VPC or read months later. Keep it identical across sessions — that consistency is the whole point.

## Contents

1. [Where it lives and what it is called](#location-and-title)
2. [Session numbering](#session-numbering)
3. [Page structure](#page-structure)
4. [HTML building blocks](#html-building-blocks)
5. [Full template](#full-template)
6. [First-run vs multi-run](#first-run-vs-multi-run)

---

## Location and title

- **Parent:** the PRD page (`parentId` = the PRD `pageId`).
- **Space:** the PRD's space (`spaceId` = the numeric space id, not the key).
- **Title:** `Grill-me — <PRD short title>, session N`. Use a short form of the PRD title (drop the "PRD — " prefix). Example: `Grill-me — Brand Profiles (Brand Kit), session 1`.
- **contentFormat:** `html`.

## Session numbering

Always compute N before creating the page:

1. List existing grill children: `getConfluencePageDescendants` on the PRD `pageId`, or `searchConfluenceUsingCql` with `parent = <pageId> AND title ~ "Grill-me"`.
2. `N = (number of existing grill pages) + 1`.
3. First run → session 1. Later runs → session N, with a header link back to the prior session(s).

Never overwrite a previous session's page. Each session is its own immutable record.

## Page structure

In order, top to bottom:

1. **Header panel** (`panel-info`) — one line of metadata (record type, PRD link, owner, session N, date), then a short note that v1 scope / build order is deferred (adjust to the PRD), and on multi-runs a link to prior sessions.
2. **`## Decisions reached`** — a single decision list (`data-type="decision-list"`), one `decision-item` per decision, `data-state="DECIDED"`, each phrased as one self-contained line.
3. **`## Claude's-call items (provisional, veto welcome)`** — a bullet list of calls you made on the user's behalf where they deferred to you.
4. **`## Deferred by design`** — a bullet list of things intentionally NOT decided in this session, with why.
5. **`## Recommended PRD edits (applied on the parent PRD)`** — a task list (`data-type="task-list"`), each item checked, describing the edits you applied to the PRD.

Keep decision-item text to one line each (decision items are inline-only — no nested blocks). Lead each with the topic so it scans.

## HTML building blocks

**Info panel:**
```html
<div data-type="panel-info"><p><strong>Grill-me decision record</strong> · <strong>PRD:</strong> <a href="PRD_URL">PRD short title</a> · <strong>Owner:</strong> Name (Product) · <strong>Session N:</strong> <time datetime="YYYY-MM-DD">D Month YYYY</time></p><p>Short deferral note for this PRD.</p></div>
```

**Decision list:**
```html
<ul data-type="decision-list">
  <li data-type="decision-item" data-state="DECIDED">Topic: the decision, in one line.</li>
  <li data-type="decision-item" data-state="DECIDED">Next topic: the decision, in one line.</li>
</ul>
```

**Task list (checked):**
```html
<ul data-type="task-list">
  <li data-type="task-item"><input type="checkbox" checked> The edit that was applied.</li>
</ul>
```

**Status badge (for provisional/open markers if needed):** `<span data-type="status" data-color="green|yellow|blue|neutral|purple">LABEL</span>`

**Date:** `<time datetime="YYYY-MM-DD">D Month YYYY</time>`

Do not invent `data-local-id` values on new nodes — omit them; Confluence assigns them.

## Full template

```html
<div data-type="panel-info"><p><strong>Grill-me decision record</strong> · <strong>PRD:</strong> <a href="PRD_URL">PRD_SHORT_TITLE</a> · <strong>Owner:</strong> OWNER (Product) · <strong>Session N:</strong> <time datetime="YYYY-MM-DD">D Month YYYY</time></p><p>Shared-understanding record from grill-me session N. [One line on what is deferred, e.g. "v1 scope and build order are deferred to the cross-PRD dependency map."] [Multi-run only: "Builds on <a href='PRIOR_SESSION_URL'>session N-1</a>."]</p></div>

<h2>Decisions reached</h2>
<ul data-type="decision-list">
  <li data-type="decision-item" data-state="DECIDED">DECISION 1 (one line, topic-led).</li>
  <li data-type="decision-item" data-state="DECIDED">DECISION 2 (one line, topic-led).</li>
  <!-- one item per decision reached this session -->
</ul>

<h2>Claude's-call items (provisional, veto welcome)</h2>
<ul>
  <li><p><strong>Topic:</strong> the call you made and the one-line reason.</p></li>
</ul>

<h2>Deferred by design</h2>
<ul>
  <li><p><strong>Topic:</strong> what was not decided, and why / when it will be.</p></li>
</ul>

<h2>Recommended PRD edits (applied on the parent PRD)</h2>
<ul data-type="task-list">
  <li data-type="task-item"><input type="checkbox" checked> Edit 1 applied to the PRD.</li>
  <li data-type="task-item"><input type="checkbox" checked> Edit 2 applied to the PRD.</li>
</ul>
```

## First-run vs multi-run

**First run (session 1):**
- Header panel as above, no prior-session link.
- Decisions reached = everything decided in the session.

**Multi-run (session N, N > 1):**
- Header panel adds a line linking the immediately prior session (and, if useful, the full chain), e.g. `Builds on <a href="...">session N-1</a>.`
- **Decisions reached lists only the NEW or CHANGED decisions from this session**, not a re-listing of everything from prior sessions. If this session *reverses* an earlier decision, state the reversal explicitly as a decision item ("Reverses session N-1: ... now ...") so the change is legible.
- If a prior decision is merely reaffirmed, do not repeat it unless it was contested this session.
- "Recommended PRD edits" lists only the edits this session applied, tagged so they line up with the session-N badges you add on the PRD (see `prd-edit-format.md`).

The child pages are cumulative as a set: session 1 + session 2 + ... read together give the full history. Each page stands for what changed in that sitting.
