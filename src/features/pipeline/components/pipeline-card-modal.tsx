"use client";

import { useState, useTransition, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, ExternalLink, Play, Save, Loader2, Trash2, AlertTriangle } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import type { PipelineCard, PipelineStatus } from "../lib/mock-data";
import { STATUS_COLORS, STATUS_BG } from "../lib/mock-data";
import { createPipelineCardFromData, updatePipelineCard, deletePipelineCard } from "../actions/pipeline";

const STATUSES: PipelineStatus[] = ["Idea", "Scripted", "Prep Materials", "Filming", "Editing", "Prep for Post", "Scheduled", "Posted"];
const FORMATS = ["Self", "Split Screen", "B-Roll + Words", "Screen Share", "Talking Head"];

interface PipelineCardModalProps {
  card: PipelineCard | null;
  isNew?: boolean;
  onClose: () => void;
}

/* ── Section Label ──────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

/* ── Field Input ──────────────────────────────────────────── */

function FieldInput({
  label,
  value,
  onChange,
  multiline,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  const cls =
    "w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary";
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs font-medium text-muted-foreground">
        {label}
      </span>
      {multiline ? (
        <textarea
          rows={3}
          className={cn(cls, "resize-none")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          className={cls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

/* ── Field Row (view mode) ──────────────────────────────── */

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

/* ── Detail Row ─────────────────────────────────────────── */

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

/* ── Select Field ─────────────────────────────────────────── */

function SelectField({
  label,
  value,
  options,
  onChange,
  colorMap,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  colorMap?: Record<string, string>;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-[13px] text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        style={colorMap ? { color: colorMap[value] } : undefined}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PipelineCardModal({ card, isNew, onClose }: PipelineCardModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();

  // Form state
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [contentAngle, setContentAngle] = useState("");
  const [hookText, setHookText] = useState("");
  const [material, setMaterial] = useState("");
  const [format, setFormat] = useState("");
  const [onScreenText, setOnScreenText] = useState("");
  const [recordingInstructions, setRecordingInstructions] = useState("");
  const [script, setScript] = useState("");
  const [status, setStatus] = useState<PipelineStatus>("Idea");

  // Reset form when card changes
  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setTopic(card.topic);
      setContentAngle(card.contentAngle);
      setHookText(card.hookText);
      setMaterial(card.material);
      setFormat(card.format);
      setOnScreenText(card.onScreenText);
      setRecordingInstructions(card.recordingInstructions);
      setScript(card.script);
      setStatus(card.status);
      setIsEditing(!!isNew);
    }
  }, [card, isNew]);

  if (!card) return null;

  const statusColor = STATUS_COLORS[status];
  const statusBg = STATUS_BG[status];

  function handleCancel() {
    if (isNew) {
      onClose();
      return;
    }
    // Reset to original values
    setTitle(card!.title);
    setTopic(card!.topic);
    setContentAngle(card!.contentAngle);
    setHookText(card!.hookText);
    setMaterial(card!.material);
    setFormat(card!.format);
    setOnScreenText(card!.onScreenText);
    setRecordingInstructions(card!.recordingInstructions);
    setScript(card!.script);
    setStatus(card!.status);
    setIsEditing(false);
  }

  function handleSave() {
    startTransition(async () => {
      if (isNew) {
        await createPipelineCardFromData({
          title: title || "Untitled",
          topic,
          hook: hookText,
          status,
          format,
          contentAngle,
          script,
          material,
          onScreenText,
          recordingInstructions,
        });
      } else {
        await updatePipelineCard(card!.id, {
          title,
          topic,
          hook: hookText,
          status,
          format,
          contentAngle,
          script,
          material,
          onScreenText,
          recordingInstructions,
        });
      }
      setIsEditing(false);
      onClose();
    });
  }

  function handleDelete() {
    startDeleteTransition(async () => {
      await deletePipelineCard(card!.id);
      setShowDeleteConfirm(false);
      onClose();
    });
  }

  return (
    <Dialog open={!!card} onClose={onClose} className="mx-4 max-w-[860px] rounded-2xl sm:mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-xs font-semibold",
              statusBg
            )}
            style={{ color: statusColor }}
          >
            {status}
          </span>
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card title…"
              className="bg-transparent font-mono text-lg font-bold text-foreground placeholder:text-muted-foreground/50 focus:outline-none border-b border-dashed border-muted-foreground/30 focus:border-primary"
              autoFocus
            />
          ) : (
            <h2 className="font-mono text-lg font-bold text-foreground">
              {title}
            </h2>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="rounded-full border border-border px-4 py-2 font-mono text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                {isNew ? "Create" : "Save"}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-full border border-border px-4 py-2 font-mono text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Edit
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex max-h-[70vh] flex-col overflow-y-auto sm:max-h-[576px] sm:flex-row sm:overflow-hidden">
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-7 sm:overflow-y-auto sm:border-r border-border p-4 sm:p-6">
          {/* Content Brief */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Content Brief</SectionLabel>
            <div className="flex flex-col gap-4">
              {isEditing ? (
                <>
                  <FieldInput label="Topic" value={topic} onChange={setTopic} placeholder="e.g. AI Tools, Terminal, Docker…" />
                  <FieldInput label="Content Angle" value={contentAngle} onChange={setContentAngle} placeholder="What angle will you take?" multiline />
                  <FieldInput label="Hook" value={hookText} onChange={setHookText} placeholder="Opening hook line…" />
                  <FieldInput label="Material & Research" value={material} onChange={setMaterial} placeholder="Resources, data, links…" multiline />
                </>
              ) : (
                <>
                  <FieldRow label="Topic">{topic || <span className="text-muted-foreground/50 italic">—</span>}</FieldRow>
                  <FieldRow label="Content Angle">{contentAngle || <span className="text-muted-foreground/50 italic">—</span>}</FieldRow>
                  <FieldRow label="Hook">
                    {hookText ? (
                      <div className="rounded-lg bg-secondary p-3 font-mono text-sm text-foreground">
                        {hookText}
                      </div>
                    ) : (
                      <span className="text-muted-foreground/50 italic">—</span>
                    )}
                  </FieldRow>
                  {material && (
                    <FieldRow label="Material & Research">
                      {material}
                    </FieldRow>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Production */}
          {isEditing ? (
            <div className="flex flex-col gap-3">
              <SectionLabel>Production</SectionLabel>
              <div className="flex flex-col gap-4">
                <FieldInput label="On Screen Text" value={onScreenText} onChange={setOnScreenText} placeholder="Text overlays…" multiline />
                <FieldInput label="Recording Instructions" value={recordingInstructions} onChange={setRecordingInstructions} placeholder="Camera setup, framing, energy notes…" multiline />
              </div>
            </div>
          ) : (
            (onScreenText || recordingInstructions) && (
              <div className="flex flex-col gap-3">
                <SectionLabel>Production</SectionLabel>
                <div className="flex flex-col gap-4">
                  <FieldRow label="Visual Format">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px]",
                        "bg-secondary text-muted-foreground"
                      )}
                    >
                      {format}
                    </span>
                  </FieldRow>
                  {onScreenText && (
                    <FieldRow label="On Screen Text">
                      {onScreenText}
                    </FieldRow>
                  )}
                  {recordingInstructions && (
                    <FieldRow label="Recording Instructions">
                      <p className="text-sm text-muted-foreground">
                        {recordingInstructions}
                      </p>
                    </FieldRow>
                  )}
                </div>
              </div>
            )
          )}

          {/* Script */}
          {isEditing ? (
            <div className="flex flex-col gap-3">
              <SectionLabel>Script</SectionLabel>
              <textarea
                rows={6}
                className="w-full resize-none rounded-lg border border-border bg-background p-3 font-mono text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Write your script here…"
              />
            </div>
          ) : (
            script && (
              <div className="flex flex-col gap-3">
                <SectionLabel>Script</SectionLabel>
                <div className="max-h-[180px] overflow-y-auto rounded-lg border border-border bg-background p-3">
                  <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-foreground">
                    {script}
                  </pre>
                </div>
              </div>
            )
          )}
        </div>

        {/* Right Column */}
        <div className="flex w-full shrink-0 flex-col gap-7 border-t border-border sm:w-[340px] sm:border-t-0 sm:overflow-y-auto p-4 sm:p-6">
          {/* Details */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Details</SectionLabel>
            <div className="flex flex-col gap-3">
              {isEditing ? (
                <>
                  <SelectField
                    label="Status"
                    value={status}
                    options={STATUSES}
                    onChange={(v) => setStatus(v as PipelineStatus)}
                    colorMap={STATUS_COLORS}
                  />
                  <SelectField
                    label="Visual Format"
                    value={format}
                    options={FORMATS}
                    onChange={setFormat}
                  />
                </>
              ) : (
                <>
                  <DetailRow label="Status">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-mono text-[13px]"
                      )}
                    >
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: statusColor }}
                      />
                      <span className="text-foreground">{status}</span>
                    </span>
                  </DetailRow>
                  <DetailRow label="Visual Format">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-mono text-[13px] text-foreground">
                      {format || "—"}
                    </span>
                  </DetailRow>
                </>
              )}
              {!isNew && (
                <DetailRow label="Created At">
                  <span className="font-mono text-[13px] text-foreground">
                    {card.date}, 2026
                  </span>
                </DetailRow>
              )}
            </div>
          </div>

          {/* Reference Video */}
          {!isEditing && card.referenceVideo && (
            <div className="flex flex-col gap-3">
              <SectionLabel>Reference Video</SectionLabel>
              <div className="flex items-center gap-2.5 rounded-lg border border-border bg-background p-2.5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-secondary">
                  <Play className="size-5 text-muted-foreground" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-[13px] text-foreground">
                    {card.referenceVideo.hook}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {card.referenceVideo.creator} &middot;{" "}
                    {card.referenceVideo.views}
                  </span>
                </div>
                <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
              </div>
            </div>
          )}

          {/* Delete — pinned to bottom */}
          {!isNew && (
            <div className="mt-auto pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 font-mono text-sm font-medium text-red-400 transition-colors hover:border-red-500/40 hover:bg-red-500/10"
              >
                <Trash2 className="size-4" />
                Delete card
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} className="mx-4 max-w-[400px] rounded-2xl sm:mx-auto">
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="size-6 text-red-400" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-mono text-base font-bold text-foreground">
              Delete card?
            </h3>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">&quot;{card.title || "Untitled"}&quot;</span> will be permanently deleted. This action cannot be undone.
            </p>
          </div>
          <div className="flex w-full gap-3">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 font-mono text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 font-mono text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </Dialog>
  );
}
