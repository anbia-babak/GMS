import { BarChart3, Download } from "lucide-react";
import { useState } from "react";
import ReportTabs from "../Reports/ReportTabs";
import { IncomeReport, MembersTable, MembershipsTable } from "../Reports/ReportTables";
import mockData from "../../data/mockData";


function Reports() {
  const [activeTab, setActiveTab] = useState("Members");

  const { rMembers, rMemberships, rPayments} = mockData;
  const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#8EB69B]";
  return (
    <section className="max-w-6xl mx-auto mt-12 rounded-lg border border-[#DCE9E1] bg-white shadow-[0_12px_34px_rgba(22,56,50,0.08)]">
      <header className="flex min-h-36 flex-col items-start justify-between gap-5 bg-[#163832] px-5 py-7 text-[#DAF1DE] sm:flex-row sm:items-center sm:px-9">
        <div><p className="m-0 text-xs font-extrabold uppercase text-[#8EB69B]">Gym Management System</p><h1 className="mt-2 flex items-center gap-3 text-3xl font-extrabold"><BarChart3 size={26} /> Reports</h1></div>
        <button type="button" className={`${button} border border-[#8EB69B]/50 bg-transparent text-[#DAF1DE] hover:bg-[#235347]`}>دری</button>
      </header>
      <ReportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col gap-3 border-b border-[#DCE9E1] bg-[#F4F8F5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-9">
        <select key={activeTab} defaultValue={activeTab === "Income" ? "This month" : "All"} className="h-11 w-full rounded-md border border-[#C8DCCF] bg-white px-3 text-sm font-semibold text-[#163832] outline-none focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/30 sm:w-44">
          {activeTab === "Income" ? <><option>This month</option><option>Last month</option><option>This year</option></> : <><option>All</option><option>Active</option><option>Expired</option></>}
        </select>
        <div className="grid grid-cols-2 gap-2"><button type="button" className={`${button} border border-[#C8DCCF] bg-white text-[#163832] hover:bg-[#DAF1DE]`}><Download size={15} /> Export CSV</button><button type="button" className={`${button} border border-[#163832] bg-[#163832] text-[#DAF1DE] hover:bg-[#235347]`}><Download size={15} /> Export PDF</button></div>
      </div>
      <div className="bg-white px-5 py-6 sm:px-9 sm:py-8">
        {activeTab === "Members" && <MembersTable rows={rMembers} />}
        {activeTab === "Memberships" && <MembershipsTable rows={rMemberships} />}
        {activeTab === "Income" && <IncomeReport rows={rPayments} />}
      </div>
    </section>
  );
}
import { Form } from "react-router";
export default Reports;