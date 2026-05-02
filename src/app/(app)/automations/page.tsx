import { getAutomations } from "@/lib/dal";
import { AutomationsList } from "@/features/automations/components/automations-list";

export default async function AutomationsPage() {
  const automations = await getAutomations();
  return <AutomationsList automations={automations} />;
}
