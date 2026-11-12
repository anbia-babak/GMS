import { memberRows, membershipRows } from "./reportRows";
import { useLocale } from "../../i18n/useLocale";
const th = `border-b border-[#DCE9E1] dark:border-gray-200 bg-[#F4F8F5] dark:bg-gray-50 px-5 py-4
text-start text-xs font-extrabold uppercase text-[#61756A] dark:text-gray-700`;
const td = `border-b border-[#E3ECE6] dark:border-gray-200 px-5 py-4 text-sm
font-semibold text-[#163832] dark:text-gray-900`;
const table = `w-full min-w-[680px] border-collapse`;
const Shell = ({ children }) => 
<div className="overflow-x-auto rounded-lg border
border-[#DCE9E1] dark:border-gray-200 bg-white dark:bg-white">{children}</div>;

function CountTable({ rows }) {
    const { t, formatNumber } = useLocale();
    return <Shell><table className={table}><thead>
        <tr><th className={th}>{t("Category")}</th><th className={th}>{t("Count")}</th></tr></thead>
        <tbody>{rows.map(([label, count]) => 
        <tr key={label} className="hover:bg-[#F7FAF8] dark:hover:bg-gray-100"><td className={td}>{t(label)}</td><td className={td}>{formatNumber(count ?? 0)}</td></tr>)}</tbody></table></Shell>;
}

export function MembersTable({ summary = {} }) {
    // The API intentionally returns counts, not individual member records, so labels make that contract visible.
    return <CountTable rows={memberRows(summary)} />;
}

export function MembershipsTable({ summary = {} }) {
    return <CountTable rows={membershipRows(summary)} />;
}

export function IncomeReport({ summary = {}, rows = [] }) {
    const { t, formatCurrency, formatDate, formatNumber, translateValue } = useLocale();
    const summaries = [["Total income", formatCurrency(summary.total_income || 0)], ["Payments", formatNumber(summary.payment_count || 0)], ["Average payment", formatCurrency(summary.average_payment_amount || 0)]];
    return <><div className="mb-6 grid grid-cols-1 gap-3
    sm:grid-cols-3">{summaries.map(([label, value]) => 
    <div key={label} className="rounded-lg border
    border-[#DCE9E1] dark:border-gray-200 bg-white dark:bg-white p-5
    shadow-[0_8px_24px_rgba(22,56,50,0.07)]">
    <p className="m-0 text-xs font-bold text-[#61756A] dark:text-gray-600">{t(label)}</p>
    <strong className="mt-2 block text-2xl font-extrabold
    text-[#163832] dark:text-gray-900">{value}</strong></div>)}</div><Shell>
    <table className={table}><thead><tr>{["Date", "Member", "Amount", "Method"].map((label) => <th key={label} className={th}>{t(label)}</th>)}</tr></thead><tbody>{rows.map((row) =>
    <tr key={row.payment_id} className="hover:bg-[#F7FAF8] dark:hover:bg-gray-100"><td className={`${td} text-[#61756A] dark:text-gray-600`}>{formatDate(row.payment_date)}</td><td className={td}><bdi className="font-bold">{row.member_name}</bdi></td><td className={`${td} font-extrabold text-[#235347] dark:text-gray-900`}>{formatCurrency(row.amount)}</td><td className={td}>{translateValue(row.payment_method)}</td></tr>)}</tbody></table></Shell></>;
}
