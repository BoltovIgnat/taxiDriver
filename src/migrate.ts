process.env.PAYLOAD_MIGRATING = "true";
process.env.NODE_ENV = "production";

import { config as loadEnv } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import payload from "payload";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: resolve(rootDir, ".env.local"), override: true });
loadEnv({ path: resolve(rootDir, ".env") });

if (process.env.DATABASE_URI_UNPOOLED) {
  process.env.DATABASE_URI = process.env.DATABASE_URI_UNPOOLED;
}

const { default: configPromise } = await import("@payload-config");

await payload.init({
  config: configPromise,
  disableOnInit: true,
});

await payload.db.migrate();
console.log("Migrations applied");

try {
  await payload.db.destroy?.();
} catch {
  // ignore pool shutdown errors
}

process.exit(0);
