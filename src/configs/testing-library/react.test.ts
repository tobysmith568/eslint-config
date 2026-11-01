import { describe, expect, it } from "bun:test";
import { assertWellFormed, resolve, severity } from "../../shared/test-utils.ts";
import recommended from "../recommended.ts";
import react from "./react.ts";

describe("testing-library/react", () => {
  it("is well formed", () => {
    assertWellFormed(react);
  });

  it("enables the react rules", async () => {
    const resolved = await resolve(
      [recommended, { files: ["**/*.test.tsx"], extends: [react] }],
      "src/a.test.tsx"
    );

    expect(severity(resolved, "testing-library/render-result-naming-convention")).toBe(2);
  });
});
