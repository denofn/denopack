import { fs, RollupCache } from "../deps.ts";

export async function persistCache(
  cachePath: string,
  cache: RollupCache,
): Promise<void> {
  return fs.writeJson(cachePath, cache, {
    spaces: 2,
  });
}
