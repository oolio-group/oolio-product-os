# Maintaining oolio-pm-plugin

Rules for anyone (human or AI) changing this repo. This is the **oolio-pm** plugin collection for Cowork. Read [README.md](README.md) for what it is and [PUBLISHING.md](PUBLISHING.md) for how it ships. House style everywhere: British English, no em dashes, no buzzwords.

## On every change — do all four, every time

1. **Make the change** under `oolio-pm/` (skills in `oolio-pm/skills/`, personas in `oolio-pm/personas-library/`).
2. **Bump the version** in **both** `.claude-plugin/marketplace.json` (the plugin's `version`) and `oolio-pm/.claude-plugin/plugin.json` — they must match. Last number = fix or wording, middle = new ability or skill, first = a big change to how it is used.
3. **Add a CHANGELOG entry.** Update [CHANGELOG.md](CHANGELOG.md) with a new section for the version, newest first, saying what changed and why. This is not optional. A version bump without a changelog entry is an incomplete change.
4. **Commit and push.** Both steps, so GitHub (and teammates' Cowork) actually get it.

## Archive, never delete

- When a skill, persona, lens, or template is superseded, **move it to `oolio-pm/_archive/`** rather than deleting it. Personas may also use the persona library's own `_archive/` per its `CLAUDE.md`.
- Record the move in `oolio-pm/_archive/README.md` with the date, the version, and what replaced it, and note it in the CHANGELOG.
- After archiving, **fix every reference** to the moved files so no live doc points at a dead path. Historical changelog entries are left as-is (they are a record of what was true then).

## Keep it correct for sharing

- This repo is installed by teammates in Cowork. Before shipping, check the JSON is valid, the skill count in the README matches reality, and no documentation links are broken.
- Do not fabricate Oolio facts. If a fact is needed and is not already in the bundled `personas-library/_framework/oolio-context.md`, leave it out or flag it.
