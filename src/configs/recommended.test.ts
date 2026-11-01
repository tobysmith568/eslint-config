import { describe, expect, it } from "bun:test";
import { assertWellFormed, globalNames, resolve, severity } from "../shared/test-utils.ts";
import recommended from "./recommended.ts";

describe("recommended", () => {
  it("is well formed", () => {
    assertWellFormed(recommended, { allowFiles: true, requireNames: false });
  });

  it("lints TypeScript files with the base rules", async () => {
    const resolved = await resolve([recommended], "src/a.ts");

    expect(severity(resolved, "no-unused-vars")).toBe(0);
    expect(severity(resolved, "@typescript-eslint/no-unused-vars")).toBe(2);
    expect(severity(resolved, "no-unexpected-multiline")).toBe(2);
  });

  it("does not set any globals", async () => {
    const resolved = await resolve([recommended], "src/a.ts");

    expect(globalNames(resolved)).toEqual([]);
  });
});
