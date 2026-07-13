#!/bin/bash
# Package the oolio-pm plugin as a versioned zip for Cowork local upload.
# Usage: ./scripts/package-plugin.sh [output-dir]   (default: ./dist)
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="${1:-$REPO_ROOT/dist}"

VERSION=$(python3 -c "import json; print(json.load(open('$REPO_ROOT/oolio-pm/.claude-plugin/plugin.json'))['version'])")
MARKET_VERSION=$(python3 -c "import json; print(json.load(open('$REPO_ROOT/.claude-plugin/marketplace.json'))['plugins'][0]['version'])")

if [ "$VERSION" != "$MARKET_VERSION" ]; then
  echo "ERROR: version mismatch — plugin.json says $VERSION, marketplace.json says $MARKET_VERSION. Fix before packaging." >&2
  exit 1
fi

ZIP="$OUT_DIR/oolio-pm-v$VERSION.zip"
mkdir -p "$OUT_DIR"
rm -f "$ZIP"

# The archive root MUST be the plugin root: Cowork's local upload (and the Claude
# plugin loader) expect `.claude-plugin/plugin.json` and `skills/` at the top level
# of the zip, not nested under an `oolio-pm/` wrapper. Zipping the folder itself
# buries them one level too deep and the loader finds zero skills. So we zip the
# CONTENTS of oolio-pm/ from inside it.
cd "$REPO_ROOT/oolio-pm"
zip -rq "$ZIP" . -x "*.DS_Store" -x "*/__pycache__/*"

# Assert the layout is right, or fail loudly rather than ship a silent dud.
# Capture the listing first: piping unzip into `grep -q` trips `set -o pipefail`,
# because grep exits early on a match and unzip then dies with SIGPIPE, so the
# pipeline reports failure even when the file is present.
ZIP_LIST="$(unzip -l "$ZIP")"
if ! grep -q " \.claude-plugin/plugin.json$" <<<"$ZIP_LIST"; then
  echo "ERROR: .claude-plugin/plugin.json is not at the archive root — the zip is malformed." >&2
  rm -f "$ZIP"
  exit 1
fi

echo "Packaged v$VERSION -> $ZIP"
unzip -l "$ZIP" | tail -1
