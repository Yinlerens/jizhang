import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

import { AiConfigError } from "@/lib/ai/openai-client";
import type { AiEncryptedSecret } from "@/lib/ai/types";

export function encryptApiKey(apiKey: string): AiEncryptedSecret {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(apiKey, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    version: 1,
    algorithm: "AES-256-GCM",
    iv: iv.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
    authTag: authTag.toString("base64"),
  };
}

export function decryptApiKey(payload: AiEncryptedSecret) {
  if (payload.version !== 1 || payload.algorithm !== "AES-256-GCM") {
    throw new AiConfigError("不支持的云端加密格式");
  }

  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      getEncryptionKey(),
      Buffer.from(payload.iv, "base64"),
    );

    decipher.setAuthTag(Buffer.from(payload.authTag, "base64"));

    return Buffer.concat([
      decipher.update(Buffer.from(payload.ciphertext, "base64")),
      decipher.final(),
    ]).toString("utf8");
  } catch {
    throw new AiConfigError("云端 API Key 解密失败");
  }
}

function getEncryptionKey() {
  const secret = process.env.AI_CONFIG_ENCRYPTION_KEY;

  if (!secret || secret.length < 32) {
    throw new AiConfigError("服务端缺少 AI_CONFIG_ENCRYPTION_KEY");
  }

  return createHash("sha256").update(secret).digest();
}

