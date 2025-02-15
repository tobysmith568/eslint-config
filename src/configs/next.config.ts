import { FlatCompat } from "@eslint/eslintrc";
import { Linter } from "eslint";
import { baseConfig } from "./base.config.js";

export const nextConfig = (dirname: string): Linter.Config[] => {
  const compat = new FlatCompat({
    baseDirectory: dirname
  });

  const nextConfig: Linter.Config[] = [
    ...(compat.config({
      extends: ["next"],
      rules: {}
    }) as Linter.Config[]),
    ...baseConfig
  ];

  return nextConfig;
};
