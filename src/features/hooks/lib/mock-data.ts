/* ═══════════════════════════════════════════════════════════
   HOOKS — Mock Data
   ═══════════════════════════════════════════════════════════ */

export type HookStatus = "active" | "paused" | "failed" | "draft";
export type HookType = "webhook" | "cron" | "event" | "api";

export interface HookEvent {
  id: string;
  timestamp: string;
  status: "success" | "error";
  duration: string;
  statusCode: number;
}

export interface Hook {
  id: string;
  name: string;
  endpoint: string;
  type: HookType;
  status: HookStatus;
  lastTriggered: string;
  successRate: number;
  totalCalls: number;
  avgResponseTime: string;
  createdAt: string;
  description: string;
  secret: string;
  headers: Record<string, string>;
  retryPolicy: {
    maxRetries: number;
    backoffMs: number;
  };
  recentEvents: HookEvent[];
}

export const MOCK_HOOKS: Hook[] = [
  {
    id: "hook_01",
    name: "Deploy Pipeline",
    endpoint: "https://api.warroom.io/hooks/deploy",
    type: "webhook",
    status: "active",
    lastTriggered: "2 min ago",
    successRate: 98.5,
    totalCalls: 12480,
    avgResponseTime: "145ms",
    createdAt: "2026-01-15",
    description:
      "Triggers the CI/CD deployment pipeline when changes are pushed to the main branch. Handles staging and production environments.",
    secret: "whsec_••••••••••••••••k4Rm",
    headers: {
      "Content-Type": "application/json",
      "X-Hook-Source": "warroom",
    },
    retryPolicy: { maxRetries: 3, backoffMs: 1000 },
    recentEvents: [
      { id: "ev_01", timestamp: "2 min ago", status: "success", duration: "132ms", statusCode: 200 },
      { id: "ev_02", timestamp: "18 min ago", status: "success", duration: "148ms", statusCode: 200 },
      { id: "ev_03", timestamp: "1h ago", status: "success", duration: "156ms", statusCode: 200 },
      { id: "ev_04", timestamp: "2h ago", status: "error", duration: "3012ms", statusCode: 502 },
      { id: "ev_05", timestamp: "3h ago", status: "success", duration: "129ms", statusCode: 200 },
    ],
  },
  {
    id: "hook_02",
    name: "Metrics Collector",
    endpoint: "https://api.warroom.io/hooks/metrics",
    type: "cron",
    status: "active",
    lastTriggered: "5 min ago",
    successRate: 99.9,
    totalCalls: 43200,
    avgResponseTime: "89ms",
    createdAt: "2025-11-03",
    description:
      "Collects system metrics every 5 minutes including CPU, memory, disk usage, and network throughput across all rover clusters.",
    secret: "whsec_••••••••••••••••m3Tr",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ••••••••",
    },
    retryPolicy: { maxRetries: 5, backoffMs: 2000 },
    recentEvents: [
      { id: "ev_06", timestamp: "5 min ago", status: "success", duration: "76ms", statusCode: 200 },
      { id: "ev_07", timestamp: "10 min ago", status: "success", duration: "82ms", statusCode: 200 },
      { id: "ev_08", timestamp: "15 min ago", status: "success", duration: "91ms", statusCode: 200 },
      { id: "ev_09", timestamp: "20 min ago", status: "success", duration: "78ms", statusCode: 200 },
      { id: "ev_10", timestamp: "25 min ago", status: "success", duration: "85ms", statusCode: 200 },
    ],
  },
  {
    id: "hook_03",
    name: "Alert Dispatcher",
    endpoint: "https://api.warroom.io/hooks/alerts",
    type: "event",
    status: "failed",
    lastTriggered: "45 min ago",
    successRate: 72.3,
    totalCalls: 3891,
    avgResponseTime: "2340ms",
    createdAt: "2026-02-20",
    description:
      "Dispatches critical alerts to Slack, PagerDuty, and email when system anomalies are detected. Currently experiencing timeouts.",
    secret: "whsec_••••••••••••••••aLrt",
    headers: {
      "Content-Type": "application/json",
      "X-Priority": "high",
    },
    retryPolicy: { maxRetries: 5, backoffMs: 5000 },
    recentEvents: [
      { id: "ev_11", timestamp: "45 min ago", status: "error", duration: "5001ms", statusCode: 504 },
      { id: "ev_12", timestamp: "1h ago", status: "error", duration: "5003ms", statusCode: 504 },
      { id: "ev_13", timestamp: "2h ago", status: "error", duration: "4998ms", statusCode: 504 },
      { id: "ev_14", timestamp: "3h ago", status: "success", duration: "212ms", statusCode: 200 },
      { id: "ev_15", timestamp: "4h ago", status: "success", duration: "198ms", statusCode: 200 },
    ],
  },
  {
    id: "hook_04",
    name: "User Sync",
    endpoint: "https://api.warroom.io/hooks/sync-users",
    type: "api",
    status: "paused",
    lastTriggered: "3 days ago",
    successRate: 95.1,
    totalCalls: 8920,
    avgResponseTime: "312ms",
    createdAt: "2025-12-08",
    description:
      "Synchronizes user data between the internal directory and external identity provider. Paused for maintenance window.",
    secret: "whsec_••••••••••••••••uSyn",
    headers: {
      "Content-Type": "application/json",
      "X-Sync-Version": "v2",
    },
    retryPolicy: { maxRetries: 2, backoffMs: 3000 },
    recentEvents: [
      { id: "ev_16", timestamp: "3 days ago", status: "success", duration: "289ms", statusCode: 200 },
      { id: "ev_17", timestamp: "3 days ago", status: "success", duration: "301ms", statusCode: 200 },
      { id: "ev_18", timestamp: "3 days ago", status: "success", duration: "298ms", statusCode: 200 },
      { id: "ev_19", timestamp: "4 days ago", status: "error", duration: "4102ms", statusCode: 503 },
      { id: "ev_20", timestamp: "4 days ago", status: "success", duration: "315ms", statusCode: 200 },
    ],
  },
  {
    id: "hook_05",
    name: "Log Aggregator",
    endpoint: "https://api.warroom.io/hooks/logs",
    type: "cron",
    status: "active",
    lastTriggered: "1 min ago",
    successRate: 99.7,
    totalCalls: 86400,
    avgResponseTime: "56ms",
    createdAt: "2025-09-22",
    description:
      "Aggregates and forwards application logs to the centralized logging infrastructure every minute. Supports structured JSON logs.",
    secret: "whsec_••••••••••••••••lAgg",
    headers: {
      "Content-Type": "application/json",
      "X-Log-Format": "structured",
    },
    retryPolicy: { maxRetries: 3, backoffMs: 500 },
    recentEvents: [
      { id: "ev_21", timestamp: "1 min ago", status: "success", duration: "48ms", statusCode: 200 },
      { id: "ev_22", timestamp: "2 min ago", status: "success", duration: "52ms", statusCode: 200 },
      { id: "ev_23", timestamp: "3 min ago", status: "success", duration: "61ms", statusCode: 200 },
      { id: "ev_24", timestamp: "4 min ago", status: "success", duration: "44ms", statusCode: 200 },
      { id: "ev_25", timestamp: "5 min ago", status: "success", duration: "55ms", statusCode: 200 },
    ],
  },
  {
    id: "hook_06",
    name: "Backup Trigger",
    endpoint: "https://api.warroom.io/hooks/backup",
    type: "cron",
    status: "active",
    lastTriggered: "6h ago",
    successRate: 100,
    totalCalls: 730,
    avgResponseTime: "1240ms",
    createdAt: "2026-03-01",
    description:
      "Triggers daily incremental backups and weekly full backups of all mission-critical databases and file storage.",
    secret: "whsec_••••••••••••••••bKup",
    headers: {
      "Content-Type": "application/json",
      "X-Backup-Type": "incremental",
    },
    retryPolicy: { maxRetries: 5, backoffMs: 10000 },
    recentEvents: [
      { id: "ev_26", timestamp: "6h ago", status: "success", duration: "1182ms", statusCode: 200 },
      { id: "ev_27", timestamp: "30h ago", status: "success", duration: "1305ms", statusCode: 200 },
      { id: "ev_28", timestamp: "54h ago", status: "success", duration: "1198ms", statusCode: 200 },
    ],
  },
  {
    id: "hook_07",
    name: "Notification Relay",
    endpoint: "https://api.warroom.io/hooks/notify",
    type: "event",
    status: "draft",
    lastTriggered: "Never",
    successRate: 0,
    totalCalls: 0,
    avgResponseTime: "—",
    createdAt: "2026-04-01",
    description:
      "Draft hook for relaying real-time notifications to connected clients via WebSocket. Not yet activated.",
    secret: "whsec_••••••••••••••••nRly",
    headers: {
      "Content-Type": "application/json",
    },
    retryPolicy: { maxRetries: 3, backoffMs: 1000 },
    recentEvents: [],
  },
  {
    id: "hook_08",
    name: "Rover Heartbeat",
    endpoint: "https://api.warroom.io/hooks/heartbeat",
    type: "webhook",
    status: "active",
    lastTriggered: "30s ago",
    successRate: 99.2,
    totalCalls: 259200,
    avgResponseTime: "23ms",
    createdAt: "2025-08-14",
    description:
      "Receives heartbeat signals from all active rovers every 10 seconds. Used for health monitoring and connectivity tracking.",
    secret: "whsec_••••••••••••••••hBt8",
    headers: {
      "Content-Type": "application/json",
      "X-Heartbeat-Interval": "10s",
    },
    retryPolicy: { maxRetries: 1, backoffMs: 500 },
    recentEvents: [
      { id: "ev_29", timestamp: "30s ago", status: "success", duration: "18ms", statusCode: 200 },
      { id: "ev_30", timestamp: "40s ago", status: "success", duration: "22ms", statusCode: 200 },
      { id: "ev_31", timestamp: "50s ago", status: "success", duration: "19ms", statusCode: 200 },
      { id: "ev_32", timestamp: "1 min ago", status: "success", duration: "25ms", statusCode: 200 },
      { id: "ev_33", timestamp: "1 min ago", status: "error", duration: "1002ms", statusCode: 408 },
    ],
  },
];
