import { join, parse, resolve } from "https://deno.land/std@0.68.0/path/mod.ts";

const url = import.meta.url;

function buildURL(target: string): string {
  const { dir } = parse(url);
  if (url.startsWith("https://")) {
    return new URL(join(dir, target)).href;
  } else {
    return resolve(dir.replace("file://", ""), target);
  }
}

// Cache all deps

// Main deps
await Deno.run({
  cmd: ["deno", "cache", "--unstable", "--reload", `${buildURL("./deps.ts")}`],
}).status();

// Terser
await Deno.run({
  cmd: [
    "deno",
    "cache",
    "--unstable",
    "--reload",
    `${buildURL("./plugin/terserTransform/deps.ts")}`,
  ],
}).status();

// Serve
await Deno.run({
  cmd: [
    "deno",
    "cache",
    "--unstable",
    "--reload",
    `${buildURL("./plugin/serve/deps.ts")}`,
  ],
}).status();

// Unstable plugin deps
await Deno.run({
  cmd: [
    "deno",
    "cache",
    "--unstable",
    "--no-check", // remove when https://github.com/denoland/deno/issues/7145 is resolved
    "--reload",
    `${buildURL("./plugin/deps.ts")}`,
  ],
}).status();

// Install
await Deno.run({
  cmd: [
    "deno",
    "install",
    "--unstable",
    "--allow-read",
    "--allow-write",
    "--allow-env",
    "--allow-net",
    "-f",
    "--name=denopack",
    `${buildURL("cli.ts")}`,
  ],
}).status();
