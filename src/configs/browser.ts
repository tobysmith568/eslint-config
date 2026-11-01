import type { Linter } from "eslint";
import globals from "globals";

const config: Linter.Config[] = [
  { name: "tobysmith568/browser", languageOptions: { globals: globals.browser } }
];

export default config;
