export const standardExtends: string[] = [
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended"
];

// Configs that must go last
export const standardFinalExtends: string[] = ["prettier"];

export const unitTestExtends: string[] = [
  "plugin:jest/recommended",
  "plugin:jest/style",
  "plugin:testing-library/react"
];

export const e2eTestExtends: string[] = ["plugin:cypress/recommended"];
