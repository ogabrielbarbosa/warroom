/* ═══════════════════════════════════════════════════════════
   METRICS — Content Performance Mock Data
   ═══════════════════════════════════════════════════════════ */

export interface ContentVideo {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  rawDate: string;
  views: number;
  viewsFormatted: string;
  likes: number;
  likesFormatted: string;
  comments: number;
  commentsFormatted: string;
  shares: number;
  sharesFormatted: string;
  saves: number;
  savesFormatted: string;
  watchTimeAvg: string;
  avgWatchTimeSeconds: number;
  outlierScore: number;
  isOutlier: boolean;
  topic: string;
  contentType: string;
  visualFormat: string;
  duration: string;
  hook: string;
  caption: string;
  totalWatchTime: string;
}

export interface AccountStat {
  snapshotDate: string;
  followerCount: number;
  postCount: number;
  avgViews: number;
  totalViews: number;
}

export interface ContentSnapshot {
  contentId: string;
  snapshotDate: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  avgWatchTime: number;
  totalWatchTime: number;
}

