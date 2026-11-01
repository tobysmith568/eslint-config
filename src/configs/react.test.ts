import { describe, expect, it } from "bun:test";
import { assertWellFormed, resolve, severity } from "../shared/test-utils.ts";
import react from "./react.ts";
import recommended from "./recommended.ts";

describe("react", () => {
  it("is well formed", () => {
    assertWellFormed(react);
  });

  it("enables react and react-hooks rules", async () => {
    const resolved = await resolve([recommended, react], "src/a.tsx");

    expect(severity(resolved, "react/jsx-key")).toBe(2);
    expect(severity(resolved, "react-hooks/rules-of-hooks")).toBe(2);
    expect(severity(resolved, "react/react-in-jsx-scope")).toBe(0);
  });
});
