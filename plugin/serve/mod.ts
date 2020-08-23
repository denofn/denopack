import {
  createServer,
  getContentType,
  ServerRequest,
} from "./deps.ts";
import { path } from "../../deps.ts";

import { Plugin } from "../../deps.ts";

const DEFAULT_MIME_TYPE = "text/plain";

interface ServeOptions {
  /** Folder(s) to serve files from */
  contentBase?: string | string[];
  /** Set headers */
  headers?: { [header: string]: string };
  /** Path to fallback page. Set to `true` to return index.html (200) instead of error page (404) */
  historyApiFallback?: string | boolean;
  /** Server host (default: `'localhost'`) */
  host?: string;
  /** By default server will be served over HTTP (https: `false`). It can optionally be served over HTTPS */
  https?: boolean;
  /** Launch in browser (default: `false`) */
  open?: boolean;
  /** Page to navigate to when opening the browser. Will not do anything if `open` is `false`. Remember to start with a slash e.g. `'/different/page'` */
  openPage?: string;
  /** Server port (default: `10001`) */
  port?: number;
  /** Show server address in console (default: `true`) */
  verbose?: boolean;
}

const defaultOptions = {
  contentBase: [""],
  headers: {},
  historyApiFallback: true,
  host: "localhost",
  https: false,
  open: false,
  openPage: "",
  port: 10001,
  verbose: true,
} as ServeOptions;

/** Really long validations, but necessary for use with JavaScript */
const parseOptions = (
  options: { [option: string]: any },
): ServeOptions => {
  if (typeof options.contentBase === "string") {
    options.contentBase = [options.contentBase];
  }
  options.contentBase = options.contentBase || defaultOptions.contentBase;
  if (
    !(options.contentBase as string[]).every((x: any) => typeof x === "string")
  ) {
    throw new Error(
      `Options for serve: contentBase must be a valid path or paths`,
    );
  }

  options.headers = options.headers || defaultOptions.headers;
  if (
    !options.headers ||
    Array.isArray(options.headers) ||
    typeof options.headers !== "object"
  ) {
    throw new Error(`Options for serve: headers must be a valid object`);
  }

  options.host = options.host || defaultOptions.host;
  if (typeof options.host !== "string") {
    throw new Error(`Options for serve: host must be a valid string`);
  }

  options.https = options.https || defaultOptions.https;
  if (typeof options.https !== "boolean") {
    throw new Error(`Options for serve: https must be a valid boolean`);
  }

  options.openPage = options.openPage || defaultOptions.openPage;
  if (typeof options.openPage !== "string") {
    throw new Error(`Options for serve: openPage must be a valid string`);
  }

  options.port = options.port || defaultOptions.port;
  if (typeof options.port !== "number") {
    throw new Error(`Options for serve: openPage must be a valid number`);
  }

  options.verbose = options.verbose || defaultOptions.verbose;
  if (typeof options.verbose !== "boolean") {
    throw new Error(`Options for serve: verbose must be a valid boolean`);
  }

  return options as ServeOptions;
};

/** Serve your rolled up bundle like webpack-dev-server */
export const serve = (
  options: ServeOptions | string | string[] = "",
): Plugin => {
  const raw_options: { [key: string]: any } = {};
  if (Array.isArray(options)) {
    raw_options.contentBase = options;
  } else if (typeof options === "string") {
    raw_options.contentBase = [options];
  } else if (
    !(
      raw_options &&
      !Array.isArray(raw_options) &&
      typeof raw_options === "object"
    )
  ) {
    throw new Error(
      "Options for serve: you must provide a valid path, list of paths or options object",
    );
  }
  const parsed_options = parseOptions(options as { [key: string]: string });

  const requestListener = async (request: ServerRequest) => {
    const url_path = decodeURI(request.url.split("?")[0]);

    let headers = new Headers();
    Object
      .entries(parsed_options.headers as { [key: string]: string })
      .forEach(([header, value]) => {
        headers.append(header, value);
      });

    await readFileFromContentBase(
      parsed_options.contentBase as string[],
      url_path,
    )
      .then(({ content, path: file_path }) => {
        headers.set(
          "Content-Type",
          getContentType(path.extname(file_path)) || DEFAULT_MIME_TYPE,
        );
        request.respond({
          body: content,
          headers,
        });
      })
      .catch(async () => {
        if (parsed_options.historyApiFallback) {
          const fallbackPath =
            typeof parsed_options.historyApiFallback === "string"
              ? parsed_options.historyApiFallback
              : "/index.html";
          await readFileFromContentBase(
            parsed_options.contentBase as string[],
            fallbackPath,
          )
            .then(({ content, path: file_path }) => {
              headers.set(
                "Content-Type",
                getContentType(path.extname(file_path)) || DEFAULT_MIME_TYPE,
              );
              request.respond({
                body: content,
                headers,
              });
            })
            .catch(() => {
              request.respond({
                body: (
                  "404 Not Found" + "\n\n" +
                  (url_path.slice(1) || "index.html") +
                  ` in path ${
                    (parsed_options.contentBase as string[]).join(
                      ", ",
                    )
                  }` + "\n\n" +
                  "(rollup-plugin-serve)"
                ),
                status: 404,
              });
            });
        } else {
          request.respond({
            body: (
              "404 Not Found" + "\n\n" +
              (url_path.slice(1) || "index.html") +
              ` in path ${
                (parsed_options.contentBase as string[]).join(
                  ", ",
                )
              }` + "\n\n" +
              "(rollup-plugin-serve)"
            ),
            status: 404,
          });
        }
      });
  };

  //TODO:Soremwar
  //Enable https
  if (parsed_options.https) {
    //server = createHttpsServer(options.https, requestListener).listen(options.port, options.host)
  } else {
    createServer({
      hostname: parsed_options.host as string,
      port: parsed_options.port as number,
    }, requestListener);
  }

  let running = parsed_options.verbose === false;

  return {
    name: "serve",
    generateBundle() {
      if (!running) {
        running = true;

        // Log which url to visit
        const protocol = parsed_options.https ? "https" : "http";
        const url =
          `${protocol}://${parsed_options.host}:${parsed_options.port}`;
        (parsed_options.contentBase as string[]).forEach((base) => {
          console.log(
            `${url} -> ${
              path.resolve(
                Deno.cwd(),
                path.normalize(base || "./"),
              )
            }`,
          );
        });
        /*
        // Open browser
        if (parsed_options.open) {
          if (/https?:\/\/.+/.test(parsed_options.openPage)) {
            opener(parsed_options.openPage);
          } else {
            opener(url + parsed_options.openPage);
          }
        }
        */
      }
    },
  };
};

interface File {
  content: string;
  path: string;
}

//TODO:Soremwar
//Explore other possible errors besides not found
const readFileFromContentBase = async (
  content_base: string[],
  url: string,
): Promise<File> => {
  let file: File = {
    content: "",
    path: "",
  };

  for (const content_path of content_base) {
    let file_path: string;
    // Load index.html in directories
    if (url.endsWith("/")) {
      file_path = path.resolve(
        Deno.cwd(),
        path.normalize(`${content_path}/index.html`),
      );
    } else {
      file_path = path.resolve(
        Deno.cwd(),
        path.normalize(content_path + url),
      );
    }

    try {
      file.content = Deno.readTextFileSync(file_path);
      file.path = file_path;
    } catch {
      continue;
    }
  }

  if (file.path) {
    return file;
  } else {
    throw new Error();
  }
};
