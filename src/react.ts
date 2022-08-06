import { Linter } from "eslint";
import {
  e2eTestExtends,
  standardExtends,
  standardFinalExtends,
  unitTestExtends
} from "./default-extends";

const config: Linter.Config = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    ...standardExtends,
    // Add more here
    ...standardFinalExtends
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {},
  overrides: [
    {
      files: ["**/*.spec.ts", "**/*.spec.tsx"],
      extends: unitTestExtends,
      env: {
        jest: true
      }
    },
    {
      files: ["**/*.cy.ts", "**/*.cy.tsx"],
      extends: e2eTestExtends,
      globals: {
        cy: true
      }
    }
  ]
};

export = config;
