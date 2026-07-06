---
name: grill-my-prd
description: >-
  Relentlessly interview the user about a Confluence PRD one question at a time,
  resolve its decision tree, then record the outcome as a versioned child
  "Grill-me" page under the PRD AND amend the PRD in place (strikethroughs,
  decision components, status badges, grill references). Trigger PROACTIVELY
  whenever the user pastes a Confluence PRD URL and asks to "grill me on this
  PRD", "grill this PRD", "pressure-test this PRD", "run grill-me on the PRD",
  "stress-test this spec", "poke holes in this PRD", or says "grill-my-prd" or "grill my PRD" —
  even if they only paste the PRD link. Prefer this over the generic grill-me
  skill whenever the thing being grilled is a Confluence PRD, because this skill
  also produces the versioned decision record and edits the PRD. Do NOT trigger
  for grilling a plan, design, or idea that is not a PRD (use grill-me), or for
  grooming a Jira epic or JPD idea (use the groomer skills).
---

# Grill-my-PRD

Interview the user relentlessly about a PRD until you reach shared understanding, walking every branch of the decision tree and resolving dependencies between decisions one at a time. Then persist the result in two places: a **versioned child decision-record page** under the PRD, and **amendments to the PRD itself** in a consistent, reviewable format.

This is the PRD-specialised sibling of `grill-me`. The grilling method is the same; what is added is the **output**: a child page and in-place PRD edits, both following fixed reference formats so every session looks identical and is easy to review.

## The shape of a run

1. Get the PRD (always).
2. Gather grounding context.
3. Run the grill (the core loop).
4. Create the versioned child decision-record page.
5. Amend the PRD in place.
6. Verify and hand off.

Use a task list to track these steps — the user follows along with the widget.

---

## Step 1 — Get the PRD (always ask if it is not already given)

This skill always operates on a specific Confluence PRD. If the user has pasted a PRD URL or page ID, use it. If they have not, ask for the PRD URL before doing anything else — do not grill from memory or a vague description.

Fetch the page with `getConfluencePage` (contentFormat `markdown` for reading, and again as `html` before you edit, since you need the exact body and the existing `data-local-id` attributes). Record the `pageId`, the space (key and numeric `id`), and the page title — you need all three later.

## Step 2 — Gather grounding context (do not ask what you can find)

Before asking the user anything, resolve what you can from context you already hold or can reach:

- The **Oolio persona library and context** bundled with this plugin (`${CLAUDE_PLUGIN_ROOT}/personas-library/`: personas, `_framework/oolio-context.md`, `segments.md`). Ground your recommendations and examples in the real personas the PRD names.
- **Connected sources** — Confluence (linked/child pages, sibling PRDs), Jira (the parent epic or linked issues), Slack, HubSpot. If a question can be answered there, go and answer it instead of asking.
- The PRD's own **open questions, non-goals, dependencies, and success metrics** — these are your richest seam of decision-tree branches.

Only ask the user a question when the answer genuinely cannot be found and it changes what happens next.

## Step 3 — Run the grill (the core loop)

Interview relentlessly, **one question at a time**, in dependency order. For each question:

- **State the branch** and why it matters (what downstream decisions hang off it).
- **Lay out the real options**, not strawmen.
- **Give your recommended answer**, with the reasoning and the trade-off you are accepting.
- **Ask for a decision**, then move to the next branch that the answer unlocks.

Start at the **root dependency** — the decision everything else branches off (often "does the thing this PRD assumes actually exist yet?"). Resolve foundational model questions before detail questions. When the user's answer reframes the model (it often will), say so explicitly, fold it back into the earlier decisions, and carry the new framing forward. Concede when the user is right; hold the line, with a better reason, when the conclusion still stands.

Keep going until every material branch is resolved. Track each resolved decision as you go — that list becomes the child page.

Signals you are done: the open questions are resolved or explicitly deferred; the non-goals and dependencies are confirmed or corrected; the success metrics survive scrutiny; and there are no unresolved forks that change the build.

## Step 4 — Create the versioned child decision-record page

This is the "Grill-me" page that hangs under the PRD. **The format is fixed — follow `references/child-page-format.md` exactly** so every session looks the same.

**Work out the session number first.** Search for existing grill child pages under this PRD and increment:

- Use `getConfluencePageDescendants` on the PRD `pageId`, or `searchConfluenceUsingCql` with `parent = <pageId> AND title ~ "Grill-me"`.
- Count the existing grill pages. This session is **N = count + 1**.
- **First run** (count = 0): create session 1.
- **Subsequent run** (count > 0): create session N, and in the header link back to the previous session(s) so the thread is traceable.

Create the page with `createConfluencePage`, `parentId` = the PRD `pageId`, `spaceId` = the numeric space id, `contentFormat` `html`, title `Grill-me — <PRD short title>, session N`. Populate it per the reference format.

## Step 5 — Amend the PRD in place

Apply the decisions back onto the PRD itself. **The editing format is fixed — follow `references/prd-edit-format.md` exactly.** The non-negotiables:

- **Never delete.** Preserve all original text. Where a decision supersedes text, wrap the old text in `<s>...</s>` (strikethrough) and add the replacement after it.
- **Tag every change** with a status badge: `AMENDED`, `ADDED`, `RESOLVED` (green), `OPEN` (yellow).
- **Record decisions** as decision components (`<ul data-type="decision-list">`) under each amended section.
- **Add grill references** — a header banner marking the page `GRILLED · SESSION N` with a link to the child page, and a "Source: Grill-me session N" link under each decision block.
- **Preserve existing `data-local-id`** attributes on nodes you keep (fetch the page as `html` first).

Update with `updateConfluencePage`, `contentFormat` `html`, and a clear `versionMessage` naming the session.

## Step 6 — Verify and hand off

Re-fetch both pages (`getConfluencePage`, markdown is fine) and confirm the strikethroughs, decision lists, status badges, and links rendered. Note that in the flattened markdown view decision-list items run together — that is just the export; they render as proper decision blocks in the Confluence UI. Present both page links and a short summary of what changed. Offer the next step in the user's workflow (e.g. sending the PRD to the VPC).

---

## Reference files

- `references/child-page-format.md` — the exact structure and HTML for the child decision-record page, with first-run and multi-run cases.
- `references/prd-edit-format.md` — the exact rules and HTML patterns for amending the PRD in place, with first-run and multi-run cases.

Read both before creating or editing pages. They exist so that every grill session, on every PRD, produces output in one identical, reviewable house style.
