# Oolio PM — Skills Catalogue

The plugin ships **19 skills**, organised here by where they sit in the product lifecycle,
signal to shipped. The folders under `oolio-pm/skills/` stay flat (that is what the Claude
Code plugin loader expects). This document is the map; the categories are a reading aid, not
a folder structure.

Use it to find the right skill fast, and to see the gaps.

---

## The six stages

| # | Stage | What it is for | Skills |
|---|-------|----------------|--------|
| 1 | Intake & Discovery | Turn raw signal into shaped, groomed ideas | 5 |
| 2 | Specs & PRDs | Shape ideas into written, pressure-tested specs | 3 |
| 3 | Validation & Councils | Test decisions against the Virtual Product Council | 4 |
| 4 | Delivery & Steering | Jira hygiene and executive-facing packs | 3 |
| 5 | GTM | Take a launch to market | 3 |
| 6 | Analysis | Close the loop after launch | 1 |

---

## 1. Intake & Discovery

Turn customer, support, and sales signal into groomed Jira Product Discovery ideas.

- **feedback-to-idea** — Turn raw customer, support, or sales signal into a JPD idea, or attach it to an existing one, de-duped against the backlog.
- **jpd-idea-groomer** — Groom a JPD idea end to end against Oolio's JPD Field Standards (2026+).
- **jpd-title-standard** — Groom JPD idea titles to the Title Standard: max 65 characters, sentence case, capability-led.
- **jpd-loop** — Run the full Virtual Product Council grooming loop over a single JPD idea, end to end.
- **storm-research** — Multi-perspective, citation-verified research briefing (STORM method), delivered as a clean HTML report.

## 2. Specs & PRDs

Shape an idea into a written spec, then pressure-test it.

- **write-prd** — Write an Oolio PRD from a groomed JPD idea, a brief, or a problem statement, in Oolio's high-level format.
- **grill-my-prd** — Interview you on a Confluence PRD one question at a time, resolve its decision tree, record a versioned grill page, and amend the PRD in place.
- **grill-me** — Relentlessly interview you on any plan, decision, PRD, or design until you reach shared understanding.

## 3. Validation & Councils

Pressure-test a decision against the Virtual Product Council and its expert lenses.

- **convene-vpc** — Convene the full Virtual Product Council to pressure-test a decision, design, requirement, spec, PRD, or piece of research.
- **design-council-review** — Review a design against the Design Council, the panel of expert design and research lenses.
- **operator-council-review** — Test a decision against the Operator Council, the hospitality user personas (the UAT panel).
- **leadership-subcommittee-review** — Test a decision against the Leadership Subcommittee, the executive and commercial lenses.

## 4. Delivery & Steering

Keep Jira clean and build the packs leadership reads.

- **jira-epic-groomer** — Groom or backfill a Jira epic description to Oolio's What / Why / Who standard.
- **jira-epic-titler** — Suggest a stronger epic title using the `[Capability] for [Outcome]` standard.
- **steering-pack** — Build a Steering-ready review pack over a slice of the JPD backlog: per-idea one-liners, field completeness, VPC verdicts and rubric scores.

## 5. GTM

Take a single product launch to market.

- **gtm-handover** — Build the executive GTM handover: the One-Pager and the Supporting Deck. The narrative source for the rest of the suite.
- **gtm-playbooks** — Build the three internal playbooks: Sales, Account Management, and Onboarding.
- **gtm-marketing** — Build the Marketing Pack: launch announcement, social posts, email sequence, sales note, and campaign brief.

## 6. Analysis

Close the loop once it is live.

- **metrics-review** — Run a product metrics review against real data: post-launch validation of a PRD's success metrics, or a recurring weekly or monthly review.

---

## Reference material (not skills)

Skills call on shared reference material that lives outside `skills/`:

- **`personas-library/`** — the *who*: personas, segments, the Virtual Product Council and its sub-panels (Design Council, Operator Council / UAT panel, Leadership Subcommittee).
- **`products/`** — the *what we sell*: one reference file per Oolio product (`_template.md` is the shape).
- **`references/`** — the *how we work*: house style, output formats, cross-cutting standards.

Where new reference types land (team profiles, process docs, Obsidian routing) is being
worked out in a dedicated discovery pass. Until then, add to the closest existing folder and
flag it, rather than creating a new top-level folder.
