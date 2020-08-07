import { isHttpUrl } from "./isHttpUrl.ts";

export function stripFileProtocol(emitMap: Record<string, string>): Record<string, string> {
  const newEmitMap: Record<string, string> = {};

  Object.keys(emitMap).forEach((k: string) => {
    if (isHttpUrl(k)) newEmitMap[k] = emitMap[k];
    else newEmitMap[new URL(k).pathname] = emitMap[k];
  });

  return newEmitMap;
}
