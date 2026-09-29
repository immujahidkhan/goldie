# TCL TV Remote screenshots (this repo’s goldie.config.ts)

## Capture once

```bash
cd /Users/mapmac/Documents/Github/goldie
export GOLDIE_CONFIG=$PWD/goldie.config.ts

# Simulator booted; Release .app built under TCL-TV-Remote/build/DerivedData-sim
goldie doctor
goldie capture
goldie frame
goldie manifest
goldie studio          # http://localhost:4321 — default "midnight" look
```

Flows: `./.argent/flows/` (in this goldie repo)  
Output: `./out/screenshots/iphone-6.9/<locale>/`

## All 50 App Store locales

`goldie.config.ts` lists every ASC metadata language (`app-store-locales.ts`).

### Localized in-app UI (recommended for TCL)

Each locale gets its own simulator language and raw captures under
`out/raw/iphone-6.9/<locale>/`, then framed PNGs under
`out/screenshots/iphone-6.9/<locale>/`. Preview video is captured once
(on the first locale only).

```bash
goldie capture --all-locales
# or
chmod +x scripts/capture-all-locales.sh
./scripts/capture-all-locales.sh
```

Capture only (no frame after each locale):

```bash
goldie capture --all-locales --no-frame
goldie frame && goldie manifest
```

One locale for a spot check:

```bash
goldie capture --locale ja
goldie frame --locale ja
goldie manifest
```

### Frame text only (single English capture)

One capture (simulator pinned to `en-US`), then `goldie frame` reuses the
same raw PNGs and only changes headline/subhead per locale:

```bash
goldie capture
goldie frame && goldie manifest
```

Copy uses English by default. Add translations via `L("English…", { "ja": "…" })`
in the config. Major languages already have overrides for headlines / store blurb.

## Multiple storefront looks

Same captures, different background / bezel / template:

| Look | Config |
|---|---|
| midnight (default) | `goldie.config.ts` |
| ember | `storefronts/ember/goldie.config.ts` |
| ocean | `storefronts/ocean/goldie.config.ts` |
| graphite | `storefronts/graphite/goldie.config.ts` |

```bash
chmod +x scripts/render-storefronts.sh
./scripts/render-storefronts.sh
```

Then open one look:

```bash
GOLDIE_CONFIG=$PWD/storefronts/ocean/goldie.config.ts goldie studio
```

Or tweak live in the studio Design panel and Export.
