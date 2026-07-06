---
name: jira-epic-groomer
description: Groom or backfill the description on a Jira epic so it follows Oolio's standard What/Why/Who pattern. Trigger PROACTIVELY whenever the user references a Jira epic key (`OR-XXXX`, `EDU-XXXX`, `IDEA-XXXX` flagged as Epic, etc.) and asks to "describe", "groom", "polish", "backfill", "tidy up", "sharpen", "rewrite", or "write a description for" the epic. Also trigger when the user asks to standardise epic descriptions across a project, get an epic ready for Steering or roadmap review, or pastes a PRD link and asks for the matching epic description. Prefer this skill over generic writing help whenever an epic-level Jira ticket needs a clean, high-level description. Do NOT trigger for stories, tasks, bugs, sub-tasks, or JPD ideas. Use `jpd-idea-groomer` instead for IDEA / DISC / JPD tickets.
---

# Jira Epic Groomer

Produce a tight, three-section description for a Jira epic. The structure is **What**, **Why**, **Who it's for**. Final descriptions are not a thesis. They are a high-level steering document that anyone reading the epic for the first time can grasp in under thirty seconds.

This skill is **draft-then-confirm by default**. Show the draft to the user, get explicit approval, then push to Jira. Epics are visible to a wide audience and the description shouldn't churn in front of them. If the user explicitly says "just push it", skip the confirm step.

---

## The standard (the three questions every epic answers)

A well-groomed epic description answers exactly three things, in this order, and nothing else.

1. **What** are we delivering? Plain language. The surface that ships and the user-visible change. No implementation detail.
2. **Why** are we doing it? The operator pain or business outcome the epic addresses, and the cost of not doing it.
3. **Who** is it for? Two or three personas that genuinely benefit, each with a one-line job to be done.

If any of these three are weak or missing from the source material, ask the user before drafting. A focused question is cheaper than a polished draft built on assumptions the team doesn't share.

---

## Workflow

### 1. Fetch the epic

Use the Atlassian MCP. The cloudId is `oolio.atlassian.net` for Oolio.

```
mcp__atlassian__getJiraIssue
  cloudId: oolio.atlassian.net
  issueIdOrKey: <EPIC-KEY>
  responseContentFormat: markdown
```

Confirm `issuetype.name` is `Epic`. If it's a Story, Task, Bug, Sub-task, or JPD Idea, stop and tell the user. This skill is epic-only. For JPD ideas, point them to `jpd-idea-groomer`.

Capture the existing summary, description, status, assignee, and any linked Confluence pages or PRDs.

### 2. Pull child stories for context

If the epic has children, scan them to ground the **What** section in what actually shipped, not just the epic title. Don't quote child stories. Their text is acceptance-criteria flavoured and won't survive a steering audience.

```
mcp__atlassian__searchJiraIssuesUsingJql
  cloudId: oolio.atlassian.net
  jql: parent = <EPIC-KEY> ORDER BY rank ASC
  fields: ["summary", "status", "issuetype", "assignee", "resolution"]
```

If the response is too large to load inline, dispatch a subagent to extract one-line summaries per child and report back.

### 3. Look for a linked PRD

Check the existing description, comments, and any obvious linked Confluence pages for a PRD page. Capture the URL and title if there is one. The PRD footer is optional. Skip the line entirely if no real PRD exists. Don't link a Jira ticket, a Slack thread, or a deck and call it a PRD.

### 4. Draft the description

Use the **Output template** below. Keep it tight. The whole description should fit on a single screen without scrolling. If you're past about 200 words, you've gone too long. Apply the **Writing style** rules to every section.

### 5. Show the draft, then write

Present the draft to the user. Ask for confirmation. Once they approve, push:

```
mcp__atlassian__editJiraIssue
  cloudId: oolio.atlassian.net
  issueIdOrKey: <EPIC-KEY>
  contentFormat: markdown
  fields: { "description": "<the draft>" }
```

If the user wants changes, edit and reconfirm. Don't push to Jira until you have explicit approval.

---

## Output template

Use this exact structure. The bold section labels must be present. Short paragraphs in **What** and **Why**. Bullets only in **Who it's for**.

```
**What**

[1 to 3 sentences. Plain language. Describe what this epic delivers and the surface it touches. Avoid jargon and implementation detail.]

**Why**

[2 to 4 sentences. Describe the problem the epic solves and the cost of not doing it. Anchor in operator pain or business outcome, not in features.]

**Who it's for**

* **[Persona 1]** [one-line job to be done].
* **[Persona 2]** [one-line job to be done].
* **[Persona 3]** [one-line job to be done].

Full PRD: [<PRD title>](<PRD url>)
```

The "Full PRD" footer is optional. Include it only when there's a real PRD page to link to. Drop the line otherwise.

---

## Writing style

The user's house style is tight and slightly informal. Apply it to every section.

Punctuation:

* No em dashes. Use commas, periods, or rewrite the sentence.
* Avoid semicolons. Use periods, "and", or "but".
* No mid-sentence ellipses unless they signal hesitation.
* Limit parentheses. Blend extra detail into the main sentence.
* Use colons sparingly. Avoid announcing lists with "Key points:".

Language:

* Drop hedging like "however" or "it's worth noting". State directly.
* Cut filler transitions like "furthermore" or "in conclusion".
* Vary repeated words.
* Use contractions when the tone is informal.
* Swap formal words. "use" not "utilize", "find out" not "ascertain", "use" not "leverage", "help" not "facilitate".

Style:

* Concise sentences with varied length.
* Slight imperfections are fine. Natural tone.
* Adjust formality to fit the audience without losing meaning.

---

## Personas to consider

For Oolio epics, lean on the standard operator personas. Pick two or three that genuinely benefit. Don't list every persona to look thorough. If only one persona benefits, only list one.

The names below are epic-description shorthand for the full persona library bundled with this plugin (`${CLAUDE_PLUGIN_ROOT}/personas-library/`, indexed in `personas.md`). When you need more than a name (what the persona actually does, cares about, or would reject), read the relevant persona file rather than guessing.

* **Single-venue operator / owner-operator.** Runs one venue. Hands-on. Cares about cash and margin.
* **Multi-venue operations manager.** Runs several sites. Needs comparison and rollup. Spots outliers.
* **F&B lead / Executive chef.** Owns menu and recipe profitability, modifier strategy, and ingredient costs.
* **Front-of-house / cashier / floor manager.** Uses the POS in service. Cares about speed and reliability.
* **Back-office / finance / accounting.** Reconciles sales, taxes, payouts.
* **Oolio internal teams (CS, Onboarding, Sales).** Show up for tooling and enablement epics.

---

## Worked example

Source epic: `OR-2417` (Product Level & Menu Insights). Final description:

```
**What**

Uplift Oolio's product-level reporting by introducing a new **Product Report** with three switchable views, **Product Performance**, **Menu Engineering**, and **Modifier Analysis**, plus a view selector. Replaces a flat list of products and sales numbers with a decision-oriented surface that shows operators what to promote, what to fix, and what to consider removing.

**Why**

The existing product-level reporting told operators what sold, but not which products to act on. There was no menu engineering classification (Stars, Puzzles, Plowhorses, Dogs), no mover analysis vs a comparison period, no proportional category view, and no modifier rollup. Menu, pricing, and procurement decisions were being made on intuition or by exporting raw data into spreadsheets. This epic closes that gap inside the POS reporting suite.

**Who it's for**

* **Single-venue operators** for a daily or weekly check on what's selling, growing, and slipping.
* **Multi-venue operations managers** to compare across venues, spot outliers, and decide where to push inventory or run promos.
* **F&B leads and executive chefs** to make menu and pricing decisions using the Star, Puzzle, Plowhorse, Dog classification and modifier-level breakdown.

Full PRD: [Product Level & Menu Insights - PRD](https://oolio.atlassian.net/wiki/spaces/in/pages/1023115270/Product+Level+Menu+Insights+-+PRD)
```

Note the small details. No em dashes. Bold persona names with a sentence-style follow-on, not a colon. The PRD footer is a single line at the bottom.

---

## Common mistakes

* **Writing a thesis.** Long is wrong. The reader has thirty seconds.
* **Listing every child story in the What section.** What says what the epic delivers. Implementation detail belongs in the stories.
* **Using em dashes, semicolons, or "however".** The house style is tight and informal.
* **Naming personas that don't benefit.** If finance won't ever look at this, don't list finance.
* **Forgetting to confirm before pushing.** Epics are public to the team. Show the draft first.
* **Adding sub-headings inside the three sections.** Plain prose only. The structure is What, Why, Who, full stop.
* **Linking a non-PRD as a "PRD".** Only link to a real PRD page. A Jira ticket, a deck, or a Slack thread doesn't count.
