import type { Linter } from "eslint";
import tseslint from "typescript-eslint";

/**
 * Rules that are too strict for test code. Also the base of every test framework config,
 * and usable on its own for frameworks without one (e.g. `bun:test` or `node:test`).
 * Registers the typescript-eslint plugin itself so that it works without being
 * composed alongside `recommended`.
 */
const config: Linter.Config[] = [
  {
    name: "tobysmith568/test",
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-var-requires": "off"
    }
  }
];

export default config;
