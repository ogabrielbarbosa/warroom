import { getInstagramMediaForAutomation } from "@/lib/dal";
import { AutomationEditor } from "@/features/automations/components/automation-editor";

export default async function NewAutomationPage() {
  const reels = await getInstagramMediaForAutomation();
  return <AutomationEditor reels={reels} />;
}
