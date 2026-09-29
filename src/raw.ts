import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { CaptureManifest } from "./capture.ts";
import type { DeviceKey } from "./specs.ts";

/** Raw captures for one device; optional locale segment when capturing per language. */
export function rawDirFor(outDir: string, deviceKey: DeviceKey, locale?: string): string {
  if (locale) return join(outDir, "raw", deviceKey, locale);
  return join(outDir, "raw", deviceKey);
}

export function captureManifestPath(
  outDir: string,
  deviceKey: DeviceKey,
  locale?: string,
): string {
  return join(rawDirFor(outDir, deviceKey, locale), "manifest.json");
}

/**
 * Manifest for framing a locale: prefer out/raw/<device>/<locale>/, else the
 * legacy single-locale out/raw/<device>/ tree from a default capture.
 */
export async function readCaptureManifest(
  outDir: string,
  deviceKey: DeviceKey,
  locale: string,
): Promise<CaptureManifest | null> {
  for (const path of [
    captureManifestPath(outDir, deviceKey, locale),
    captureManifestPath(outDir, deviceKey),
  ]) {
    try {
      return JSON.parse(await readFile(path, "utf8"));
    } catch {
      /* try next */
    }
  }
  return null;
}
