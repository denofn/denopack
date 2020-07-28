import "https://unpkg.com/terser@4.8.0/dist/bundle.min.js";

import { AST_Node, MinifyOptions, MinifyOutput } from "./terser.d.ts";

export const minify: (
  files: string | string[] | { [file: string]: string } | AST_Node,
  options?: MinifyOptions
) => MinifyOutput = (globalThis as any).Terser.minify;
