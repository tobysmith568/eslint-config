import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertWellFormed, resolve, severity } from "../shared/test-utils.ts";
import prettier from "./prettier.ts";
import recommended from "./recommended.ts";

describe("prettier", () => {
  it("is well formed", () => {
    assertWellFormed(prettier);
  });

  it("disables formatting rules when opted in", async () => {
    const resolved = await resolve([recommended, prettier], "src/a.ts");

    assert.equal(severity(resolved, "no-unexpected-multiline"), 0);
  });
});
