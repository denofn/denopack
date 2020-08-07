import { Opts as CacheOptions, pluginCacheLoader } from "./cacheLoader/mod.ts";
import { Opts as FileLoaderOptions, pluginFileLoader } from "./fileLoader/mod.ts";
import { pluginImportResolver } from "./importResolver/mod.ts";
import { pluginTypescriptCompile } from "./typescriptCompile/mod.ts";
import { pluginTypescriptTransform } from "./typescriptTransform/mod.ts";

const useLoadAndTransform = ({
  fileLoaderOptions,
  compilerOptions,
}: {
  compilerOptions: Deno.CompilerOptions;
  fileLoaderOptions: FileLoaderOptions;
}) => [pluginFileLoader(fileLoaderOptions), pluginTypescriptTransform(compilerOptions)];

export const useAlwaysFetch = (
  opts: {
    compilerOptions: Deno.CompilerOptions;
    fileLoaderOptions: FileLoaderOptions;
  } = {
    fileLoaderOptions: {},
    compilerOptions: {},
  }
) => [pluginImportResolver(), ...useLoadAndTransform(opts)];

export const useCache = (
  opts: {
    cacheOptions: CacheOptions;
    compilerOptions: Deno.CompilerOptions;
    fileLoaderOptions: FileLoaderOptions;
  } = {
    fileLoaderOptions: {},
    cacheOptions: {},
    compilerOptions: {},
  }
) => [
  pluginImportResolver(),
  pluginCacheLoader(opts.cacheOptions),
  ...useLoadAndTransform({
    compilerOptions: opts.compilerOptions,
    fileLoaderOptions: opts.fileLoaderOptions,
  }),
];

export const useCacheLazy = (
  opts: {
    fileLoaderOptions: FileLoaderOptions;
    cacheOptions: CacheOptions;
    compilerOptions: Deno.CompilerOptions;
  } = {
    fileLoaderOptions: {},
    cacheOptions: {},
    compilerOptions: {},
  }
) =>
  useCache({
    cacheOptions: { ...opts.cacheOptions, lazy: true },
    compilerOptions: opts.compilerOptions,
    fileLoaderOptions: opts.fileLoaderOptions,
  });

export const useCacheOnly = (
  opts: {
    fileLoaderOptions: FileLoaderOptions;
    cacheOptions: CacheOptions;
    compilerOptions: Deno.CompilerOptions;
  } = {
    fileLoaderOptions: {},
    cacheOptions: {},
    compilerOptions: {},
  }
) =>
  useCache({
    fileLoaderOptions: opts.fileLoaderOptions,
    cacheOptions: { ...opts.cacheOptions, cacheOnly: true },
    compilerOptions: opts.compilerOptions,
  });

export const useCompile = (
  opts: {
    compilerOptions: Deno.CompilerOptions;
    fileLoaderOptions: FileLoaderOptions;
  } = {
    fileLoaderOptions: {},
    compilerOptions: {},
  }
) => [
  pluginTypescriptCompile({ useAsLoader: false, compilerOptions: opts.compilerOptions }),
  pluginFileLoader(opts.fileLoaderOptions),
];

export const useCompileAsLoader = (
  opts: {
    compilerOptions: Deno.CompilerOptions;
  } = {
    compilerOptions: {},
  }
) => [pluginTypescriptCompile({ useAsLoader: true, compilerOptions: opts.compilerOptions })];
