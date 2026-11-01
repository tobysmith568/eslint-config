import { describe, expect, it } from "bun:test";
import { assertWellFormed, pluginNames, resolve, severity } from "../shared/test-utils.ts";
import cypress from "./cypress.ts";
import recommended from "./recommended.ts";

describe("cypress", () => {
  it("is well formed", () => {
    assertWellFormed(cypress);
  });

  it("enables its rules for the files it is scoped to", async () => {
    const consumer = [recommended, { files: ["**/*.cy.ts"], extends: [cypress] }];

    const cy = await resolve(consumer, "cypress/a.cy.ts");
    const source = await resolve(consumer, "src/a.ts");

    expect(severity(cy, "cypress/no-assigning-return-values")).toBe(2);
    expect(severity(cy, "@typescript-eslint/no-explicit-any")).toBe(0);
    expect(pluginNames(source)).not.toContain("cypress");
  });

  it("does not bring in the playwright plugin", async () => {
    const cy = await resolve(
      [recommended, { files: ["**/*.cy.ts"], extends: [cypress] }],
      "cypress/a.cy.ts"
    );

    expect(pluginNames(cy)).not.toContain("playwright");
  });
});
