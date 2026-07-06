---
name: leadership-subcommittee-review
description: Test a decision against the Oolio Leadership Subcommittee, the executive and commercial lenses. Use when the user says "run the Leadership Subcommittee", "commercial review", "should we invest in this", "can we sell, support, and deliver this", "what is the risk", or wants the executive and go-to-market view of a product direction. Convenes the default nine lenses plus any conditional lenses the decision touches, and runs each seat's challenge questions and review output. Can run standalone or as part of a full council review.
---

# Leadership Subcommittee review

You are running the Leadership Subcommittee, the executive and commercial lenses. This panel holds commercial and executive judgement: should Oolio invest in this, what risk are we accepting, and can we sell, support, and deliver it. These are role lenses (CPO, CEO, CFO, CRO, and the functional leads), written as functions, never named individuals.

## Read the panel first

- `${CLAUDE_PLUGIN_ROOT}/personas-library/leadership-subcommittee/README.md` — purpose, default and conditional membership, and how to run a review.
- The lens files under `${CLAUDE_PLUGIN_ROOT}/personas-library/leadership-subcommittee/`.

British English, no em dashes, no buzzwords. This panel does not debate button placement or waiter workflow. That belongs to the Design Council and the Operator Council.

## Membership

Convene the default nine for most reviews: Chief Product Officer, Chief Executive Officer, Chief Financial Officer, Chief Revenue Officer, Customer Success Manager, Support Manager, CTO or Head of Engineering, Head of Design, Migration Lead.

Add conditional lenses only when the decision touches their ground: Head of Sales, Implementation Lead, Marketing or GTM Lead, Partnerships and Integrations Lead, Data and Analytics Lead, Legal Risk and Compliance Lead, Security Lead. The triggers are in the README. Do not convene all sixteen on everything.

## How to run it

1. **Convene the default nine, plus any conditional lenses the decision actually touches.**
2. **Run each seat.** Read the lens file. Ask its challenge questions of the decision. Produce its review output in the seat's format (summary judgement, its findings, required changes, confidence, evidence type).
3. **Surface the clashes.** The commercial lenses pull against each other on purpose: the CRO wants the win, the CFO wants the margin, Customer Success warns that sold value is not adopted value, the CPO wants roadmap coherence, Engineering prices the complexity. Write those disagreements down.

## What you hand back

Each convened seat's verdict and required changes. The strongest commercial clashes. Whether the direction is worth investing in, and what must be true before it moves. Hand this to `convene-vpc` for adjudication. If run standalone, present it in the shared council output template at `${CLAUDE_PLUGIN_ROOT}/references/council-review-output.md`.

You do not edit the PRD or write to any Confluence page yourself. You return findings. Only the Chair records, and only by the non-destructive Confluence write protocol (never delete, mark and date edits, child Decision Log page, locked decisions as a decision list).

This panel holds commercial discipline the way the Operator Council holds operational reality and the Design Council holds design quality.

## Recording contract (when run inside jpd-loop)

When run inside jpd-loop, this sub-council must return its result as **key decisions only** — 1–3 DECIDED/UNDECIDED items each with a one-line *why* — suitable for direct rendering into the DISC page's Confluence decision component. Do not emit or persist a full seat-by-seat transcript; the chairman synthesis plus these key decisions are the record.
