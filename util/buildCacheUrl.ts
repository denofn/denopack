import { hash, path } from "../deps.ts";
import { resolveCacheLocation } from "./resolveCacheLocation.ts";

const denoDir = resolveCacheLocation();

export function buildCacheUrl(urlRaw: string): string {
  const url = new URL(urlRaw);
  url.hash = "";

  const host = url.port ? `${url.hostname}_PORT${url.port}` : url.hostname;
  const sha256 = hash.createHash("sha256");
  const fileHash = sha256.update(`${url.pathname}${url.search}`).toString();

  return path.join(denoDir, "deps", url.protocol.replace(":", ""), host, fileHash);
}
