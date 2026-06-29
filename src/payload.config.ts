import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Articles } from "./collections/Articles.js";
import { Users } from "./collections/Users.js";
import {
  getDatabaseUri,
} from "./lib/db/getDatabaseUri.js";
import {
  getPostgresPoolConfig,
} from "./lib/db/normalizePostgresUri.js";

/** pg reads PGUSER/PGPASSWORD when connectionString parsing fails — clear integration defaults. */
function clearConflictingPostgresEnv(): void {
  for (const key of [
    "PGUSER",
    "PGPASSWORD",
    "PGHOST",
    "PGPORT",
    "PGDATABASE",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_HOST",
    "POSTGRES_PORT",
    "POSTGRES_DATABASE",
  ]) {
    delete process.env[key];
  }
}

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUri = getDatabaseUri(true);
if (databaseUri) {
  process.env.DATABASE_URI = databaseUri;
}
clearConflictingPostgresEnv();
const isPostgres =
  !!databaseUri &&
  (databaseUri.startsWith("postgres://") || databaseUri.startsWith("postgresql://"));

const isProduction = process.env.NODE_ENV === "production";

if (process.env.VERCEL && !isPostgres) {
  throw new Error(
    "Postgres URL is required on Vercel (DATABASE_URI or STORADGE_POSTGRES_URL).",
  );
}

if (process.env.VERCEL && !process.env.PAYLOAD_SECRET?.trim()) {
  throw new Error("PAYLOAD_SECRET is required on Vercel.");
}

if (isProduction && !isPostgres) {
  throw new Error("DATABASE_URI (Postgres) is required in production.");
}

const isServerless = Boolean(process.env.VERCEL);

const emailFromAddress =
  process.env.EMAIL_FROM || process.env.PAYLOAD_ADMIN_EMAIL || "noreply@example.com";
const emailFromName = process.env.EMAIL_FROM_NAME || "Таксопарк";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— Таксопарк",
    },
    suppressHydrationWarning: true,
  },
  collections: [Users, Articles],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: getPostgresPoolConfig(databaseUri!, isServerless),
        migrationDir: path.resolve(dirname, "migrations"),
        push: false,
      })
    : sqliteAdapter({
        client: {
          url: databaseUri || "file:./payload.db",
        },
        push: true,
      }),
  email: nodemailerAdapter({
    defaultFromAddress: emailFromAddress,
    defaultFromName: emailFromName,
    skipVerify: true,
    transportOptions: {
      json: true,
    } as import("nodemailer/lib/smtp-connection/index.js").Options,
  }),
  sharp,
});
