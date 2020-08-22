import {
  htmlTemplate,
  pluginCssBundle as css,
  pluginHtmlBundle as html,
  pluginTerserTransform as terser,
  useCache,
} from "https://deno.land/x/denopack@0.7.0/mod.ts";

import type { RollupOptions, TemplateOpts } from "https://deno.land/x/denopack@0.7.0/mod.ts";

function createHtmlTemplate(opts: TemplateOpts): Promise<string> {
  opts.bodyEntry = `<noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>`;
  return htmlTemplate(opts);
}

const config: RollupOptions = {
  input: "src/mod.tsx",
  plugins: [
    css({ output: "mod.css" }),
    html({
      template: createHtmlTemplate,
      title: "React App",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: "Web site created using create-react-app",
        },
      ],
    }),
    ...useCache({
      compilerOptions: {
        lib: ["dom"],
        jsx: "react",
      },
    }),
    terser({
      module: true,
      compress: true,
      mangle: true,
    }),
  ],
  output: {
    dir: "dist",
    sourcemap: true,
  },
};

export default config;
