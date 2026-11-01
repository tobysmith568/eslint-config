import { describe, expect, it } from "bun:test";
import { assertWellFormed, pluginNames, resolve, severity } from "../shared/test-utils.ts";
import astro from "./astro.ts";
import recommended from "./recommended.ts";

describe("astro", () => {
  it("is well formed", () => {
    // The Astro parser needs to be pointed at `.astro` files, so the config decides which files it applies to
    assertWellFormed(astro, { allowFiles: true });
  });

  it("enables its rules for astro files", async () => {
    const resolved = await resolve([recommended, astro], "src/a.astro");

    expect(severity(resolved, "astro/no-exports-from-components")).toBe(2);
    expect(severity(resolved, "astro/no-set-html-directive")).toBe(2);
    expect(severity(resolved, "astro/no-unused-css-selector")).toBe(2);
    expect(severity(resolved, "astro/jsx-a11y/alt-text")).toBe(2);
  });

  it("leaves out stylistic and noisy rules", async () => {
    const resolved = await resolve([recommended, astro], "src/a.astro");

    for (const rule of ["sort-attributes", "semi", "no-unsafe-inline-scripts"]) {
      expect(severity(resolved, `astro/${rule}`)).toBeUndefined();
    }
    expect(severity(resolved, "astro/jsx-a11y/control-has-associated-label")).toBe(0);
  });

  it("only applies its rules to astro files", async () => {
    const source = await resolve([recommended, astro], "src/a.ts");

    expect(severity(source, "astro/no-set-html-directive")).toBeUndefined();
    expect(severity(source, "@typescript-eslint/no-unused-vars")).toBe(2);
  });

  it("still lints scripts inside astro files", async () => {
    const script = await resolve([recommended, astro], "src/a.astro/0.ts");

    expect(severity(script, "@typescript-eslint/no-unused-vars")).toBe(2);
    expect(pluginNames(script)).toContain("astro");
  });

  it("works without recommended", async () => {
    const resolved = await resolve([astro], "src/a.astro");

    expect(severity(resolved, "astro/no-set-html-directive")).toBe(2);
  });
});
