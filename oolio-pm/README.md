# Oolio Product Management (oolio-pm)

A single Cowork plugin bundling Oolio's product-management skills. Install it once and the whole set is available.

## What's inside

**Discovery and grooming**

- `jpd-loop` — runs the full Virtual Product Council grooming loop over one JPD idea, end to end, and writes the result back to Jira. Depends on the council skills and `jpd-idea-groomer`, both bundled here.
- `jpd-idea-groomer` — brings a JPD idea up to Oolio's JPD Field Standards.
- `jpd-title-standard` — grooms JPD idea titles to the JPD Title Standard (max 65 characters, sentence case, capability-led with a clear outcome). Works on pasted text, a single idea, or in bulk via JQL.

**The Virtual Product Council**

- `convene-vpc` — the orchestrator. Chairs the subcommittees and records a validated decision.
- `operator-council-review` — the hospitality user personas (the UAT panel).
- `design-council-review` — the expert design and research lenses.
- `leadership-subcommittee-review` — the executive and commercial lenses.
- `storm-research` — the research engine that grounds the decision in cited evidence first.
- `personas-library/` — a self-contained snapshot of the persona library the council reads from.

**Definition and specs**

- `write-prd` — writes an Oolio PRD from a groomed JPD idea or brief, in the live Oolio PRD format, and publishes it to Confluence.
- `grill-my-prd` — grills a Confluence PRD one question at a time, then records the outcome as a versioned child page and badged in-place amendments.

**Launch and GTM**

- `gtm-handover` — the executive GTM handover: One-Pager and Supporting Deck, and the `pack_content.json` narrative the other GTM skills read.
- `gtm-playbooks` — the internal Sales, Account Management, and Onboarding playbooks.
- `gtm-marketing` — the Marketing Pack: launch announcement, social, email sequence, sales note, campaign brief.

**Jira authoring helpers**

- `jira-epic-groomer` — grooms an epic description to the standard What/Why/Who pattern.
- `jira-epic-titler` — proposes stronger epic titles to the `[Capability] for [Outcome]` standard.

**Thinking partners**

- `grill-me` — interviews you relentlessly about a plan, decision, or design until every branch of the decision tree is resolved. For Confluence PRDs, prefer `grill-my-prd`.

**Product context**

- `products/` — one brief per Oolio product, the facts skills may rely on. Scaffolded; briefs are added as product owners supply them.

## Keeping the persona library in step

The council reads from `personas-library/` inside this plugin, which is a snapshot. When the live persona library changes, re-bundle the snapshot so the plugin stays current.

## Editing and publishing

See `../PUBLISHING.md` in the marketplace root.
