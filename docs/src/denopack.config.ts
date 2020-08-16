import { RollupOptions } from "../../mod.ts";
import { pluginRenderPagesAsHtml } from "./plugins/pluginBundleAsHtml.tsx";

const config: RollupOptions = {
  input: "main.js",
  preserveEntrySignatures: false,
  plugins: [pluginRenderPagesAsHtml(["src/pages/index.tsx", "src/pages/scriptRunners.tsx"])],
  output: {
    dir: ".",
  },
};

export default config;
