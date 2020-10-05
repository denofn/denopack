export * from "./plugin/mod.ts";
export * from "./util/htmlTemplate.ts";

export { default as config } from "./cli/options.ts";

export { rollup } from "./deps.ts";
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
} from "./deps.ts";
