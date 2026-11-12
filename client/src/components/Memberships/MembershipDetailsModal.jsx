import { useEffect, useRef } from "react";
import { Eye, X } from "lucide-react";
import { useLocale } from "../../i18n/useLocale";

export default function MembershipDetailsModal({ membership, onClose, onRenew }) {
    const { t, formatNumber, formatCurrency, formatDate, translateValue } = useLocale();
    const closeButton = useRef(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        closeButton.current?.focus();
        function handleKeyDown(event) {
            if (event.key === "Escape") onClose();
            if (event.key !== "Tab") return;
            const buttons = closeButton.current?.closest('[role="dialog"]')?.querySelectorAll("button:not(:disabled)");
            if (!buttons?.length) return;
            if (event.shiftKey && document.activeElement === buttons[0]) {
                event.preventDefault(); buttons[buttons.length - 1].focus();
            } else if (!event.shiftKey && document.activeElement === buttons[buttons.length - 1]) {
                event.preventDefault(); buttons[0].focus();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previousFocus?.focus?.();
        };
    }, [onClose]);

    // The list API's status is the source of truth; future-dated memberships are presented as Upcoming.
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = membership.start_date ? new Date(`${String(membership.start_date).slice(0, 10)}T00:00:00`) : null;
    const currentStatus = start && !Number.isNaN(start.getTime()) && start > today ? "Upcoming" : membership.status;
    const duration = membership.duration_month == null ? "—" : `${formatNumber(membership.duration_month)} ${t("Months")}`;
    const rows = [
        ["Membership ID", formatNumber(membership.membership_id, { useGrouping: false })],
        ["Member", <bdi>{membership.member_name}</bdi>],
        ["Membership Plan", <bdi>{membership.plan_name}</bdi>],
        ["Start Date", formatDate(membership.start_date)],
        ["Expiration Date", formatDate(membership.expiration_date)],
        ["Duration", duration],
        ["Status", <span className="inline-flex items-center gap-2"><span className={`size-2 rounded-full ${currentStatus === "Expired" ? "bg-red-400" : currentStatus === "Expiring Soon" ? "bg-orange-400" : currentStatus === "Upcoming" ? "bg-sky-400" : "bg-emerald-400"}`} aria-hidden="true" />{currentStatus === "Active" || currentStatus === "Expired" || currentStatus === "Expiring Soon" ? translateValue(currentStatus) : t(currentStatus)}</span>],
        ["Plan Price", membership.price == null ? "—" : formatCurrency(membership.price)],
    ];

    return <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#051F20]/70 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
        <section role="dialog" aria-modal="true" aria-labelledby="membership-details-title" className="w-full max-w-xl rounded-xl border border-[#8EB69B]/25 bg-[#163832] p-5 text-[#DAF1DE] shadow-2xl dark:border-gray-200 dark:bg-white dark:text-gray-900 sm:p-7">
            <header className="mb-4 flex items-center justify-between gap-4 border-b border-[#8EB69B]/25 pb-4 dark:border-gray-200">
                <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-lg bg-[#8EB69B]/15 text-[#8EB69B] dark:bg-emerald-50 dark:text-emerald-800"><Eye size={19} aria-hidden="true" /></span><h2 id="membership-details-title" className="text-xl font-bold">{t("Membership Details")}</h2></div>
                <button ref={closeButton} type="button" onClick={onClose} aria-label={t("Close modal")} className="grid size-10 shrink-0 place-items-center rounded-md text-[#8EB69B] transition-colors hover:bg-[#235347] hover:text-white dark:text-gray-600 dark:hover:bg-gray-100 dark:hover:text-gray-900"><X size={20} aria-hidden="true" /></button>
            </header>
            <dl className="divide-y divide-[#8EB69B]/20 dark:divide-gray-200">
                {rows.map(([label, value]) => <div key={label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-start gap-4 py-3 text-sm"><dt className="font-semibold text-[#8EB69B] dark:text-gray-600">{t(label)}</dt><dd className="m-0 min-w-0 break-words text-end font-medium text-[#DAF1DE] dark:text-gray-900">{value}</dd></div>)}
            </dl>
            <footer className="mt-5 flex flex-col-reverse justify-end gap-3 border-t border-[#8EB69B]/25 pt-4 dark:border-gray-200 sm:flex-row">
                <button type="button" onClick={onClose} className="min-h-11 rounded-md border border-[#8EB69B]/40 px-5 text-sm font-semibold text-[#DAF1DE] transition hover:bg-[#235347] dark:border-gray-300 dark:text-gray-800 dark:hover:bg-gray-100">{t("Close")}</button>
                <button type="button" onClick={onRenew} className="min-h-11 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground shadow-md transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t("Renew")}</button>
            </footer>
        </section>
    </div>;
}
