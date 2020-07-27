import { path } from "../deps.ts";

export function rewriteFileUrl(p: string) {
  // rewrites ts -> js and tsx -> jsx
  const parsedPath = path.parse(p);

  let ext: ".js" | ".jsx" = ".js";

  if (parsedPath.ext !== ".ts" && parsedPath.ext !== ".tsx") return p;
  else if (parsedPath.ext === ".ts") ext = ".js";
  else if (parsedPath.ext === ".tsx") ext = ".jsx";
  return `${parsedPath.dir}/${parsedPath.name}${ext}`;
}
