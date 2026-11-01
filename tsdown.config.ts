import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/configs/**/*.ts", "!**/*.test.ts", "!src/shared/test-utils.ts"],
  format: "esm",
  platform: "node",
  target: "es2022",
  unbundle: true,
  fixedExtension: false,
  clean: true
});
