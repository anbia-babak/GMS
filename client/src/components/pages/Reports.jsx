import { useLocale } from "../../i18n/useLocale";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import ReportTabs from "../Reports/ReportTabs";
import { IncomeReport, MembersTable, MembershipsTable } from "../Reports/ReportTables";
import { getIncomeReport, getMemberReport, getMembershipReport, getPaymentReport } from "../../api/reportsApi";
import { memberRows, membershipRows } from "../Reports/reportRows";
import { getApiErrorMessage } from "../../api/apiClient";

function Reports() {
    const { t, translateValue, translateError } = useLocale();
    const [activeTab, setActiveTab] = useState("Members");
    const [reports, setReports] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#8EB69B]";

    useEffect(() => {
        async function loadReports() {
            setLoading(true);
            setError("");
            try {
                // Report endpoints return aggregates, while the payment report supplies the income table rows.
                const [members, memberships, income, payments] = await Promise.all([getMemberReport(), getMembershipReport(), getIncomeReport(), getPaymentReport()]);
                setReports({ members, memberships, income, payments: payments.payments || [] });
            } catch (requestError) {
                setError(getApiErrorMessage(requestError, "Could not load reports. Please try again."));
            } finally {
                setLoading(false);
            }
        }
        loadReports();
    }, []);

    function handleExportCSV() {
        const isIncome = activeTab === "Income";
        const headers = isIncome ? ["Date", "Member", "Amount (AFN)", "Method"] : ["Category", "Count"];
        // CSV stores labels in logical Unicode order and keeps numbers and ISO dates usable in spreadsheets.
        const rows = isIncome
            ? reports.payments.map((payment) => [
                payment.payment_date, payment.member_name, payment.amount, translateValue(payment.payment_method),
            ])
            : (activeTab === "Members" ? memberRows(reports.members) : membershipRows(reports.memberships))
                .map(([label, count]) => [t(label), count ?? 0]);

        const escapeCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
        const content = [headers.map((label) => t(label)), ...rows]
            .map((row) => row.map(escapeCell).join(","))
            .join("\r\n");
        const url = URL.createObjectURL(new Blob(["\uFEFF", content], { type: "text/csv;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `${activeTab.toLowerCase()}-report.csv`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    // Chromium shapes Arabic-script text and embeds the local fonts when printing to PDF.
    async function handleExportPDF() {
        await document.fonts.ready;
        window.print();
    }

    return <section className="reports-print-area w-full max-w-none mx-0 mt-0 rounded-lg border border-[#DCE9E1] dark:border-gray-200 bg-white dark:bg-white shadow-[0_12px_34px_rgba(22,56,50,0.08)]">
        <header className="flex min-h-36 flex-col items-start justify-between gap-5 bg-[#163832] dark:bg-white px-5 py-7 text-[#DAF1DE] dark:text-gray-900 sm:flex-row sm:items-center sm:px-9">
            <div>
                <p className="m-0 text-xs font-extrabold uppercase text-[#8EB69B] dark:text-gray-600">{t("Gym Management System")}</p>
                <h1 className="mt-2 flex items-center gap-3 text-4xl font-extrabold">{t("Reports")}</h1>
                    </div>
                    <button type="button" className={`${button} no-print border border-[#8EB69B]/50 dark:border-gray-300 bg-transparent text-[#DAF1DE] dark:text-gray-900 hover:bg-[#235347] dark:hover:bg-gray-100`}>{t("Reports")}</button>
                    </header><ReportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="no-print flex flex-col gap-3 border-b border-[#DCE9E1] dark:border-gray-200 bg-[#F4F8F5] dark:bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-9">
                        <div className="grid grid-cols-2 gap-2">
                            <button disabled={loading || Boolean(error)} onClick={handleExportCSV} type="button" className={`${button} cursor-pointer border border-[#C8DCCF] dark:border-gray-300 bg-white dark:bg-white text-[#163832] dark:text-gray-900`}>
                                <Download size={15} />{t("Export CSV")}</button>
                                <button disabled={loading || Boolean(error)} type="button" onClick={handleExportPDF} className={`${button} cursor-pointer border border-[#163832] dark:border-gray-300 bg-[#163832] dark:bg-gray-200 text-[#DAF1DE] dark:text-gray-900`}>
                                    <Download size={15} />{t("Export PDF")}</button>
                                    </div>
                                    </div>
                                    <div className="bg-white dark:bg-white px-5 py-6 sm:px-9 sm:py-8">
                                        <h2 className="hidden print:mb-3 print:block print:font-bold">{t(activeTab)}</h2>
                                        {loading ? <p className="text-center text-[#61756A] dark:text-gray-600">{t("Loading reports...")}</p> : error ? <p className="text-center text-red-600">{translateError(error)}</p> : <>{activeTab === "Members" && <MembersTable summary={reports.members} />}
                                        {activeTab === "Memberships" && <MembershipsTable summary={reports.memberships} />}
                                        {activeTab === "Income" && <IncomeReport summary={reports.income} rows={reports.payments} />}
                                        </>}
                                        </div>
                                        </section>;
}

export default Reports;
