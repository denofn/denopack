export function isHttpUrl(p: string): boolean {
  return p.startsWith("https://") || p.startsWith("http://");
}
