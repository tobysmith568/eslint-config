import pluginJs from "@eslint/js";
import type { Linter } from "eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginCypress from "eslint-plugin-cypress/flat";
import pluginJest from "eslint-plugin-jest";
import pluginReact from "eslint-plugin-react";
import pluginTestingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";

const unitTestFiles = ["**/*.(spec|test).[cm]?(j|t)s?(x)"];

export const baseConfig: Linter.Config[] = [
  // General setup
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { ignores: ["node_modules", "dist", "build"] },

  // Add general plugins
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ]
    }
  },

  // Unit test plugins
  {
    files: unitTestFiles,
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals
    }
  },
  {
    files: unitTestFiles,
    ...pluginTestingLibrary.configs["flat/dom"]
  },
  {
    files: unitTestFiles,
    ...pluginTestingLibrary.configs["flat/react"]
  },
  {
    files: unitTestFiles,
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-var-requires": "off",
      "jest/expect-expect": "off"
    }
  },

  // Cypress test plugins
  {
    files: ["**/*.cy.[cm]?(j|t)s?(x)"],
    plugins: {
      cypress: pluginCypress
    }
  },
  {
    files: ["**/*.cy.[cm]?(j|t)s?(x)"],
    ...pluginCypress.configs.globals
  },

  // Disable rules that conflict with Prettier
  eslintConfigPrettier
];
