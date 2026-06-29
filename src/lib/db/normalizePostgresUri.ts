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

function ensureSupabasePooler(url: URL): void {
  const host = url.hostname;
  const isSupabase =
    host.endsWith(".supabase.co") ||
    host.endsWith(".pooler.supabase.com") ||
    host.includes("supabase.com");

  if (!isSupabase || !process.env.VERCEL) {
    return;
  }

  // Direct port 5432 does not work reliably on Vercel serverless.
  const port = url.port || "5432";
  if (port === "5432") {
    url.port = "6543";
  }

  if (!url.searchParams.has("pgbouncer")) {
    url.searchParams.set("pgbouncer", "true");
  }
}

export function normalizePostgresUri(uri: string): string {
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
      // Stay under Vercel maxDuration (60s) — fail fast instead of hanging.
      url.searchParams.set("connect_timeout", process.env.VERCEL ? "15" : "30");
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
    // Must be below Vercel function maxDuration (60s on this project).
    connectionTimeoutMillis: isServerless ? 20000 : 30000,
    allowExitOnIdle: isServerless,
  };
}
