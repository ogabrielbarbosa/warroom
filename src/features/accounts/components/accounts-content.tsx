"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Search } from "lucide-react";
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
  PLATFORM_STYLES,
  STATUS_STYLES,
  type Account,
  type Platform,
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

/* ── Dropdown Select ─────────────────────────────────────── */

function DropdownSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeOption = options.find((o) => o.value === value);
  const buttonText = activeOption
    ? `${label}: ${activeOption.label}`
    : label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center justify-between gap-2 rounded-full border border-border bg-background px-4 text-sm text-muted-foreground transition-colors hover:border-muted-foreground/50"
      >
        <span>{buttonText}</span>
        <ChevronDown className={cn("size-4 opacity-50 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-12 left-0 z-50 min-w-[220px] rounded-lg border border-border bg-background p-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-card",
                value === opt.value
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {value === opt.value && <Check className="size-3.5 text-primary" />}
              <span className={value === opt.value ? "ml-0" : "ml-5.5"}>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Search Input ────────────────────────────────────────── */

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4">
      <Search className="size-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

/* ── Filter types ───────────────────────────────────────── */

type PlatformFilter = "all" | Platform;
type StatusFilter = "all" | "active" | "inactive";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

/* ── Main Content ────────────────────────────────────────── */

export function AccountsContent({ accounts }: { accounts: Account[] }) {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [nicheFilter, setNicheFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Derive platform options from data
  const platformOptions = useMemo<{ value: PlatformFilter; label: string }[]>(() => {
    const platforms = [...new Set(accounts.map((a) => a.platform))].sort();
    return [
      { value: "all", label: "All" },
      ...platforms.map((p) => ({ value: p as PlatformFilter, label: p })),
    ];
  }, [accounts]);

  // Derive niche options from data
  const nicheOptions = useMemo(() => {
    const niches = [...new Set(accounts.map((a) => a.niche))].sort();
    return [
      { value: "all", label: "All" },
      ...niches.map((n) => ({ value: n, label: n })),
    ];
  }, [accounts]);

  const filteredAccounts = useMemo(() => {
    let result = accounts;

    // Platform filter
    if (platformFilter !== "all") {
      result = result.filter((a) => a.platform === platformFilter);
    }

    // Status filter
    if (statusFilter === "active") {
      result = result.filter((a) => a.status === "Active");
    } else if (statusFilter === "inactive") {
      result = result.filter((a) => a.status !== "Active");
    }

    // Niche filter
    if (nicheFilter !== "all") {
      result = result.filter((a) => a.niche === nicheFilter);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.displayName.toLowerCase().includes(q) ||
          a.username.toLowerCase().includes(q) ||
          a.niche.toLowerCase().includes(q)
      );
    }

    return result;
  }, [accounts, platformFilter, statusFilter, nicheFilter, search]);

  function handleRowClick(account: Account) {
    setSelectedAccount((prev) =>
      prev?.id === account.id ? null : account
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        title="Accounts"
        subtitle={`${filteredAccounts.length} accounts`}
        filters={
          <>
            <DropdownSelect
              label="Platform"
              value={platformFilter}
              options={platformOptions}
              onChange={setPlatformFilter}
            />
            <DropdownSelect
              label="Status"
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={setStatusFilter}
            />
            <DropdownSelect
              label="Niche"
              value={nicheFilter}
              options={nicheOptions}
              onChange={setNicheFilter}
            />
            <div className="w-full sm:w-[212px]">
              <SearchInput value={search} onChange={setSearch} />
            </div>
          </>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="overflow-x-auto">
        <Table className="border-0 min-w-[650px]">
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="w-auto">Account</TableHead>
              <TableHead className="w-[130px]">Platform</TableHead>
              <TableHead className="w-[110px]">Followers</TableHead>
              <TableHead className="w-[120px]">Engagement</TableHead>
              <TableHead className="w-[130px]">Status</TableHead>
              <TableHead className="w-[140px]">Last Sync</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => {
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
      </div>

      {/* Slide Over Panel -- outside content padding */}
      <AccountDetailPanel
        account={selectedAccount}
        onClose={() => setSelectedAccount(null)}
      />
    </div>
  );
}
