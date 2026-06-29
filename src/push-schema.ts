process.env.PAYLOAD_PUSH_SCHEMA = "true";
process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = "true";
process.env.NODE_ENV = "development";
process.env.CI = "true";

import { config as loadEnv } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: resolve(rootDir, ".env.local"), override: true });
loadEnv({ path: resolve(rootDir, ".env") });

// Neon: для создания таблиц нужен direct URL (без -pooler)
if (process.env.DATABASE_URI_UNPOOLED) {
  process.env.DATABASE_URI = process.env.DATABASE_URI_UNPOOLED;
}

const { default: configPromise } = await import("@payload-config");
const { getPayload } = await import("payload");

const maxAttempts = 5;

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  try {
    const payload = await getPayload({ config: configPromise });
    await payload.find({ collection: "users", limit: 0 });
    console.log("Database schema synced");
    process.exit(0);
  } catch (error) {
    console.error(`Schema sync attempt ${attempt}/${maxAttempts} failed:`, error);
    if (attempt === maxAttempts) {
      process.exit(1);
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 5000));
  }
}
