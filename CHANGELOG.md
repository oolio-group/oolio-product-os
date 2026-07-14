# Changelog

All notable changes to the **oolio-pm** plugin, newest first. The plugin is versioned **by git commit** (there is no `version` field in the manifests, by design), so new entries are dated rather than numbered. Every change updates this file (see [CLAUDE.md](CLAUDE.md)). Entries below that carry version numbers are the historical record from before the switch.

## 2026-07-14 — Commit-based versioning; repo-URL install restored

Fixes the root cause of edits not reaching the team. The plugin no longer carries a `version` field in either `oolio-pm/.claude-plugin/plugin.json` or the `marketplace.json` plugin entry, so **every commit is a new version** and updates propagate without a manual bump. This also removes the duplicate version pin (it was set in both files; the plugin spec warns against that, as `plugin.json` silently wins and stale numbers block updates).

- **README.md and PUBLISHING.md rewritten** to make repo-URL install the supported path, with a team `settings.json` snippet that sets `"autoUpdate": true` (private marketplaces do not auto-update otherwise). The release zip is retained only as a Cowork fallback, pending a clean re-add test in Cowork.
- **CLAUDE.md** maintenance rule updated: no version to bump; do not reintroduce a `version` field.
- No skill content changed.

## 0.10.1 — 2026-07-13

Packaging fix: the release zip now installs. No plugin content changed from 0.10.0.

- **`scripts/package-plugin.sh` zipped the wrong root.** It ran `zip -r … oolio-pm`, which wraps everything under a top-level `oolio-pm/` folder, putting `plugin.json` at `oolio-pm/.claude-plugin/plugin.json` and skills at `oolio-pm/skills/…`. Cowork's local upload (and the Claude plugin loader) expect `.claude-plugin/plugin.json` and `skills/` at the **archive root**. Result: the v0.10.0 zip uploaded, showed the plugin name and toggle, but reported "This plugin doesn't have any skills or agents." This bug affected every script-built zip since v0.9.5; the last install that worked (v0.9.3) was zipped by hand before the script existed, with the contents already at root.
- **Fix:** the script now zips the *contents* of `oolio-pm/` from inside the directory, so the archive root is the plugin root, and asserts `.claude-plugin/plugin.json` is at the root before finishing (fails loudly otherwise).
- The v0.10.0 release zip is superseded; install from the v0.10.1 release.

## 0.10.0 — 2026-07-13

JPD operating-model alignment (EVITA-87 + EVITA-88, one release): the skills catch up with the live instance and every backlog sweep gets guard rails. Decisions recorded on EVITA-77 plus Niel's 13 Jul rulings. Middle-number bump because the release adds new abilities (Horizon proposal, stage-gating, customer connection, new steering-pack sections), per the versioning rule above.

- **field_standards.md**: new "Canonical statuses and mandatory JQL guards" section — the 2026-07-13 workflow merge (Planning + Ready for Engineering → `Ready for delivery`, lowercase d), two mandatory guards for every OHSI query (`issuetype = Idea` + the `Idea archived` filter), and the VPC-verdict → exit-status mapping. cf11553 documented under its new name **Investment Type**; **Horizon** (cf11744) added with the skills-propose/Steering-decides rule; **Escalate** corrected to `1`/`0` writes; **Likes** (cf11710) protected as the public-portal voting field; **Revisit on** (`customfield_11811`, Polaris date, verified attached) documented for the targeted Not Now bubble-up; interval fields marked verified-unwritable; new dynamic-fields blind-spot section; delivery-linking standard (`Polaris work item link` from Ready for delivery onward).
- **Archived guard verified live and corrected.** Both JQL spellings proposed in the runbook (`"Idea archived[Select List (single choice)]"`, `"Idea archived[Dropdown]"`) match nothing in this instance, and a bare `!= Yes` also excludes ideas with the field empty (every non-archived idea), silently returning zero results. The shipped guard is the tested form `(cf[10835] IS EMPTY OR cf[10835] != Yes)`, verified 2026-07-13: it returns the live backlog and excludes exactly the 43 archived ideas.
- **jpd-idea-groomer**: Category → Investment Type throughout; Horizon added to the audit axes, quick-reference table and proposed-fields output (propose-only, Steering owns the value); stage-gating recorded — the full standard applies from Exploring, Captured only needs title + sketch + Source (EVITA-80 ruling). examples.md updated to match. No Steering Score — ruled Won't Do (EVITA-81). Grill amendments: Escalate documented as `1`/`0` (never `true`/`false`) consistently with field_standards.md, and the proposed-fields template now presents Migration Relevance as the legacy-product picker, not Yes/No. atlassian_mcp.md's "Category" trap note updated to the Investment Type name.
- **jpd-loop**: de-dupe sweep carries the mandatory guards; Environment section records the post-Decision exit mapping; step 7 gains an offer to create the implements link when a delivery epic already exists; field-map.md gains canonical statuses, the Escalate 1/0 rule, the Revisit on pointer, and the verified-interval verdict on VPC Last Run; insights-and-citations.md rewritten — native Insight creation is now possible via the Polaris GraphQL API (Atlassian AI-clients guidance, May 2026) but only from a local runtime, so paste-ready lists remain the loop's workflow pending EVITA-86.
- **feedback-to-idea**: guards on the de-dupe sweep; new customer-connection step (`Discovery - Connected` links; Customer records only for recurring/strategic accounts; customer-name labels banned).
- **steering-pack**: guards; Horizon + Delivery link? columns; missing-delivery-link = fitness failure; new "Back from the freezer" and "Shipped 90-day checks due" sections.
- **jpd-title-standard**: guards on the bulk-audit JQL; the evidence-first field list updated to the Investment Type name.

## 0.9.5 — 2026-07-09

Distribution: the release zip is now the official install path; the Cowork marketplace path is retired until Anthropic fixes their cache.

- All recovery steps for the marketplace cache are exhausted: both slugs are burnt (`oolio-pm-plugin` frozen at 0.3.3, `oolio-pm-plugins` at 0.5.0), the Update button does nothing, and remove-and-re-add resolves to the same stale record. Nothing pushed to GitHub changes what the marketplace serves.
- Every release is now packaged as `oolio-pm-vX.Y.Z.zip` and attached to a GitHub Release, so anyone can grab the exact current version from the releases page and install it via Cowork's local plugin upload (the path proven working in the v0.9.3 test).
- Added `scripts/package-plugin.sh` to build the zip (it refuses to package on a version mismatch between the two manifests). README and PUBLISHING.md rewritten to make the zip the primary path and warn away from the marketplace option.
- Trade-off accepted: zip installs do not auto-update, so each release is announced and re-uploaded. When Anthropic fixes the cache, the marketplace path can come back.

## 0.9.4 — 2026-07-09

Fix: two skills had unparseable YAML frontmatter and were shipping with empty metadata.

- A fresh `claude plugin validate --strict` pass (run against the current official plugin docs) failed on `convene-vpc` and `storm-research`. Both descriptions were single-line unquoted YAML scalars containing a colon followed by a space ("This is the orchestrator: it runs…", "Runs a 4-phase pipeline: five expert lenses…"), which YAML cannot parse. At runtime the whole frontmatter block was silently dropped, so those two skills loaded with no name and no trigger description, breaking auto-invocation.
- Converted both descriptions to the `>-` folded block style already used by grill-my-prd and jpd-loop. Text unchanged. The full plugin now passes `claude plugin validate --strict` with zero errors.

## 0.9.3 — 2026-07-07

Fix: plugin description brought under Cowork's 500-character validation cap.

- Niel's local zip-upload test surfaced a real validation failure: "Plugin description must be at most 500 characters." The plugin.json description was 600 characters, and notably had been over the cap since at least v0.5.0 (552 characters), so the breach predates the audit build-out; the marketplace install path simply never enforced it, while the local-upload path does.
- Rewrote the description to 394 characters and aligned marketplace.json to the same text.
- Practical consequence: **local zip upload is now a working distribution path** that bypasses the stuck server-side marketplace cache entirely. Download the repo zip from GitHub, upload the `oolio-pm` folder via Cowork's Settings → Plugins → Add → Upload local plugin.

## 0.9.2 — 2026-07-07

Docs: the Cowork stale-cache issue is now documented for teammates.

- New evidence narrowed the diagnosis: Cowork's backend caches one snapshot per source slug, taken when the marketplace is first added, and never refreshes it (the singular slug is frozen at 0.3.3 from the rename day; the plural slug at 0.5.0 from the day it was first tried). The scheduled re-sync assumed earlier does not happen.
- Added a "Known issue — Cowork can serve a stale version" section to PUBLISHING.md with the check (CHANGELOG on GitHub is the truth) and the recovery steps (Update button, then the unused slug, then Anthropic support), and a pointer in the README install section.
- The durable fix sits with Anthropic's backend; a bug report is being raised. Nothing in this repo can force their cache to refresh.

## 0.9.1 — 2026-07-07

Cache-bust: marketplace identity renamed to unstick Cowork's stale sync.

- Niel reinstalled the plugin in Cowork and received v0.3.3 with nine skills — exactly the version at which the GitHub repo was renamed from `oolio-pm-plugins` to `oolio-pm-plugin` (2026-07-01). GitHub serves v0.9.0 correctly at HEAD, so the evidence points at Cowork's server-side marketplace cache having frozen at the rename, with remove/re-add resolving back to the same stale record.
- **Renamed the marketplace itself** in `marketplace.json` from `oolio-pm-plugins` to `oolio-pm-plugin` (now matching the repo), bumping `metadata.version` to 2.0.0 per the maintenance rule. If Cowork keys its cache by marketplace name, adding the marketplace afresh now creates a new record and syncs from scratch.
- Refreshed both manifest descriptions and the plugin keywords, which still described the eleven-skill era; they now describe the full nineteen-skill toolkit.
- Anyone who installed under the old marketplace identity should remove the old marketplace entry in Cowork and add `oolio-group/oolio-pm-plugin` fresh.

## 0.9.0 — 2026-07-06

Persona library expansion: seven new UAT personas, one leadership seat, two design lenses. Shipped via pull request rather than direct to main.

- **Stadia trio** (the vertical segments.md held open for swiftpos's market, all at one invented benchmark stadium so the account is coherent): Michael "Mick" Torrance (catering director, contract-caterer P&L), Danielle "Dani" Hartigan (venue operations manager, event-day F&B), Josh Bennett (concourse bar supervisor, event-day frontline). Stadium kitchen/BOH deliberately left open.
- **Mid-market back of house closed**: Sofia Marchetti, kitchen operations director of a 14-venue casual-dining group. The coverage grid no longer has an empty cell.
- **Enterprise buyer side part-closed**: Devinder "Dev" Chandra, IT and systems manager (the enterprise deal gate: security, PCI scope, change control), filed at the same invented estate as the enterprise COO. Lucy Tran, finance manager and bookkeeper of a six-venue group (month-end close, payout reconciliation, tips and GST), filed in back-of-house beside the stock controller as head-office cost-and-control.
- **First US persona**: Danielle "Dee" Alvarez, GM of a high-volume Austin smokehouse: tip pooling, sales tax, card-first payments, aggregator dominance. Exists to test whether AU/UK-shaped assumptions travel. (Nickname set to Dee to avoid colliding with Dani Hartigan; nicknames are the invoke-by-name handle.)
- **New Leadership Subcommittee seat (conditional)**: Payments Risk Lead, the fraud/chargeback/settlement/PCI/onboarding-risk lens previously spread across CFO, Security, and Legal. Convened when a decision touches money movement, payment flows, refunds, settlement, or Oolio Pay.
- **Two new Design Council lenses**: Edward Tufte (data and evidence display: dashboards, reporting, information density under pressure) and Ben Shneiderman (human-centred AI and control: comprehensible, predictable, controllable automation). Assignment matrix gains Dashboards-and-analytics and AI-suggestions rows, BackOffice reporting now carries Tufte, and the standing rule "always include Shneiderman on anything that recommends, drafts, or acts on the operator's behalf" is added. Both lenses build only on published work, no invented quotes, per the panel rule.
- **Integration**: personas.md, segments.md (all four views), uat-panel/design-council/leadership READMEs, and both council skills updated; lens counts corrected (twelve to fourteen, sixteen to seventeen). segments.md View 4 is also now **reconciled against the live JPD Applicable Segments picklist** (fetched 2026-07-06) with an explicit mapping rule, closing the reconcile-later note from 2026-06-24.

## 0.8.0 — 2026-07-06

Three new skills closing the intake, prioritisation, and measurement gaps. Nineteen skills total.

- **New skill `feedback-to-idea`.** The intake end of discovery: raw customer/support/sales signal in (pasted feedback, Slack thread, HubSpot ticket, support trend), a well-formed JPD idea out — or, more often, the signal attached to an existing idea, because the skill de-dupes against the whole backlog before ever creating. Carries quotes verbatim, sets signal strength from actual evidence (never inflated), reuses jpd-idea-groomer's canonical field standards, supports bulk sweeps, and hands off to jpd-loop.
- **New skill `steering-pack`.** Builds the Steering/roadmap review pack over a backlog slice: objective fitness checks (title standard, field completeness), VPC verdicts and rubric scores, a per-idea "ask" (an item with no ask does not belong in the pack), a recommended discussion order, and a not-fit list with owners. Published to Confluence append-only, summarised in chat. Reports and orders; the room decides.
- **New skill `metrics-review`.** Closes the loop the PRD opened: launch validation against the PRD's own success metrics, or a recurring product review, from real data (PostHog MCP first, other connectors or user-supplied numbers marked as such). Every figure traces to a source and window; metrics whose measurement dependency does not exist are reported as Unmeasurable with an owner, never substituted with a vanity proxy.
- Repo hygiene: untracked `.claude/settings.json` (machine-specific session permissions, not plugin content) and added `.claude/` to `.gitignore`.

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
