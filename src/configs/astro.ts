import type { Linter } from "eslint";
import pluginAstro from "eslint-plugin-astro";

const astroFiles = ["**/*.astro"];

// Each preset is the same base (plugin, parser, scripts inside components) followed by rule blocks that
// don't say which files they apply to. The rules are taken from them and scoped here instead.
const rulesOf = (preset: Linter.Config[]): Linter.RulesRecord =>
  Object.assign({}, ...preset.filter(c => !c.files).map(c => c.rules));

// `flat/all` is deliberately not used: it changes with every minor release of the plugin and enables
// stylistic rules, so new rules are opted in to here by hand instead
const config: Linter.Config[] = [
  ...pluginAstro.configs["flat/base"],
  {
    name: "tobysmith568/astro",
    files: astroFiles,
    rules: {
      ...rulesOf(pluginAstro.configs["flat/recommended"]),
      ...rulesOf(pluginAstro.configs["flat/jsx-a11y-strict"]),
      "astro/no-set-html-directive": "error",
      "astro/no-unused-css-selector": "error"
    }
  }
];

export default config;
