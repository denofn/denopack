import { Plugin } from "../deps.ts";
import { isHttpUrl } from "../util/isHttpUrl.ts";

export function pluginFileLoader(): Plugin {
  return {
    name: "denopack-plugin-fileLoader",
    load: async function (id) {
      if (isHttpUrl(id)) {
        const response = await fetch(id);
        return response.text();
      } else {
        return Deno.readTextFile(id);
      }
    },
  };
}
