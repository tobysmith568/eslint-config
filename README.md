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
$ npm install @tobysmith568/eslint-config --save-dev
```

**Edit `eslint.config.mjs`**:

```js
import tobysmith568 from "@tobysmith568/eslint-config";

/** @type {import('eslint').Linter.Config[]} */
export default [...tobysmith568.recommended];
```

## License

@tobysmith568/eslint-config is licensed under the [ISC License](./LICENSE.md).
