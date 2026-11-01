import type { Linter } from "eslint";
import pluginJest from "eslint-plugin-jest";
import test from "./test.ts";

const config: Linter.Config[] = [
  { ...pluginJest.configs["flat/recommended"], name: "tobysmith568/jest/recommended" },
  ...test,
  { name: "tobysmith568/jest/rules", rules: { "jest/expect-expect": "off" } }
];

export default config;
