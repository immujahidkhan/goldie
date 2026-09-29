#!/usr/bin/env bash
# Capture + frame TCL (or any goldie config) for every App Store locale:
# simulator language matches each locale; output under out/screenshots/<device>/<locale>/.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

CONFIG="${GOLDIE_CONFIG:-$ROOT/goldie.config.ts}"
GOLDIE_BIN="${GOLDIE_BIN:-goldie}"

export GOLDIE_CONFIG="$CONFIG"
echo "GOLDIE_CONFIG=$GOLDIE_CONFIG"
"$GOLDIE_BIN" doctor
"$GOLDIE_BIN" capture --all-locales "$@"
