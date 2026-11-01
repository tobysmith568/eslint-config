import { describe, expect, it } from "bun:test";
import {
  assertWellFormed,
  globalNames,
  pluginNames,
  resolve,
  severity
} from "../shared/test-utils.ts";
import jest from "./jest.ts";
import recommended from "./recommended.ts";

describe("jest", () => {
  it("is well formed", () => {
    assertWellFormed(jest);
  });

  it("only applies to the files it is scoped to", async () => {
    const consumer = [recommended, { files: ["**/*.test.ts"], extends: [jest] }];

    const test = await resolve(consumer, "src/a.test.ts");
    const source = await resolve(consumer, "src/a.ts");

    expect(severity(test, "jest/no-focused-tests")).toBe(2);
    expect(severity(test, "jest/expect-expect")).toBe(0);
    expect(globalNames(test)).toContain("describe");
    expect(severity(source, "jest/no-focused-tests")).toBeUndefined();
    expect(pluginNames(source)).not.toContain("jest");
  });

  it("can be scoped to a different glob", async () => {
    const consumer = [recommended, { files: ["**/*.spec.ts"], extends: [jest] }];

    const spec = await resolve(consumer, "src/a.spec.ts");
    const test = await resolve(consumer, "src/a.test.ts");

    expect(severity(spec, "jest/no-focused-tests")).toBe(2);
    expect(severity(test, "jest/no-focused-tests")).toBeUndefined();
  });

  it("relaxes strict typescript rules in the files it applies to only", async () => {
    const consumer = [recommended, { files: ["**/*.test.ts"], extends: [jest] }];

    const test = await resolve(consumer, "src/a.test.ts");
    const source = await resolve(consumer, "src/a.ts");

    expect(severity(test, "@typescript-eslint/no-explicit-any")).toBe(0);
    expect(severity(source, "@typescript-eslint/no-explicit-any")).toBe(2);
  });

  it("works without recommended", async () => {
    const resolved = await resolve([{ files: ["**/*.test.ts"], extends: [jest] }], "src/a.test.ts");

    expect(severity(resolved, "@typescript-eslint/no-explicit-any")).toBe(0);
  });
});
