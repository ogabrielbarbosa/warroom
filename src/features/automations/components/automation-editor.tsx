"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  AlertCircle,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  ListChecks,
  Pause,
  Play,
  Settings2,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Radio } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { ReelPicker } from "./reel-picker";
import { IPhonePreview } from "./iphone-preview";
import { AutomationStatsTab } from "./automation-stats-tab";
import { AutomationLogsTab } from "./automation-logs-tab";
import { AutomationContactsTab } from "./automation-contacts-tab";
import {
  createAutomation,
  updateAutomation,
  deleteAutomation,
  toggleAutomationActive,
} from "../actions/automations";
import {
  DEFAULT_AUTOMATION,
  type AutomationContact,
  type AutomationFormData,
  type AutomationLog,
  type AutomationStats,
  type InstagramMedia,
} from "../lib/types";

type EditorTab = "config" | "analytics" | "logs" | "contacts";

type ConfigStep = 1 | 2 | 3;

const STEPS: { id: ConfigStep; label: string; title: string }[] = [
  { id: 1, label: "Reel", title: "Quando alguém comentar em" },
  { id: 2, label: "Comentário", title: "E esse comentário possui" },
  { id: 3, label: "Link final", title: "E então, eles vão receber" },
];

interface AutomationEditorProps {
  automationId?: string;
  initialData?: AutomationFormData;
  initialActive?: boolean;
  reels: InstagramMedia[];
  stats?: AutomationStats;
  logs?: AutomationLog[];
  contacts?: AutomationContact[];
}

export function AutomationEditor({
  automationId,
  initialData,
  initialActive = false,
  reels,
  stats,
  logs = [],
  contacts = [],
}: AutomationEditorProps) {
  const [data, setData] = useState<AutomationFormData>(
    initialData ?? DEFAULT_AUTOMATION,
  );
  const [isActive, setIsActive] = useState(initialActive);
  const [isSaving, startSaving] = useTransition();
  const [tab, setTab] = useState<EditorTab>("config");
  const [step, setStep] = useState<ConfigStep>(1);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isEditing = Boolean(automationId);

  function update<K extends keyof AutomationFormData>(
    key: K,
    value: AutomationFormData[K],
  ) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleReelSelect(reel: InstagramMedia | null) {
    if (!reel) {
      update("contentId", null);
      update("igMediaId", null);
      update("mediaUrl", null);
      update("mediaThumbnailUrl", null);
      return;
    }
    setData((prev) => ({
      ...prev,
      contentId: reel.id,
      igMediaId: reel.id,
      mediaUrl: reel.url,
      mediaThumbnailUrl: reel.thumbnailUrl,
    }));
  }

  function handleSave(activate: boolean) {
    setError(null);
    startSaving(async () => {
      try {
        if (isEditing && automationId) {
          await updateAutomation(automationId, data, activate);
          setIsActive(activate);
        } else {
          await createAutomation(data, activate);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro ao salvar automação.";
        // Next.js redirects throw a NEXT_REDIRECT error — não mostrar como erro real
        if (message.includes("NEXT_REDIRECT")) return;
        setError(message);
      }
    });
  }

  function handleToggleActive(checked: boolean) {
    if (!automationId) return;
    setError(null);
    setIsActive(checked);
    startSaving(async () => {
      try {
        await toggleAutomationActive(automationId, checked);
      } catch (err) {
        setIsActive(!checked);
        const message =
          err instanceof Error ? err.message : "Erro ao atualizar.";
        setError(message);
      }
    });
  }

  function handleDelete() {
    if (!automationId) return;
    setShowDeleteDialog(false);
    startSaving(async () => {
      try {
        await deleteAutomation(automationId);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro ao excluir.";
        if (message.includes("NEXT_REDIRECT")) return;
        setError(message);
      }
    });
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/automations"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </Link>
          <div className="flex flex-col">
            <input
              type="text"
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Nome da automação"
              className="border-none bg-transparent p-0 font-mono text-base font-bold text-foreground outline-none focus-visible:ring-0"
            />
            <span className="text-xs text-muted-foreground">
              {isActive ? "Ativa" : "Rascunho"}
              {isEditing && data.contentId && (
                <> · vinculada a um Reel</>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isSaving}
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              aria-label="Excluir"
            >
              <Trash2 className="size-4" strokeWidth={2} />
            </button>
          )}
          {isEditing ? (
            <Button
              variant="outline"
              onClick={() => handleSave(isActive)}
              disabled={isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          ) : (
            <Button onClick={() => handleSave(true)} disabled={isSaving}>
              Ativar
            </Button>
          )}
        </div>
      </div>

      {/* Tabs (only when editing) */}
      {isEditing && (
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 md:px-8">
          <div className="flex gap-4 overflow-x-auto">
            <TabButton active={tab === "config"} onClick={() => setTab("config")} icon={Settings2}>
              Configuração
            </TabButton>
            <TabButton active={tab === "analytics"} onClick={() => setTab("analytics")} icon={BarChart3}>
              Analytics
            </TabButton>
            <TabButton active={tab === "logs"} onClick={() => setTab("logs")} icon={ListChecks}>
              Logs {logs.length > 0 && <span className="ml-1 text-muted-foreground">({logs.length})</span>}
            </TabButton>
            <TabButton active={tab === "contacts"} onClick={() => setTab("contacts")} icon={Users}>
              Contatos {contacts.length > 0 && <span className="ml-1 text-muted-foreground">({contacts.length})</span>}
            </TabButton>
          </div>
          <Button
            variant={isActive ? "outline" : "default"}
            size="sm"
            onClick={() => handleToggleActive(!isActive)}
            disabled={isSaving}
          >
            {isActive ? (
              <>
                <Pause className="size-3.5" strokeWidth={2} />
                Desativar
              </>
            ) : (
              <>
                <Play className="size-3.5" strokeWidth={2} />
                Ativar
              </>
            )}
          </Button>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="flex shrink-0 items-center gap-3 border-b border-destructive/30 bg-destructive/10 px-4 py-3 md:px-8">
          <AlertCircle className="size-4 shrink-0 text-destructive" strokeWidth={2} />
          <p className="flex-1 text-sm text-destructive">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-destructive hover:opacity-70"
            aria-label="Fechar"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </div>
      )}

      {/* Tab content */}
      {tab === "analytics" && stats && (
        <div className="flex-1 overflow-y-auto">
          <AutomationStatsTab stats={stats} />
        </div>
      )}
      {tab === "logs" && (
        <div className="flex-1 overflow-y-auto">
          <AutomationLogsTab logs={logs} />
        </div>
      )}
      {tab === "contacts" && (
        <div className="flex-1 overflow-y-auto">
          <AutomationContactsTab contacts={contacts} />
        </div>
      )}

      {/* Body: 2 columns (config tab) */}
      {tab === "config" && (
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Form column */}
        <div className="flex flex-col overflow-hidden border-b border-border lg:w-[480px] lg:shrink-0 lg:border-b-0 lg:border-r">
          <StepIndicator current={step} onSelect={setStep} />

          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <Section title={STEPS[step - 1].title}>
              {step === 1 && (
                <ReelPicker
                  reels={reels}
                  selectedId={data.contentId}
                  onSelect={handleReelSelect}
                />
              )}

              {step === 2 && (
                <div className="flex flex-col gap-3">
                  <Radio
                    name="match_type"
                    value="specific_keyword"
                    checked={data.commentMatchType === "specific_keyword"}
                    onChange={() => update("commentMatchType", "specific_keyword")}
                    label="uma palavra ou expressão específica"
                  />
                  {data.commentMatchType === "specific_keyword" && (
                    <div className="ml-6 flex flex-col gap-2">
                      <KeywordInput
                        keywords={data.keywords}
                        onChange={(kws) => update("keywords", kws)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Use vírgulas para separar as palavras
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Por exemplo:</span>
                        {["Preço", "Link", "Comprar"].map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => {
                              if (!data.keywords.includes(suggestion)) {
                                update("keywords", [...data.keywords, suggestion]);
                              }
                            }}
                            className="rounded-full border border-border px-2.5 py-0.5 transition-colors hover:bg-secondary"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <Radio
                    name="match_type"
                    value="any_word"
                    checked={data.commentMatchType === "any_word"}
                    onChange={() => update("commentMatchType", "any_word")}
                    label="qualquer palavra"
                  />
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="text-sm text-foreground">
                      interagir com os comentários deles na publicação
                    </span>
                    <Switch
                      checked={data.replyToComments}
                      onChange={(e) => update("replyToComments", e.target.checked)}
                    />
                  </div>
                  {data.replyToComments && (
                    <PublicReplyEditor
                      variants={data.publicReplyVariants}
                      onChange={(v) => update("publicReplyVariants", v)}
                    />
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-foreground">
                    uma DM contendo um link
                  </p>
                  <div className="flex flex-col gap-2 border border-border p-3">
                    <Textarea
                      value={data.finalMessage}
                      onChange={(e) => update("finalMessage", e.target.value)}
                      placeholder="Mensagem final..."
                      rows={3}
                    />
                    <Input
                      value={data.finalLinkLabel}
                      onChange={(e) => update("finalLinkLabel", e.target.value)}
                      placeholder="Texto do link (ex: é o link)"
                    />
                    <Input
                      value={data.finalLinkUrl}
                      onChange={(e) => update("finalLinkUrl", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              )}
            </Section>
          </div>

          {/* Step navigation */}
          <div className="flex shrink-0 items-center justify-between gap-2 border-t border-border px-6 py-3 lg:px-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as ConfigStep) : s))}
              disabled={step === 1}
            >
              <ChevronLeft className="size-4" strokeWidth={2} />
              Voltar
            </Button>
            <span className="font-mono text-xs text-muted-foreground">
              Passo {step} de {STEPS.length}
            </span>
            {step < STEPS.length ? (
              <Button
                size="sm"
                onClick={() => setStep((s) => ((s + 1) as ConfigStep))}
              >
                Próximo
                <ChevronRight className="size-4" strokeWidth={2} />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleSave(isEditing ? isActive : true)}
                disabled={isSaving}
              >
                <Check className="size-4" strokeWidth={2} />
                {isSaving ? "Salvando..." : isEditing ? "Salvar" : "Ativar"}
              </Button>
            )}
          </div>
        </div>

        {/* Preview column */}
        <div className="flex flex-1 items-start justify-center overflow-y-auto bg-secondary/30 p-6 md:p-8">
          <div className="flex flex-col items-center gap-4">
            <IPhonePreview data={data} />
          </div>
        </div>
      </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogHeader>
          <DialogTitle>Excluir automação</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. A automação{" "}
            <span className="font-mono font-bold text-foreground">{data.name}</span>{" "}
            será permanentemente removida, junto com todos os logs.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowDeleteDialog(false)}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isSaving}
          >
            <Trash2 className="size-4" strokeWidth={2} />
            Excluir
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 py-3 text-sm font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="size-4" strokeWidth={1.5} />
      {children}
      {active && (
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground" />
      )}
    </button>
  );
}

/* ── Helpers ─────────────────────────────────────────────── */

function StepIndicator({
  current,
  onSelect,
}: {
  current: ConfigStep;
  onSelect: (step: ConfigStep) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-border px-6 py-4 lg:px-8">
      {STEPS.map((s, i) => {
        const isActive = s.id === current;
        const isComplete = s.id < current;
        return (
          <div key={s.id} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(s.id)}
              className="flex flex-1 items-center gap-2 text-left"
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold transition-colors",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : isComplete
                      ? "border-foreground/40 bg-foreground/10 text-foreground"
                      : "border-border bg-background text-muted-foreground",
                )}
              >
                {isComplete ? <Check className="size-3" strokeWidth={2.5} /> : s.id}
              </span>
              <span
                className={cn(
                  "hidden truncate font-mono text-xs font-medium md:block",
                  isActive
                    ? "text-foreground"
                    : isComplete
                      ? "text-foreground/70"
                      : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1 transition-colors",
                  isComplete ? "bg-foreground/40" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-mono text-base font-bold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function KeywordInput({
  keywords,
  onChange,
}: {
  keywords: string[];
  onChange: (kws: string[]) => void;
}) {
  const [input, setInput] = useState("");

  function commit() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newKeywords = trimmed
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean)
      .filter((k) => !keywords.includes(k));
    if (newKeywords.length === 0) return;
    onChange([...keywords, ...newKeywords]);
    setInput("");
  }

  function remove(kw: string) {
    onChange(keywords.filter((k) => k !== kw));
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border border-border bg-background px-2 py-1.5 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50">
      {keywords.map((kw) => (
        <span
          key={kw}
          className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-1 font-mono text-xs text-foreground"
        >
          {kw}
          <button
            type="button"
            onClick={() => remove(kw)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-3" strokeWidth={2} />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commit();
          } else if (e.key === "Backspace" && !input && keywords.length) {
            remove(keywords[keywords.length - 1]);
          }
        }}
        onBlur={commit}
        placeholder={keywords.length === 0 ? "Digite e pressione Enter" : ""}
        className="flex-1 min-w-[80px] border-none bg-transparent py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

function PublicReplyEditor({
  variants,
  onChange,
}: {
  variants: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="ml-0 flex flex-col gap-2 border border-border p-3">
      <p className="text-xs font-medium text-muted-foreground">
        Respostas públicas (rotacionadas aleatoriamente)
      </p>
      {variants.map((variant, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={variant}
            onChange={(e) => {
              const next = [...variants];
              next[i] = e.target.value;
              onChange(next);
            }}
            placeholder="Acabei de te chamar na DM 📩"
          />
          <button
            type="button"
            onClick={() => onChange(variants.filter((_, idx) => idx !== i))}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...variants, ""])}
        className={cn(
          "self-start text-xs font-medium text-primary hover:underline",
        )}
      >
        + Adicionar variação
      </button>
    </div>
  );
}
