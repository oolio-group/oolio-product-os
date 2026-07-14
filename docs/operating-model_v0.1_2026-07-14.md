# The Autonomous Operator — Operating Model (v0.1)

*Status: draft for sign-off. Home: the PM Skills (`oolio-pm`). Companion to
[skills-catalogue.md](skills-catalogue.md).*

This is the operating model for an autonomous operator built on the Oolio PM Skills: a version of
Niel that runs on an always-on Mac Mini, reads his stack, and produces the outputs he would otherwise
produce himself. It defines what the operator is, the one pattern every capability follows, the first
thing we build (the Daily Brief), and the order everything comes in.

It is a design doc. No operator code is built from it until it is signed off.

---

## 1. The North Star: an outputs engine

The operator is not a filing bot. It is a chief-of-staff that **produces work**: a daily brief,
drafted replies, comments made on Niel's behalf when it is confident enough, Jira Product Discovery
kept in order, PRDs and epics iterated with the product owners, weekly leadership updates, and the
decisions and risks that would otherwise stay in five tools and two people's heads.

Everything it does runs on one pattern:

> **ingest inputs → run a capability → gate the result by confidence → land it on the Daily Brief**

Get that pattern right once and every new capability is just another producer plugged into it. That
is the whole design.

## 2. The architecture

**The Daily Brief is the spine.** It is the heartbeat the operator runs on and the single place Niel
looks each morning to see what moved, what the operator did, and what needs him. Every capability is
a **producer** that feeds the brief.

**The brief is versioned.** v1 does not do everything. Each new skill adds a section or a producer to
a later version of the brief. It grows as the operator grows.

**The weekly leadership review is a separate, compound output.** Same accumulated data, different
format and audience. It is a roadmap stage, not part of v1.

**The memory is the Obsidian vault** (`foundry-store`): typed markdown pages with mandatory
provenance and supersession. The operator reads and writes it. (Foundry-the-retrieval-product is
parked and may return; the vault stands on its own as the brain.)

## 3. The confidence gate

Autonomy is not a global switch. It is set **per action, by confidence**. Every item the operator
produces carries one of four bands and a one-line reason:

| Band | Meaning |
|------|---------|
| **Low** | A guess or a weak signal. Always surfaced to Niel, never acted on. |
| **Medium** | Plausible, but Niel should decide. Surfaced with the operator's proposed answer. |
| **High** | Well-evidenced. Eligible to act autonomously on **low-risk, own-turf** actions. |
| **Very High** | Unambiguous, multi-source. Eligible to act autonomously on **outward** actions. |

**The threshold to act rises with the risk of the action, not just the confidence in the finding.**
Filing to the vault is safe at any band. Writing to Niel's own Jira board needs High. Anything that
reaches another person (a comment, an email, a transition on shared work) needs Very High. Below the
threshold, the item does not vanish, it lands in the brief's **Needs you** queue.

In v1 the operator acts on nothing outward (see §5), but it **labels every item with its band from
day one**, so that over the first weeks Niel calibrates where each threshold should sit before any
autonomy is switched on.

## 4. The producer pattern (how any skill plugs in)

Every producer, existing skill or new, declares a small, uniform **guardrail block**. This is what
makes "sometimes autonomous, sometimes not" concrete and auditable. It follows the human-gate pattern
`jpd-loop` already uses.

```
Guardrail block (in the skill's SKILL.md)
- Trigger:            schedule | on-demand | event (what makes this producer run)
- Reads:              which sources / connectors it may touch
- Autonomous actions: what it may do without asking, and the confidence band required for each
- Human-in-the-loop:  what always pauses for Niel (by action class, not case-by-case)
- Escalation:         how it hands back — tag Niel, move the ticket to a named status,
                      comment with what it did and what is needed
```

A producer's autonomy is raised over time by editing this block (e.g. moving an action from
"human-in-the-loop" to "autonomous at Very High"), never by a code change. The brief is where the
evidence to justify that move accumulates.

## 5. v1 — the Daily Brief

**Autonomy level A: read, assemble, file internally. Nothing outward.** The operator reads every
source, files internal records to the vault (reversible, already the runbook's job), and produces the
brief. Everything that would touch Jira, Confluence, email or JPD, **including raising EVITA
tickets**, appears as a **draft or proposal** in the brief. No comment, email, transition or
cross-person write happens in v1.

**Inputs (6):**

- **Granola** — meetings (richest source of decisions and actions).
- **Jira** — EVITA, plus assigned-to / watched-by Niel, plus FDY; status changes, new assignments,
  due-soon.
- **Confluence** — pages created or updated in scope spaces since the last run.
- **Calendar (M365)** — today's meetings, to frame the day ahead.
- **Email (M365)** — items needing a reply, surfaced with a **drafted** response (never sent).
- **Slack** — `#product-mgmt`, `#core-pos`, mentions and threads Niel joined.

(Market news is a fast-follow, switched on once the core reads well.)

**Output — the brief, one page:**

- **Day ahead** — today's calendar.
- **What changed** — decisions, actions, Jira/Confluence movement since the last run, each filed to
  its vault layer (`06 Decisions`, `07 Actions`, `02 Meetings`, the wikis) with provenance.
- **Needs you** — the action queue: items to reply to (with a drafted reply), decisions to make,
  tickets or transitions proposed, each with a **confidence band and one-line why**.
- **What I did** — the internal filing the operator performed (vault only in v1).
- **Gaps** — sources skipped, connectors unavailable, detection uncertainty (self-reported).

**Delivery:** the canonical brief is written to the vault (`01 Daily Briefs/YYYY-MM-DD.md`) and
**pushed to Niel as a Slack DM**.

**This extends, it does not replace.** The vault's `System/Runbooks/Daily Ingest.md` and `CLAUDE.md`
§3 detection rules already handle Granola → meetings → decisions/actions → brief → rollups. v1 adds
the confidence banding, the reply-drafting, the Slack delivery, and the Needs-you queue on top.

## 6. Capability roadmap (after v1)

Ordered so trust compounds and risk rises slowly. Each is a producer added to the brief.

1. **Stage 2 — Step up on your own turf (level B).** The operator auto-raises EVITA tickets and tags
   Niel. Writes confined to his own board; no cross-person actions yet. Smallest trust step past v1.
   *(Operator identity / service account is decided here, before the first writes.)*
2. **Stage 3 — JPD keeper.** On a schedule: acknowledge new ideas, run `jpd-loop` / `convene-vpc`,
   transition ideas to a decided status. Reuses existing skills.
3. **Stage 4 — Outward drafts go live.** Confidence-gated email and Jira comments actually send/post
   (Very High only, at first). The first cross-person autonomy.
4. **Stage 5 — PRD and epic iteration with product owners.** Iterate PRDs (`write-prd`), flag epics
   drifting off track. Multi-person coordination.
5. **Stage 6 — Weekly leadership review.** The compound output, built on accumulated daily data.

## 7. Build order for v1

- **M0** — This blueprint, signed off.
- **M1 ∥ M2** — In parallel: **prove the brief by hand** (run v1 attended on the MacBook for a few
  days, validate its judgement cheaply) **and stand up the Mac Mini** (always-on, Claude Code +
  Cowork + Obsidian, vault synced, remote access, connector auth in the headless run context).
- **M3** — Schedule the brief on the Mini in **shadow mode**: it runs, Niel corrects daily.
- **M4** — **Cut over to unattended.** v1 is done when Niel reviews the brief rather than rebuilds it.

The routine earns the schedule only once proven by hand; the Mini setup does not wait on it.

## 8. Reuse, don't reinvent

The vault's typed-page schema, detection rules and routing (`foundry-store/CLAUDE.md` §2–§5); the
`Daily Ingest.md` runbook and `08 Templates/*`; the existing skills as producers (`jpd-loop`,
`convene-vpc`, `write-prd`, `metrics-review`, `steering-pack`); the `jpd-loop` bounded-loop + journal
+ human-gate pattern; `pack_content.json` as a shared file-backed record; and `${CLAUDE_PLUGIN_ROOT}`
reference-loading. The operator standardises these into one model; it does not replace them.

## 9. Open items

Tracked, none blocking this blueprint:

- **Operator service account** and bounded permissions — decided at Stage 2, before any write.
- **Connector auth pass** — Granola, Atlassian, M365 and Slack MCP servers need authorising in a live
  session on the Mini.
- **EVITA hand-off convention** — a "Needs Niel" signal (status or label + tag), mirroring FDY's lean
  workflow from Foundry Decision #12 ("the Needs Niel column is the only one Niel must watch").
- **Confluence scope spaces** — to confirm (proposed: OR, OHSI, LOY, OSO, EDU).
- **Personal-vs-org vault split** — deferred (framed by Foundry Decision #15).
- **A name** for the system.

## 10. Out of scope / parked

No operator code, no Mini provisioning, no connector wiring, no outward writes, until sign-off and the
stages above. The Foundry retrieval app is parked and may return; this work does not depend on it.
