import loadCache, { Opts as CacheLoaderOptions } from "./cacheLoader/mod.ts";
import loadFiles, { Opts as FileLoaderOptions } from "./fileLoader/mod.ts";
import importer from "./importResolver/mod.ts";
import tsCompile from "./typescriptCompile/mod.ts";
import tsTransform from "./typescriptTransform/mod.ts";

const useLoadAndTransform = ({
  fileLoaderOptions,
  compilerOptions,
}: {
  compilerOptions?: Deno.CompilerOptions;
  fileLoaderOptions?: FileLoaderOptions;
}) => [loadFiles(fileLoaderOptions), tsTransform(compilerOptions)];

export const useAlwaysFetch = (
  opts: {
    compilerOptions?: Deno.CompilerOptions;
    fileLoaderOptions?: FileLoaderOptions;
  } = {}
) => [importer(), ...useLoadAndTransform(opts)];

export const useCache = (
  opts: {
    cacheLoaderOptions?: CacheLoaderOptions;
    compilerOptions?: Deno.CompilerOptions;
    fileLoaderOptions?: FileLoaderOptions;
  } = {}
) => [
  importer(),
  loadCache(opts.cacheLoaderOptions),
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
  tsCompile({ useAsLoader: false, compilerOptions: opts.compilerOptions }),
  loadCache(opts.cacheLoaderOptions),
  loadFiles(opts.fileLoaderOptions),
];

export const useCompileAsLoader = (
  opts: {
    compilerOptions?: Deno.CompilerOptions;
  } = {}
) => [tsCompile({ useAsLoader: true, compilerOptions: opts.compilerOptions })];
