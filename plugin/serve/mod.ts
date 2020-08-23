import {
  createHTTPServer,
  createHTTPSServer,
} from "./deps.ts";
import { path } from "../../deps.ts";
import { Plugin } from "../../deps.ts";
import {
  parseOptions,
  ServeOptions,
  UserOptions,
} from "./options.ts";
import {
  createRequestHandler,
} from "./server.ts";

/** 
 * Plugin for serving your compiled files through a http/https server
 * Requires --allow-net=host:port
 * Can be used in conjuction with --watch for a development server
 */
export const serve = (
  options: UserOptions | string | string[] = "",
): Plugin => {
  let parsed_options: ServeOptions;
  if (Array.isArray(options)) {
    parsed_options = parseOptions({
      contentBase: options,
    });
  } else if (typeof options === "string") {
    parsed_options = parseOptions({
      contentBase: [options],
    });
  } else if (
    options &&
    !Array.isArray(options) &&
    typeof options === "object"
  ) {
    if (!Array.isArray(options.contentBase)) {
      options.contentBase = options.contentBase ? [options.contentBase] : [""];
    }
    parsed_options = parseOptions(options as UserOptions);
  } else {
    throw new Error(
      "Options for serve: you must provide a valid path, list of paths or options object",
    );
  }

  if (parsed_options.https) {
    createHTTPSServer({
      certFile: parsed_options.https.cert,
      keyFile: parsed_options.https.key,
      hostname: parsed_options.host,
      port: parsed_options.port,
    }, createRequestHandler(parsed_options));
  } else {
    createHTTPServer({
      hostname: parsed_options.host,
      port: parsed_options.port,
    }, createRequestHandler(parsed_options));
  }

  let running = parsed_options.verbose === false;

  return {
    name: "serve",
    generateBundle() {
      if (!running) {
        running = true;

        const protocol = parsed_options.https ? "https" : "http";
        const url =
          `${protocol}://${parsed_options.host}:${parsed_options.port}`;
        (parsed_options.contentBase).forEach((base) => {
          console.log(
            `${url} -> ${
              path.resolve(
                Deno.cwd(),
                path.normalize(base || "./"),
              )
            }`,
          );
        });
      }
    },
  };
};
