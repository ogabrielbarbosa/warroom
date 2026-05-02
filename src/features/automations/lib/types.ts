export type AutomationTriggerType = "specific_post" | "any_post" | "next_post";
export type AutomationMatchType = "specific_keyword" | "any_word";
export type AutomationLogStatus =
  | "triggered"
  | "public_replied"
  | "dm_sent"
  | "completed"
  | "failed";

export interface Automation {
  id: string;
  accountId: number | null;
  name: string;
  isActive: boolean;

  // Step 1
  triggerType: AutomationTriggerType;
  contentId: string | null;
  igMediaId: string | null;
  mediaUrl: string | null;
  mediaThumbnailUrl: string | null;

  // Step 2
  commentMatchType: AutomationMatchType;
  keywords: string[];
  replyToComments: boolean;
  publicReplyVariants: string[];

  // Step 3
  welcomeEnabled: boolean;
  welcomeMessage: string;
  welcomeButtonLabel: string;
  requireFollow: boolean;
  followMessage: string;

  // Step 4
  finalMessage: string;
  finalLinkLabel: string;
  finalLinkUrl: string;

  // Métricas
  totalTriggered: number;
  totalDmsSent: number;
  totalClicks: number;

  createdAt: string;
  updatedAt: string;
}

export interface AutomationFormData {
  name: string;
  triggerType: AutomationTriggerType;
  contentId: string | null;
  igMediaId: string | null;
  mediaUrl: string | null;
  mediaThumbnailUrl: string | null;

  commentMatchType: AutomationMatchType;
  keywords: string[];
  replyToComments: boolean;
  publicReplyVariants: string[];

  welcomeEnabled: boolean;
  welcomeMessage: string;
  welcomeButtonLabel: string;
  requireFollow: boolean;
  followMessage: string;

  finalMessage: string;
  finalLinkLabel: string;
  finalLinkUrl: string;
}

export interface AutomationLog {
  id: string;
  automationId: string;
  contactId: string | null;
  contactUsername: string | null;
  commentId: string | null;
  commentText: string | null;
  status: AutomationLogStatus;
  errorMessage: string | null;
  executedAt: string;
}

export interface AutomationContact {
  id: string;
  igScopedId: string;
  username: string | null;
  firstName: string | null;
  lastInteraction: string | null;
  tags: string[];
  createdAt: string;
  // Per-automation fields when joined via logs
  interactionCount?: number;
  lastSeenViaAutomation?: string | null;
}

export interface AutomationStats {
  totalTriggered: number;
  totalDmsSent: number;
  totalClicks: number;
  conversionRate: number; // dms / triggered
  clickThroughRate: number; // clicks / dms
  recentTriggersByDay: Array<{ date: string; count: number }>;
}

export interface InstagramMedia {
  id: string;
  caption: string | null;
  thumbnailUrl: string | null;
  url: string | null;
  postDate: string | null;
  views: number;
  isFromIgApi: boolean;
}

export const DEFAULT_AUTOMATION: AutomationFormData = {
  name: "Nova Automação",
  triggerType: "specific_post",
  contentId: null,
  igMediaId: null,
  mediaUrl: null,
  mediaThumbnailUrl: null,
  commentMatchType: "specific_keyword",
  keywords: [],
  replyToComments: false,
  publicReplyVariants: [],
  welcomeEnabled: true,
  welcomeMessage:
    "Olá! Eu estou muito feliz que você está aqui, muito obrigado pelo seu interesse 😊\n\nClique abaixo e eu vou te mandar o link em um segundo ✨",
  welcomeButtonLabel: "Me envie o link",
  requireFollow: false,
  followMessage:
    "Antes de te enviar o link, me segue lá no perfil 🙏\n\nDepois que você seguir, é só voltar aqui e clicar no botão pra receber o link!",
  finalMessage: "Aqui está! 👇",
  finalLinkLabel: "Acessar agora",
  finalLinkUrl: "",
};
