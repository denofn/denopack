import { OutputAsset } from "../deps.ts";

// deno-lint-ignore no-explicit-any
export function isOutputAsset(x: any): x is OutputAsset {
  return x?.type === "asset";
}
