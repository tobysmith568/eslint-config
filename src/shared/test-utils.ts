import { expect } from "bun:test";
import { ESLint, type Linter } from "eslint";
import { defineConfig } from "eslint/config";

type ConsumerConfig = Parameters<typeof defineConfig>[0];

/** Resolves the config ESLint would use for a file, given what a consumer's `eslint.config` would contain */
export const resolve = async (
  consumerConfig: ConsumerConfig,
  filePath: string
): Promise<Linter.Config> => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: defineConfig(consumerConfig)
  });

  const resolved: Linter.Config | undefined = await eslint.calculateConfigForFile(filePath);
  if (!resolved) {
    throw new Error(`${filePath} was not matched by any config`);
  }

  return resolved;
};

const severities: Record<string, number> = { off: 0, warn: 1, error: 2 };

/** The numeric severity (0 off, 1 warn, 2 error) of a rule, or `undefined` if it isn't configured */
export const severity = (resolved: Linter.Config, rule: string): number | undefined => {
  const entry = resolved.rules?.[rule];
  if (entry === undefined) {
    return undefined;
  }

  const level = Array.isArray(entry) ? entry[0] : entry;
  return typeof level === "string" ? severities[level] : level;
};

export const pluginNames = (resolved: Linter.Config): string[] =>
  Object.keys(resolved.plugins ?? {});

export const globalNames = (resolved: Linter.Config): string[] =>
  Object.keys(resolved.languageOptions?.globals ?? {});

type WellFormedOptions = {
  /** Whether the config is allowed to decide which files it applies to */
  allowFiles?: boolean;
  /** Whether every config object must have a `name` */
  requireNames?: boolean;
};

/** Asserts the structural rules every exported config follows */
export const assertWellFormed = (
  config: Linter.Config[],
  { allowFiles = false, requireNames = true }: WellFormedOptions = {}
): void => {
  expect(config).toBeArray();
  expect(config.length).toBeGreaterThan(0);
  expect(config.every(c => typeof c === "object" && c !== null)).toBe(true);

  if (!allowFiles) {
    // Any config object listed here is deciding which files it applies to
    const withFiles = config.filter(c => c.files !== undefined);
    expect(withFiles).toEqual([]);
  }

  if (requireNames) {
    // Any config object listed here is missing a `name`
    const unnamed = config.filter(c => typeof c.name !== "string");
    expect(unnamed).toEqual([]);
  }
};
