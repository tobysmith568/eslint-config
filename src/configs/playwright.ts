import type { Linter } from "eslint";
import pluginPlaywright from "eslint-plugin-playwright";
import test from "./test.ts";

const config: Linter.Config[] = [
  { ...pluginPlaywright.configs["flat/recommended"], name: "tobysmith568/playwright/recommended" },
  ...test
];

export default config;
