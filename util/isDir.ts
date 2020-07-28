export async function isDir(path: string): Promise<boolean> {
  try {
    const { isDirectory } = await Deno.stat(path);
    return isDirectory;
  } catch {
    return false;
  }
}
