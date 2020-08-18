export * from "./plugin/mod.ts";
export * from "./util/htmlTemplate.ts";

export { default as config } from "./cli/options.ts";

export { rollup } from "./deps.ts";
export type {
  Plugin,
  ResolveIdResult,
  RollupOptions,
  RollupOutput,
  RollupBuild,
  RollupCache,
  OutputAsset,
  OutputBundle,
  OutputChunk,
  OutputOptions,
  ModuleFormat,
} from "./deps.ts";
