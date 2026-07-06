# Changelog

All notable changes to the **oolio-pm** plugin, newest first. The version here matches the `version` in `.claude-plugin/marketplace.json` and `oolio-pm/.claude-plugin/plugin.json`. Every release updates this file (see [CLAUDE.md](CLAUDE.md)).

Versioning: last number = fix or wording, middle = new ability or skill, first = a big change to how the plugin is used.

## 0.7.0 — 2026-07-06

Five new skills and a product-context scaffold: the definition and launch stages of the PM lifecycle join the toolkit. Sixteen skills total.

- **New skill `write-prd`.** Writes an Oolio PRD from a groomed JPD idea, brief, or problem statement and publishes it to Confluence. The format (`references/prd-format.md`) was extracted from the live FY27 Customer Engagement PRDs, not invented: header block with status lozenges, In one line, Governing principle (functional/technical/commercial ownership split), What/Why/Who with named library personas, Scope, Non-goals, Key requirements, Dependencies, Success metrics with measurement dependencies, Open questions with decision owners. Hands off to grill-my-prd and convene-vpc, completing the write → grill → council → deliver loop.
- **Ported `grill-my-prd`** from Niel's personal skill library: the PRD-specialised sibling of grill-me that records the grilling as a versioned child page and badged, non-destructive in-place PRD amendments, with its two fixed-format references. Persona-library path now resolves via the plugin root.
- **Ported the GTM suite** from Niel's personal library and the Insights project: `gtm-handover` (One-Pager + Supporting Deck, and the `pack_content.json` narrative source of truth), `gtm-playbooks` (Sales / AM / Onboarding DOCX playbooks), and `gtm-marketing` (Marketing Pack: announcement, social, email sequence, sales note, campaign brief). The current-generation SKILL.mds are backed by the proven shared pack engine (`build_pack.js`/`.py`, preview and QA scripts, references, and the pack template) consolidated under `gtm-handover`, which the two downstream skills reference relatively. The deprecated `oolio-gtm-pack` single-pack skill was not ported; its engine lives on under gtm-handover.
- **Added `oolio-pm/products/`**: one product brief per Oolio product as the facts skills may rely on, with a template and rules (dated review stamps, no fabrication, public-repo hygiene). Scaffolded empty; briefs land as product owners supply them. Leo1 is a flagged candidate with no source material in the system yet.
- Updated the plugin README with the new skill groups (Definition and specs, Launch and GTM, Product context) and the root layout diagram.

## 0.6.0 — 2026-07-06

Quality pass across the existing skills, from the toolkit audit.

- **Rebuilt `grill-me` from a ten-line stub into a full skill**: operating rules (one question at a time, recommendation attached to every question, evidence before asking, graceful handling of missing connectors), a decision-tree map with branch prioritisation by uncertainty times impact, a stop rule, a written grilling record as the deliverable, and a definition of done. The spirit is unchanged; the behaviour is now specified instead of improvised.
- **Added a shared references folder at the plugin root** (`oolio-pm/references/`): `house-style.md` (the full writing rules the skills previously each carried a fragment of) and `council-review-output.md` (a standalone output template shared by the three council sub-skills, which previously described their output only in prose). The three council skills now point at the template for standalone runs.
- **Unified the title rules.** `jpd-idea-groomer`'s Summary Rules now defer to the JPD Title Standard as canonical (a JPD summary is its title) and align on the 65-character cap; the groomer previously said ~80, which conflicted with `jpd-title-standard`.
- `jira-epic-groomer`: the persona shorthand list now points at the bundled persona library for depth instead of standing alone.
- `convene-vpc`: the domain-panel handoff to `storm-research` is now concrete (name the replacement lenses explicitly, drawn from the persona library, per STORM's Phase 1 panel-swap note).
- `jpd-loop`: added partial-failure guidance for the five-output write-back (finish what can run, report exactly what landed and what did not, never leave a partial run looking complete).
- `storm-research`: the report path now has a fallback (scratchpad or ask) and always states the absolute path in chat.

## 0.5.1 — 2026-07-06

Fixes from the full toolkit audit: missing reference files, stale docs, licence.

- **Created the three `jpd-idea-groomer` reference files the skill has pointed at since 0.1.0 but which never existed**: `references/field_standards.md` (canonical field IDs and option labels, pulled from live Jira field metadata on 2026-07-06, including the real divergences from the Confluence wording such as `Product optimisation`, `FOH Staff`, the pipe-suffixed Delivery Size labels, and the second "Category" field to avoid), `references/examples.md` (strong/weak summary and description pairs across the typical idea shapes, plus field-setting examples), and `references/atlassian_mcp.md` (tool call shapes, write-back patterns, failure isolation, and traps).
- Updated `oolio-pm/README.md` "What's inside" to list all eleven skills; `grill-me` and `jpd-title-standard` had been missing since 0.4.0/0.5.0. Fixed PUBLISHING.md's stale "all nine skills" line to defer to the README.
- Fixed the root README layout diagram: the local folder is `oolio-pm-plugins` while the GitHub repo is `oolio-group/oolio-pm-plugin`; the diagram now says so instead of using the wrong name. The skill count in the diagram now defers to `oolio-pm/README.md` so it cannot go stale again.
- Added a LICENSE: public visibility is for install convenience, not a licence to reuse; all rights reserved to Oolio Group.
- Documented `metadata.version` in CLAUDE.md: it versions the marketplace itself and is only bumped when the marketplace structure changes, not on plugin releases.

## 0.5.0 — 2026-07-02

New skill: `jpd-title-standard`.

- Added `skills/jpd-title-standard/`, a JPD idea-title groomer that enforces Oolio's JPD Title Standard: max 65 characters (target 40–55), sentence case, capability- or verb-led with a clear outcome, no emoji, no bracket/pipe prefixes, no trailing punctuation. Works on pasted text with no Jira access, on a single idea by key/URL, or in bulk via JQL. Draft-only by default.
- Bundled `scripts/check_titles.py`, the objective per-rule validator the skill runs on its own proposals. Left the source skill's dev-time `evals/` folder out to match the plugin's convention (no other skill ships evals).
- Complements `jpd-idea-groomer` (full field/description grooming) and `jira-epic-titler` (epics); the skill hands off to those where relevant.
- Brings the plugin to eleven skills.

## 0.4.0 — 2026-07-01

New skill: `grill-me`.

- Added `skills/grill-me/`, a stress-test skill that interviews you relentlessly about a plan, decision, PRD, or design one question at a time, walking each branch of the decision tree and recommending an answer for each. Triggers on "grill me" or a request to pressure-test thinking.
- Adapted the source skill's closing line for this plugin: it resolves questions from context already given, the bundled personas and Oolio context, or a connected source (Confluence, Jira, Slack, HubSpot) before asking.
- Brings the plugin to ten skills.

## 0.3.4 — 2026-07-01

Governance: this repo is the single source of truth.

- Declared in `CLAUDE.md` that all plugin edits (skills, personas, lenses, templates) are made in this repo and shipped from here; the bundled `oolio-pm/personas-library/` is canonical.
- Put a redirect banner on the legacy working copy at `~/Documents/Claude/personas/` so edits are not made there by mistake.

## 0.3.3 — 2026-07-01

Docs: repo renamed and made public.

- The GitHub repo was renamed `oolio-pm-plugins` → `oolio-pm-plugin` (singular) and set to public. Updated the install URL to the singular name and dropped the org-access prerequisite in the README and PUBLISHING, since a public repo installs without GitHub org membership.
- Noted in the README that the repo is intentionally public and bundles Oolio-internal material.

## 0.3.2 — 2026-07-01

Fix: marketplace manifest location.

- Moved `marketplace.json` to `.claude-plugin/marketplace.json`. Cowork looks for the marketplace manifest at `.claude-plugin/marketplace.json`; at the repo root it was not detected ("This repository isn't a marketplace"). This is what lets teammates add the marketplace.
- Updated the README, PUBLISHING, and CLAUDE maintenance rules to point at the new path.

## 0.3.1 — 2026-07-01

Housekeeping and governance.

- Archived the STORM Subcommittee's five Co-STORM role files (plus its README and template) to `oolio-pm/_archive/`. They were superseded by the `storm-research` skill in 0.3.0. The STORM Subcommittee remains a named council body; only its execution moved. All council docs (`personas.md`, the persona-library `CLAUDE.md`, `vpc-concept.md`) now point to the skill.
- Added this CHANGELOG and a repo `CLAUDE.md` carrying the maintenance rules (bump the version and log every change; archive, never delete).
- Established `oolio-pm/_archive/` as the plugin's archive area, with its own README and the "archive with a dated reason" rule.

## 0.3.0 — 2026-07-01

`storm-research` upgraded to a verified HTML + Confluence research engine.

- Replaced the skill's engine with the five-lens, citation-verified pipeline: Practitioner / Academic / Skeptic / Economist / Historian → contradiction map → synthesized HTML report → adversarial peer review + primary-source verification.
- Phase 0 now asks for the topic and the Confluence destination. New Phase 5 publishes the verified report to Confluence as a faithful native rendering (panels, status lozenges, tables); the local HTML file stays the canonical artefact.
- Preserved council integration through a "council mode": keeps the jpd-loop recording contract (key decisions only), routes recording through the Chair's Decision Log instead of a standalone page, and supports a domain-panel swap so Economist/Historian are not forced onto internal decisions.
- Bundled `report-template.html` with the skill. `convene-vpc` step 4 now calls `storm-research` in council mode.

## 0.2.0 — 2026-06-30

Standard VPC decision-record format.

- Added `skills/convene-vpc/references/decision-record-format.md` as the canonical decision-record output format: fixed section order, status lozenge vocabulary, register ID scheme, and the per-persona / per-lens / per-seat breakdown.
- Wired `convene-vpc`'s output step and the Chair file to it, so there is one format spec rather than two that can drift.
- Docs (2026-06-30, no version change): added a Cowork install guide to the README for Oolio teammates, and corrected the stale repo path and push note in PUBLISHING.md.

## 0.1.0 — 2026-06-29

First release of the `oolio-pm-plugins` marketplace and the `oolio-pm` plugin.

- Nine skills: `convene-vpc` (plus the `operator-council-review`, `design-council-review`, `leadership-subcommittee-review`, and `storm-research` subcommittees), `jpd-loop`, `jpd-idea-groomer`, `jira-epic-groomer`, and `jira-epic-titler`.
- Bundled persona-library snapshot: the Operator Council (UAT panel), Design Council, Leadership Subcommittee, STORM Subcommittee, the Product Council Chair, segments, and the framework reference set.
