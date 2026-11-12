import { useLocale } from "../../i18n/useLocale";

const navItems = [
  { label: "All Members", value: "all" },
  { label: "Active", value: "active" },
  { label: "Expired", value: "expired" },
  { label: "Expiring Soon", value: "expiringSoon" },
];

function MembersNavigation({ selectedTab, onTabChange }) {
    const { t } = useLocale();
  return (
    <div className="flex min-w-0 max-w-full flex-wrap items-center gap-3">
      <div className="flex w-full max-w-full gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1 sm:w-auto">
        {navItems.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onTabChange(item.value)}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              selectedTab === item.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {t(item.label)}
          </button>
        ))}
      </div>

      {/* Calendar icon */}
      <div
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-primary"
        aria-label={t("Calendar")}
      >
        {/* Keep your existing SVG here */}
      </div>
    </div>
  );
}

export default MembersNavigation;
