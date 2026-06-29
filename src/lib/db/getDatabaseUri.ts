import { normalizePostgresUri } from "./normalizePostgresUri.js";

function readEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) {
      return value;
    }
  }
  return undefined;
}

function buildFromParts(pooled: boolean): string | undefined {
  const user = readEnv("STORADGE_POSTGRES_USER", "POSTGRES_USER");
  const password = readEnv("STORADGE_POSTGRES_PASSWORD", "POSTGRES_PASSWORD");
  const host = readEnv("STORADGE_POSTGRES_HOST", "POSTGRES_HOST");
  const database = readEnv("STORADGE_POSTGRES_DATABASE", "POSTGRES_DATABASE");

  if (!user || !password || !host || !database) {
    return undefined;
  }

  const port = pooled ? "6543" : "5432";
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}?sslmode=require`;
}

const VERCEL_POOLED_KEYS = [
  "STORADGE_POSTGRES_URL",
  "POSTGRES_URL",
  "DATABASE_URI",
  "STORADGE_POSTGRES_PRISMA_URL",
  "POSTGRES_PRISMA_URL",
] as const;

const LOCAL_POOLED_KEYS = [
  "DATABASE_URI",
  "STORADGE_POSTGRES_URL",
  "POSTGRES_URL",
  "DATABASE_URI_UNPOOLED",
  "STORADGE_POSTGRES_URL_NON_POOLING",
  "POSTGRES_URL_NON_POOLING",
] as const;

const VERCEL_DIRECT_KEYS = [
  "STORADGE_POSTGRES_URL_NON_POOLING",
  "POSTGRES_URL_NON_POOLING",
  "STORADGE_POSTGRES_URL",
  "POSTGRES_URL",
  "DATABASE_URI_UNPOOLED",
  "DATABASE_URI",
] as const;

/** Runtime URL (Vercel/serverless): pooled connection preferred. */
export function getDatabaseUri(pooled = true): string | undefined {
  const raw = pooled
    ? readEnv(...(process.env.VERCEL ? VERCEL_POOLED_KEYS : LOCAL_POOLED_KEYS))
    : readEnv(...(process.env.VERCEL ? VERCEL_DIRECT_KEYS : LOCAL_POOLED_KEYS));

  const uri = raw ?? buildFromParts(pooled);
  return uri ? normalizePostgresUri(uri) : undefined;
}

/** Sets DATABASE_URI for scripts that import @payload-config after dotenv. */
export function applyDatabaseUriEnv(pooled = true): string | undefined {
  const uri = getDatabaseUri(pooled);
  if (uri) {
    process.env.DATABASE_URI = uri;
  }
  return uri;
}
