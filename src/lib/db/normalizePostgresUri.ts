export function normalizePostgresUri(uri: string): string {
  try {
    const url = new URL(uri);
    // pg on Node/Vercel often fails with channel_binding=require
    url.searchParams.delete("channel_binding");

    // Silence pg v8 SSL deprecation warning for Neon-style sslmode=require
    const sslmode = url.searchParams.get("sslmode");
    if (sslmode && ["require", "prefer", "verify-ca"].includes(sslmode)) {
      url.searchParams.set("uselibpqcompat", "true");
    }

    return url.toString();
  } catch {
    return uri;
  }
}
