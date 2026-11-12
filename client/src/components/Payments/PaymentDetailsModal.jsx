import { useEffect, useRef } from "react";
import { useLocale } from "../../i18n/useLocale";

const fields = [
    ["Payment ID", "payment_id"],
    ["Member", "member_name", true],
    ["Membership Plan", "plan_name", true],
    ["Amount", "amount"],
    ["Payment Date", "payment_date"],
    ["Payment Method", "payment_method"],
    ["Payment Note", "payment_note", true],
];

export default function PaymentDetailsModal({ payment, loading, error, onClose }) {
    const { t, formatNumber, formatCurrency, formatDate, translateValue, translateError } = useLocale();
    const closeButton = useRef(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        closeButton.current?.focus();

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key !== "Tab") return;
            const dialog = closeButton.current?.closest('[role="dialog"]');
            const focusable = dialog?.querySelectorAll("button:not(:disabled)");
            if (!focusable?.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previousFocus?.focus?.();
        };
    }, [onClose]);

    function displayValue(key) {
        if (!payment) return "—";
        const value = key === "payment_note"
            ? payment.payment_note ?? payment.note ?? payment.notes
            : payment[key];
        if (value == null || value === "") return "—";
        if (key === "payment_id") return formatNumber(value, { useGrouping: false });
        if (key === "amount") return formatCurrency(value);
        if (key === "payment_date") return formatDate(value);
        if (key === "payment_method") return translateValue(value);
        return value;
    }

    return (
        <div
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#051F20]/70 p-4 backdrop-blur-sm"
            onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="payment-details-title"
                className="w-full max-w-xl rounded-xl border border-[#8EB69B]/25 bg-[#163832] p-5 text-[#DAF1DE] shadow-2xl dark:border-gray-200 dark:bg-white dark:text-gray-900 sm:p-7"
            >
                <header className="mb-4 flex items-center justify-between gap-4 border-b border-[#8EB69B]/25 pb-4 dark:border-gray-200">
                    <h2 id="payment-details-title" className="text-xl font-bold">{t("Payment Details")}</h2>
                    <button
                        ref={closeButton}
                        type="button"
                        onClick={onClose}
                        aria-label={t("Close modal")}
                        className="grid size-10 shrink-0 place-items-center rounded-md text-[#8EB69B] transition-colors hover:bg-[#235347] hover:text-white dark:text-gray-600 dark:hover:bg-gray-100 dark:hover:text-gray-900"
                    >
                        <span aria-hidden="true" className="text-2xl leading-none">×</span>
                    </button>
                </header>
                {loading ? (
                    <p role="status" className="py-8 text-center text-sm text-[#8EB69B] dark:text-gray-600">{t("Loading payment details...")}</p>
                ) : error ? (
                    <p role="alert" className="py-8 text-center text-sm text-red-400">{translateError(error)}</p>
                ) : (
                    <dl className="divide-y divide-[#8EB69B]/20 dark:divide-gray-200">
                        {fields.map(([label, key, textValue]) => (
                            <div key={key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-start gap-4 py-3 text-sm">
                                <dt className="font-semibold text-[#8EB69B] dark:text-gray-600">{t(label)}</dt>
                                <dd className="m-0 min-w-0 break-words text-end font-medium text-[#DAF1DE] dark:text-gray-900">
                                    {textValue ? <bdi>{displayValue(key)}</bdi> : displayValue(key)}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}
                <footer className="mt-5 flex justify-end border-t border-[#8EB69B]/25 pt-4 dark:border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="min-h-11 rounded-md bg-[#8EB69B] px-5 text-sm font-bold text-[#051F20] transition hover:brightness-110 dark:bg-gray-200 dark:text-gray-900"
                    >
                        {t("Close")}
                    </button>
                </footer>
            </section>
        </div>
    );
}
