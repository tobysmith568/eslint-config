import { describe, expect, it } from "bun:test";
import { assertWellFormed, globalNames, resolve } from "../shared/test-utils.ts";
import node from "./node.ts";
import recommended from "./recommended.ts";

describe("node", () => {
  it("is well formed", () => {
    assertWellFormed(node);
  });

  it("only adds node globals", async () => {
    const resolved = await resolve([recommended, node], "src/a.ts");

    expect(globalNames(resolved)).toContain("process");
    expect(globalNames(resolved)).not.toContain("window");
  });
});
