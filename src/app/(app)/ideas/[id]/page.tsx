import { notFound } from "next/navigation";
import { MOCK_IDEAS } from "@/features/ideas/lib/mock-data";
import { IdeaDetailContent } from "@/features/ideas/components/idea-detail-content";

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idea = MOCK_IDEAS.find((i) => i.id === id);

  if (!idea) {
    notFound();
  }

  return <IdeaDetailContent idea={idea} />;
}
