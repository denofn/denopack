import {
  pluginCssBundle as css,
  useCache,
} from "../../../mod.ts";

import type { RollupOptions } from "../../../mod.ts";

const config: RollupOptions = {
  input: "src/mod.ts",
  plugins: [
    css({ output: "css/output.css" }),
    ...useCache(),
  ],
  output: {
    dir: "dist",
  },
};

export default config;
