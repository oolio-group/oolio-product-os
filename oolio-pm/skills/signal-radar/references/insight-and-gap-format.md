# signal-radar — Insight and gap-report formats (reference)

Read this for Mode A's write-up (step 4) and Mode B's gap report (step 5), and for the Brain sync step in both modes.

## Insight format (matches jpd-loop, so lists are interchangeable)
Each Insight: a one-line **description**, the real **source URL**, an **impact rating 1-5** with a one-line reason. Same shape as `${CLAUDE_PLUGIN_ROOT}/skills/jpd-loop/references/insights-and-citations.md` — that's deliberate, so a signal-radar Insight list can be pasted straight into a `jpd-loop` run or the native JPD Insight panel without reformatting.

## Impact rating with the social-evidence cap
Start from jpd-loop's rubric (5 = decisive, 1 = context only), then apply the source-reliability tier from `signal-sources.md`:

- Tiers 1-4 (HubSpot direct, Brain, primary competitor source, analyst report) — rate on the normal 1-5 scale, no cap.
- Tier 5 (aggregated social/review signal — the same point made across several independent posts or reviews) — cap at **4**. Corroboration across sources earns weight; it's still not a paying customer's deal blocker.
- Tier 6 (a single social post, forum comment, or review, uncorroborated) — cap at **2**. Real signal, worth noting, not worth a decision on its own. If you're tempted to rate it higher because the post is compelling, that's a sign to go find corroboration before scoring it, not a reason to raise the cap.

State which tier an Insight draws from when the impact reason isn't obvious from the description.

**Competitor campaign engagement is a distinct evidence sub-type**: a rival's high-engagement post about a capability (normalised against their own account baseline, per the campaign-mining method in `${CLAUDE_PLUGIN_ROOT}/skills/competitor-watch/references/mining-playbook.md`) is **desirability** evidence for that capability — the market wants the thing. It enters at tier 5 (cap 4/5) and says nothing about feasibility, viability, or whether the competitor's version works; write the Insight so it claims only the demand ("engagement n× their baseline on <capability> — [post](url) — demand signal, not execution proof").

## Gap report table (Mode B)
One row per candidate:

| Candidate | Problem | Evidence (with links) | Likely persona | Signal strength | Overlap check | Recommended action |
|---|---|---|---|---|---|---|
| Short name | The operator-facing problem, one line | 2-4 cited sources, tier noted | Primary Persona (from field_standards.md's list) | Weak / Moderate / Strong + why | Nearest existing idea/status, or "none found" | Attach to existing (→ Mode A) / Draft new (→ feedback-to-idea) / Monitor (not enough signal yet) |

Order rows by signal strength, strongest first. "Monitor" candidates still get synced to Brain (below) so the next scan can pick up new corroborating signal without starting over.

## Brain sync (per research-os)
The taxonomy, metadata, and linking rules live in `${CLAUDE_PLUGIN_ROOT}/references/research-os.md`; this is how a signal-radar run maps onto them:

- **One evidence log per run** (`evidence/YYYY-MM-DD-<slug>`): mode and target (JPD key or "gap scan"), the source list (description — URL — tier — date), what was searched and what came up empty. Append-only.
- **Mode A additionally writes the drafted Insight lines** (description · link · impact · tier) as insights linked to the evidence log — the Insight set must survive in Brain, not just in chat — and ingests durable competitor/trend findings onto the relevant dossier or trend page (supersede rule applies).
- **Mode B additionally updates the gap ledger** (`gaps/ledger`): one row per candidate — status (raised / corroborated / declined / monitored), evidence count, sources, review-by date, and the JPD key once one exists. Monitored candidates get their heartbeat from `competitor-watch` sweeps checking the ledger's review-by dates.

Always `wiki-query` before writing; `wiki-ingest` onto existing pages (extend, don't replace); `wiki-new` only when nothing covers the topic.
