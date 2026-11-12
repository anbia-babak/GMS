import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useLocale } from "../../i18n/useLocale";

/** Shared client-side pagination controls; the parent owns the filtered rows and page state. */
export default function Pagination({ total, currentPage, pageSize, onPageChange, onPageSizeChange }) {
    const { t, language, formatNumber } = useLocale();
    const isRtl = language === "fa-AF" || language === "ps-AF";
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, currentPage), pageCount);
    const groupStart = Math.floor((safePage - 1) / 5) * 5 + 1;
    const groupEnd = Math.min(groupStart + 4, pageCount);
    const pages = Array.from({ length: groupEnd - groupStart + 1 }, (_, index) => groupStart + index);
    const rangeStart = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
    const rangeEnd = Math.min(safePage * pageSize, total);

    // Clamp when a search/filter or a record update reduces the result count.
    useEffect(() => {
        if (currentPage !== safePage) onPageChange(safePage);
    }, [currentPage, onPageChange, safePage]);

    const controls = [
        { label: "First page", page: 1, Icon: isRtl ? ChevronsRight : ChevronsLeft, disabled: safePage === 1 },
        { label: "Previous page group", page: Math.max(1, groupStart - 5), Icon: isRtl ? ChevronRight : ChevronLeft, disabled: groupStart === 1 },
        { label: "Previous page", page: Math.max(1, safePage - 1), Icon: isRtl ? ChevronRight : ChevronLeft, disabled: safePage === 1 },
    ];

    return <nav aria-label={t("Pagination")} className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-card px-3 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-muted-foreground sm:justify-start">
            <span>{t("Showing {{start}}–{{end}} of {{total}} records", { start: formatNumber(rangeStart), end: formatNumber(rangeEnd), total: formatNumber(total) })}</span>
            <span>{t("Page {{page}} of {{pageCount}}", { page: formatNumber(safePage), pageCount: formatNumber(pageCount) })}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-1" role="group" aria-label={t("Pagination controls")}>
                {controls.map(({ label, page, Icon, disabled }) => <button key={label} type="button" aria-label={t(label)} title={t(label)} disabled={disabled} onClick={() => onPageChange(page)} className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Icon size={16} aria-hidden="true" /></button>)}
                {pages.map((page) => <button key={page} type="button" aria-label={t("Page {{page}}", { page: formatNumber(page) })} aria-current={page === safePage ? "page" : undefined} onClick={() => onPageChange(page)} className={`grid size-9 place-items-center rounded-lg border text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${page === safePage ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground"}`}>{formatNumber(page)}</button>)}
                <button type="button" aria-label={t("Next page")} title={t("Next page")} disabled={safePage === pageCount} onClick={() => onPageChange(Math.min(pageCount, safePage + 1))} className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ChevronRight className={isRtl ? "rotate-180" : ""} size={16} aria-hidden="true" /></button>
                <button type="button" aria-label={t("Next page group")} title={t("Next page group")} disabled={groupEnd === pageCount} onClick={() => onPageChange(Math.min(pageCount, groupEnd + 1))} className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ChevronRight className={isRtl ? "rotate-180" : ""} size={16} aria-hidden="true" /></button>
                <button type="button" aria-label={t("Last page")} title={t("Last page")} disabled={safePage === pageCount} onClick={() => onPageChange(pageCount)} className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ChevronsRight className={isRtl ? "rotate-180" : ""} size={16} aria-hidden="true" /></button>
            </div>
            <label className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                <span>{t("Rows per page")}</span>
                <select value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))} className="h-9 rounded-lg border border-border bg-background px-2 font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    {[10, 20, 50].map((size) => <option key={size} value={size}>{formatNumber(size)}</option>)}
                </select>
            </label>
        </div>
    </nav>;
}
