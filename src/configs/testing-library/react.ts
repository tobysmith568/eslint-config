import type { Linter } from "eslint";
import pluginTestingLibrary from "eslint-plugin-testing-library";

const config: Linter.Config[] = [
  { ...pluginTestingLibrary.configs["flat/react"], name: "tobysmith568/testing-library/react" }
];

export default config;
