/*
The MIT License (MIT)

Copyright (c) 2016 Thomas Ghysels

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import type { OutputAsset, Plugin } from "../../deps.ts";
import { fs, path } from "../../deps.ts";
import { createFilter } from "../deps.ts";

type Opts = {
  output?: string | boolean;
};

const styles: Record<string, string> = {};
const filter = createFilter(["**/*.css"]);

export function pluginCssBundle(options: Opts = {}): Plugin {
  let dest = options.output;
  let changes: number | undefined;

  return {
    name: "denopack-plugin-cssBundle",

    transform(code, id) {
      if (!filter(id)) {
        return;
      }
      if (options.output === false) {
        return {
          code: "export default " + JSON.stringify(code),
          map: { mappings: "" },
        };
      }

      if (typeof changes === "undefined") changes = 0;
      if (styles[id] !== code && (styles[id] || code)) {
        styles[id] = code;
        changes++;
      }

      return "";
    },
    generateBundle(opts) {
      if (
        (!changes && typeof changes !== "undefined") || options.output === false
      ) {
        return;
      }

      changes = undefined;

      let css = "";
      for (const id in styles) {
        css += styles[id] || "";
      }

      if (typeof dest !== "string") {
        if (!css.length) {
          return;
        }

        dest = opts.file || "bundle.js";
        if (dest.endsWith(".js")) {
          dest = dest.slice(0, -3);
        }
        dest = dest + ".css";
      }

      if (typeof dest === "string") {
        const filePath = path.dirname(
          path.resolve(
            path.join(Deno.cwd(), opts.dir || ""),
            dest,
          ),
        );

        fs.ensureDir(filePath)
          .catch(() => {
            throw new Error(`Couldn't create folder for the css output`);
          });
      }

      this.emitFile({
        type: "asset",
        source: css,
        name: "denopack CSS Asset",
        fileName: dest,
        isAsset: true,
      } as OutputAsset);

      return Promise.resolve();
    },
  };
}

export default pluginCssBundle;
