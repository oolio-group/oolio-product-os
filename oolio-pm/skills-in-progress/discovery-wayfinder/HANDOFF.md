# Handoff — build the discovery-wayfinder skill

Self-contained brief for a fresh session. Mission: build `discovery-wayfinder`, the skill that plans discovery work too big for one sitting as a map of decision tickets in Jira, adapted from Matt Pocock's Wayfinder. Build it here in `skills-in-progress/discovery-wayfinder/`, and promote to `oolio-pm/skills/` only when the walkthrough below passes.

## Read first (in this order)
1. `oolio-pm/references/skill-standard.md` — how skills are written here (trigger specs, no-op test, leading words, statuses). The finished SKILL.md must pass its definition of done.
2. `oolio-pm/references/house-style.md` — British English, no em dashes in outputs, no buzzwords.
3. The source: Matt Pocock's Wayfinder at `github.com/mattpocock/skills`, `skills/engineering/wayfinder/SKILL.md` (fetch the raw file). Read it fully before designing; the craft is in the prose.
4. For context on siblings it must compose with: `oolio-pm/skills/jpd-loop/SKILL.md`, `oolio-pm/skills/grill-me/SKILL.md`, `oolio-pm/skills/storm-research/SKILL.md`, `oolio-pm/skills/signal-radar/SKILL.md`.
5. Root `CLAUDE.md` — the four-step change process (edit, no version bump, CHANGELOG entry, commit and push).

## The concept being adapted (from the source, verified July 2026)
Wayfinder plans "a huge chunk of work — more than one agent session can hold" as a **map issue** with **child decision tickets**: "questions whose resolution is a decision, not slices of a build to execute". Core disciplines to preserve, each load-bearing:
- **Plan, don't do.** "The pull to just do the work is usually the signal you've reached the edge of the map." The map is done when the way is clear, not when the work is done.
- **The map as index.** "A decision lives in exactly one place — its ticket — so the map never restates it, only gists it and links." Map body: Destination / Notes / Decisions so far / Not yet specified / Out of scope.
- **Fog of war.** "Don't chart what you can't yet see." The ticket-vs-fog test: can you state the question precisely now (not answer it now)?
- **Typed tickets, HITL vs AFK.** Research and prototype tickets can run without the human (AFK); grilling tickets — "the default case" — only resolve through live exchange, and "the agent never stands in for the human's side."
- **Concurrency discipline.** Claim a ticket by assignment before working it; tracker-native blocking links render the frontier; **never resolve more than one ticket per session.**

## The Oolio adaptation (design intent — challenge it if it doesn't survive contact)
- **Domain**: product discovery, not engineering. A large theme ("AI ordering strategy", "what does labour cost control mean for us") becomes a **map** with decision-ticket children like "Which segment feels this pain hardest?", "Build vs partner for voice ordering?", "What would make Steering fund this?".
- **Tracker**: Jira, OHSI project. Open decisions to settle in the build (grill Niel, don't guess): whether a map is a JPD idea with linked child ideas, or lives in a different project (DISC?); which link type renders blocking best in JPD; whether `Idea archived` and the two mandatory JQL guards apply to map queries (see `oolio-pm/skills/jpd-idea-groomer/references/field_standards.md`).
- **Ticket types mapped to our skills**: research ticket → `storm-research` or `signal-radar` (AFK); evidence ticket → `signal-radar`/`competitor-watch` (AFK); grilling ticket → `grill-me` (HITL, the default); a prototype ticket may map to a Figma exploration (open decision).
- **Resolution writes back**: a resolved decision ticket records the decision and its why on the ticket; the map gists and links. When the way is clear, the map's output feeds existing skills: ideas to `feedback-to-idea`/`jpd-idea-groomer`, a decision needing full validation to `jpd-loop`.
- **Relationship to jpd-loop**: the loop takes ONE idea end to end; the wayfinder charts a THEME into many decidable pieces. The wayfinder never runs the council; it routes to skills that do.
- **The brain**: resolved decisions worth remembering sync per `oolio-pm/references/research-os.md` (the vault's rules win; note the operator wall — Personal layers are NO-GO).

## Constraints
- Status on promotion: **New**, via a CHANGELOG entry; update counts everywhere they appear (plugin.json, marketplace.json, both READMEs, docs/skills-catalogue.md — it already lists "Discovery wayfinder" under planned work; move it) and the vault's `_system/Skills Catalogue.md`.
- Human-gated throughout: no ticket creation without approval; one decision per session is a hard rule, not a preference.
- Frontmatter per skill-standard.md: name + description-as-trigger-spec with do-NOT routing (at minimum: do NOT trigger for a single idea needing the loop, or for research with no map).
- Adversarially review before promoting: at least one reviewer pass for consistency with the files in "Read first" and one simulated first run (no map exists yet; a map half-resolved; a session tempted to resolve two tickets).

## Definition of done
A `SKILL.md` (plus references if the body outgrows ~120 lines) that passes skill-standard.md's definition of done; the open Jira-modelling decisions above resolved with Niel and recorded in the skill; a dry-run walkthrough of one real theme (suggest: something from the current backlog, chosen with Niel) producing a map and at least one resolved decision ticket; promoted to `skills/`, counts and catalogues updated, CHANGELOG written, committed and pushed.
