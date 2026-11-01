import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertWellFormed, globalNames, resolve, severity } from "../shared/test-utils.ts";
import recommended from "./recommended.ts";

describe("recommended", () => {
  it("is well formed", () => {
    assertWellFormed(recommended, { allowFiles: true, requireNames: false });
  });

  it("lints TypeScript files with the base rules", async () => {
    const resolved = await resolve([recommended], "src/a.ts");

    assert.equal(severity(resolved, "no-unused-vars"), 0);
    assert.equal(severity(resolved, "@typescript-eslint/no-unused-vars"), 2);
    assert.equal(severity(resolved, "no-unexpected-multiline"), 2);
  });

  it("does not set any globals", async () => {
    const resolved = await resolve([recommended], "src/a.ts");

    assert.deepEqual(globalNames(resolved), []);
  });
});
