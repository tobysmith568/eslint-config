import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertWellFormed, globalNames, resolve } from "../shared/test-utils.ts";
import node from "./node.ts";
import recommended from "./recommended.ts";

describe("node", () => {
  it("is well formed", () => {
    assertWellFormed(node);
  });

  it("only adds node globals", async () => {
    const resolved = await resolve([recommended, node], "src/a.ts");

    assert.ok(globalNames(resolved).includes("process"));
    assert.ok(!globalNames(resolved).includes("window"));
  });
});
