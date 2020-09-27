import { join, parse, resolve } from "https://deno.land/std@0.69.0/path/mod.ts";
import { assert } from "https://deno.land/std@0.69.0/testing/asserts.ts";

const url = import.meta.url;

function buildURL(target: string): string {
  const { dir } = parse(url);
  if (url.startsWith("https://")) {
    return new URL(join(dir, target)).href;
  } else {
    if (Deno.build.os === "windows") {
      return resolve(dir.replace("file:///", ""), target);
    }
    return resolve(dir.replace("file://", ""), target);
  }
}

// Cache all deps

// Main deps
assert(
  (await Deno.run({
    cmd: [
      "deno",
      "cache",
      "--unstable",
      "--reload",
      `${buildURL("./deps.ts")}`,
    ],
  }).status()).success,
  "Failed to install dependencies.",
);

// Terser
assert(
  (await Deno.run({
    cmd: [
      "deno",
      "cache",
      "--unstable",
      "--reload",
      `${buildURL("./plugin/terserTransform/deps.ts")}`,
    ],
  }).status()).success,
  "Failed to install terserTransform dependencies.",
);

// Serve
assert(
  (await Deno.run({
    cmd: [
      "deno",
      "cache",
      "--unstable",
      "--reload",
      `${buildURL("./plugin/serve/deps.ts")}`,
    ],
  }).status()).success,
  "Failed to install serve plugin dependencies.",
);

// Unstable plugin deps
assert(
  (await Deno.run({
    cmd: [
      "deno",
      "cache",
      "--unstable",
      "--no-check", // remove when https://github.com/denoland/deno/issues/7145 is resolved
      "--reload",
      `${buildURL("./plugin/deps.ts")}`,
    ],
  }).status()).success,
  "Failed to install plugin dependencies.",
);

// Install
assert(
  (await Deno.run({
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
  }).status()).success,
  "Failed to install denopack.",
);
