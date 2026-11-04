import { BarChart3, Download } from "lucide-react";
import { useEffect, useState } from "react";
import ReportTabs from "../Reports/ReportTabs";
import { IncomeReport, MembersTable, MembershipsTable } from "../Reports/ReportTables";
import { getIncomeReport, getMemberReport, getMembershipReport, getPaymentReport } from "../../api/reportsApi";
import { getApiErrorMessage } from "../../api/apiClient";

function Reports() {
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

    // Exporting CSV Implementation:
    const handleExportCSV = () => {
    let headers = [];
    let rows = [];
    let fileName = "";

    if (activeTab === "Members") {
        headers = ["Category", "Count"];
        rows = [
            ["Active members", reports.members?.active_count ?? 0],
            ["Deactivated members", reports.members?.deactivated_count ?? 0],
            ["Other status", reports.members?.other_status_count ?? 0],
            ["Total members", reports.members?.total_count ?? 0],
        ];
        fileName = "members-report.csv";
    }

    else if (activeTab === "Memberships") {
        headers = ["Category", "Count"];
        rows = [
            ["Active memberships", reports.memberships?.active_count ?? 0],
            ["Expiring soon", reports.memberships?.expiring_soon_count ?? 0],
            ["Expired memberships", reports.memberships?.expired_count ?? 0],
            ["Total memberships", reports.memberships?.total_count ?? 0],
        ];
        fileName = "memberships-report.csv";
    }

    else if (activeTab === "Income") {
        headers = ["Date", "Member", "Amount (AFN)", "Method"];

        rows = (reports.payments || []).map((payment) => [
            payment.payment_date,
            payment.member_name,
            payment.amount,
            payment.payment_method,
        ]);

        fileName = "income-report.csv";
    }

    const escapeCSV = (value) =>
        `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csvContent = [
        headers.map(escapeCSV).join(","),
        ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
};


    // Exporting PDF Implementation:
    const handleExportPDF = () => {
        window.print();
    };

    return <section className="reports-print-area w-full max-w-none mx-0 mt-0 rounded-lg border border-[#DCE9E1] dark:border-gray-200 bg-white dark:bg-white shadow-[0_12px_34px_rgba(22,56,50,0.08)]">
        <header className="flex min-h-36 flex-col items-start justify-between gap-5 bg-[#163832] dark:bg-white px-5 py-7 text-[#DAF1DE] dark:text-gray-900 sm:flex-row sm:items-center sm:px-9">
            <div>
                <p className="m-0 text-xs font-extrabold uppercase text-[#8EB69B] dark:text-gray-600">Gym Management System</p>
                <h1 className="mt-2 flex items-center gap-3 text-4xl font-extrabold">
                    Reports</h1>
                    </div>
                    <button type="button" className={`${button} no-print border border-[#8EB69B]/50 dark:border-gray-300 bg-transparent text-[#DAF1DE] dark:text-gray-900 hover:bg-[#235347] dark:hover:bg-gray-100`}>Reports</button>
                    </header><ReportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="no-print flex flex-col gap-3 border-b border-[#DCE9E1] dark:border-gray-200 bg-[#F4F8F5] dark:bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-9">
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={handleExportCSV} type="button" title="No report export endpoint is available yet." className={`${button} cursor-pointer border border-[#C8DCCF] dark:border-gray-300 bg-white dark:bg-white text-[#163832] dark:text-gray-900`}>
                                <Download size={15} /> Export CSV
                                </button>
                                <button type="button" onClick={handleExportPDF} title="No report export endpoint is available yet." className={`${button} cursor-pointer border border-[#163832] dark:border-gray-300 bg-[#163832] dark:bg-gray-200 text-[#DAF1DE] dark:text-gray-900`}>
                                    <Download size={15} /> Export PDF</button>
                                    </div>
                                    </div>
                                    <div className="bg-white dark:bg-white px-5 py-6 sm:px-9 sm:py-8">
                                        {loading ? <p className="text-center text-[#61756A] dark:text-gray-600">Loading reports...</p> : error ? <p className="text-center text-red-600">{error}</p> : <>{activeTab === "Members" && <MembersTable summary={reports.members} />}
                                        {activeTab === "Memberships" && <MembershipsTable summary={reports.memberships} />}
                                        {activeTab === "Income" && <IncomeReport summary={reports.income} rows={reports.payments} />}
                                        </>}
                                        </div>
                                        </section>;
}

export default Reports;
