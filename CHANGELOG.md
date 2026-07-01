# Changelog

All notable changes to the **oolio-pm** plugin, newest first. The version here matches the `version` in `.claude-plugin/marketplace.json` and `oolio-pm/.claude-plugin/plugin.json`. Every release updates this file (see [CLAUDE.md](CLAUDE.md)).

Versioning: last number = fix or wording, middle = new ability or skill, first = a big change to how the plugin is used.

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
