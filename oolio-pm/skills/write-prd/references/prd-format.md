# The Oolio PRD format

Extracted from Oolio's live PRDs (the FY27 Customer Engagement channel set: SMS, Email, Push, Instagram, July 2026). This is the observed house format, not an invented ideal. A PRD in this shape survives grilling, council review, and delivery handover, because the downstream skills (`grill-my-prd`, `convene-vpc`) were built around it.

The document is deliberately a **high-level PRD**: capability level, decision-oriented, readable end to end in a few minutes. Delivery detail lives elsewhere.

## Header block

The first line of the body, before any heading:

```
**High-level PRD** · **Status:** [DRAFT lozenge] · **Owner:** <Name> (Product) · **FY<yy>**
```

Then, its own paragraph:

```
**In one line:** <The capability and its outcome, one sentence a director can parse in five seconds.>
```

Status starts as a DRAFT lozenge. The grill and VPC skills add their own badges (GRILLED · SESSION N, VPC REMEDIATED) next to it later; leave room for that by keeping the header to one line.

## Section order

Required sections in this order. Optional sections slot in where shown; include them only when the PRD genuinely needs them.

1. **Governing principle** (strongly recommended) — what kind of PRD this is and who owns what it does not decide. The standard split: functional requirements are decided here; technical decisions (provider selection, architecture, how a thing is parsed or provisioned) are owned by the Principal Engineer and CTO; commercial decisions (pricing, funding, packaging) are owned by leadership. Naming this up front stops the PRD being rejected for not answering questions it should not answer.
2. **What** — the capability, one or two short paragraphs. What exists after this ships that did not before. Capability level, no UI detail.
3. **Why** — why this matters commercially and to the operator, evidence-flavoured. If the channel or feature has a measurement quirk (SMS has no opens), state it here so the metrics section is honest.
4. **Who** — the named personas from the persona library, one line. "Mel and Damien, the AI marketer drafting on their behalf, and the Diner." Never "users". Personas must exist in `personas-library/`; if a needed persona does not exist, flag the gap rather than inventing one.
5. **Scope** — bullets. Each bullet one capability in the shipped surface, with its critical qualities inline (compliance behaviour, cost visibility, defaults). This is the longest section, and it is still bullets, not prose walls.
6. **Non-goals** — bullets. Real exclusions a reader might otherwise assume in scope, each with its destination where one exists ("deferred to the Vouchers PRD", "technical, PE/CTO"). A PRD with no non-goals has not decided anything.
7. **Key requirements** — the handful of requirements that are load-bearing: the ones that, if violated, make the feature wrong even if everything else ships. Compliance floors, never-block rules, instant-honour rules. Bullets, each one testable.
8. *(Optional)* **Domain sections** — whatever the decision needs a dedicated section for: a Funding model with lettered options and a product recommendation, Design (UI/UX) callouts, Cross-cutting interweaves with sibling PRDs. Use sparingly; each must earn its heading.
9. **Dependencies** — the systems, teams, and sibling PRDs this depends on, with what each supplies. Include measurement dependencies (who owns the data join that makes the headline metric real).
10. *(Optional)* **API & integration documentation** — real external links (vendor docs, compliance sources). Only real, checked URLs.
11. **Success metrics** — behaviour change or business movement. Name the headline metric, mark guardrail metrics as guardrails, and name the dependency that makes each measurable. No vanity numbers.
12. **Open questions** — each with its decision owner named ("Business/commercial + leadership to decide", "Owner: Legal, Risk & Compliance"). An open question without an owner is a dodge.
13. **Related** — links: the JPD idea, sibling PRDs, research pages, the grill and Decision Log children once they exist.

## The bar, section by section

- **One line**: capability plus outcome. If it reads like a mission statement, rewrite it.
- **What/Why**: separable. What describes the shipped surface; Why justifies it. If a sentence could live in either, it is probably Why.
- **Scope bullets**: each bullet self-contained, with the sharp edges inline. The live PRDs put compliance defaults, cost-visibility behaviour, and fallbacks inside the relevant scope bullet, not in an appendix.
- **Personas**: first names once introduced. The persona files carry the reality; the PRD borrows their names and stakes.
- **Options sections** (like a Funding model): letter the options, state each in a line with its risk, mark the product recommendation with a badge, and name who decides. Product provides options and a recommendation; it does not settle leadership decisions.
- **Metrics**: one headline, guardrails marked as guardrails, operational metrics named as operational. If a metric depends on infrastructure that does not exist yet (a hold-out mechanism, an attribution join), name that as a dependency or the metric is aspirational.

## Worked skeleton

```
**High-level PRD** · **Status:** DRAFT · **Owner:** <PM> (Product) · **FY27**

**In one line:** <capability> — <what it lets the operator do and why it pays>.

## Governing principle
This is a functional-requirements PRD. <Technical decisions X, Y> are owned by
the Principal Engineer and CTO. <Commercial decision Z> is a leadership decision;
this PRD provides options and a recommendation.

## What
<One or two short paragraphs.>

## Why
<Commercial and operator case, with the honest measurement frame.>

## Who
<Named personas>, and the Diner where guest-facing.

## Scope
- <capability bullet, with critical behaviour inline>
- …

## Non-goals
- <exclusion> — <where it lives instead>

## Key requirements
- <load-bearing, testable requirement>

## Dependencies
- <system / team / sibling PRD> — <what it supplies>

## Success metrics
- <headline metric> (headline; depends on <dependency>)
- <guardrail metric> (guardrail)

## Open questions
- <question> — owner: <who decides>

## Related
<links>
```

## Confluence conventions

- Title: `PRD — <Subject>` (current convention). The older `<Subject> | PRD` also exists; downstream skills recognise both.
- Live page where the space supports it.
- The PRD body belongs to the author. Downstream skills only ever annotate additively (strikethrough, badges, dated banners); nothing is deleted. Write the initial page knowing it will accumulate a GRILL banner, a VPC banner, and badged amendments over its life.
