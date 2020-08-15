import { path, Plugin } from "../../../deps.ts";
import { getStyleTag, React, ReactDOMServer, setup, VirtualInjector } from "../deps.ts";

const injector = VirtualInjector();
setup({ injector });

const renderHtml = (head: string, body: string) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/><link rel="icon" href="./assets/favicon.ico"/>
${head}
</head>
<body>${body}</body>
</html>
`;

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
        const { default: Page, title: pageTitle } = await import(`${path.resolve(page)}`);
        const body = (ReactDOMServer as any).renderToStaticMarkup(<Page />);
        const baseStyle = `<link rel="stylesheet" type="text/css" href="./assets/base.css">\n`;
        const style = getStyleTag(injector);
        const title = `<title>${pageTitle}</title>\n`;
        this.emitFile({
          type: "asset",
          fileName: `${path.parse(page).name}.html`,
          source: renderHtml(`${title}${baseStyle}${style}`, body),
        });
      }
    },
  };
}
