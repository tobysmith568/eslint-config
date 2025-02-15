// https://github.com/cypress-io/eslint-plugin-cypress/issues/232#issuecomment-2404273792
// Further augmented for the globals object
declare module "eslint-plugin-cypress/flat" {
  import type { ESLint } from "eslint";
  const plugin: ESLint.Plugin & {
    configs: {
      globals: ESLint.Config;
    };
  };

  export default plugin;
}
