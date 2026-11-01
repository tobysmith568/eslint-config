import pluginVitest from "@vitest/eslint-plugin";
import type { Linter } from "eslint";
import { testRelaxations } from "../shared/test-relaxations.ts";

const config: Linter.Config[] = [
  { ...pluginVitest.configs.recommended, name: "tobysmith568/vitest/recommended" },
  { ...pluginVitest.configs.env, name: "tobysmith568/vitest/env" },
  testRelaxations
];

export default config;
