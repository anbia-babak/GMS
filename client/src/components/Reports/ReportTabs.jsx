import { useLocale } from "../../i18n/useLocale";
function ReportTabs({ activeTab, setActiveTab }) {
  const { t } = useLocale();
  const tabs = ["Members", "Memberships", "Income"];
  return (
    <div className="no-print flex overflow-x-auto border-b
    border-[#DCE9E1] dark:border-gray-200 bg-white dark:bg-white px-2 sm:px-8">
      {tabs.map((tab) => (
        <button key={tab} type="button" onClick={() => setActiveTab(tab)}
        className={`min-h-16 shrink-0 border-0 border-b-[3px]
        px-5 text-sm font-bold transition-colors
        ${activeTab === tab ? "border-[#163832] dark:border-gray-900 bg-[#DAF1DE]/40 dark:bg-gray-100 text-[#163832] dark:text-gray-900" : "border-transparent bg-transparent text-[#61756A] dark:text-gray-600 hover:bg-[#F4F8F5] dark:hover:bg-gray-100 hover:text-[#163832] dark:hover:text-gray-900"}`}>
          {t(tab)}
        </button>
      ))}
    </div>
  );
};
export default ReportTabs;
