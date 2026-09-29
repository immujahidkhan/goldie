#!/usr/bin/env bash
# Re-frame TCL TV Remote captures into multiple storefront looks.
# Requires a prior `goldie capture` with GOLDIE_CONFIG pointing at
# the repo-root goldie.config.ts (so ./out/raw exists).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -d out/raw ]]; then
  echo "Missing out/raw — run: GOLDIE_CONFIG=\$PWD/goldie.config.ts goldie capture" >&2
  exit 1
fi

GOLDIE_BIN="${GOLDIE_BIN:-goldie}"

render() {
  local name="$1"
  local config="$2"
  local dest="$ROOT/storefronts/$name"
  echo "==> storefront: $name"
  mkdir -p "$dest/out"
  rm -rf "$dest/out/raw"
  cp -R "$ROOT/out/raw" "$dest/out/raw"
  rm -rf "$dest/out/screenshots" "$dest/out/web" "$dest/out/previews"
  GOLDIE_CONFIG="$config" "$GOLDIE_BIN" frame
  GOLDIE_CONFIG="$config" "$GOLDIE_BIN" manifest
  echo "    → $dest/out/screenshots"
}

render midnight "$ROOT/storefronts/midnight/goldie.config.ts"
render ember "$ROOT/storefronts/ember/goldie.config.ts"
render ocean "$ROOT/storefronts/ocean/goldie.config.ts"
render graphite "$ROOT/storefronts/graphite/goldie.config.ts"

echo "Done. Open any look in studio with:"
echo "  GOLDIE_CONFIG=\$PWD/storefronts/<name>/goldie.config.ts goldie studio"
