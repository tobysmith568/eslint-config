import { describe, expect, it } from "bun:test";
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

    expect(severity(test, "vitest/no-focused-tests")).toBe(2);
    expect(globalNames(test)).toContain("vi");
    expect(severity(test, "@typescript-eslint/no-explicit-any")).toBe(0);
  });
});
