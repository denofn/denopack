import {
  htmlTemplate,
  pluginCssBundle as css,
  pluginHtmlBundle as html,
  pluginServe as serve,
  pluginTerserTransform as terser,
  useCache,
} from "https://deno.land/x/denopack@0.10.0/mod.ts";

import type {
  RollupOptions,
  TemplateOpts,
} from "https://deno.land/x/denopack@0.10.0/mod.ts";

const isDev = !Deno.env.get("REACT_APP_IS_PROD");

function createHtmlTemplate(opts: TemplateOpts): Promise<string> {
  opts.bodyEntry =
    `<noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>`;
  return htmlTemplate(opts);
}

const config: RollupOptions = {
  input: "./src/mod.tsx",
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
    ...(isDev
      ? [
        serve({
          contentBase: "dist",
          port: 3000,
        }),
      ]
      : []),
  ],
  output: {
    dir: "dist",
    sourcemap: true,
  },
};

export default config;
