function readEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) {
      return value;
    }
  }
  return undefined;
}

const POSTGRES_URI_KEYS = [
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

function refFromPublicUrl(url: string): string | undefined {
  const match = url.match(/https?:\/\/([a-z0-9]+)\.supabase\.co/i);
  return match?.[1];
}

function refFromIntegrationUser(): string | undefined {
  const user = readEnv("STORADGE_POSTGRES_USER", "POSTGRES_USER");
  if (!user) {
    return undefined;
  }
  const match = user.match(/^postgres\.([a-z0-9]+)$/i);
  return match?.[1];
}

function refFromPostgresUri(uri: string): string | undefined {
  try {
    const url = new URL(uri);
    const directMatch = url.hostname.match(/^db\.([a-z0-9]+)\.supabase\.co$/i);
    if (directMatch) {
      return directMatch[1];
    }

    const userMatch = decodeURIComponent(url.username).match(/^postgres\.([a-z0-9]+)$/i);
    if (userMatch) {
      return userMatch[1];
    }
  } catch {
    return undefined;
  }

  return undefined;
}

/** Resolve Supabase project ref from public URL or any Postgres env var. */
export function getSupabaseProjectRef(): string | undefined {
  const explicitRef = readEnv("SUPABASE_PROJECT_REF", "STORADGE_SUPABASE_PROJECT_REF");
  if (explicitRef) {
    return explicitRef;
  }

  const integrationRef = refFromIntegrationUser();
  if (integrationRef) {
    return integrationRef;
  }

  const publicUrl = readEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_STORADGE_SUPABASE_URL",
    "SUPABASE_URL",
  );
  if (publicUrl) {
    const ref = refFromPublicUrl(publicUrl);
    if (ref) {
      return ref;
    }
  }

  for (const key of POSTGRES_URI_KEYS) {
    const value = process.env[key]?.trim();
    if (!value) {
      continue;
    }
    const ref = refFromPostgresUri(value);
    if (ref) {
      return ref;
    }
  }

  return undefined;
}
