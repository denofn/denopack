import type { OutputBundle } from "../deps.ts";
import { path } from "../deps.ts";
import { makeHtmlAttributes } from "./makeHtmlAttributes.ts";

export type Attributes = {
  link: Record<string, string> | null;
  html: Record<string, string> | null;
  script: Record<string, string> | null;
};

export type TemplateOpts = {
  attributes: Attributes;
  bodyEntry?: string;
  bundle?: OutputBundle;
  files: Record<string, { fileName: string }[]>;
  meta: Record<string, string>[];
  path: string;
  title: string;
};

const resolveRelativePath = (from: string, to: string) => {
  const rawPath = path.posix.join(
    path.relative(path.dirname(from), path.dirname(to)),
    path.basename(to),
  );

  return rawPath.startsWith(".") ? rawPath : `./${rawPath}`;
};

export const htmlTemplate = ({
  attributes,
  files,
  meta,
  path,
  title,
  bodyEntry,
}: TemplateOpts): Promise<string> => {
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${
        resolveRelativePath(path, fileName)
      }"${attrs}></script>`;
    })
    .join("\n    ");

  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${
        resolveRelativePath(path, fileName)
      }" rel="stylesheet"${attrs}>`;
    })
    .join("\n    ");

  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join("\n    ");

  const body = bodyEntry
    ? `
  <body>
    ${bodyEntry}
    ${scripts}
  </body>
  `
    : `
  <body>
    ${scripts}
  </body>
  `;

  return Promise.resolve(`<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
    <title>${title}</title>
    ${links}
  </head>
  ${body}
</html>
`);
};
