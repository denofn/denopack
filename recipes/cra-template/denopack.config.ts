import type { RollupOptions } from "../../deps.ts";
import css from "../../plugin/cssBundle/mod.ts";
import { useCache } from "../../plugin/hooks.ts";
import html from "../../plugin/htmlBundle/mod.ts";
import { pluginTerserTransform } from "../../plugin/terserTransform/mod.ts";
import { htmlTemplate, TemplateOpts } from "../../util/htmlTemplate.ts";

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
    pluginTerserTransform({
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
