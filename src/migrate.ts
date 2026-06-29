process.env.PAYLOAD_MIGRATING = "true";
process.env.NODE_ENV = "production";

import { config as loadEnv } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import payload from "payload";

import { normalizePostgresUri } from "./lib/db/normalizePostgresUri.js";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: resolve(rootDir, ".env.local"), override: true });
loadEnv({ path: resolve(rootDir, ".env") });

const dbUri = process.env.DATABASE_URI_UNPOOLED || process.env.DATABASE_URI;
if (dbUri) {
  process.env.DATABASE_URI = normalizePostgresUri(dbUri);
}

const { default: configPromise } = await import("@payload-config");

await payload.init({
  config: configPromise,
  disableOnInit: true,
});

await payload.db.migrate();
console.log("Migrations applied");
process.exit(0);
