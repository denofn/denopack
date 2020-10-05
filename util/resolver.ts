import { path } from "../deps.ts";
import { usesProtocol } from "./usesProtocol.ts";

export function resolver(
  importee: string,
  importer: string | undefined,
): string {
  if (!importer) {
    // If this is a raw absolute path, make it a `file://` path.
    if (!usesProtocol(importee)) {
      // If path is absolute, just prefix with `file:///`
      if (path.isAbsolute(importee)) {
        return new URL(`file:///${importee}`).toString();
      }
      // else resolve based on Deno.cwd()
      return new URL(`file:///${path.join(Deno.cwd(), importee)}`).toString();
    }
    return importee;
  } else if (!usesProtocol(importee)) {
    // If this path is protocol prefixed, we can use URL to resolve it
    if (usesProtocol(importer)) return new URL(importee, importer).toString();
    // else if the path is absolute, return as is
    if (path.isAbsolute(importee)) return resolver(importee, undefined);
    // else the path is relative, and we can resolve it by joining.
    return resolver(
      `file:///${path.join(path.parse(importer).dir, importee)}`,
      undefined,
    );
  } else return importee;
}
