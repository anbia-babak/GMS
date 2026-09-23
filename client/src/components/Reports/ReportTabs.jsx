


function ReportTabs({ activeTab, setActiveTab }) {
  const tabs = ["Members", "Memberships", "Income"];
  return (
    <div className="flex overflow-x-auto border-b border-[#DCE9E1] bg-white px-2 sm:px-8">
      {tabs.map((tab) => (
        <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`min-h-16 shrink-0 border-0 border-b-[3px] px-5 text-sm font-bold transition-colors ${activeTab === tab ? "border-[#163832] bg-[#DAF1DE]/40 text-[#163832]" : "border-transparent bg-transparent text-[#61756A] hover:bg-[#F4F8F5] hover:text-[#163832]"}`}>
          {tab}
        </button>
      ))}
    </div>
  );
};
export default ReportTabs;
