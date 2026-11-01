import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertWellFormed, globalNames, resolve, severity } from "../shared/test-utils.ts";
import recommended from "./recommended.ts";
import vitest from "./vitest.ts";

describe("vitest", () => {
  it("is well formed", () => {
    assertWellFormed(vitest);
  });

  it("enables its rules and globals", async () => {
    const consumer = [recommended, { files: ["**/*.test.ts"], extends: [vitest] }];

    const test = await resolve(consumer, "src/a.test.ts");

    assert.equal(severity(test, "vitest/no-focused-tests"), 2);
    assert.ok(globalNames(test).includes("vi"));
    assert.equal(severity(test, "@typescript-eslint/no-explicit-any"), 0);
  });
});
