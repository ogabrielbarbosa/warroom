import { getIdeas } from "@/lib/dal";
import { IdeasRealtime } from "@/features/ideas/components/ideas-realtime";

export default async function IdeasPage() {
  const ideas = await getIdeas();

  return <IdeasRealtime initialData={ideas} />;
}
