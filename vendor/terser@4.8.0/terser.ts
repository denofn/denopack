import "https://unpkg.com/source-map@0.7.3/dist/source-map.js";
import "https://unpkg.com/terser@5.3.0/dist/bundle.min.js";

import { MinifyOptions, MinifyOutput } from "./terser.d.ts";

export const minify: (
  files: string | string[] | { [file: string]: string },
  options?: MinifyOptions
) => MinifyOutput = (globalThis as any).Terser.minify;
