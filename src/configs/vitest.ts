import pluginVitest from "@vitest/eslint-plugin";
import type { Linter } from "eslint";
import test from "./test.ts";

const config: Linter.Config[] = [
  { ...pluginVitest.configs.recommended, name: "tobysmith568/vitest/recommended" },
  { ...pluginVitest.configs.env, name: "tobysmith568/vitest/env" },
  ...test
];

export default config;
