import { RollupOptions } from "../../mod.ts";
import { pluginRenderPagesAsHtml } from "./plugins/pluginBundleAsHtml.tsx";

const config: RollupOptions = {
  input: "main.js",
  preserveEntrySignatures: false,
  plugins: [
    pluginRenderPagesAsHtml([
      "src/pages/index.tsx",
      "src/pages/scriptRunners.tsx",
      "src/pages/cli.tsx",
      "src/pages/plugins.tsx",
    ]),
  ],
  output: {
    dir: ".",
  },
};

export default config;
