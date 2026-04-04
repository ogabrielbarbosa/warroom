import { notFound } from "next/navigation";
import { getIdeaById } from "@/lib/dal";
import { IdeaDetailContent } from "@/features/ideas/components/idea-detail-content";

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idea = await getIdeaById(id);

  if (!idea) {
    notFound();
  }

  return <IdeaDetailContent idea={idea} />;
}
