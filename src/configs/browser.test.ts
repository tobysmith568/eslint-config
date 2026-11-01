import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertWellFormed, globalNames, resolve } from "../shared/test-utils.ts";
import browser from "./browser.ts";
import recommended from "./recommended.ts";

describe("browser", () => {
  it("is well formed", () => {
    assertWellFormed(browser);
  });

  it("only adds browser globals", async () => {
    const resolved = await resolve([recommended, browser], "src/a.ts");

    assert.ok(globalNames(resolved).includes("window"));
    assert.ok(!globalNames(resolved).includes("process"));
  });
});
