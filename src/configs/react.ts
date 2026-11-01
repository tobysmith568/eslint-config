import type { Linter } from "eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

const config: Linter.Config[] = [
  { ...pluginReact.configs.flat.recommended, name: "tobysmith568/react/recommended" },
  { ...pluginReact.configs.flat["jsx-runtime"], name: "tobysmith568/react/jsx-runtime" },
  { ...pluginReactHooks.configs.flat.recommended, name: "tobysmith568/react/hooks" },
  { name: "tobysmith568/react/settings", settings: { react: { version: "detect" } } }
];

export default config;
