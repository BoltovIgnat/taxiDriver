process.env.PAYLOAD_MIGRATING = "true";
process.env.CI = "true";

import { config as loadEnv } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import payload from "payload";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: resolve(rootDir, ".env.local"), override: true });
loadEnv({ path: resolve(rootDir, ".env") });

const { default: configPromise } = await import("@payload-config");

await payload.init({
  config: configPromise,
  disableDBConnect: true,
  disableOnInit: true,
});

await payload.db.createMigration({
  migrationName: "initial",
  payload,
  skipEmpty: false,
  forceAcceptWarning: true,
});

console.log("Migration created");
process.exit(0);
