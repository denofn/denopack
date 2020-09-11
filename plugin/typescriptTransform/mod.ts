import { Plugin } from "../../deps.ts";
import Mutex from "../../util/mutex.ts";

const transpilerMutex = new Mutex();

export function pluginTypescriptTransform(opts?: Deno.CompilerOptions): Plugin {
  return {
    name: "denopack-plugin-typescriptTransform",
    async transform(code, id) {
      const unlock = await transpilerMutex.lock();
      const result = await Deno.transpileOnly({ [id]: code }, opts);
      unlock();
      return { code: result[id].source, map: result[id].map };
    },
  };
}

export default pluginTypescriptTransform;
