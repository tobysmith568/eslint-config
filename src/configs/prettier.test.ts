import { describe, expect, it } from "bun:test";
import { assertWellFormed, resolve, severity } from "../shared/test-utils.ts";
import prettier from "./prettier.ts";
import recommended from "./recommended.ts";

describe("prettier", () => {
  it("is well formed", () => {
    assertWellFormed(prettier);
  });

  it("disables formatting rules when opted in", async () => {
    const resolved = await resolve([recommended, prettier], "src/a.ts");

    expect(severity(resolved, "no-unexpected-multiline")).toBe(0);
  });
});
