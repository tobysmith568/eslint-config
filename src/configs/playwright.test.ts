import assert from "node:assert/strict";
import { describe, it } from "node:test";
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

    assert.equal(severity(e2e, "playwright/no-focused-test"), 2);
    assert.equal(severity(e2e, "@typescript-eslint/no-explicit-any"), 0);
    assert.ok(!pluginNames(source).includes("playwright"));
  });

  it("does not bring in the cypress plugin", async () => {
    const e2e = await resolve(
      [recommended, { files: ["e2e/**/*.ts"], extends: [playwright] }],
      "e2e/a.ts"
    );

    assert.ok(!pluginNames(e2e).includes("cypress"));
  });
});
