# TCL TV Remote — multiple storefronts

Shared captures live in the repo-root `out/` from `goldie.config.ts`.
Each folder here is a **look** (background + bezel + template). Re-frame only;
you do not need to re-capture.

| Folder | Look |
|---|---|
| `midnight/` | Dark navy (default in root config) |
| `ember/` | Warm red/black, silver bezel, showcase |
| `ocean/` | Cool teal, blue bezel, magazine |
| `graphite/` | Near-black, orange bezel, storyboard |

## Render all looks

From the goldie repo (after a successful `goldie capture`):

```bash
export GOLDIE_CONFIG=$PWD/goldie.config.ts
./scripts/render-storefronts.sh
```

Outputs: `storefronts/<name>/out/screenshots/…`

## Render one look

```bash
export GOLDIE_CONFIG=$PWD/storefronts/ember/goldie.config.ts
# Reuse raw captures from the main out/
rm -rf storefronts/ember/out/raw
mkdir -p storefronts/ember/out
cp -R out/raw storefronts/ember/out/raw
goldie frame && goldie manifest
```
