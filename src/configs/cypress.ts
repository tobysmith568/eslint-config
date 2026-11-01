import type { Linter } from "eslint";
import pluginCypress from "eslint-plugin-cypress";
import test from "./test.ts";

const config: Linter.Config[] = [
  { ...pluginCypress.configs.recommended, name: "tobysmith568/cypress/recommended" },
  ...test
];

export default config;
