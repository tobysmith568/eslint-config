import type { Linter } from "eslint";
import eslintConfigPrettier from "eslint-config-prettier";

// Turns off rules that conflict with Prettier, so it needs to come after any config that enables them
const config: Linter.Config[] = [{ ...eslintConfigPrettier, name: "tobysmith568/prettier" }];

export default config;
