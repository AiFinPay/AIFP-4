import { sign, verify, type KeyObject } from "node:crypto";
import { canonicalJson } from "./canonical.js";
import type { SignedTreasuryReceipt, TreasuryReceiptPayload } from "./types.js";

export function signTreasuryReceipt(payload: TreasuryReceiptPayload, privateKey: KeyObject): SignedTreasuryReceipt {
  const signature = sign(null, Buffer.from(canonicalJson(payload)), privateKey).toString("base64url");
  return { payload, signature };
}

export function verifyTreasuryReceipt(receipt: SignedTreasuryReceipt, publicKey: KeyObject): boolean {
  return verify(
    null,
    Buffer.from(canonicalJson(receipt.payload)),
    publicKey,
    Buffer.from(receipt.signature, "base64url")
  );
}
