import { path, Plugin } from "../../deps.ts";
import { buildCacheUrl } from "../../util/buildCacheUrl.ts";
import { checkIntegrity } from "../../util/checkIntegrity.ts";
import { isFile } from "../../util/isFile.ts";
import { isHttpUrl } from "../../util/isHttpUrl.ts";

export type Opts = {
  lazy?: boolean;
  cacheOnly?: boolean;
  lockFile?: string;
};

async function cacheLoader(
  id: string,
  opts: Opts,
  lockFile: Record<string, string> | undefined,
): Promise<string | null> {
  const cacheUrl = buildCacheUrl(id);
  const isFileInCache = await isFile(cacheUrl);

  if (opts.cacheOnly && !isFileInCache) {
    throw new Error(`Cannot find ${id} in Deno cache`);
  }
  if (!opts.lazy && !isFileInCache) return null;

  const code = await Deno.readTextFile(cacheUrl);
  if (lockFile) checkIntegrity(lockFile, id, code);

  return code;
}

export function pluginCacheLoader(opts: Opts = {}): Plugin {
  const lockFile: Record<string, string> | undefined = opts.lockFile
    ? JSON.parse(Deno.readTextFileSync(path.resolve(opts.lockFile)))
    : undefined;

  return {
    name: "denopack-plugin-cacheLoader",
    load(id) {
      if (!isHttpUrl(id)) return null;
      return cacheLoader(id, opts, lockFile);
    },
  };
}

export default pluginCacheLoader;
