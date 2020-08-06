import { path } from "../deps.ts";
import { extensions } from "./extensions.ts";
import { Options } from "./options.ts";

export function parseInputFile({ input }: Options): ReturnType<typeof path.parse> {
  const _location = input;
  if (
    !_location ||
    typeof _location !== "string" ||
    !extensions.includes(path.parse(_location).ext)
  )
    throw new Error(`No valid input file has been given!`);

  const location = path.resolve(path.normalize(_location));
  return path.parse(location);
}
