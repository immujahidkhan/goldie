import { describe, expect, test } from "bun:test";
import { captureManifestPath, rawDirFor } from "./raw.ts";

describe("rawDirFor", () => {
  test("legacy device dir without locale", () => {
    expect(rawDirFor("/out", "iphone-6.9")).toBe("/out/raw/iphone-6.9");
  });

  test("per-locale dir", () => {
    expect(rawDirFor("/out", "iphone-6.9", "ja")).toBe("/out/raw/iphone-6.9/ja");
  });

  test("manifest path", () => {
    expect(captureManifestPath("/out", "iphone-6.9", "de-DE")).toBe(
      "/out/raw/iphone-6.9/de-DE/manifest.json",
    );
  });
});
