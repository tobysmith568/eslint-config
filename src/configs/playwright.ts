import type { Linter } from "eslint";
import pluginPlaywright from "eslint-plugin-playwright";
import { testRelaxations } from "../shared/test-relaxations.ts";

const config: Linter.Config[] = [
  { ...pluginPlaywright.configs["flat/recommended"], name: "tobysmith568/playwright/recommended" },
  testRelaxations
];

export default config;
