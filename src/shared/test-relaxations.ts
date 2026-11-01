import type { Linter } from "eslint";
import tseslint from "typescript-eslint";

/**
 * Rules that are too strict for test code, shared by every test framework config.
 * Registers the typescript-eslint plugin itself so that a test framework config
 * works without having to be composed alongside `recommended`.
 */
export const testRelaxations: Linter.Config = {
  name: "tobysmith568/shared/test-relaxations",
  plugins: { "@typescript-eslint": tseslint.plugin },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/no-var-requires": "off"
  }
};
