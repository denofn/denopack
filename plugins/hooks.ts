import { pluginFileLoader } from "./fileLoader.ts";
import { pluginRootResolver } from "./rootResolver.ts";
import { pluginTypescriptTransform } from "./typescriptTransform.ts";
import { pluginCacheResolver } from "./cacheResolver.ts";
import { pluginTypescriptCompile } from "./typescriptCompile.ts";
import { pluginChainResolver } from "./chainResolvers.ts";

export const useAlwaysFetch = () => [pluginRootResolver(), pluginFileLoader(), pluginTypescriptTransform()];
export const useCache = () => [
  pluginChainResolver(pluginRootResolver(), pluginCacheResolver()),
  pluginFileLoader(),
  pluginTypescriptTransform(),
];
export const useCacheLazy = () => [
  pluginChainResolver(pluginRootResolver(), pluginCacheResolver({ lazy: true })),
  pluginFileLoader(),
  pluginTypescriptTransform(),
];
export const useCompile = () => [pluginTypescriptCompile()];
