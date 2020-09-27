import { path, Plugin } from "../../deps.ts";
import { checkIntegrity } from "../../util/checkIntegrity.ts";
import { isHttpUrl } from "../../util/isHttpUrl.ts";

export type Opts = {
  lockFile?: string;
};

export function pluginFileLoader(opts: Opts = {}): Plugin {
  const lockFile: Record<string, string> | undefined = opts.lockFile
    ? JSON.parse(Deno.readTextFileSync(path.resolve(opts.lockFile)))
    : undefined;

  return {
    name: "denopack-plugin-fileLoader",
    async load(id) {
      if (!isHttpUrl(id)) {
        return Deno.readTextFile(id.startsWith("file://") ? new URL(id) : id);
      }

      const response = await fetch(id);
      const code = await response.text();

      if (lockFile) checkIntegrity(lockFile, id, code);

      return code;
    },
  };
}

export default pluginFileLoader;
