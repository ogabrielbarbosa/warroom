import { cn } from "@/lib/utils";

export interface PageHeaderTab {
  label: string;
  value: string;
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
  filters?: React.ReactNode;
  tabs?: PageHeaderTab[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  filters,
  tabs,
  activeTab,
  onTabChange,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col border-b border-border",
        className
      )}
    >
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-6">
        <div>
          <h1 className="font-mono text-lg font-bold text-foreground">
            {title}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {filters && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">{filters}</div>
        )}
      </div>

      {tabs && tabs.length > 0 && (
        <div className="flex gap-4 overflow-x-auto px-4 sm:gap-6 md:px-8">
          {tabs.map((tab) => {
            const isActive = tab.value === activeTab;
            return (
              <button
                key={tab.value}
                onClick={() => onTabChange?.(tab.value)}
                className={cn(
                  "relative pb-3 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
