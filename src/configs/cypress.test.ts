import assert from "node:assert/strict";
import { describe, it } from "node:test";
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

    assert.equal(severity(cy, "cypress/no-assigning-return-values"), 2);
    assert.equal(severity(cy, "@typescript-eslint/no-explicit-any"), 0);
    assert.ok(!pluginNames(source).includes("cypress"));
  });

  it("does not bring in the playwright plugin", async () => {
    const cy = await resolve(
      [recommended, { files: ["**/*.cy.ts"], extends: [cypress] }],
      "cypress/a.cy.ts"
    );

    assert.ok(!pluginNames(cy).includes("playwright"));
  });
});
