import type { Plugin } from "../../deps.ts";
import Mutex from "../../util/mutex.ts";

const transpilerMutex = new Mutex();

export function pluginTypescriptTransform(opts?: Deno.CompilerOptions): Plugin {
  return {
    name: "denopack-plugin-typescriptTransform",
    async transform(code, id) {
      const unlock = await transpilerMutex.lock();
      const result = await Deno.transpileOnly({ [id]: code }, opts).catch(
        (e) => {
          throw new Error(`Failed to transpile ${id}: ${e}`);
        },
      );
      unlock();
      return { code: result[id].source, map: result[id].map };
    },
  };
}

export default pluginTypescriptTransform;
