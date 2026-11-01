import type { Linter } from "eslint";
import pluginTestingLibrary from "eslint-plugin-testing-library";

const config: Linter.Config[] = [
  { ...pluginTestingLibrary.configs["flat/dom"], name: "tobysmith568/testing-library/dom" }
];

export default config;
