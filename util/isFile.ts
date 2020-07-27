export async function isFile(path: string): Promise<boolean> {
  try {
    const { isFile } = await Deno.stat(path);
    return isFile;
  } catch {
    return false;
  }
}
