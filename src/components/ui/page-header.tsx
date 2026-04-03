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
      <div className="flex items-center justify-between px-8 pt-6 pb-4">
        <div>
          <h1 className="font-mono text-lg font-bold text-foreground">
            {title}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {filters && (
          <div className="flex items-center gap-3">{filters}</div>
        )}
      </div>

      {tabs && tabs.length > 0 && (
        <div className="flex gap-6 px-8">
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
