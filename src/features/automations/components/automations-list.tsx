"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ExternalLink, Plus, Zap } from "lucide-react";
import type { Automation } from "../lib/types";

export function AutomationsList({ automations }: { automations: Automation[] }) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        title="Automações"
        subtitle={`${automations.length} ${automations.length === 1 ? "automação" : "automações"}`}
        filters={
          <Link href="/automations/new">
            <Button>
              <Plus className="size-4" strokeWidth={2} />
              Nova Automação
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-auto p-4 md:p-8">
        {automations.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <Table className="border-0 min-w-[750px]">
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="w-auto">Automação</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[140px]">Reel</TableHead>
                  <TableHead className="w-auto">Palavras-chave</TableHead>
                  <TableHead className="w-[110px]">Disparos</TableHead>
                  <TableHead className="w-[110px]">DMs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {automations.map((automation) => (
                  <AutomationRow key={automation.id} automation={automation} />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

function AutomationRow({ automation }: { automation: Automation }) {
  const router = useRouter();

  function handleRowClick() {
    router.push(`/automations/${automation.id}/edit`);
  }

  const keywordPreview = automation.keywords.length
    ? automation.keywords.slice(0, 3).join(", ")
    : "qualquer palavra";

  return (
    <TableRow
      onClick={handleRowClick}
      className="cursor-pointer border-b border-border border-l-[3px] border-l-transparent transition-colors hover:bg-card/50"
    >
      <TableCell className="h-auto py-3">
        <span className="line-clamp-1 text-sm font-medium text-foreground">
          {automation.name}
        </span>
      </TableCell>

      <TableCell className="h-auto py-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span
            className={cn(
              "size-2 rounded-full",
              automation.isActive ? "bg-emerald-500" : "bg-zinc-500",
            )}
          />
          {automation.isActive ? "Ativa" : "Pausada"}
        </span>
      </TableCell>

      <TableCell className="h-auto py-3">
        {automation.mediaUrl ? (
          <a
            href={automation.mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver Reel
            <ExternalLink className="size-3.5" strokeWidth={1.5} />
          </a>
        ) : (
          <span className="font-mono text-xs text-muted-foreground">—</span>
        )}
      </TableCell>

      <TableCell className="h-auto py-3">
        <span className="line-clamp-1 text-sm text-muted-foreground">
          {keywordPreview}
        </span>
      </TableCell>

      <TableCell className="h-auto py-3 text-sm text-foreground">
        {automation.totalTriggered}
      </TableCell>

      <TableCell className="h-auto py-3 text-sm text-foreground">
        {automation.totalDmsSent}
      </TableCell>
    </TableRow>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
        <Zap className="size-8 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-mono text-lg font-bold text-foreground">
          Nenhuma automação ainda
        </h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Crie sua primeira automação para responder automaticamente quem comenta nos seus Reels com uma palavra-chave.
        </p>
      </div>
      <Link href="/automations/new">
        <Button>
          <Plus className="size-4" strokeWidth={2} />
          Criar primeira automação
        </Button>
      </Link>
    </div>
  );
}
