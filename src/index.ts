import type { Linter } from "eslint";
import { baseConfig } from "./configs/base.config.js";
import { nextConfig } from "./configs/next.config.js";

type Configs = {
  recommended: Linter.Config[];
  next: (dirname: string) => Linter.Config[];
};

const configs: Configs = {
  recommended: baseConfig,
  next: nextConfig
};

export default configs;
