import pluginJs from "@eslint/js";
import type { Linter } from "eslint";
import tseslint from "typescript-eslint";

const sourceFileExtensions = ["js", "mjs", "cjs", "jsx", "ts", "tsx", "mts", "cts"];
const allSourceFiles = [`**/*.{${sourceFileExtensions.join(",")}}`];

const config: Linter.Config[] = [
  { name: "tobysmith568/recommended/files", files: allSourceFiles },
  { name: "tobysmith568/recommended/ignores", ignores: ["node_modules", "dist", "build"] },

  { ...pluginJs.configs.recommended, name: "tobysmith568/recommended/js" },
  ...tseslint.configs.recommended,
  {
    name: "tobysmith568/recommended/unused-vars",
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
  }
];

export default config;
