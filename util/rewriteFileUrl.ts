import { path } from "../deps.ts";

// rewrites ts -> js and tsx -> jsx
export function rewriteFileUrl(p: string): string {
  const { dir, ext: ogExt, name } = path.parse(p);

  let ext: ".js" | ".jsx" = ".js";
  switch (ogExt) {
    case ".ts":
      ext = ".js";
      break;
    case ".tsx":
      ext = ".jsx";
      break;
    default:
      return p;
  }

  return `${dir}/${name}${ext}`;
}
