import { pluginCacheLoader } from "./cacheLoader/mod.ts";
import { pluginFileLoader } from "./fileLoader/mod.ts";
import { pluginImportResolver } from "./importResolver/mod.ts";
import { pluginTypescriptCompile } from "./typescriptCompile/mod.ts";
import { pluginTypescriptTransform } from "./typescriptTransform/mod.ts";

export const useAlwaysFetch = (opts?: Deno.CompilerOptions) => [
  pluginImportResolver(),
  pluginFileLoader(),
  pluginTypescriptTransform(opts),
];

export const useCache = (opts?: Deno.CompilerOptions) => [
  pluginImportResolver(),
  pluginCacheLoader(),
  pluginFileLoader(),
  pluginTypescriptTransform(opts),
];

export const useCacheLazy = (opts?: Deno.CompilerOptions) => [
  pluginImportResolver(),
  pluginCacheLoader({ lazy: true }),
  pluginFileLoader(),
  pluginTypescriptTransform(opts),
];

export const useCompile = (opts?: Deno.CompilerOptions) => [pluginTypescriptCompile(opts)];
