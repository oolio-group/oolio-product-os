# jpd-loop — Insights & citations (reference)

Read this for loop step 3 (validation) and step 7 (write-back). This is how the loop turns evidence into **JPD Insights** that validate — or challenge — an idea.

## What a JPD Insight is
A JPD idea supports **Insights**: small evidence cards attached to the idea. Each Insight has:
- a **description** (what the evidence says, in a sentence or two),
- a **web link** (the source — competitor page, customer thread, analytics, research, another idea),
- an **impact rating 1–5** (how strongly this evidence bears on the decision).

Insights are how we make the verdict defensible: every meaningful claim in the VPC summary should trace to an Insight, and Insights should include evidence **for and against**.

## Impact rating rubric (1–5)
- **5** — decisive: on its own this could flip the decision (e.g. a hard regulatory blocker, a top competitor already owns this and wins on it, a major customer churns without it).
- **4** — strong: clearly moves desirability/feasibility/viability.
- **3** — moderate: relevant supporting or cautioning signal.
- **2** — weak: minor or indirect.
- **1** — context only: useful background, low decision weight.

## Method
1. Gather evidence per `evidence-sources.md` (internal first, then web/competitors).
2. Keep both **supporting** and **disconfirming** evidence — aim for a balanced set, not a case built only to confirm.
3. For each strong item, draft an Insight: one-line description + the real source URL + an impact rating with a one-line reason.
4. Feed these to the council (they argue from the evidence, not assumption). The rubric scores (Desirability/Feasibility/Viability/Strategic Fit) should reflect the Insights.

## Recording Insights — creation routes (updated Jul 2026)
**Native Insight creation is now supported** (Atlassian confirmed the public Polaris GraphQL API for Insights, Jun 2026; the MCP connector still cannot do it). **Standard: every strong piece of evidence found for an idea gets attached as a native Insight on that idea** — not just listed in the description. Pick the first route that works in the current environment:

1. **Route A — Polaris GraphQL API** (local Cowork / Claude Code sessions with network access): full recipe, auth flow, payload schema and gotchas in `references/jpd-insights-api.md`. Requires a one-time 3LO OAuth app setup by the user.
2. **Route B — Chrome UI automation** (cloud sessions with the user's browser connected via Claude-in-Chrome): open the idea → Insights tab → paste the source URL into the link field (JPD unfurls it into a card) → set description and impact dots → Create. No setup needed; uses the user's logged-in JPD session.
3. **Route C — paste-ready list (fallback only)**: if neither route is available, record the evidence in the idea Description append block and DISC page as before, and hand the human a ready-to-paste list (description · link · impact each).

Regardless of route, ALSO record the Insights as cited evidence in the **idea Description** append block and the **DISC decision-record page** — the native Insights and the written record must match.

## Citation discipline (hard rules)
- **Every Insight has a real, working source link.** No link → not an Insight, at most a note.
- **Never fabricate or guess a URL.** If you can't find a source, say so.
- Quote or paraphrase faithfully; don't overstate what a source says.
- Prefer primary sources; date-stamp anything time-sensitive (prices, competitor features).
