import { getSupabaseProjectRef } from "./supabaseRef.js";

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

function ensureSupabasePoolerUser(url: URL, projectRef?: string): void {
  if (!url.hostname.includes("pooler.supabase.com")) {
    return;
  }

  const ref = projectRef ?? getSupabaseProjectRef();
  if (!ref) {
    return;
  }

  const expectedUser = `postgres.${ref}`;
  const currentUser = decodeURIComponent(url.username);

  if (currentUser === "postgres") {
    url.username = expectedUser;
  }
}

function ensureSupabasePooler(url: URL, projectRef?: string): void {
  const host = url.hostname;
  if (!host.includes("pooler.supabase.com")) {
    return;
  }

  ensureSupabasePoolerUser(url, projectRef);

  // Payload needs session mode on Vercel (prepared statements, lateral joins).
  if (process.env.VERCEL) {
    if (url.port === "6543" || url.searchParams.has("pgbouncer")) {
      url.port = "5432";
      url.searchParams.delete("pgbouncer");
    }
  } else if (url.port === "6543" && !url.searchParams.has("pgbouncer")) {
    url.searchParams.set("pgbouncer", "true");
  }
}

export function normalizePostgresUri(uri: string, _pooled = true, projectRef?: string): string {
  try {
    const url = new URL(uri);

    if (process.env.VERCEL && url.hostname.endsWith(".neon.tech")) {
      url.hostname = ensureNeonPoolerHost(url.hostname);
    }

    ensureSupabasePooler(url, projectRef);

    url.searchParams.delete("channel_binding");

    const sslmode = url.searchParams.get("sslmode");
    if (sslmode && ["require", "prefer", "verify-ca"].includes(sslmode)) {
      url.searchParams.set("uselibpqcompat", "true");
    }

    if (!url.searchParams.has("connect_timeout")) {
      url.searchParams.set("connect_timeout", process.env.VERCEL ? "50" : "30");
    }

    return url.toString();
  } catch {
    return uri;
  }
}

export function getPostgresPoolConfig(connectionString: string, isServerless: boolean) {
  return {
    connectionString,
    // Admin init may run several parallel queries; max 1 causes pool connect timeouts.
    max: isServerless ? 3 : 10,
    idleTimeoutMillis: isServerless ? 20000 : 30000,
    connectionTimeoutMillis: isServerless ? 55000 : 30000,
    allowExitOnIdle: false,
    keepAlive: true,
  };
}
