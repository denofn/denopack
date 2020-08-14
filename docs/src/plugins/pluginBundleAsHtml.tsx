import { path, Plugin } from "../../../deps.ts";
import { getStyleTag, React, ReactDOMServer, setup, VirtualInjector } from "../deps.ts";

const injector = VirtualInjector();
setup({ injector });

export function pluginRenderPagesAsHtml(pages: string[]): Plugin {
  return {
    name: "denopack-plugin-renderPagesAsHtml",
    resolveId(source) {
      return source;
    },
    load() {
      return "";
    },
    async generateBundle() {
      for await (const page of pages) {
        const { default: Page } = await import(path.resolve(page));
        const body = (ReactDOMServer as any).renderToStaticMarkup(<Page />);
        const style = getStyleTag(injector);
        this.emitFile({
          type: "asset",
          fileName: `${path.parse(page).name}.html`,
          source: `<!DOCTYPE html>
<html>
  <head>${style}</head>
  <body>${body}</body>
</html>
`,
        });
      }
    },
  };
}
