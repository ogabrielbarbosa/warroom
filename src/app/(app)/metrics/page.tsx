import { getMetrics, getAccountStats, getContentSnapshots } from "@/lib/dal";
import { MetricsContent } from "@/features/metrics/components/metrics-content";

export default async function MetricsPage() {
  const [videos, accountStats, contentSnapshots] = await Promise.all([
    getMetrics(),
    getAccountStats("ogabarbosa"),
    getContentSnapshots("ogabarbosa"),
  ]);

  return (
    <MetricsContent
      videos={videos}
      accountStats={accountStats}
      contentSnapshots={contentSnapshots}
    />
  );
}
