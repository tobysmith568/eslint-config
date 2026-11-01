import assert from "node:assert/strict";
import { describe, it } from "node:test";
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

    assert.equal(severity(test, "jest/no-focused-tests"), 2);
    assert.equal(severity(test, "jest/expect-expect"), 0);
    assert.ok(globalNames(test).includes("describe"));
    assert.equal(severity(source, "jest/no-focused-tests"), undefined);
    assert.ok(!pluginNames(source).includes("jest"));
  });

  it("can be scoped to a different glob", async () => {
    const consumer = [recommended, { files: ["**/*.spec.ts"], extends: [jest] }];

    const spec = await resolve(consumer, "src/a.spec.ts");
    const test = await resolve(consumer, "src/a.test.ts");

    assert.equal(severity(spec, "jest/no-focused-tests"), 2);
    assert.equal(severity(test, "jest/no-focused-tests"), undefined);
  });

  it("relaxes strict typescript rules in the files it applies to only", async () => {
    const consumer = [recommended, { files: ["**/*.test.ts"], extends: [jest] }];

    const test = await resolve(consumer, "src/a.test.ts");
    const source = await resolve(consumer, "src/a.ts");

    assert.equal(severity(test, "@typescript-eslint/no-explicit-any"), 0);
    assert.equal(severity(source, "@typescript-eslint/no-explicit-any"), 2);
  });

  it("works without recommended", async () => {
    const resolved = await resolve([{ files: ["**/*.test.ts"], extends: [jest] }], "src/a.test.ts");

    assert.equal(severity(resolved, "@typescript-eslint/no-explicit-any"), 0);
  });
});
