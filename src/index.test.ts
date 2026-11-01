import { describe, expect, it } from "bun:test";

// These import through the package name, so they exercise the `exports` map against the built output
const entryPoints = [
  "",
  "/node",
  "/browser",
  "/prettier",
  "/react",
  "/next",
  "/test",
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

      expect(config).toBeArray();
      expect(config.length).toBeGreaterThan(0);
    });
  }
});
