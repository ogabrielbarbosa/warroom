"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  MOCK_ACCOUNTS,
  PLATFORM_STYLES,
  STATUS_STYLES,
  type Account,
} from "../lib/mock-data";
import { AccountDetailPanel } from "./account-detail-panel";

/* ── Platform Badge ──────────────────────────────────────── */

function PlatformBadge({ platform }: { platform: Account["platform"] }) {
  const style = PLATFORM_STYLES[platform];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1.5 font-mono text-sm",
        style.bg,
        style.text
      )}
    >
      {platform}
    </span>
  );
}

/* ── Status Badge ────────────────────────────────────────── */

function StatusBadge({ status }: { status: Account["status"] }) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1.5 font-mono text-xs",
        style.bg,
        style.text
      )}
    >
      {status}
    </span>
  );
}

/* ── Filter Select (visual only) ─────────────────────────── */

function FilterSelect({ label }: { label: string }) {
  return (
    <button className="flex h-10 items-center justify-between gap-2 rounded-full border border-border bg-background px-4 text-sm text-muted-foreground transition-colors hover:border-muted-foreground/50">
      <span>{label}</span>
      <ChevronDown className="size-4 opacity-50" />
    </button>
  );
}

/* ── Search Input ────────────────────────────────────────── */

function SearchInput() {
  return (
    <div className="flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4">
      <Search className="size-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search accounts"
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

/* ── Avatar ──────────────────────────────────────────────── */

function Avatar({ username }: { username: string }) {
  const hue = (username.length * 23) % 360;
  return (
    <div
      className="size-10 shrink-0 rounded-full"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 40%, 25%), hsl(${hue + 40}, 50%, 18%))`,
      }}
    />
  );
}

/* ── Main Content ────────────────────────────────────────── */

export function AccountsContent() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  function handleRowClick(account: Account) {
    setSelectedAccount((prev) =>
      prev?.id === account.id ? null : account
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        title="Accounts"
        subtitle={`${MOCK_ACCOUNTS.length} accounts across 3 platforms`}
        filters={
          <>
            <FilterSelect label="Platform" />
            <FilterSelect label="Status" />
            <FilterSelect label="Niche" />
            <FilterSelect label="Sort by: Followers" />
            <div className="w-[212px]">
              <SearchInput />
            </div>
          </>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        <Table className="border-0">
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="w-auto">Account</TableHead>
              <TableHead className="w-[130px]">Platform</TableHead>
              <TableHead className="w-[110px]">Followers</TableHead>
              <TableHead className="w-[120px]">Engagement</TableHead>
              <TableHead className="w-[130px]">Status</TableHead>
              <TableHead className="w-[100px]">Last Sync</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ACCOUNTS.map((account) => {
              const isSelected = selectedAccount?.id === account.id;
              return (
                <TableRow
                  key={account.id}
                  onClick={() => handleRowClick(account)}
                  className={cn(
                    "cursor-pointer border-b border-border border-l-[3px] transition-colors",
                    isSelected
                      ? "border-l-primary bg-card"
                      : "border-l-transparent hover:bg-card/50"
                  )}
                >
                  {/* Account Cell */}
                  <TableCell className="h-auto py-3">
                    <div className="flex items-center gap-3">
                      <Avatar username={account.username} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground line-clamp-1">
                          {account.displayName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {account.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Platform Cell */}
                  <TableCell className="h-auto py-3">
                    <PlatformBadge platform={account.platform} />
                  </TableCell>

                  {/* Followers Cell */}
                  <TableCell className="h-auto py-3 text-sm text-foreground">
                    {account.followersFormatted}
                  </TableCell>

                  {/* Engagement Cell */}
                  <TableCell className="h-auto py-3 text-sm text-foreground">
                    {account.engagement}%
                  </TableCell>

                  {/* Status Cell */}
                  <TableCell className="h-auto py-3">
                    <StatusBadge status={account.status} />
                  </TableCell>

                  {/* Last Sync Cell */}
                  <TableCell className="h-auto py-3 text-sm text-muted-foreground">
                    {account.lastSync}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Slide Over Panel -- outside content padding */}
      <AccountDetailPanel
        account={selectedAccount}
        onClose={() => setSelectedAccount(null)}
      />
    </div>
  );
}
