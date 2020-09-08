import { path } from "../deps.ts";
import { usesProtocol } from "./usesProtocol.ts";

export function resolver(
  importee: string,
  importer: string | undefined,
): string {
  if (!importer) return importee;
  else if (!usesProtocol(importee)) {
    return usesProtocol(importer)
      ? new URL(importee, importer).href
      : path.join(path.parse(importer).dir, importee);
  } else return importee;
}
