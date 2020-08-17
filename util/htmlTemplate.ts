import { makeHtmlAttributes } from "./makeHtmlAttributes.ts";

import type { OutputBundle } from "../deps.ts";

export type Attributes = {
  link: Record<string, any> | null;
  html: Record<string, any> | null;
  script: Record<string, any> | null;
};

export type TemplateOpts = {
  attributes: Attributes;
  bundle?: OutputBundle;
  files: Record<string, { fileName: string }[]>;
  meta: Record<string, string>[];
  publicPath: string;
  title: string;
};

export const htmlTemplate = async ({
  attributes,
  files,
  meta,
  publicPath,
  title,
}: TemplateOpts) => {
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
    })
    .join("\n");

  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    })
    .join("\n");

  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join("\n");

  return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
    <title>${title}</title>
    ${links}
  </head>
  <body>
    ${scripts}
  </body>
</html>`;
};
