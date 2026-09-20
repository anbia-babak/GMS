


const th = "border-b border-[#DCE9E1] bg-[#F4F8F5] px-5 py-4 text-left text-xs font-extrabold uppercase text-[#61756A]";
const td = "border-b border-[#E3ECE6] px-5 py-4 text-sm font-semibold text-[#163832]";
const table = "w-full min-w-[680px] border-collapse";
const Status = ({ children }) => <span className="inline-flex rounded-full bg-[#DAF1DE] px-3 py-1 text-xs font-extrabold text-[#235347]">{children}</span>;
const Shell = ({ children }) => <div className="overflow-x-auto rounded-lg border border-[#DCE9E1] bg-white">{children}</div>;

export function MembersTable({ rows }) {
  return <Shell><table className={table}><thead><tr>{["Name", "Phone", "Joined", "Status"].map(x => <th key={x} className={th}>{x}</th>)}</tr></thead><tbody>{rows.map(x => <tr key={x.id} className="hover:bg-[#F7FAF8]"><td className={td}>{x.name}</td><td className={`${td} text-[#61756A]`}>{x.phone}</td><td className={`${td} text-[#61756A]`}>{x.joined}</td><td className={td}><Status>{x.status}</Status></td></tr>)}</tbody></table></Shell>;
}

export function MembershipsTable({ rows }) {
  return <Shell><table className={table}><thead><tr>{["Member", "Plan", "Start", "Expires", "Status"].map(x => <th key={x} className={th}>{x}</th>)}</tr></thead><tbody>{rows.map(x => <tr key={x.id} className="hover:bg-[#F7FAF8]"><td className={td}>{x.member}</td><td className={td}>{x.plan}</td><td className={`${td} text-[#61756A]`}>{x.start}</td><td className={`${td} text-[#61756A]`}>{x.expires}</td><td className={td}><Status>{x.status}</Status></td></tr>)}</tbody></table></Shell>;
}

export function IncomeReport({ rows }) {
  const total = rows.reduce((sum, row) => sum + row.amount, 0);
  const summaries = [["Total income", `${total.toLocaleString()} AFN`], ["Payments", rows.length], ["Avg. per member", `${Math.round(total / rows.length).toLocaleString()} AFN`]];
  return <><div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">{summaries.map(([label, value]) => <div key={label} className="rounded-lg border border-[#DCE9E1] bg-white p-5 shadow-[0_8px_24px_rgba(22,56,50,0.07)]"><p className="m-0 text-xs font-bold text-[#61756A]">{label}</p><strong className="mt-2 block text-2xl font-extrabold text-[#163832]">{value}</strong></div>)}</div><Shell><table className={table}><thead><tr>{["Date", "Member", "Amount", "Method"].map(x => <th key={x} className={th}>{x}</th>)}</tr></thead><tbody>{rows.map(x => <tr key={x.id} className="hover:bg-[#F7FAF8]"><td className={`${td} text-[#61756A]`}>{x.date}</td><td className={td}>{x.member}</td><td className={`${td} font-extrabold text-[#235347]`}>{x.amount.toLocaleString()} AFN</td><td className={td}><span className="rounded-md border border-[#DCE9E1] bg-[#F4F8F5] px-2.5 py-1 text-xs text-[#61756A]">{x.method}</span></td></tr>)}</tbody></table></Shell></>;
}
