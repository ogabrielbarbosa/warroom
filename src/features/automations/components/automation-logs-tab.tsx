"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, MessageSquare, Send, XCircle } from "lucide-react";
import type { AutomationLog, AutomationLogStatus } from "../lib/types";

const STATUS_FILTERS: Array<{ value: "all" | AutomationLogStatus; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "triggered", label: "Disparados" },
  { value: "public_replied", label: "Respondidos" },
  { value: "dm_sent", label: "DM enviada" },
  { value: "completed", label: "Completos" },
  { value: "failed", label: "Falhas" },
];

export function AutomationLogsTab({ logs }: { logs: AutomationLog[] }) {
  const [filter, setFilter] = useState<"all" | AutomationLogStatus>("all");

  const filtered = filter === "all" ? logs : logs.filter((l) => l.status === filter);

  return (
    <div className="flex flex-col gap-4 p-6 md:p-8">
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors",
              filter === f.value
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:bg-secondary",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col divide-y divide-border border border-border">
          {filtered.map((log) => (
            <LogRow key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
}

function LogRow({ log }: { log: AutomationLog }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <StatusIcon status={log.status} />
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <div className="flex items-center gap-2">
          {log.contactUsername && (
            <span className="font-mono text-sm font-medium text-foreground">
              @{log.contactUsername}
            </span>
          )}
          <StatusLabel status={log.status} />
        </div>
        {log.commentText && (
          <p className="line-clamp-1 text-sm text-muted-foreground">
            “{log.commentText}”
          </p>
        )}
        {log.errorMessage && (
          <p className="text-xs text-destructive">{log.errorMessage}</p>
        )}
      </div>
      <span className="shrink-0 font-mono text-xs text-muted-foreground">
        {formatRelative(log.executedAt)}
      </span>
    </div>
  );
}

function StatusIcon({ status }: { status: AutomationLogStatus }) {
  const iconClass = "size-4 shrink-0 mt-0.5";
  switch (status) {
    case "completed":
      return <CheckCircle2 className={cn(iconClass, "text-emerald-500")} strokeWidth={2} />;
    case "dm_sent":
      return <Send className={cn(iconClass, "text-blue-500")} strokeWidth={2} />;
    case "public_replied":
      return <MessageSquare className={cn(iconClass, "text-violet-500")} strokeWidth={2} />;
    case "failed":
      return <XCircle className={cn(iconClass, "text-destructive")} strokeWidth={2} />;
    default:
      return <Clock className={cn(iconClass, "text-muted-foreground")} strokeWidth={2} />;
  }
}

function StatusLabel({ status }: { status: AutomationLogStatus }) {
  const map: Record<AutomationLogStatus, string> = {
    triggered: "Disparado",
    public_replied: "Respondido publicamente",
    dm_sent: "DM enviada",
    completed: "Completo",
    failed: "Falhou",
  };
  return (
    <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
      {map[status]}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-border py-16 text-center">
      <Clock className="size-8 text-muted-foreground" strokeWidth={1.5} />
      <p className="font-mono text-sm font-bold text-foreground">
        Nenhuma execução ainda
      </p>
      <p className="max-w-md text-sm text-muted-foreground">
        Os logs aparecem aqui quando alguém comentar a palavra-chave configurada.
      </p>
    </div>
  );
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d`;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}
