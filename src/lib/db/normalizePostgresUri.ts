export function normalizePostgresUri(uri: string): string {
  try {
    const url = new URL(uri);
    // pg on Node/Vercel often fails with channel_binding=require
    url.searchParams.delete("channel_binding");
    return url.toString();
  } catch {
    return uri;
  }
}
