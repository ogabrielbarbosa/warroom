import { TrendingUp, MessageSquare, MousePointerClick, Users } from "lucide-react";
import type { AutomationStats } from "../lib/types";

export function AutomationStatsTab({ stats }: { stats: AutomationStats }) {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={TrendingUp}
          label="Disparos"
          value={stats.totalTriggered.toLocaleString("pt-BR")}
          hint="Comentários que ativaram a automação"
        />
        <StatCard
          icon={MessageSquare}
          label="DMs enviadas"
          value={stats.totalDmsSent.toLocaleString("pt-BR")}
          hint={`${formatPct(stats.conversionRate)} de conversão`}
        />
        <StatCard
          icon={MousePointerClick}
          label="Cliques no botão"
          value={stats.totalClicks.toLocaleString("pt-BR")}
          hint={`${formatPct(stats.clickThroughRate)} de CTR`}
        />
        <StatCard
          icon={Users}
          label="Contatos únicos"
          value="—"
          hint="Pessoas distintas que interagiram"
        />
      </div>

      {/* Mini chart */}
      <div className="flex flex-col gap-3 border border-border bg-card p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-mono text-sm font-bold text-foreground">
            Disparos nos últimos 14 dias
          </h3>
          <span className="text-xs text-muted-foreground">
            {stats.recentTriggersByDay.reduce((s, d) => s + d.count, 0)} no total
          </span>
        </div>
        <ChartBars data={stats.recentTriggersByDay} />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2 border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" strokeWidth={1.5} />
        <span className="font-mono text-xs uppercase tracking-wider">{label}</span>
      </div>
      <span className="font-mono text-2xl font-bold text-foreground">{value}</span>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}

function ChartBars({ data }: { data: Array<{ date: string; count: number }> }) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="flex h-32 items-end gap-1">
      {data.map((d) => {
        const heightPct = (d.count / max) * 100;
        const isToday = d.date === new Date().toISOString().slice(0, 10);
        const dateLabel = new Date(d.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        });

        return (
          <div key={d.date} className="group relative flex flex-1 flex-col items-center gap-1">
            <div
              className={`w-full ${
                isToday ? "bg-primary" : "bg-foreground/30"
              } transition-all group-hover:bg-primary`}
              style={{ height: `${heightPct}%`, minHeight: d.count > 0 ? "2px" : "0" }}
            />
            <span className="font-mono text-[10px] text-muted-foreground">
              {dateLabel}
            </span>
            <span className="absolute -top-6 hidden rounded bg-foreground px-1.5 py-0.5 font-mono text-[10px] text-background group-hover:block">
              {d.count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function formatPct(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}
