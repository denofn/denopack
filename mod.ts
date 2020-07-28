export * from "./plugin/mod.ts";

export { default as config } from "./cli/options.ts";

// @deno-types="https://unpkg.com/rollup@2.23.0/dist/rollup.d.ts"
export { rollup } from "https://unpkg.com/rollup@2.23.0/dist/es/rollup.browser.js";
export type {
  Plugin,
  ResolveIdResult,
  RollupOptions,
  RollupOutput,
  RollupBuild,
  OutputAsset,
  OutputChunk,
  OutputOptions,
} from "https://unpkg.com/rollup@2.23.0/dist/rollup.d.ts";
