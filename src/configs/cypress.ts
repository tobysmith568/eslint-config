import type { Linter } from "eslint";
import pluginCypress from "eslint-plugin-cypress";
import { testRelaxations } from "../shared/test-relaxations.ts";

const config: Linter.Config[] = [
  { ...pluginCypress.configs.recommended, name: "tobysmith568/cypress/recommended" },
  testRelaxations
];

export default config;
