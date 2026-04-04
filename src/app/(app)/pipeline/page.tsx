import { getPipelineCards } from "@/lib/dal";
import { PipelineRealtime } from "@/features/pipeline/components/pipeline-realtime";

export default async function PipelinePage() {
  const cards = await getPipelineCards();

  return <PipelineRealtime initialData={cards} />;
}
