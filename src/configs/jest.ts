import type { Linter } from "eslint";
import pluginJest from "eslint-plugin-jest";
import { testRelaxations } from "../shared/test-relaxations.ts";

const config: Linter.Config[] = [
  { ...pluginJest.configs["flat/recommended"], name: "tobysmith568/jest/recommended" },
  testRelaxations,
  { name: "tobysmith568/jest/rules", rules: { "jest/expect-expect": "off" } }
];

export default config;
