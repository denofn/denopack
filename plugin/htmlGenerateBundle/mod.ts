/*

The MIT License (MIT)

Copyright (c) 2019 RollupJS Plugin Contributors (https://github.com/rollup/plugins/graphs/contributors)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

import { path } from "../../deps.ts";
import { htmlTemplate as defaultTemplate } from "../../util/htmlTemplate.ts";
import { isOutputAsset } from "../../util/isOutputAsset.ts";

import type { Attributes, TemplateOpts } from "../../util/htmlTemplate.ts";
import type { Plugin, OutputAsset, OutputChunk, ModuleFormat, OutputBundle } from "../../deps.ts";

const { extname } = path;

export type Opts = {
  attributes?: Attributes;
  fileName?: string;
  meta?: Record<string, any>[];
  publicPath?: string;
  template?: (opts: TemplateOpts) => Promise<string>;
  title?: string;
};

const supportedFormats = ["es", "esm", "iife", "umd"];

export const defaults = {
  attributes: {
    link: null,
    html: { lang: "en" },
    script: null,
  },
  fileName: "index.html",
  meta: [{ charset: "utf-8" }],
  publicPath: "",
  template: defaultTemplate,
  title: "Rollup Bundle",
};

function getFiles(bundle: OutputBundle) {
  const files = Object.values(bundle).filter((file) => isOutputAsset(file) || file.isEntry);

  const result: Record<string, (OutputAsset | OutputChunk)[]> = {};
  for (const file of files) {
    const { fileName } = file;
    const extension: string = extname(fileName).substring(1);
    result[extension] = (result[extension] || []).concat(file);
  }

  return result;
}

export function pluginHtmlGenerateBundle(opts: Opts = {}): Plugin {
  const { attributes, fileName, meta, publicPath, template, title } = { ...defaults, ...opts };

  return {
    name: "denopack-plugin-htmlGenerateBundle",

    async generateBundle(output, bundle) {
      const format = output.format as ModuleFormat;
      if (!supportedFormats.includes(format) && !opts.template)
        this.warn(
          `plugin-html: The output format '${
            output.format
          }' is not directly supported. A custom \`template\` is probably required. Supported formats include: ${supportedFormats.join(
            ", "
          )}`
        );

      if (format === "esm" || format === "es")
        attributes.script = Object.assign({}, attributes.script, { type: "module" });

      const files = getFiles(bundle);
      const source = await template({ attributes, bundle, files, meta, publicPath, title });

      const htmlFile: Pick<OutputAsset, "type" | "source" | "name" | "fileName"> = {
        type: "asset",
        source,
        name: "Rollup HTML Asset",
        fileName,
      };

      this.emitFile(htmlFile);
    },
  };
}
