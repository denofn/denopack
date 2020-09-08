export function makeHtmlAttributes(
  attributes?: Record<string, any> | null,
): string {
  if (!attributes) {
    return "";
  }

  const keys = Object.keys(attributes);
  // eslint-disable-next-line no-param-reassign
  return keys.reduce(
    (result, key) => (result += ` ${key}="${attributes[key]}"`),
    "",
  );
}
