import type { Linter } from "eslint";
import globals from "globals";

const config: Linter.Config[] = [
  { name: "tobysmith568/node", languageOptions: { globals: globals.node } }
];

export default config;
