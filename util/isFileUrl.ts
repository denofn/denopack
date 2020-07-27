export function isFileUrl(p: string): boolean {
  return p.startsWith("file://");
}
