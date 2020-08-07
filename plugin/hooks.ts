import { Opts as CacheLoaderOptions, pluginCacheLoader } from "./cacheLoader/mod.ts";
import { Opts as FileLoaderOptions, pluginFileLoader } from "./fileLoader/mod.ts";
import { pluginImportResolver } from "./importResolver/mod.ts";
import { pluginTypescriptCompile } from "./typescriptCompile/mod.ts";
import { pluginTypescriptTransform } from "./typescriptTransform/mod.ts";

const useLoadAndTransform = ({
  fileLoaderOptions,
  compilerOptions,
}: {
  compilerOptions?: Deno.CompilerOptions;
  fileLoaderOptions?: FileLoaderOptions;
}) => [pluginFileLoader(fileLoaderOptions), pluginTypescriptTransform(compilerOptions)];

export const useAlwaysFetch = (
  opts: {
    compilerOptions?: Deno.CompilerOptions;
    fileLoaderOptions?: FileLoaderOptions;
  } = {}
) => [pluginImportResolver(), ...useLoadAndTransform(opts)];

export const useCache = (
  opts: {
    cacheLoaderOptions?: CacheLoaderOptions;
    compilerOptions?: Deno.CompilerOptions;
    fileLoaderOptions?: FileLoaderOptions;
  } = {}
) => [
  pluginImportResolver(),
  pluginCacheLoader(opts.cacheLoaderOptions),
  ...useLoadAndTransform({
    compilerOptions: opts.compilerOptions,
    fileLoaderOptions: opts.fileLoaderOptions,
  }),
];

export const useCacheLazy = (
  opts: {
    fileLoaderOptions?: FileLoaderOptions;
    cacheLoaderOptions?: CacheLoaderOptions;
    compilerOptions?: Deno.CompilerOptions;
  } = {}
) =>
  useCache({
    cacheLoaderOptions: { ...opts.cacheLoaderOptions, lazy: true },
    compilerOptions: opts.compilerOptions,
    fileLoaderOptions: opts.fileLoaderOptions,
  });

export const useCacheOnly = (
  opts: {
    fileLoaderOptions?: FileLoaderOptions;
    cacheLoaderOptions?: CacheLoaderOptions;
    compilerOptions?: Deno.CompilerOptions;
  } = {}
) =>
  useCache({
    fileLoaderOptions: opts.fileLoaderOptions,
    cacheLoaderOptions: { ...opts.cacheLoaderOptions, cacheOnly: true },
    compilerOptions: opts.compilerOptions,
  });

export const useCompile = (
  opts: {
    cacheLoaderOptions?: CacheLoaderOptions;
    compilerOptions?: Deno.CompilerOptions;
    fileLoaderOptions?: FileLoaderOptions;
  } = {}
) => [
  pluginTypescriptCompile({ useAsLoader: false, compilerOptions: opts.compilerOptions }),
  pluginCacheLoader(opts.cacheLoaderOptions),
  pluginFileLoader(opts.fileLoaderOptions),
];

export const useCompileAsLoader = (
  opts: {
    compilerOptions?: Deno.CompilerOptions;
  } = {}
) => [pluginTypescriptCompile({ useAsLoader: true, compilerOptions: opts.compilerOptions })];
