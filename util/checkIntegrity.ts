import { hash } from "../deps.ts";

export function checkIntegrity(
  lockFile: Record<string, string>,
  filePath: string,
  code: string,
): void {
  const sha256 = hash.createHash("sha256");
  const checksum = sha256.update(code).toString();
  if (lockFile[filePath] && lockFile[filePath] !== checksum) {
    throw new Error(
      `Integrity of ${filePath} does not match the checksum in the provided lockfile!`,
    );
  } else {
    console.log(`Integrity of ${filePath} matches lockfile`);
  }
}
