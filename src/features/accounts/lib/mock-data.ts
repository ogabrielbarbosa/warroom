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
  postsCount: number;
  avgViews: number;
  avgViewsFormatted: string;
  totalViews: number;
  status: AccountStatus;
  lastSync: string;
  profileImage: string;
  niche: string;
  bio: string;
  engagementRate: number;
  engagementRateFormatted: string;
  profileUrl: string;
  isPinned: boolean;
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

export const MOCK_ACCOUNTS: Account[] = [];
