import { isFileUrl } from "./isFileUrl.ts";
import { isHttpUrl } from "./isHttpUrl.ts";

export function usesProtocol(p: string): boolean {
  return isHttpUrl(p) || isFileUrl(p);
}
