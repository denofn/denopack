import {
  pluginCssBundle as css,
  pluginHtmlBundle as html,
  useCache,
} from "../../../mod.ts";

import type { RollupOptions } from "../../../mod.ts";

const config: RollupOptions = {
  input: "./src/mod.ts",
  plugins: [
    css({ output: "mod.css" }),
    html({
      title: "Test App",
      fileName: "index.html",
    }),
    ...useCache(),
  ],
  output: {
    dir: "dist",
  },
};

export default config;
