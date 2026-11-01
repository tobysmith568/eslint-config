import { describe, expect, it } from "bun:test";
import { assertWellFormed, globalNames, resolve } from "../shared/test-utils.ts";
import browser from "./browser.ts";
import recommended from "./recommended.ts";

describe("browser", () => {
  it("is well formed", () => {
    assertWellFormed(browser);
  });

  it("only adds browser globals", async () => {
    const resolved = await resolve([recommended, browser], "src/a.ts");

    expect(globalNames(resolved)).toContain("window");
    expect(globalNames(resolved)).not.toContain("process");
  });
});
