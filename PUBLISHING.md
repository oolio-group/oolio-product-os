# Publishing the Oolio PM plugin — step by step

This is the whole workflow for editing the **oolio-pm** plugin and getting a new version to your team. You do not need to write any code. Three roles:

- **Cowork builds** — where you change skill content (just chat with me).
- **GitHub Desktop publishes** — an app with buttons that sends your changes to GitHub.
- **Your team pulls** — installs once, then gets updates.

GitHub repo (the home of this collection): `oolio-group/oolio-pm-plugin` (public).

---

## A. One-time setup (only the very first time, ever)

### A1. Install GitHub Desktop
1. Go to https://desktop.github.com and click **Download for macOS**.
2. Open the downloaded file and drag **GitHub Desktop** into your Applications folder.
3. Open GitHub Desktop. Click **Sign in to GitHub.com** and log in with your existing GitHub account. Authorise it when the browser asks.

### A2. Add this folder
1. In GitHub Desktop, top menu: **File → Add Local Repository**.
2. Click **Choose…** and select this folder:
   `Documents/Claude/Code/oolio-pm-plugins`
3. Click **Add Repository**. (I've already prepared it as a repository, so this just works.)

### A3. Publish it to GitHub
1. Click the blue **Publish repository** button (top right).
2. Leave **"Keep this code private"** unticked, so the repo is **public** and teammates can install without GitHub org access.
3. Set the owner to **oolio-group** if offered; otherwise your own account is fine for now.
4. Make sure the name is **oolio-pm-plugin**. Click **Publish repository**.

### A4. Connect it to Cowork
1. In Cowork: **Settings → Plugins → Add plugin → GitHub** (Organization settings if you have them).
2. Enter `oolio-group/oolio-pm-plugin` (or `your-username/oolio-pm-plugin` if you published to your own account).
3. Install **oolio-pm**.

That's the collection live. From now on you only do Part B.

---

## B. Each time you want to ship a change (repeat this)

### Step 1 — Edit the content (Cowork)
Open a Cowork chat and tell me what to change, e.g. *"Edit the jpd-loop skill in oolio-pm: change X."* I edit the real file under `oolio-pm/skills/…`. Click **Approve** on the folder pop-up if it appears.

### Step 2 — Bump the version (Cowork — just ask)
Ask me to *"bump the plugin version."* I update it in **both** files (they must match):

- `.claude-plugin/marketplace.json` → the plugin's `version`
- `oolio-pm/.claude-plugin/plugin.json` → `version`

Version rules (simple):

- Tiny fix or wording → bump the last number: `0.1.0 → 0.1.1`
- New ability or skill → bump the middle: `0.1.1 → 0.2.0`
- Big change to how people use it → bump the first: `0.2.0 → 1.0.0`

### Step 3 — Publish (GitHub Desktop — buttons only)
1. Open **GitHub Desktop**. It already shows your changes in the left list.
2. Bottom-left, type a short **Summary**, e.g. `oolio-pm v0.2.0 — what changed`.
3. Click **Commit to main**.
4. Click **Push origin** (top right).

### Step 4 — Tell your team
Message them: *"oolio-pm v0.2.0 is out."* Their Cowork syncs and offers the update. To get it now, they go to **Settings → Plugins** and trigger a sync / update.

That's it. Steps 1–4 every release.

---

## C. How a teammate installs it (first time, on their machine)

1. Cowork → **Settings → Plugins → Add plugin → GitHub**.
2. Enter `oolio-group/oolio-pm-plugin`.
3. Install **oolio-pm**. Done — all nine skills appear.

Every version you push then shows up as an available update for them.

---

## D. One-off cleanup after first install (you, once)

Some of these skills also exist as your older personal copies (the standalone `jpd-loop` skill and the separate `product-council` plugin). Once **oolio-pm** is installed from GitHub and working, retire the old ones so you don't run duplicates:

- Remove the standalone `jpd-loop` personal skill in **Settings → Capabilities**.
- Remove the old `product-council` plugin in **Settings → Plugins**.

The bundled versions inside **oolio-pm** replace both.

---

## Notes

- **Can Cowork push for me now?** Yes. GitHub access is set up on Niel's Mac (the `gh` CLI is authenticated), so Cowork can commit and push this repo directly when asked. GitHub Desktop still works as the buttons-only alternative if you prefer to review changes visually before they go up. Either route is fine; do not run both at once on the same change.
- **Why not Claude Code?** Claude Code is a Terminal tool for developers. For just publishing this folder, GitHub Desktop does the same job with buttons. You can learn Claude Code later if you want; you don't need it for this.
