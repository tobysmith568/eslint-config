import { describe, expect, it } from "bun:test";
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

    expect(severity(inScope, "@next/next/no-img-element")).toBe(1);
    expect(severity(outOfScope, "@next/next/no-img-element")).toBeUndefined();
  });

  it("can be composed with the react config", async () => {
    const resolved = await resolve([recommended, react, next], "src/a.tsx");

    expect(severity(resolved, "react/jsx-key")).toBe(2);
    expect(severity(resolved, "@next/next/no-img-element")).toBe(1);
  });
});
