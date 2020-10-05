export * as fs from "https://deno.land/std@0.69.0/fs/mod.ts";
export * as path from "https://deno.land/std@0.69.0/path/mod.ts";
export * as hash from "https://deno.land/std@0.69.0/hash/mod.ts";

// @deno-types="https://unpkg.com/cac@6.6.1/mod.d.ts"
export { cac } from "https://unpkg.com/cac@6.6.1/mod.js";

// @deno-types="https://unpkg.com/rollup@2.26.11/dist/rollup.d.ts"
export { rollup } from "https://unpkg.com/rollup@2.26.11/dist/es/rollup.browser.js";
export type {
  ModuleFormat,
  OutputAsset,
  OutputBundle,
  OutputChunk,
  OutputOptions,
  Plugin,
  ResolveIdResult,
  RollupBuild,
  RollupCache,
  RollupOptions,
  RollupOutput,
} from "https://unpkg.com/rollup@2.26.11/dist/rollup.d.ts";

import { default as _debounce } from "https://unpkg.com/lodash-es@4.17.15/debounce.js";

export const debounce = _debounce as <
  T extends (...args: unknown[]) => unknown,
>(
  func: T,
  wait?: number,
  options?: {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
  },
) => T;
