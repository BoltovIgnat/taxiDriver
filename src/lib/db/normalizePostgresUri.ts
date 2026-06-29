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

export function normalizePostgresUri(uri: string): string {
  try {
    const url = new URL(uri);

    if (process.env.VERCEL && url.hostname.endsWith(".neon.tech")) {
      url.hostname = ensureNeonPoolerHost(url.hostname);
    }

    // pg on Node/Vercel often fails with channel_binding=require
    url.searchParams.delete("channel_binding");

    // Silence pg v8 SSL deprecation warning for Neon-style sslmode=require
    const sslmode = url.searchParams.get("sslmode");
    if (sslmode && ["require", "prefer", "verify-ca"].includes(sslmode)) {
      url.searchParams.set("uselibpqcompat", "true");
    }

    if (!url.searchParams.has("connect_timeout")) {
      url.searchParams.set("connect_timeout", process.env.VERCEL ? "60" : "30");
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
    connectionTimeoutMillis: isServerless ? 120000 : 30000,
    allowExitOnIdle: isServerless,
  };
}
