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

function ensureSupabasePooler(url: URL, pooled: boolean): void {
  const host = url.hostname;
  const isSupabase =
    host.endsWith(".supabase.co") ||
    host.endsWith(".pooler.supabase.com") ||
    host.includes("supabase.com");

  if (!isSupabase || !process.env.VERCEL || !pooled) {
    return;
  }

  // Shared pooler (IPv4) — required for Vercel serverless on free tier.
  if (host.includes("pooler.supabase.com")) {
    if (!url.port || url.port === "5432") {
      url.port = "6543";
    }
    if (!url.searchParams.has("pgbouncer")) {
      url.searchParams.set("pgbouncer", "true");
    }
    return;
  }

  // db.[ref].supabase.co direct host is IPv6-only on free tier — do NOT force :6543 here.
  // pickBestUrl() should prefer STORADGE_POSTGRES_URL with pooler.supabase.com instead.
  if (host.startsWith("db.") && host.endsWith(".supabase.co")) {
    if (!url.searchParams.has("pgbouncer")) {
      url.searchParams.set("pgbouncer", "true");
    }
  }
}

export function normalizePostgresUri(uri: string, pooled = true): string {
  try {
    const url = new URL(uri);

    if (process.env.VERCEL && url.hostname.endsWith(".neon.tech")) {
      url.hostname = ensureNeonPoolerHost(url.hostname);
    }

    ensureSupabasePooler(url, pooled);

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
