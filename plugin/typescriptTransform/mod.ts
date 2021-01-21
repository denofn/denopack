import type { Plugin } from "../../deps.ts";
import Mutex from "../../util/mutex.ts";

const transpilerMutex = new Mutex();

export function pluginTypescriptTransform(
  compilerOptions?: Deno.CompilerOptions
): Plugin {
  return {
    name: "denopack-plugin-typescriptTransform",
    async transform(code, id) {
      const isTypeScriptFile = id.endsWith(".ts") || id.endsWith(".tsx");
      if (!isTypeScriptFile) {
        return undefined;
      }

      const unlock = await transpilerMutex.lock();
      try {
        const result = await Deno.emit(id, {
          check: false,
          sources: { [id]: code },
          compilerOptions,
        });
        const sourceUrls = Object.keys(result.files);
        const codeUrl = sourceUrls.find((url) => !url.endsWith(".map"));
        const mapUrl = sourceUrls.find((url) => url.endsWith(".map"));
        if (!codeUrl) {
          throw new Error("No file was emitted.");
        }
        return {
          code: result.files[codeUrl],
          map: mapUrl ? result.files[mapUrl] : null,
        };
      } catch (err) {
        throw new Error(`Failed to transpile ${id}: ${err}`);
      } finally {
        unlock();
      }
    },
  };
}

export default pluginTypescriptTransform;
