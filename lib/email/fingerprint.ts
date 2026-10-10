import { createHash } from "node:crypto"

export function fingerprint(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 32)
}
