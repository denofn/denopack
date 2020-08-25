interface HTTPSOptions {
  /* Path for the file that contains your certificate */
  cert: string;
  /* Path for the file that contains your key */
  key: string;
}

export interface ServeOptions {
  contentBase: string[];
  headers: { [header: string]: string };
  historyApiFallback: string | false;
  host: string;
  https: HTTPSOptions | false;
  port: number;
  verbose: boolean;
}

export interface UserOptions {
  /** Folder(s) to serve files from */
  contentBase: string | string[];
  /** Set headers */
  headers?: { [header: string]: string };
  /** Path to fallback page. Set to `true` to return index.html (200) instead of error page (404) */
  historyApiFallback?: string | boolean;
  /** Server host (default: `'localhost'`) */
  host?: string;
  /** By default server will be served over HTTP (https: `false`). It can optionally be served over HTTPS */
  https?: boolean | HTTPSOptions;
  /** Server port (default: `10001`) */
  port?: number;
  /** Show server address in console (default: `true`) */
  verbose?: boolean;
}

const defaultOptions = {
  contentBase: [""],
  headers: {},
  historyApiFallback: "index.html",
  host: "localhost",
  https: false,
  port: 10001,
  verbose: true,
} as ServeOptions;

/** Really long validations, but necessary for use with JavaScript */
export const parseOptions = (
  options: UserOptions,
): ServeOptions => {
  options.contentBase = options.contentBase.length
    ? options.contentBase
    : defaultOptions.contentBase;
  if (
    !(options.contentBase as unknown[]).every((x) => typeof x === "string")
  ) {
    throw new Error(
      `Options for serve: contentBase must be a valid path or paths`,
    );
  }

  options.headers = options.headers ?? defaultOptions.headers;
  if (
    !options.headers ||
    Array.isArray(options.headers) ||
    typeof options.headers !== "object"
  ) {
    throw new Error(`Options for serve: headers must be a valid object`);
  }

  options.historyApiFallback = options.historyApiFallback ??
    defaultOptions.historyApiFallback;
  if (
    typeof options.historyApiFallback !== "boolean" &&
    typeof options.historyApiFallback !== "string"
  ) {
    throw new Error(
      `Options for serve: historyApiFallback must be a valid path`,
    );
  }
  options.historyApiFallback = typeof options.historyApiFallback === "string"
    ? options.historyApiFallback
    : (options.historyApiFallback ? "index.html" : false);

  options.host = options.host ?? defaultOptions.host;
  if (typeof options.host !== "string") {
    throw new Error(`Options for serve: host must be a valid string`);
  }

  options.https = options.https ?? defaultOptions.https;
  if (
    options.https &&
    (
      typeof options.https !== "object" ||
      !options.https.cert ||
      !options.https.key
    )
  ) {
    throw new Error(
      `Options for serve: https must be a valid options object`,
    );
  }

  options.port = options.port ?? defaultOptions.port;
  if (typeof options.port !== "number" || options.port < 1) {
    throw new Error(`Options for serve: port must be a valid port number`);
  }

  options.verbose = options.verbose ?? defaultOptions.verbose;
  if (typeof options.verbose !== "boolean") {
    throw new Error(`Options for serve: verbose must be a valid boolean`);
  }

  return options as ServeOptions;
};
