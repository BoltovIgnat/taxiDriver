process.env.PAYLOAD_MIGRATING = "true";

import { config as loadEnv } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import payload from "payload";

import { applyDatabaseUriEnv } from "./lib/db/getDatabaseUri.js";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: resolve(rootDir, ".env.local"), override: true });
loadEnv({ path: resolve(rootDir, ".env") });

applyDatabaseUriEnv(false);

const { default: configPromise } = await import("@payload-config");

await payload.init({
  config: configPromise,
  disableOnInit: true,
});

await payload.db.migrate();
console.log("Migrations applied");
process.exit(0);
