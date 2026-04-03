"use client";

import { cn } from "@/lib/utils";
import { X, ExternalLink } from "lucide-react";
import {
  type Account,
  PLATFORM_STYLES,
  STATUS_STYLES,
} from "../lib/mock-data";

interface AccountDetailPanelProps {
  account: Account | null;
  onClose: () => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] font-semibold tracking-[1px] text-muted-foreground uppercase">
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px w-full bg-border" />;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#2E2E2E] px-2 py-2 font-mono text-xs text-foreground">
      {children}
    </span>
  );
}

function StatCard({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-[#2E2E2E] p-4">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-mono text-2xl font-bold text-foreground",
          valueClassName
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function AccountDetailPanel({
  account,
  onClose,
}: AccountDetailPanelProps) {
  const platformStyle = account ? PLATFORM_STYLES[account.platform] : null;
  const statusStyle = account ? STATUS_STYLES[account.status] : null;

  return (
    <>
      {/* Backdrop */}
      {account && (
        <div
          className="fixed inset-0 z-40 bg-black/20 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[480px] flex-col",
          "border-l border-border bg-card",
          "transform transition-transform duration-300 ease-in-out",
          account ? "translate-x-0" : "translate-x-full"
        )}
      >
        {account && (
          <>
            {/* Header */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
              <div className="flex items-center gap-3">
                <h2 className="font-mono text-lg font-semibold text-foreground">
                  Account Details
                </h2>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-2 font-mono text-sm",
                    platformStyle?.bg,
                    platformStyle?.text
                  )}
                >
                  {account.platform}
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted/50"
              >
                <X className="size-5 text-foreground" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-6 p-6">
                {/* Profile */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Profile</SectionLabel>
                  <div className="flex items-center gap-4">
                    <div
                      className="size-14 shrink-0 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, hsl(${account.username.length * 23 % 360}, 40%, 25%), hsl(${(account.username.length * 23 + 40) % 360}, 50%, 18%))`,
                      }}
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-lg font-bold text-foreground">
                        {account.displayName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {account.username}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-[1.6] text-foreground">
                    {account.bio}
                  </p>
                </section>

                <Divider />

                {/* Platform & Niche */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Platform &amp; Niche</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    <Pill>{account.platform}</Pill>
                    <Pill>{account.niche}</Pill>
                  </div>
                </section>

                <Divider />

                {/* Audience Stats */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Audience</SectionLabel>
                  <div className="flex gap-4">
                    <StatCard
                      label="Followers"
                      value={account.followers.toLocaleString("en-US")}
                    />
                    <StatCard
                      label="Avg Views"
                      value={account.avgViewsFormatted}
                      valueClassName="text-primary"
                    />
                  </div>
                </section>

                <Divider />

                {/* Engagement Stats */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Engagement</SectionLabel>
                  <div className="flex gap-4">
                    <StatCard
                      label="Engagement Rate"
                      value={`${account.engagement}%`}
                      valueClassName="text-primary"
                    />
                    <StatCard
                      label="Total Posts"
                      value={account.postsCount.toLocaleString("en-US")}
                    />
                  </div>
                </section>

                <Divider />

                {/* Status & Sync */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Status</SectionLabel>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-1.5 font-mono text-xs",
                        statusStyle?.bg,
                        statusStyle?.text
                      )}
                    >
                      {account.status}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Last sync: {account.lastSync}
                    </span>
                  </div>
                </section>

                <Divider />

                {/* Profile Link */}
                <section className="flex flex-col gap-3">
                  <SectionLabel>Profile Link</SectionLabel>
                  <a
                    href={account.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-[#2E2E2E] px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-[#3a3a3a]"
                  >
                    <ExternalLink className="size-4" />
                    {account.platform}
                  </a>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
