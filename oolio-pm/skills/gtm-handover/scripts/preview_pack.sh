#!/usr/bin/env bash
# Convert every .docx and .pptx in a pack folder to JPEG previews for visual QA.
# Usage: preview_pack.sh "<path to pack folder>"

set -euo pipefail

PACK_DIR="${1:-}"
if [[ -z "$PACK_DIR" || ! -d "$PACK_DIR" ]]; then
  echo "ERROR: Pass the pack folder path."
  exit 1
fi

PREVIEW_DIR="$PACK_DIR/_preview"
mkdir -p "$PREVIEW_DIR"

# Locate soffice helper (uses the same one bundled with the docx skill).
SOFFICE="python3 /sessions/$(whoami)/mnt/.claude/skills/docx/scripts/office/soffice.py"
if ! eval "$SOFFICE --help" >/dev/null 2>&1; then
  # Fallback: try plain soffice.
  SOFFICE="soffice"
fi

cd "$PACK_DIR"
for f in *.docx *.pptx; do
  [[ -f "$f" ]] || continue
  base="${f%.*}"
  echo "Rendering $f..."
  $SOFFICE --headless --convert-to pdf "$f" --outdir "$PREVIEW_DIR" >/dev/null 2>&1 || soffice --headless --convert-to pdf "$f" --outdir "$PREVIEW_DIR"
  pdftoppm -jpeg -r 100 "$PREVIEW_DIR/${base}.pdf" "$PREVIEW_DIR/${base}_page" >/dev/null 2>&1
done

echo ""
echo "Previews written to $PREVIEW_DIR"
ls -1 "$PREVIEW_DIR"/*.jpg 2>/dev/null | head -20
