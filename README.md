<a href="https://www.npmjs.com/package/@tobysmith568/eslint-config" target="_blank" alt="npm version">
  <img alt="npm version" src="https://img.shields.io/npm/v/@tobysmith568/eslint-config?logo=npm">
</a>

# @tobysmith568/eslint-config

The personal [ESLint](https://eslint.org/) configs for [Toby Smith](https://github.com/tobysmith568) (tobysmith568).

**GitHub**: https://github.com/tobysmith568/eslint-config  
**npm**: https://www.npmjs.com/package/@tobysmith568/eslint-config

## Usage

**Install**:

```bash
$ npm install @tobysmith568/eslint-config eslint --save-dev
```

**Edit `eslint.config.mjs`**:

```js
import { defineConfig } from "eslint/config";
import recommended from "@tobysmith568/eslint-config";
import jest from "@tobysmith568/eslint-config/jest";
import playwright from "@tobysmith568/eslint-config/playwright";
import prettier from "@tobysmith568/eslint-config/prettier";

export default defineConfig([
  recommended,
  { files: ["**/*.test.ts"], extends: [jest] },
  { files: ["e2e/**/*.ts"], extends: [playwright] },
  prettier
]);
```

The configs only say which rules to use; you decide which files they apply to with `files`. Use `extends` (from `defineConfig`) to scope a config, so that `files` is applied to every part of it. Spreading a config directly (`...jest`) applies it to every file.

## Available configs

Everything except `recommended` is opt-in. All of the plugins are bundled as dependencies, but a plugin is only loaded when you import the config that uses it.

| Import                                              | What it adds                                                                       |
| --------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `@tobysmith568/eslint-config`                       | ESLint and typescript-eslint recommended rules, ignores                            |
| `@tobysmith568/eslint-config/node`                  | Node globals                                                                       |
| `@tobysmith568/eslint-config/browser`               | Browser globals                                                                    |
| `@tobysmith568/eslint-config/prettier`              | Disables rules that conflict with Prettier (put this **last**)                     |
| `@tobysmith568/eslint-config/react`                 | React, JSX runtime and React Hooks rules                                           |
| `@tobysmith568/eslint-config/next`                  | Next.js (including Core Web Vitals) rules                                          |
| `@tobysmith568/eslint-config/astro`                 | Astro and accessibility rules                                                      |
| `@tobysmith568/eslint-config/test`                  | Relaxes strict TypeScript rules for tests, for frameworks without their own config |
| `@tobysmith568/eslint-config/jest`                  | Jest rules and globals                                                             |
| `@tobysmith568/eslint-config/vitest`                | Vitest rules and globals                                                           |
| `@tobysmith568/eslint-config/playwright`            | Playwright rules                                                                   |
| `@tobysmith568/eslint-config/cypress`               | Cypress rules and globals                                                          |
| `@tobysmith568/eslint-config/testing-library/dom`   | Testing Library (DOM) rules                                                        |
| `@tobysmith568/eslint-config/testing-library/react` | Testing Library (React) rules                                                      |

The test framework configs (`jest`, `vitest`, `playwright` and `cypress`) also relax a few strict TypeScript rules, like `no-explicit-any`, for the files they are applied to. If your test framework isn't one of those (e.g. `bun:test` or `node:test`), use `test` to get just those relaxations without any framework's rules or globals:

```js
{ files: ["**/*.spec.ts"], extends: [test] }
```

### Astro

The `astro` config enables the [eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro) `recommended` and `jsx-a11y-strict` rules, plus `astro/no-set-html-directive` and `astro/no-unused-css-selector`. It already only applies to `.astro` files, so it doesn't need `files`:

```js
export default defineConfig([recommended, astro, prettier]);
```

It leaves out the plugin's `all` preset on purpose, as that changes with every minor release and includes stylistic rules (like `sort-attributes`). New rules are added by hand.

## Migrating from v2

The old `recommended` config bundled everything and applied it by file name. Now you pick the parts you need and say which files they apply to:

| Before                                      | After                                                                                                             |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `...tobysmith568.recommended`               | `recommended`, plus `browser` and/or `node` for globals, `react` if you use React, and `prettier` last            |
| Unit test rules (`*.{spec,test}.*`)         | `{ files: ["**/*.{spec,test}.*"], extends: [jest, testingLibraryDom, testingLibraryReact] }` (or `vitest`)        |
| Cypress rules (`*.cy.*`)                    | `{ files: ["**/*.cy.*"], extends: [cypress] }`                                                                    |
| `...tobysmith568.next(import.meta.dirname)` | `{ extends: [next] }`, plus the other configs you need. It no longer includes `recommended` or takes a `dirname`. |

Other behaviour changes:

- `jest`, `react`, `cypress` and `testing-library` now enable their plugins' recommended rules. Previously only the plugins and globals were registered.
- `eslint` `^9.22.0` or newer is now required, for `defineConfig`.

## License

@tobysmith568/eslint-config is licensed under the [ISC License](./LICENSE.md).
