"use client";

import { useState } from "react";
import {
  ChevronLeft,
  Mic,
  Image as ImageIcon,
  Plus,
  Camera,
  Tag,
  BadgeCheck,
  MessageSquareMore,
} from "lucide-react";
import type { AutomationFormData } from "../lib/types";

export function IPhonePreview({ data }: { data: AutomationFormData }) {
  return (
    <div className="relative w-[320px] overflow-hidden rounded-[44px] border-[10px] border-zinc-900 bg-black shadow-2xl">
      {/* Notch */}
      <div className="absolute left-1/2 top-2 z-20 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />

      {/* Status bar */}
      <div className="flex items-center justify-between bg-black px-6 pt-3 pb-1 font-sans text-[11px] text-white">
        <span className="font-semibold">1:59</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">●●●</span>
          <span className="text-[10px]">📶</span>
          <span className="rounded-sm border border-white/60 px-1 text-[8px] font-semibold">
            44
          </span>
        </div>
      </div>

      <DmPreview data={data} />
    </div>
  );
}

/* ── DM ──────────────────────────────────────────────────── */

function DmPreview({ data }: { data: AutomationFormData }) {
  const [step, setStep] = useState<"welcome" | "final">("welcome");

  return (
    <div className="flex h-[600px] flex-col bg-black text-white">
      {/* Chat header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <ChevronLeft className="size-6" strokeWidth={2.5} />
          <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-xs font-bold">
            👤
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-[15px] font-semibold">Gabriel Barbosa</span>
              <BadgeCheck className="size-3.5 fill-blue-500 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-[11px] text-zinc-400">ogabarbosa</span>
          </div>
        </div>
        <Tag className="size-5" strokeWidth={2} />
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-2">
        {data.welcomeEnabled && (
          <BotMessage>
            <p className="whitespace-pre-wrap">
              {data.welcomeMessage || "(mensagem de boas-vindas)"}
            </p>
            {data.welcomeButtonLabel && (
              <button
                type="button"
                onClick={() => setStep("final")}
                className="mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-center text-[13px] font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                {data.welcomeButtonLabel}
              </button>
            )}
          </BotMessage>
        )}

        {step === "final" && data.welcomeButtonLabel && (
          <UserMessage>{data.welcomeButtonLabel}</UserMessage>
        )}

        {step === "final" && (
          <BotMessage>
            <p className="whitespace-pre-wrap">
              {data.finalMessage || "(mensagem final)"}
            </p>
            {data.finalLinkLabel && (
              <a
                href={data.finalLinkUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-[12px]"
              >
                <p className="truncate text-zinc-400">
                  {data.finalLinkUrl || "link.com"}
                </p>
                <p className="mt-0.5 font-semibold text-white">
                  {data.finalLinkLabel}
                </p>
              </a>
            )}
          </BotMessage>
        )}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
          <Camera className="size-4 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-1 items-center justify-between rounded-full bg-zinc-900 pl-4 pr-2 py-1.5">
          <span className="text-[13px] text-zinc-500">Message...</span>
          <div className="flex items-center gap-2.5">
            <Mic className="size-4 text-white" strokeWidth={2} />
            <ImageIcon className="size-4 text-white" strokeWidth={2} />
            <MessageSquareMore className="size-4 text-white" strokeWidth={2} />
            <div className="flex size-5 items-center justify-center rounded-full border border-white/80">
              <Plus className="size-3" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BotMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-1.5">
      <div className="size-7 shrink-0 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600" />
      <div className="max-w-[78%] rounded-[20px] rounded-bl-md bg-zinc-800 px-3.5 py-2 text-[13px] leading-snug">
        {children}
      </div>
    </div>
  );
}

function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] rounded-[20px] rounded-br-md bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 px-3.5 py-2 text-[13px] font-medium leading-snug text-white">
        {children}
      </div>
    </div>
  );
}
