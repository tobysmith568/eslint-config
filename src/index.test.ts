import assert from "node:assert/strict";
import { describe, it } from "node:test";

// These import through the package name, so they exercise the `exports` map against the built output
const entryPoints = [
  "",
  "/node",
  "/browser",
  "/prettier",
  "/react",
  "/next",
  "/jest",
  "/vitest",
  "/playwright",
  "/cypress",
  "/testing-library/dom",
  "/testing-library/react"
];

describe("package exports", () => {
  for (const entryPoint of entryPoints) {
    const specifier = `@tobysmith568/eslint-config${entryPoint}`;

    it(`${specifier} resolves to a config array`, async () => {
      const { default: config } = await import(specifier);

      assert.ok(Array.isArray(config));
      assert.ok(config.length > 0);
    });
  }
});
