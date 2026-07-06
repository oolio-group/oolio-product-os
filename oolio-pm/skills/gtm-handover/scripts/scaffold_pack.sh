#!/usr/bin/env bash
# Creates a per-product GTM pack folder.
#
# Usage:
#   scaffold_pack.sh "<Product Name>" [<version>] [<pack-folder>] [<templates-dir>]
#
# Arguments:
#   <Product Name>    Human-readable product name. Used in JSON metadata, READMEs, file titles.
#   <version>         Pack version, default v0.1.
#   <pack-folder>     Absolute path where the pack should live. If omitted, defaults to
#                     "$(pwd)/<slugified-product-name>". Caller is responsible for placing
#                     this somewhere sensible per the project's folder conventions.
#   <templates-dir>   Absolute path to the folder containing the six Template_*.{docx,pptx}
#                     files. If omitted, discovery order is:
#                       1. $GTM_TEMPLATES_DIR env var
#                       2. walk up from cwd looking for templates/ or Templates/ containing
#                          at least one Template_*.{docx,pptx}
#                     Errors clearly if no templates folder is found.

set -euo pipefail

PRODUCT="${1:-}"
VERSION="${2:-v0.1}"
PACK_DIR="${3:-}"
TEMPLATES_DIR="${4:-}"

if [[ -z "$PRODUCT" ]]; then
  echo "ERROR: Product name is required."
  echo "Usage: scaffold_pack.sh \"<Product Name>\" [<version>] [<pack-folder>] [<templates-dir>]"
  exit 1
fi

slugify() {
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/[^a-z0-9]/-/g' \
    | sed 's/--*/-/g' \
    | sed 's/^-//;s/-$//'
}

# Resolve pack folder.
if [[ -z "$PACK_DIR" ]]; then
  PACK_DIR="$(pwd)/$(slugify "$PRODUCT")"
  echo "INFO: No pack folder given. Using $PACK_DIR"
fi

# Resolve templates folder.
if [[ -z "$TEMPLATES_DIR" ]]; then
  if [[ -n "${GTM_TEMPLATES_DIR:-}" && -d "$GTM_TEMPLATES_DIR" ]]; then
    TEMPLATES_DIR="$GTM_TEMPLATES_DIR"
  else
    search="$(pwd)"
    while [[ "$search" != "/" && "$search" != "" ]]; do
      for name in templates Templates; do
        candidate="$search/$name"
        if [[ -d "$candidate" ]]; then
          if compgen -G "$candidate/Template_*.docx" > /dev/null \
             || compgen -G "$candidate/Template_*.pptx" > /dev/null; then
            TEMPLATES_DIR="$candidate"
            break 2
          fi
        fi
      done
      search="$(dirname "$search")"
    done
  fi
fi

if [[ -z "$TEMPLATES_DIR" || ! -d "$TEMPLATES_DIR" ]]; then
  echo "ERROR: Could not find a templates folder."
  echo "Provide one via:"
  echo "  - GTM_TEMPLATES_DIR environment variable, or"
  echo "  - a templates/ (or Templates/) folder in the project root, or"
  echo "  - the fourth argument to this script."
  echo "The folder must contain Template_*.{docx,pptx} files."
  exit 1
fi

mkdir -p "$PACK_DIR"

# Copy templates into the pack folder, renamed.
declare -A NAMES=(
  ["Template_One_Pager"]="01_One_Pager"
  ["Template_Supporting_Deck"]="02_Supporting_Deck"
  ["Template_Sales_Playbook"]="03_Sales_Playbook"
  ["Template_Account_Management_Playbook"]="04_Account_Management_Playbook"
  ["Template_Onboarding_Playbook"]="05_Onboarding_Playbook"
  ["Template_Marketing_Pack"]="06_Marketing_Pack"
)

for src in "${!NAMES[@]}"; do
  dst="${NAMES[$src]}"
  src_file=$(find "$TEMPLATES_DIR" -maxdepth 1 \( -name "${src}_*.docx" -o -name "${src}_*.pptx" \) | head -1)
  if [[ -z "$src_file" ]]; then
    echo "WARN: No template found matching ${src}_*. Skipping."
    continue
  fi
  ext="${src_file##*.}"
  cp "$src_file" "$PACK_DIR/${dst}_${VERSION}.${ext}"
done

# Seed pack_content.json from the bundled template.
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TEMPLATE_JSON="$SCRIPT_DIR/../assets/pack_content.template.json"

if [[ -f "$PACK_DIR/pack_content.json" ]]; then
  echo "INFO: pack_content.json already exists in $PACK_DIR. Leaving it untouched."
else
  if [[ ! -f "$TEMPLATE_JSON" ]]; then
    echo "ERROR: Could not find $TEMPLATE_JSON"
    exit 1
  fi
  python3 - "$TEMPLATE_JSON" "$PACK_DIR/pack_content.json" "$PRODUCT" "$VERSION" <<'PY'
import json, sys
src, dst, product, version = sys.argv[1:5]
with open(src) as f:
    data = json.load(f)
data['product']['name'] = product
data['product']['version'] = version
with open(dst, 'w') as f:
    json.dump(data, f, indent=2)
PY
  echo "Created $PACK_DIR/pack_content.json"
fi

# Drop a starter README.md
README="$PACK_DIR/README.md"
if [[ ! -f "$README" ]]; then
  cat > "$README" <<EOF
# $PRODUCT GTM Pack — $VERSION

| Field | Value |
|---|---|
| Product | $PRODUCT |
| Version | $VERSION |
| Last reviewed | [TBC] |
| Owner (PM) | [TBC] |
| GTM partner | [TBC] |

## Files

- 01_One_Pager_${VERSION}.pptx
- 02_Supporting_Deck_${VERSION}.pptx
- 03_Sales_Playbook_${VERSION}.docx
- 04_Account_Management_Playbook_${VERSION}.docx
- 05_Onboarding_Playbook_${VERSION}.docx
- 06_Marketing_Pack_${VERSION}.docx

## How this pack was built

Built using the \`oolio-gtm-pack\` skill. Source content lives in \`pack_content.json\` —
edit that and re-run \`scripts/build_pack.js\` to regenerate the files. Don't edit the
.docx or .pptx by hand.
EOF
  echo "Created $README"
fi

echo ""
echo "DONE. Pack folder ready: $PACK_DIR"
ls -1 "$PACK_DIR"
