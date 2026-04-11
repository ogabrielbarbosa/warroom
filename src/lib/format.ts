/**
 * Shared formatting utilities.
 * No "server-only" guard — used by both DAL (server) and components (client).
 */

export function formatNumber(n: number | null | undefined): string {
  if (n == null) return "0";
  return n.toLocaleString("pt-BR");
}

export function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || seconds === 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatDate(
  date: string | null | undefined
): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
