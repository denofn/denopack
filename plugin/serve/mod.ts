import { path, Plugin } from "../../deps.ts";
import { createHTTPServer, createHTTPSServer } from "./deps.ts";
import { parseOptions, ServeOptions, UserOptions } from "./options.ts";
import { createRequestHandler } from "./server.ts";

/**
 * Plugin for serving your compiled files through a http/https server
 * Requires --allow-net=host:port
 * Can be used in conjuction with --watch for a development server
 */
export const pluginServe = (
  options: UserOptions | string | string[] = "",
): Plugin => {
  let parsedOptions: ServeOptions;
  if (Array.isArray(options)) {
    parsedOptions = parseOptions({
      contentBase: options,
    });
  } else if (typeof options === "string") {
    parsedOptions = parseOptions({
      contentBase: [options],
    });
  } else if (
    options && !Array.isArray(options) && typeof options === "object"
  ) {
    if (!Array.isArray(options.contentBase)) {
      options.contentBase = options.contentBase ? [options.contentBase] : [""];
    }
    parsedOptions = parseOptions(options as UserOptions);
  } else {
    throw new Error(
      "Options for serve: you must provide a valid path, list of paths or options object",
    );
  }

  if (parsedOptions.https) {
    createHTTPSServer(
      {
        certFile: parsedOptions.https.cert,
        keyFile: parsedOptions.https.key,
        hostname: parsedOptions.host,
        port: parsedOptions.port,
      },
      createRequestHandler(parsedOptions),
    );
  } else {
    createHTTPServer(
      {
        hostname: parsedOptions.host,
        port: parsedOptions.port,
      },
      createRequestHandler(parsedOptions),
    );
  }

  let running = parsedOptions.verbose === false;

  return {
    name: "denopack-plugin-serve",
    generateBundle() {
      if (!running) {
        running = true;

        const protocol = parsedOptions.https ? "https" : "http";
        const url = `${protocol}://${parsedOptions.host}:${parsedOptions.port}`;
        parsedOptions.contentBase.forEach((base) => {
          console.log(
            `${url} -> ${
              path.resolve(Deno.cwd(), path.normalize(base || "./"))
            }`,
          );
        });
      }
    },
  };
};
