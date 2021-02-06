import { path } from "../../deps.ts";
import { getContentType, ServerRequest, ServerResponse } from "./deps.ts";
import type { ServeOptions } from "./options.ts";

const DEFAULT_MIME_TYPE = "text/plain";

/**
 * Returns a requestHandler for the server
 * This one does the heavy lifting, search for each file and serve it to user
 * */
export const createRequestHandler = (options: ServeOptions) => {
  return (request: ServerRequest): void => {
    const urlPath = decodeURI(request.url.split("?")[0]);

    const headers = new Headers();
    Object.entries(options.headers).forEach(([header, value]) => {
      headers.append(header, value);
    });

    try {
      const { content, path: filePath } = readFileFromContentBase(
        options.contentBase,
        urlPath,
      );
      headers.set(
        "Content-Type",
        getContentType(path.extname(filePath)) || DEFAULT_MIME_TYPE,
      );
      request.respond({
        body: content,
        headers,
      });
    } catch {
      if (options.historyApiFallback) {
        try {
          const { content, path: filePath } = readFileFromContentBase(
            options.contentBase,
            options.historyApiFallback,
          );
          headers.set(
            "Content-Type",
            getContentType(path.extname(filePath)) || DEFAULT_MIME_TYPE,
          );
          request.respond({
            body: content,
            headers,
          });
        } catch {
          request.respond(
            getNotFoundResponse(urlPath, options.contentBase),
          );
        }
      } else {
        request.respond(getNotFoundResponse(urlPath, options.contentBase));
      }
    }
  };
};

const getNotFoundResponse = (
  requested_path: string,
  content_folders: string[],
): ServerResponse => {
  return {
    body: "404 Not Found" +
      "\n\n" +
      (requested_path.slice(1) || "index.html") +
      ` in path ${content_folders.join(", ")}` +
      "\n\n" +
      "(denopack-plugin-serve)",
    status: 404,
  };
};

interface File {
  content: string;
  path: string;
}

//TODO
//Validate alternative errors beside not found
const readFileFromContentBase = (
  contentBase: string[],
  url: string,
): File => {
  const file: File = {
    content: "",
    path: "",
  };

  for (const contentPath of contentBase) {
    let filePath: string;

    if (url.endsWith("/")) {
      filePath = path.resolve(
        Deno.cwd(),
        path.normalize(`${contentPath}/index.html`),
      );
    } else {
      filePath = path.resolve(Deno.cwd(), path.normalize(contentPath + url));
    }

    try {
      file.content = Deno.readTextFileSync(filePath);
      file.path = filePath;
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
