function normalizeSiteUrl(raw: string): string {
  const withProtocol =
    raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

export function getServerSideURL(): string {
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (publicUrl) {
    return normalizeSiteUrl(publicUrl);
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
