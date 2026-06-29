function ensureNeonPoolerHost(hostname: string): string {
  if (hostname.includes("-pooler.")) {
    return hostname;
  }
  const match = hostname.match(/^(ep-[^.]+)\.(c-\d+\..+\.neon\.tech)$/);
  if (match) {
    return `${match[1]}-pooler.${match[2]}`;
  }
  return hostname;
}

function getSupabaseProjectRefFromEnv(): string | undefined {
  const publicUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_STORADGE_SUPABASE_URL?.trim();
  if (!publicUrl) {
    return undefined;
  }
  const match = publicUrl.match(/https?:\/\/([a-z0-9]+)\.supabase\.co/i);
  return match?.[1];
}

function ensureSupabasePoolerUser(url: URL): void {
  if (!url.hostname.includes("pooler.supabase.com")) {
    return;
  }

  const ref = getSupabaseProjectRefFromEnv();
  if (!ref) {
    return;
  }

  const expectedUser = `postgres.${ref}`;
  const currentUser = decodeURIComponent(url.username);

  if (currentUser === "postgres") {
    url.username = expectedUser;
  }
}

function ensureSupabasePooler(url: URL): void {
  const host = url.hostname;
  if (!host.includes("pooler.supabase.com")) {
    return;
  }

  ensureSupabasePoolerUser(url);

  // Session pooler uses port 5432; transaction mode uses 6543 — do not override.
  if (url.port === "6543" && !url.searchParams.has("pgbouncer")) {
    url.searchParams.set("pgbouncer", "true");
  }
}

export function normalizePostgresUri(uri: string, _pooled = true): string {
  try {
    const url = new URL(uri);

    if (process.env.VERCEL && url.hostname.endsWith(".neon.tech")) {
      url.hostname = ensureNeonPoolerHost(url.hostname);
    }

    ensureSupabasePooler(url);

    url.searchParams.delete("channel_binding");

    const sslmode = url.searchParams.get("sslmode");
    if (sslmode && ["require", "prefer", "verify-ca"].includes(sslmode)) {
      url.searchParams.set("uselibpqcompat", "true");
    }

    if (!url.searchParams.has("connect_timeout")) {
      url.searchParams.set("connect_timeout", process.env.VERCEL ? "25" : "30");
    }

    return url.toString();
  } catch {
    return uri;
  }
}

export function getPostgresPoolConfig(connectionString: string, isServerless: boolean) {
  return {
    connectionString,
    max: isServerless ? 1 : 10,
    idleTimeoutMillis: isServerless ? 5000 : 30000,
    connectionTimeoutMillis: isServerless ? 40000 : 30000,
    allowExitOnIdle: isServerless,
    keepAlive: true,
  };
}
