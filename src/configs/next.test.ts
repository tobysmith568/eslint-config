import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertWellFormed, resolve, severity } from "../shared/test-utils.ts";
import next from "./next.ts";
import react from "./react.ts";
import recommended from "./recommended.ts";

describe("next", () => {
  it("is well formed", () => {
    assertWellFormed(next, { allowFiles: true, requireNames: false });
  });

  it("enables next rules for the files it is scoped to", async () => {
    const consumer = [recommended, { files: ["app/**/*.tsx"], extends: [next] }];

    const inScope = await resolve(consumer, "app/page.tsx");
    const outOfScope = await resolve(consumer, "src/other.tsx");

    assert.equal(severity(inScope, "@next/next/no-img-element"), 1);
    assert.equal(severity(outOfScope, "@next/next/no-img-element"), undefined);
  });

  it("can be composed with the react config", async () => {
    const resolved = await resolve([recommended, react, next], "src/a.tsx");

    assert.equal(severity(resolved, "react/jsx-key"), 2);
    assert.equal(severity(resolved, "@next/next/no-img-element"), 1);
  });
});
