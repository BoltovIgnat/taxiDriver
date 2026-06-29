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
import { normalizePostgresUri } from "./lib/db/normalizePostgresUri.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const rawDatabaseUri = process.env.DATABASE_URI?.trim();
const databaseUri = rawDatabaseUri ? normalizePostgresUri(rawDatabaseUri) : undefined;
const isPostgres =
  !!databaseUri &&
  (databaseUri.startsWith("postgres://") || databaseUri.startsWith("postgresql://"));

if (process.env.VERCEL && !isPostgres) {
  throw new Error("DATABASE_URI (Postgres) is required on Vercel.");
}

const isServerless = Boolean(process.env.VERCEL);

const emailFromAddress =
  process.env.EMAIL_FROM || process.env.PAYLOAD_ADMIN_EMAIL || "noreply@example.com";
const emailFromName = process.env.EMAIL_FROM_NAME || "Таксопарк";

const email = await (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  ? nodemailerAdapter({
      defaultFromAddress: emailFromAddress,
      defaultFromName: emailFromName,
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    })
  : nodemailerAdapter({
      defaultFromAddress: emailFromAddress,
      defaultFromName: emailFromName,
      skipVerify: true,
      transportOptions: {
        json: true,
      } as import("nodemailer/lib/smtp-connection/index.js").Options,
    }));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— Таксопарк",
    },
  },
  collections: [Users, Articles],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseUri,
          max: isServerless ? 1 : 10,
          idleTimeoutMillis: isServerless ? 10000 : 30000,
          connectionTimeoutMillis: isServerless ? 60000 : 30000,
        },
        migrationDir: path.resolve(dirname, "migrations"),
        push: false,
      })
    : sqliteAdapter({
        client: {
          url: databaseUri || "file:./payload.db",
        },
        push: true,
      }),
  email,
  sharp,
});
