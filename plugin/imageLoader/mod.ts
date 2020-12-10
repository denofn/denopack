import { path, Plugin } from "../../deps.ts";
import { createFilter } from "../deps.ts";
import { svgToMiniDataURI } from "./deps.ts";

const defaults = {
  dom: false,
  exclude: null,
  include: null,
};

interface mimeTypesInterface {
  ".jpg": string;
  ".jpeg": string;
  ".png": string;
  ".gif": string;
  ".svg": string;
  ".webp": string;
  [key: string]: string;
}

const mimeTypes: mimeTypesInterface = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const domTemplate = ({ dataUri }: { dataUri: string }) =>
  `
  const img = new Image();
  img.src = "${dataUri}";
  export default img;
`;

const constTemplate = ({ dataUri }: { dataUri: string }) =>
  `
  const img = "${dataUri}";
  export default img;
`;

type Opts = {
  dom?: boolean;
  exclude?: string | string[];
  include?: string | string[];
};

const getDataUri = (
  { format, isSvg, mime, source }: {
    format: string;
    isSvg: boolean;
    mime: string;
    source: string;
  },
) => isSvg ? svgToMiniDataURI(source) : `data:${mime};${format},${source}`;

export function pluginImageLoader(opts: Opts = {}): Plugin {
  const options = Object.assign({}, defaults, opts) as Opts;
  const filter = createFilter(options.include, options.exclude);

  return {
    name: "denopack-plugin-imageLoader",
    async load(id) {
      if (!filter(id)) {
        return null;
      }

      const mime = mimeTypes[path.extname(id)];
      if (!mime) {
        // not an image
        return null;
      }

      const isSvg = mime === mimeTypes[".svg"];
      const format = isSvg ? "utf-8" : "base64";
      const decoder = new TextDecoder("utf-8");
      const data = await Deno.readFile(new URL(id));
      const source = decoder.decode(data).replace(
        /[\r\n]+/gm,
        "",
      );
      const dataUri = getDataUri({ format, isSvg, mime, source });
      const code = options.dom
        ? domTemplate({ dataUri })
        : constTemplate({ dataUri });
      return code.trim();
    },
  };
}

export default pluginImageLoader;
