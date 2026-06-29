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

const databaseUri = process.env.DATABASE_URI || "file:./payload.db";
const isPostgres =
  databaseUri.startsWith("postgres://") || databaseUri.startsWith("postgresql://");

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
        },
        push: process.env.NODE_ENV !== "production",
      })
    : sqliteAdapter({
        client: {
          url: databaseUri,
        },
        push: true,
      }),
  sharp,
});
