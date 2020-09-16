# denopack/plugin/serve

## Required flags

- `--allow-read=serve_path(s)`
- `--allow-net=host:port`

## Options

- `contentBase`: Path or paths(`array`) the server will be serving from. They have precedence, so if two matches were to be found inside the provided paths, it will be resolved to the first path provided inside the array

- `headers`: Headers to be added to the file response

- `historyApiFallback`: File to be served when no path is found. Set false to fail on not found, set true to redirect to `index.html` in your project root

- `host`: Host to serve on. Default is `localhost`

- `https`: Configuration to start a secure TLS server. You must provide a certificate file path and a keys file path in the configuration, default to false

- `port`: Port to serve on. Default is `10001`

- `verbose`: Logs a message indicating paths and server direction to visit in browser

## Usage

```ts
import { pluginServe } from "https://deno.land/x/denopack@0.9.0/plugin/serve/mod.ts";

export default {
  plugins: [pluginServe("serve_path")],
};
```

```ts
import { pluginServe } from "https://deno.land/x/denopack@0.9.0/plugin/serve/mod.ts";

const options_object = {
  contentBase: "serve_path",
};

export default {
  plugins: [pluginServe(options_object)],
};
```
