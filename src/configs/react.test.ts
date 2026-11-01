import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertWellFormed, resolve, severity } from "../shared/test-utils.ts";
import react from "./react.ts";
import recommended from "./recommended.ts";

describe("react", () => {
  it("is well formed", () => {
    assertWellFormed(react);
  });

  it("enables react and react-hooks rules", async () => {
    const resolved = await resolve([recommended, react], "src/a.tsx");

    assert.equal(severity(resolved, "react/jsx-key"), 2);
    assert.equal(severity(resolved, "react-hooks/rules-of-hooks"), 2);
    assert.equal(severity(resolved, "react/react-in-jsx-scope"), 0);
  });
});
