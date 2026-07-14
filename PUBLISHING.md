# Publishing the Oolio PM plugin — step by step

The whole workflow for editing the **oolio-pm** plugin and getting a new version to your team. You do not need to write code.

GitHub repo (the home of this collection): **`oolio-group/oolio-pm-plugin`** (public). Use exactly that URL everywhere. The old `oolio-pm-plugins` (with an `s`) redirects here but registers as a *separate* marketplace, so never mix the two.

> **How distribution works.** The plugin is versioned **by git commit** — there are no version numbers in the manifests, on purpose. Every push to `main` is a new version. Anyone installed from the repo URL with auto-update on gets your change on their next session, with nothing to bump and nothing to re-download by hand. This is the officially recommended setup for an actively-edited internal plugin.

---

## A. One-time setup

### A1. The repo is already published

`oolio-group/oolio-pm-plugin` is live and public, so teammates can install without GitHub org access. Nothing to do here unless you are moving the repo.

### A2. Teammates install once (either surface)

**Claude Code (CLI):**

```
/plugin marketplace add oolio-group/oolio-pm-plugin
/plugin install oolio-pm@oolio-pm-plugin
```

**Or, for auto-registration and auto-updates**, add this to Claude Code `settings.json`:

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

`"autoUpdate": true` matters: for private marketplaces auto-update is **off** unless you switch it on, which is why updates felt stuck before.

**Cowork:** Settings → Plugins → Add plugin → GitHub → `oolio-group/oolio-pm-plugin` → install **oolio-pm**. See section D if Cowork serves a stale version.

---

## B. Each time you ship a change (repeat this)

### Step 1 — Edit the content
Tell me what to change, e.g. *"Edit the jpd-loop skill in oolio-pm: change X."* I edit the real file under `oolio-pm/skills/…`.

### Step 2 — Add a CHANGELOG entry
Ask me to log it. I add a dated entry to [CHANGELOG.md](CHANGELOG.md), newest first, saying what changed and why. **There is no version number to bump** — commit-based versioning handles that. (Do not add a `version` field back to the manifests; it would re-break update propagation. See [CLAUDE.md](CLAUDE.md).)

### Step 3 — Commit and push
Ask me to *"ship it"* (I commit and push), or use GitHub Desktop: type a summary, **Commit to main**, **Push origin**.

That's it. On the next session, everyone on auto-update has the change. No release, no zip, no announcement needed.

---

## C. How anyone installs or updates it

- **Install:** section A2.
- **Update:** automatic if you added the settings snippet with `"autoUpdate": true`. To force it now: `/plugin update oolio-pm@oolio-pm-plugin` (CLI), or in Cowork re-open the plugin and update.

---

## D. Cowork note and the zip fallback

Cowork is a separate surface from Claude Code and, in mid-2026, its marketplace backend was observed to **snapshot a repo once per URL and not refresh**, serving a frozen old version. The config in this repo is now correct, so this should be retested cleanly:

**One-time Cowork test.** Remove any existing oolio-pm marketplace entry first (both the `oolio-pm-plugin` and `oolio-pm-plugins` slugs if present), then add `oolio-group/oolio-pm-plugin` fresh and install. Check the skill list against [oolio-pm/README.md](oolio-pm/README.md). If it shows the current skill set, the marketplace path works in Cowork and you are done. If it still serves an old version, the freeze is Anthropic-side and the zip fallback below is the reliable path there.

**Zip fallback (Cowork only, if the test fails):**
1. Ask me to *"cut the release zip."* I run `scripts/package-plugin.sh` (it builds `dist/oolio-pm.zip` with the plugin root at the archive root).
2. Cowork → Settings → Plugins → Add plugin → **Upload local plugin** → upload the zip.
3. Re-uploading a newer zip replaces the old version. This path has no auto-update, so you re-upload on each change.

---

## Notes

- GitHub access is set up on Niel's Mac (`gh` authenticated), so Cowork/Claude Code can commit and push directly when asked. GitHub Desktop is the buttons-only alternative. Do not run both on the same change.
- The repo is intentionally **public** so teammates install without org access. It bundles Oolio-internal material, so keep anything genuinely sensitive out of it.
