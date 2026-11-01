import { describe, expect, it } from "bun:test";
import { assertWellFormed, pluginNames, resolve, severity } from "../shared/test-utils.ts";
import recommended from "./recommended.ts";
import test from "./test.ts";

describe("test", () => {
  it("is well formed", () => {
    assertWellFormed(test);
  });

  it("relaxes strict typescript rules in the files it is scoped to only", async () => {
    const consumer = [recommended, { files: ["**/*.spec.ts"], extends: [test] }];

    const spec = await resolve(consumer, "src/a.spec.ts");
    const source = await resolve(consumer, "src/a.ts");

    expect(severity(spec, "@typescript-eslint/no-explicit-any")).toBe(0);
    expect(severity(spec, "@typescript-eslint/no-non-null-assertion")).toBe(0);
    expect(severity(source, "@typescript-eslint/no-explicit-any")).toBe(2);
  });

  it("does not bring in any test framework plugin", async () => {
    const spec = await resolve(
      [recommended, { files: ["**/*.spec.ts"], extends: [test] }],
      "src/a.spec.ts"
    );

    for (const plugin of ["jest", "vitest", "playwright", "cypress", "testing-library"]) {
      expect(pluginNames(spec)).not.toContain(plugin);
    }
  });

  it("works without recommended", async () => {
    const resolved = await resolve([{ files: ["**/*.spec.ts"], extends: [test] }], "src/a.spec.ts");

    expect(severity(resolved, "@typescript-eslint/no-explicit-any")).toBe(0);
  });
});
