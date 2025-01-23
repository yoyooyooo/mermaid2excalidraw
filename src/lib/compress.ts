import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

export function compressCode(code: string): string {
  return compressToEncodedURIComponent(code);
}

export function decompressCode(compressed: string | null): string {
  if (!compressed) return "";
  return decompressFromEncodedURIComponent(compressed) || "";
}
