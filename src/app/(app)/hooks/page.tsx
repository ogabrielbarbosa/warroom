import { getHooks } from "@/lib/dal";
import { HooksContent } from "@/features/hooks/components/hooks-content";

export default async function HooksPage() {
  const hooks = await getHooks();
  return <HooksContent hooks={hooks} />;
}
