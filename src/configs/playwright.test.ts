import { describe, expect, it } from "bun:test";
import { assertWellFormed, pluginNames, resolve, severity } from "../shared/test-utils.ts";
import playwright from "./playwright.ts";
import recommended from "./recommended.ts";

describe("playwright", () => {
  it("is well formed", () => {
    assertWellFormed(playwright);
  });

  it("enables its rules for the files it is scoped to", async () => {
    const consumer = [recommended, { files: ["e2e/**/*.ts"], extends: [playwright] }];

    const e2e = await resolve(consumer, "e2e/a.ts");
    const source = await resolve(consumer, "src/a.ts");

    expect(severity(e2e, "playwright/no-focused-test")).toBe(2);
    expect(severity(e2e, "@typescript-eslint/no-explicit-any")).toBe(0);
    expect(pluginNames(source)).not.toContain("playwright");
  });

  it("does not bring in the cypress plugin", async () => {
    const e2e = await resolve(
      [recommended, { files: ["e2e/**/*.ts"], extends: [playwright] }],
      "e2e/a.ts"
    );

    expect(pluginNames(e2e)).not.toContain("cypress");
  });
});
