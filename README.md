# Oolio PM Plugins

The Product team's plugin collection (marketplace) for Cowork. Other Oolio teams keep their own collections; this one is product management.

## Plugins

- **oolio-pm** — Oolio Product Management. Bundles the Virtual Product Council (convene-vpc and its operator, design, leadership, and STORM subcommittees, plus a snapshot of the persona library), the JPD grooming loop (jpd-loop) and idea groomer (jpd-idea-groomer), and the Jira epic helpers (jira-epic-groomer, jira-epic-titler). Self-contained.

## Install in Cowork (for Oolio teammates)

Most people will use this in Cowork, not Claude Code. This is the one-time setup.

**Before you start:** connect your GitHub account inside Cowork once, so it can read the repo. The repo is public, so you do not need any special GitHub access or org membership.

**Then install:**

1. In Cowork, open **Settings → Plugins → Add plugin → GitHub**.
2. Enter `oolio-group/oolio-pm-plugin`.
3. Install **oolio-pm**.

The plugin's skills then appear in your skill list (for example, ask "convene the VPC"). Whenever a new version is pushed to GitHub, Cowork offers it as an update on its next sync.

> Note: the exact menu wording in Cowork may differ slightly from the steps above. The first teammate to install should confirm the real path and tell Niel, so this section can be corrected.

## Layout

```
oolio-pm-plugin/
├── .claude-plugin/
│   └── marketplace.json    the marketplace manifest Cowork reads (must live here)
├── README.md
├── CHANGELOG.md            what changed in each version
├── CLAUDE.md               maintenance rules (bump version, log changes, archive)
├── PUBLISHING.md           how to edit, version, and publish (read this)
└── oolio-pm/               the plugin
    ├── .claude-plugin/plugin.json
    ├── personas-library/   bundled persona-library snapshot
    ├── _archive/           retired skills, lenses, and templates (kept for reference)
    └── skills/             the 9 skills
```

## Updating

See **PUBLISHING.md** for the full step-by-step. In short: edit the skill under `oolio-pm/skills/`, bump the version in both `.claude-plugin/marketplace.json` and `oolio-pm/.claude-plugin/plugin.json`, add a **CHANGELOG.md** entry, then commit and push. Cowork picks up the new version on its next sync. Maintenance rules are in **CLAUDE.md**.

## Notes

- This repository is intentionally **public** so teammates can install it without GitHub org access. It bundles Oolio-internal material (personas, context, strategy), so keep anything genuinely sensitive out of it.
- Must be hosted on github.com for Cowork to sync from it.
