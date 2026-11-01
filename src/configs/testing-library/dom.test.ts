import { describe, expect, it } from "bun:test";
import { assertWellFormed, resolve, severity } from "../../shared/test-utils.ts";
import recommended from "../recommended.ts";
import dom from "./dom.ts";

describe("testing-library/dom", () => {
  it("is well formed", () => {
    assertWellFormed(dom);
  });

  it("enables the dom rules but not the react ones", async () => {
    const resolved = await resolve(
      [recommended, { files: ["**/*.test.ts"], extends: [dom] }],
      "src/a.test.ts"
    );

    expect(severity(resolved, "testing-library/await-async-queries")).toBe(2);
    expect(severity(resolved, "testing-library/render-result-naming-convention")).toBeUndefined();
  });
});
