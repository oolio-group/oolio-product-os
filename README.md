# Oolio PM Plugins

The Product team's plugin collection (marketplace) for Cowork. Other Oolio teams keep their own collections; this one is product management.

## Plugins

- **oolio-pm** — Oolio Product Management. Bundles the Virtual Product Council (convene-vpc and its operator, design, leadership, and STORM subcommittees, plus a snapshot of the persona library), the JPD grooming loop (jpd-loop), idea groomer (jpd-idea-groomer) and title standard (jpd-title-standard), the Jira epic helpers (jira-epic-groomer, jira-epic-titler), and grill-me for stress-testing a plan or decision. Self-contained.

## Install (for Oolio teammates)

Install straight from the repo URL. You install once and get updates automatically, because the plugin is versioned by commit (no version numbers to chase). Use exactly one URL: **`oolio-group/oolio-pm-plugin`**. The old `oolio-pm-plugins` (with an `s`) redirects here but registers as a *separate* marketplace, so don't add both.

**Claude Code (CLI):**

```
/plugin marketplace add oolio-group/oolio-pm-plugin
/plugin install oolio-pm@oolio-pm-plugin
```

**Team auto-install (settings.json).** Add this to your Claude Code settings and the plugin registers, enables, and **auto-updates** with no further steps:

```json
{
  "extraKnownMarketplaces": {
    "oolio-pm-plugin": {
      "source": { "source": "github", "repo": "oolio-group/oolio-pm-plugin" },
      "autoUpdate": true
    }
  },
  "enabledPlugins": { "oolio-pm@oolio-pm-plugin": true }
}
```

**Cowork:** Settings → Plugins → Add plugin → GitHub, and enter `oolio-group/oolio-pm-plugin`. Install **oolio-pm**. If Cowork serves an old version (a known backend cache issue in mid-2026), fall back to the release zip, see [PUBLISHING.md](PUBLISHING.md).

The skills then appear in your skill list (for example, ask "convene the VPC"). The current content is always whatever is on `main`; [CHANGELOG.md](CHANGELOG.md) records what changed.

## Layout

```
oolio-pm-plugins/           local folder name; the GitHub repo is oolio-group/oolio-pm-plugin
├── .claude-plugin/
│   └── marketplace.json    the marketplace manifest Cowork reads (must live here)
├── README.md
├── CHANGELOG.md            what changed in each version
├── CLAUDE.md               maintenance rules (commit-based versioning, log changes, archive)
├── PUBLISHING.md           how to edit, version, and publish (read this)
├── LICENSE                 usage terms (public repo, internal material)
└── oolio-pm/               the plugin
    ├── .claude-plugin/plugin.json
    ├── personas-library/   bundled persona-library snapshot
    ├── products/           product context briefs (facts skills may rely on)
    ├── references/         shared references (house style, council output template)
    ├── _archive/           retired skills, lenses, and templates (kept for reference)
    └── skills/             the skills (count in oolio-pm/README.md)
```

## Updating

See **PUBLISHING.md** for the full step-by-step. In short: edit the skill under `oolio-pm/skills/`, add a **CHANGELOG.md** entry, then commit and push. There is no version to bump, every commit is a new version, so installs with auto-update pick the change up on their next session. Maintenance rules are in **CLAUDE.md**.

## Notes

- This repository is intentionally **public** so teammates can install it without GitHub org access. It bundles Oolio-internal material (personas, context, strategy), so keep anything genuinely sensitive out of it.
- Must be hosted on github.com for Cowork to sync from it.
