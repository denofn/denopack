import { getContentType, ServerRequest, ServerResponse } from "./deps.ts";
import { path } from "../../deps.ts";
import type { ServeOptions } from "./options.ts";

const DEFAULT_MIME_TYPE = "text/plain";

/**
 * Returns a requestHandler for the server
 * This one does the heavy lifting, search for each file and serve it to user
 * */
export const createRequestHandler = (options: ServeOptions) => {
  return async (request: ServerRequest): Promise<void> => {
    const url_path = decodeURI(request.url.split("?")[0]);

    let headers = new Headers();
    Object.entries(options.headers).forEach(([header, value]) => {
      headers.append(header, value);
    });

    await readFileFromContentBase(options.contentBase, url_path)
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
        if (options.historyApiFallback) {
          await readFileFromContentBase(
            options.contentBase,
            options.historyApiFallback,
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
              request.respond(
                getNotFoundResponse(url_path, options.contentBase),
              );
            });
        } else {
          request.respond(getNotFoundResponse(url_path, options.contentBase));
        }
      });
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

    if (url.endsWith("/")) {
      file_path = path.resolve(
        Deno.cwd(),
        path.normalize(`${content_path}/index.html`),
      );
    } else {
      file_path = path.resolve(Deno.cwd(), path.normalize(content_path + url));
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
