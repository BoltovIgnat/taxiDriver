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

const ALL_URI_KEYS = [
  "DATABASE_POOLER_URL",
  "STORADGE_POSTGRES_URL",
  "POSTGRES_URL",
  "STORADGE_POSTGRES_PRISMA_URL",
  "POSTGRES_PRISMA_URL",
  "DATABASE_URI",
  "STORADGE_POSTGRES_URL_NON_POOLING",
  "POSTGRES_URL_NON_POOLING",
  "DATABASE_URI_UNPOOLED",
] as const;

const DIRECT_URI_KEYS = [
  "STORADGE_POSTGRES_URL_NON_POOLING",
  "POSTGRES_URL_NON_POOLING",
  "DATABASE_URI_UNPOOLED",
  "STORADGE_POSTGRES_URL",
  "POSTGRES_URL",
  "DATABASE_URI",
] as const;

export function getSupabaseProjectRef(): string | undefined {
  const publicUrl = readEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_STORADGE_SUPABASE_URL",
  );
  if (!publicUrl) {
    return undefined;
  }
  const match = publicUrl.match(/https?:\/\/([a-z0-9]+)\.supabase\.co/i);
  return match?.[1];
}

function isDirectSupabaseHost(hostname: string): boolean {
  return hostname.startsWith("db.") && hostname.endsWith(".supabase.co");
}

/** Higher score = better for Vercel serverless + Payload/pg. */
function scorePostgresUrl(uri: string, preferPooled: boolean): number {
  let score = 0;

  try {
    const url = new URL(uri);
    const { hostname, port, username } = url;

    if (hostname.includes("pooler.supabase.com")) {
      score += 100;
      if (port === "5432" || port === "") score += 40;
      if (port === "6543") score += 30;
      if (username.startsWith("postgres.")) score += 50;
      if (username === "postgres") score -= 60;
    }

    if (uri.includes("pgbouncer=true")) score += 20;
    if (uri.includes(".neon.tech")) score += 5;

    if (preferPooled && isDirectSupabaseHost(hostname)) {
      score -= 200;
    }
  } catch {
    return -999;
  }

  return score;
}

function collectCandidates(keys: readonly string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (!value || !/^postgres(ql)?:\/\//.test(value) || seen.has(value)) {
      continue;
    }
    seen.add(value);
    result.push(value);
  }

  return result;
}

function pickBestUrl(preferPooled: boolean): string | undefined {
  const explicitPooler = readEnv("DATABASE_POOLER_URL");
  if (explicitPooler && preferPooled) {
    return explicitPooler;
  }

  const candidates = collectCandidates(ALL_URI_KEYS);
  if (candidates.length === 0) {
    return undefined;
  }

  if (process.env.VERCEL || preferPooled) {
    return [...candidates].sort(
      (a, b) => scorePostgresUrl(b, preferPooled) - scorePostgresUrl(a, preferPooled),
    )[0];
  }

  return candidates[0];
}

/** Build Session pooler URI from Vercel Supabase integration parts. */
function buildSupabasePoolerFromIntegration(): string | undefined {
  const password = readEnv("STORADGE_POSTGRES_PASSWORD", "POSTGRES_PASSWORD");
  const host = readEnv("STORADGE_POSTGRES_HOST", "POSTGRES_HOST");
  const database = readEnv("STORADGE_POSTGRES_DATABASE", "POSTGRES_DATABASE") || "postgres";

  if (!password || !host?.includes("pooler.supabase.com")) {
    return undefined;
  }

  const ref = getSupabaseProjectRef();
  if (!ref) {
    return undefined;
  }

  const user = `postgres.${ref}`;

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:5432/${database}?sslmode=require`;
}

function buildFromParts(pooled: boolean): string | undefined {
  const password = readEnv("STORADGE_POSTGRES_PASSWORD", "POSTGRES_PASSWORD");
  const host = readEnv("STORADGE_POSTGRES_HOST", "POSTGRES_HOST");
  const database = readEnv("STORADGE_POSTGRES_DATABASE", "POSTGRES_DATABASE");

  if (!password || !host || !database) {
    return undefined;
  }

  const ref = getSupabaseProjectRef();
  const isPoolerHost = host.includes("pooler.supabase.com");
  const user = isPoolerHost && ref
    ? `postgres.${ref}`
    : readEnv("STORADGE_POSTGRES_USER", "POSTGRES_USER");

  if (!user) {
    return undefined;
  }

  const port = isPoolerHost && pooled ? "5432" : pooled ? "6543" : "5432";
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}?sslmode=require`;
}

export function validatePostgresUriForVercel(uri: string): void {
  if (!process.env.VERCEL) {
    return;
  }

  let hostname: string;
  try {
    hostname = new URL(uri).hostname;
  } catch {
    throw new Error("Invalid DATABASE_URI on Vercel.");
  }

  if (isDirectSupabaseHost(hostname)) {
    throw new Error(
      "Direct Supabase URL (db.*.supabase.co) does not work on Vercel. " +
        "Set DATABASE_POOLER_URL to Session/Transaction pooler from Supabase → Connect " +
        "(host must contain pooler.supabase.com, e.g. aws-0-eu-central-1.pooler.supabase.com).",
    );
  }
}

/** Runtime URL (Vercel/serverless): pooled / IPv4 pooler preferred. */
export function getDatabaseUri(pooled = true): string | undefined {
  const builtPooler = pooled ? buildSupabasePoolerFromIntegration() : undefined;
  const raw = pooled
    ? pickBestUrl(true) ?? builtPooler ?? readEnv(...DIRECT_URI_KEYS)
    : readEnv(...DIRECT_URI_KEYS);

  const uri = raw ?? buildFromParts(pooled);
  if (!uri) {
    return undefined;
  }

  const normalized = normalizePostgresUri(uri, pooled);
  if (pooled) {
    validatePostgresUriForVercel(normalized);
  }
  return normalized;
}

/** Sets DATABASE_URI for scripts that import @payload-config after dotenv. */
export function applyDatabaseUriEnv(pooled = true): string | undefined {
  const uri = getDatabaseUri(pooled);
  if (uri) {
    process.env.DATABASE_URI = uri;
  }
  return uri;
}
