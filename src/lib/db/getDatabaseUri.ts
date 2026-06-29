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

const POOLED_CANDIDATE_KEYS = [
  "STORADGE_POSTGRES_URL",
  "POSTGRES_URL",
  "STORADGE_POSTGRES_PRISMA_URL",
  "POSTGRES_PRISMA_URL",
  "DATABASE_URI",
] as const;

const DIRECT_CANDIDATE_KEYS = [
  "STORADGE_POSTGRES_URL_NON_POOLING",
  "POSTGRES_URL_NON_POOLING",
  "DATABASE_URI_UNPOOLED",
  "STORADGE_POSTGRES_URL",
  "POSTGRES_URL",
  "DATABASE_URI",
] as const;

/** Higher score = better for Vercel serverless. */
function scorePostgresUrl(uri: string, preferPooled: boolean): number {
  let score = 0;

  if (uri.includes("pooler.supabase.com")) score += 100;
  if (uri.includes(":6543")) score += 60;
  if (uri.includes("pgbouncer=true")) score += 30;

  if (uri.includes(".supabase.co")) score += 10;
  if (uri.includes(".neon.tech")) score += 5;

  if (preferPooled) {
    if (uri.includes("db.") && uri.includes(".supabase.co") && !uri.includes("pooler")) {
      score -= 80;
    }
    if (uri.includes(":5432")) score -= 40;
  }

  return score;
}

function pickBestUrl(keys: readonly string[], preferPooled: boolean): string | undefined {
  const candidates = keys
    .map((key) => process.env[key]?.trim())
    .filter((value): value is string => !!value && /^postgres(ql)?:\/\//.test(value));

  if (candidates.length === 0) {
    return undefined;
  }

  if (process.env.VERCEL && preferPooled && candidates.length > 1) {
    return [...candidates].sort(
      (a, b) => scorePostgresUrl(b, true) - scorePostgresUrl(a, true),
    )[0];
  }

  return candidates[0];
}

function buildFromParts(pooled: boolean): string | undefined {
  const user = readEnv("STORADGE_POSTGRES_USER", "POSTGRES_USER");
  const password = readEnv("STORADGE_POSTGRES_PASSWORD", "POSTGRES_PASSWORD");
  const host = readEnv("STORADGE_POSTGRES_HOST", "POSTGRES_HOST");
  const database = readEnv("STORADGE_POSTGRES_DATABASE", "POSTGRES_DATABASE");

  if (!user || !password || !host || !database) {
    return undefined;
  }

  const isPoolerHost = host.includes("pooler.supabase.com");
  const port = pooled || isPoolerHost ? "6543" : "5432";
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}?sslmode=require`;
}

/** Runtime URL (Vercel/serverless): pooled / IPv4 pooler preferred. */
export function getDatabaseUri(pooled = true): string | undefined {
  const raw = pooled
    ? pickBestUrl(POOLED_CANDIDATE_KEYS, true) ?? pickBestUrl(DIRECT_CANDIDATE_KEYS, true)
    : readEnv(...DIRECT_CANDIDATE_KEYS);

  const uri = raw ?? buildFromParts(pooled);
  return uri ? normalizePostgresUri(uri, pooled) : undefined;
}

/** Sets DATABASE_URI for scripts that import @payload-config after dotenv. */
export function applyDatabaseUriEnv(pooled = true): string | undefined {
  const uri = getDatabaseUri(pooled);
  if (uri) {
    process.env.DATABASE_URI = uri;
  }
  return uri;
}
