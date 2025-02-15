import { FlatCompat } from "@eslint/eslintrc";
import { Linter } from "eslint";
import { baseConfig } from "./base.config.js";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
});

export const nextConfig: Linter.Config[] = [
  ...baseConfig,
  ...(compat.config({
    extends: ["next"],
    rules: {}
  }) as Linter.Config[])
];
