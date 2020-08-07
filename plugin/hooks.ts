import { pluginCacheLoader } from "./cacheLoader/mod.ts";
import { pluginFileLoader } from "./fileLoader/mod.ts";
import { pluginRootResolver } from "./rootResolver/mod.ts";
import { pluginTypescriptCompile } from "./typescriptCompile/mod.ts";
import { pluginTypescriptTransform } from "./typescriptTransform/mod.ts";

export const useAlwaysFetch = (opts?: Deno.CompilerOptions) => [
  pluginRootResolver(),
  pluginFileLoader(),
  pluginTypescriptTransform(opts),
];

export const useCache = (opts?: Deno.CompilerOptions) => [
  pluginRootResolver(),
  pluginCacheLoader(),
  pluginFileLoader(),
  pluginTypescriptTransform(opts),
];

export const useCacheLazy = (opts?: Deno.CompilerOptions) => [
  pluginRootResolver(),
  pluginCacheLoader({ lazy: true }),
  pluginFileLoader(),
  pluginTypescriptTransform(opts),
];

export const useCompile = (opts?: Deno.CompilerOptions) => [pluginTypescriptCompile(opts)];
