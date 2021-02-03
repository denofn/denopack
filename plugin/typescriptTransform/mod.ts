import type { Plugin } from "../../deps.ts";
import Mutex from "../../util/mutex.ts";

const transpilerMutex = new Mutex();

export function pluginTypescriptTransform(opts?: Deno.CompilerOptions): Plugin {
  return {
    name: "denopack-plugin-typescriptTransform",
    async transform(code, id) {
      let unlock;
      try {
        unlock = await transpilerMutex.lock();
        const result = await Deno.emit(id, {
          sources: { [id]: code },
          compilerOptions: opts,
          check: false,
        });
        const { [`${id}.js`]: output, [`${id}.js.map`]: map } = result.files;
        return { code: output, map };
      } catch (error) {
        throw new Error(`Failed to transpile ${id}: ${error}`);
      } finally {
        unlock?.();
      }
    },
  };
}

export default pluginTypescriptTransform;
