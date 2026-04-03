/* ═══════════════════════════════════════════════════════════
   ACCOUNTS — Social Media Accounts Mock Data
   ═══════════════════════════════════════════════════════════ */

export type Platform = "Instagram" | "YouTube" | "TikTok";
export type AccountStatus = "Active" | "Paused" | "Disconnected";

export interface Account {
  id: string;
  username: string;
  displayName: string;
  platform: Platform;
  followers: number;
  followersFormatted: string;
  engagement: number;
  postsCount: number;
  avgViews: number;
  avgViewsFormatted: string;
  status: AccountStatus;
  lastSync: string;
  profileImage: string;
  niche: string;
  bio: string;
  profileUrl: string;
}

export const PLATFORM_STYLES: Record<
  Platform,
  { text: string; bg: string }
> = {
  Instagram: { text: "text-[#E4405F]", bg: "bg-[#2D1A1F]" },
  YouTube: { text: "text-[#FF0000]", bg: "bg-[#2D1515]" },
  TikTok: { text: "text-[#00F2EA]", bg: "bg-[#152D2C]" },
};

export const STATUS_STYLES: Record<
  AccountStatus,
  { text: string; bg: string }
> = {
  Active: { text: "text-[#4ADE80]", bg: "bg-[#1A2D1F]" },
  Paused: { text: "text-[#FBBF24]", bg: "bg-[#2D2A15]" },
  Disconnected: { text: "text-[#F87171]", bg: "bg-[#2D1A1A]" },
};

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: "acc_01",
    username: "@kallaway.dev",
    displayName: "Kallaway",
    platform: "Instagram",
    followers: 245000,
    followersFormatted: "245.0K",
    engagement: 5.2,
    postsCount: 312,
    avgViews: 89400,
    avgViewsFormatted: "89.4K",
    status: "Active",
    lastSync: "2h ago",
    profileImage: "/images/accounts/kallaway.jpg",
    niche: "Tech & AI",
    bio: "Ensinando programação e IA de um jeito que faz sentido. Dev senior, criador de conteúdo, e entusiasta de automação.",
    profileUrl: "https://instagram.com/kallaway.dev",
  },
  {
    id: "acc_02",
    username: "@noe.codes",
    displayName: "Noe",
    platform: "YouTube",
    followers: 180000,
    followersFormatted: "180.0K",
    engagement: 3.8,
    postsCount: 156,
    avgViews: 54200,
    avgViewsFormatted: "54.2K",
    status: "Active",
    lastSync: "5h ago",
    profileImage: "/images/accounts/noe.jpg",
    niche: "Programming",
    bio: "Conteúdo sobre programação, carreira em tech e dicas práticas para devs. De júnior a senior, sem enrolação.",
    profileUrl: "https://youtube.com/@noe.codes",
  },
  {
    id: "acc_03",
    username: "@techflow.br",
    displayName: "TechFlow Brasil",
    platform: "TikTok",
    followers: 520000,
    followersFormatted: "520.0K",
    engagement: 7.1,
    postsCount: 489,
    avgViews: 312000,
    avgViewsFormatted: "312.0K",
    status: "Active",
    lastSync: "30min ago",
    profileImage: "/images/accounts/techflow.jpg",
    niche: "Tech Trends",
    bio: "As últimas tendências de tecnologia em 60 segundos. IA, gadgets, apps e o futuro digital.",
    profileUrl: "https://tiktok.com/@techflow.br",
  },
  {
    id: "acc_04",
    username: "@dev.gabriel",
    displayName: "Gabriel Dev",
    platform: "Instagram",
    followers: 98500,
    followersFormatted: "98.5K",
    engagement: 4.5,
    postsCount: 201,
    avgViews: 42300,
    avgViewsFormatted: "42.3K",
    status: "Paused",
    lastSync: "3d ago",
    profileImage: "/images/accounts/gabriel.jpg",
    niche: "AI & Automation",
    bio: "Automatizando tudo com IA. Mostro como usar ferramentas de IA no dia a dia pra trabalhar menos e produzir mais.",
    profileUrl: "https://instagram.com/dev.gabriel",
  },
  {
    id: "acc_05",
    username: "@codigo.limpo",
    displayName: "Código Limpo",
    platform: "YouTube",
    followers: 67200,
    followersFormatted: "67.2K",
    engagement: 6.3,
    postsCount: 89,
    avgViews: 28700,
    avgViewsFormatted: "28.7K",
    status: "Active",
    lastSync: "1h ago",
    profileImage: "/images/accounts/codigolimpo.jpg",
    niche: "Clean Code",
    bio: "Código limpo, arquitetura sólida e boas práticas. Tutoriais profundos sobre como escrever código que dura.",
    profileUrl: "https://youtube.com/@codigo.limpo",
  },
  {
    id: "acc_06",
    username: "@ia.pratica",
    displayName: "IA Prática",
    platform: "TikTok",
    followers: 310000,
    followersFormatted: "310.0K",
    engagement: 8.4,
    postsCount: 567,
    avgViews: 198000,
    avgViewsFormatted: "198.0K",
    status: "Active",
    lastSync: "15min ago",
    profileImage: "/images/accounts/iapratica.jpg",
    niche: "AI Tools",
    bio: "Ferramentas de IA que você precisa conhecer. Reviews, tutoriais e hacks de produtividade com inteligência artificial.",
    profileUrl: "https://tiktok.com/@ia.pratica",
  },
  {
    id: "acc_07",
    username: "@frontend.tips",
    displayName: "Frontend Tips",
    platform: "Instagram",
    followers: 42100,
    followersFormatted: "42.1K",
    engagement: 3.2,
    postsCount: 178,
    avgViews: 15600,
    avgViewsFormatted: "15.6K",
    status: "Disconnected",
    lastSync: "7d ago",
    profileImage: "/images/accounts/frontendtips.jpg",
    niche: "Frontend Dev",
    bio: "Dicas rápidas de frontend: React, Next.js, CSS e tudo que um dev frontend precisa saber.",
    profileUrl: "https://instagram.com/frontend.tips",
  },
  {
    id: "acc_08",
    username: "@startup.grind.br",
    displayName: "Startup Grind BR",
    platform: "YouTube",
    followers: 155000,
    followersFormatted: "155.0K",
    engagement: 4.9,
    postsCount: 234,
    avgViews: 67800,
    avgViewsFormatted: "67.8K",
    status: "Paused",
    lastSync: "2d ago",
    profileImage: "/images/accounts/startupgrind.jpg",
    niche: "Startups & Business",
    bio: "O lado business da tech. Histórias de startups, estratégias de crescimento e lições de quem já errou muito.",
    profileUrl: "https://youtube.com/@startup.grind.br",
  },
];
