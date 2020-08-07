import { Plugin } from "../../deps.ts";
import { buildCacheUrl } from "../../util/buildCacheUrl.ts";
import { isFile } from "../../util/isFile.ts";
import { isHttpUrl } from "../../util/isHttpUrl.ts";

type Opts = {
  lazy?: boolean;
};

export function pluginCacheLoader(opts: Opts = {}): Plugin {
  return {
    name: "denopack-plugin-cacheLoader",
    load: async function (id) {
      if (isHttpUrl(id)) {
        const cacheUrl = buildCacheUrl(id);

        if (opts.lazy || (await isFile(cacheUrl))) {
          const code = await Deno.readTextFile(cacheUrl);
          return code;
        }
      }

      return null;
    },
  };
}
