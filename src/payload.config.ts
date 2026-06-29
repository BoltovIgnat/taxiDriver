import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Articles } from "./collections/Articles.js";
import { Users } from "./collections/Users.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUri = process.env.DATABASE_URI?.trim();
const isPostgres =
  !!databaseUri &&
  (databaseUri.startsWith("postgres://") || databaseUri.startsWith("postgresql://"));

if (process.env.VERCEL && !isPostgres) {
  throw new Error("DATABASE_URI (Postgres) is required on Vercel.");
}

const isServerless = Boolean(process.env.VERCEL);

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
  sharp,
});
