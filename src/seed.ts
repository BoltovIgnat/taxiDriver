import { config as loadEnv } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: resolve(rootDir, ".env.local"), override: true });
loadEnv({ path: resolve(rootDir, ".env") });

const { default: configPromise } = await import("@payload-config");
const { getPayload } = await import("payload");
const { default: articlesSeed } = await import("../data/articles.json", {
  with: { type: "json" },
});

const payload = await getPayload({ config: configPromise });

const users = await payload.find({ collection: "users", limit: 0 });
if (
  users.totalDocs === 0 &&
  process.env.PAYLOAD_ADMIN_EMAIL &&
  process.env.PAYLOAD_ADMIN_PASSWORD
) {
  await payload.create({
    collection: "users",
    data: {
      email: process.env.PAYLOAD_ADMIN_EMAIL,
      password: process.env.PAYLOAD_ADMIN_PASSWORD,
    },
  });
  console.log("Created admin user:", process.env.PAYLOAD_ADMIN_EMAIL);
} else if (users.totalDocs > 0) {
  console.log(`Admin user already exists (${users.totalDocs})`);
}

const articles = await payload.find({ collection: "articles", limit: 0 });
if (articles.totalDocs === 0) {
  for (const article of articlesSeed) {
    await payload.create({
      collection: "articles",
      data: article,
    });
  }
  console.log(`Seeded ${articlesSeed.length} articles`);
} else {
  console.log(`Articles already exist (${articles.totalDocs})`);
}

process.exit(0);
