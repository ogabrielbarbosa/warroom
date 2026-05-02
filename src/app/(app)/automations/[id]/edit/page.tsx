import { notFound } from "next/navigation";
import {
  getAutomationById,
  getAutomationContacts,
  getAutomationLogs,
  getAutomationStats,
  getInstagramMediaForAutomation,
} from "@/lib/dal";
import { AutomationEditor } from "@/features/automations/components/automation-editor";
import type { AutomationFormData } from "@/features/automations/lib/types";

export default async function EditAutomationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [automation, reels, stats, logs, contacts] = await Promise.all([
    getAutomationById(id),
    getInstagramMediaForAutomation(),
    getAutomationStats(id),
    getAutomationLogs(id),
    getAutomationContacts(id),
  ]);

  if (!automation) notFound();

  const initialData: AutomationFormData = {
    name: automation.name,
    triggerType: automation.triggerType,
    contentId: automation.contentId,
    igMediaId: automation.igMediaId,
    mediaUrl: automation.mediaUrl,
    mediaThumbnailUrl: automation.mediaThumbnailUrl,
    commentMatchType: automation.commentMatchType,
    keywords: automation.keywords,
    replyToComments: automation.replyToComments,
    publicReplyVariants: automation.publicReplyVariants,
    welcomeEnabled: automation.welcomeEnabled,
    welcomeMessage: automation.welcomeMessage,
    welcomeButtonLabel: automation.welcomeButtonLabel,
    requireFollow: automation.requireFollow,
    followMessage: automation.followMessage,
    finalMessage: automation.finalMessage,
    finalLinkLabel: automation.finalLinkLabel,
    finalLinkUrl: automation.finalLinkUrl,
  };

  return (
    <AutomationEditor
      automationId={automation.id}
      initialData={initialData}
      initialActive={automation.isActive}
      reels={reels}
      stats={stats}
      logs={logs}
      contacts={contacts}
    />
  );
}
