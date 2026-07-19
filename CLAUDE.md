# Maintaining oolio-pm-plugin

Rules for anyone (human or AI) changing this repo. This is the **oolio-pm** plugin collection for Cowork. Read [README.md](README.md) for what it is and [PUBLISHING.md](PUBLISHING.md) for how it ships. House style everywhere: British English, no em dashes, no buzzwords.

## This repo is the single source of truth

All edits to the `oolio-pm` plugin — skills, personas, lenses, templates — are made **here**, in this repo, then shipped. This includes the persona library at `oolio-pm/personas-library/`, which is canonical. Do not edit the installed Cowork copy, and do not edit the older working copy at `~/Documents/Claude/personas/` (it is a legacy mirror; a change made there does not ship). If content needs to change, change it here and follow the four steps below.

## On every change — do all four, every time

1. **Make the change** under `oolio-pm/` (skills in `oolio-pm/skills/`, personas in `oolio-pm/personas-library/`).
2. **No version to bump.** The plugin is versioned by git commit: every push is automatically a new version, so edits reach the team without a bump. This is deliberate — there is **no `version` field** in `oolio-pm/.claude-plugin/plugin.json` or in the marketplace plugin entry. **Do not reintroduce one.** A plugin `version` pins the plugin, and Claude Code then serves updates only when the number changes, so a forgotten bump silently stops your edits from propagating (this was the old bug). The `metadata.version` at the top of `marketplace.json` versions the marketplace structure only; leave it unless a plugin is added, removed, or renamed.
3. **Add a CHANGELOG entry.** Update [CHANGELOG.md](CHANGELOG.md) with a new section for the version, newest first, saying what changed and why. This is not optional. A version bump without a changelog entry is an incomplete change.
4. **Mirror team-visible changes to the PM Skills Confluence page.** The page (Niel's space, id `1175420929`) is the human-readable front door: it carries the skill count, the per-skill tables, and a plain-English "Skills changelog" section at the foot. When a change is team-visible — a new skill, a removed or renamed skill, a new capability, changed behaviour a user would notice — update the tables and add a dated entry to that section, written for a reader, not a maintainer (no file paths, no field IDs). Internal refactors, reference-file edits, and doc fixes do not need mirroring.
5. **Commit and push.** Both steps, so GitHub (and teammates' Cowork) actually get it.

## Archive, never delete

- When a skill, persona, lens, or template is superseded, **move it to `oolio-pm/_archive/`** rather than deleting it. Personas may also use the persona library's own `_archive/` per its `CLAUDE.md`.
- Record the move in `oolio-pm/_archive/README.md` with the date, the version, and what replaced it, and note it in the CHANGELOG.
- After archiving, **fix every reference** to the moved files so no live doc points at a dead path. Historical changelog entries are left as-is (they are a record of what was true then).

## Keep it correct for sharing

- This repo is installed by teammates in Cowork. Before shipping, check the JSON is valid, the skill count in the README matches reality, and no documentation links are broken.
- Do not fabricate Oolio facts. If a fact is needed and is not already in the bundled `personas-library/_framework/oolio-context.md`, leave it out or flag it.
