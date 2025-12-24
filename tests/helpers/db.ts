export function isDbConfigured(): boolean {
  const url = process.env.DATABASE_URL || "";
  if (!url) return false;
  const lower = url.toLowerCase();
  if (lower.includes("...") || lower.includes("your-password")) return false;
  return true;
}
