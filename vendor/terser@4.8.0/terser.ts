import "https://unpkg.com/source-map@0.7.3/dist/source-map.js";
import "https://unpkg.com/terser@5.3.0/dist/bundle.min.js";

import type { minify as minifyfn } from "./terser.d.ts";

export const minify: typeof minifyfn = (globalThis as any).Terser.minify;
