import { path } from "../deps.ts";
import { usesProtocol } from "./usesProtocol.ts";

export function resolver(
  importee: string,
  importer: string | undefined,
): string {
  if (!importer) return importee;
  else if (!usesProtocol(importee)) {
    // If this path is protocol prefixed, we can use URL to resolve it
    if (usesProtocol(importer)) return new URL(importee, importer).toString();
    // else if the path is absolute, return as is
    if (path.isAbsolute(importee)) return importee;
    // else the path is relative, and we can resolve it by joining.
    return path.join(path.parse(importer).dir, importee);
  } else return importee;
}
