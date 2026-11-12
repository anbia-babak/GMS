import { useEffect, useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import { getMembershipPlans, addMembershipPlan, updateMembershipPlan } from "../../api/membershipsApi";

const field = "h-11 w-full rounded-md border border-[#8EB69B]/30 dark:border-gray-300 bg-[#0B2B26] dark:bg-white px-3.5 text-sm text-[#DAF1DE] dark:text-gray-900 outline-none focus:border-[#8EB69B] dark:focus:border-gray-400 focus:ring-2 focus:ring-[#8EB69B]/20";
const label = "grid gap-2 text-xs font-bold text-[#8EB69B] dark:text-gray-700";


function PlanModal({ plan, onClose, onSave }) {

  const editing = Boolean(plan.id);
  const [form, setForm] = useState({ id: plan.id, name: plan.name || "", duration: plan.duration || "", unit: plan.unit || "Months", price: plan.price || "" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  useEffect(() => { const escape = (event) => event.key === "Escape" && onClose(); window.addEventListener("keydown", escape); return () => window.removeEventListener("keydown", escape); }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" onMouseDown={(event) => event.target === event.currentTarget && onClose()} className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#051F20]/80 p-4 backdrop-blur-sm">
      <section className="w-full max-w-lg rounded-lg border border-[#8EB69B]/25 dark:border-gray-200 bg-[#163832] dark:bg-white text-[#DAF1DE] dark:text-gray-900 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.45)] sm:p-7">
        <header className="mb-6 flex justify-between border-b border-[#8EB69B]/20 dark:border-gray-200 pb-5">
          <div><p className="mb-1 text-xs font-extrabold uppercase text-[#8EB69B] dark:text-gray-600">Membership Plan</p>
          <h2 className="m-0 text-xl font-extrabold">{editing ? "Edit Plan" : "Add Plan"}</h2>
          </div>
          <button type="button" aria-label="Close modal" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-md text-[#8EB69B] dark:text-gray-600 hover:bg-[#235347] dark:hover:bg-gray-100 hover:text-[#DAF1DE] dark:hover:text-gray-900"><X size={19} /></button>
        </header>
        <form onSubmit={(event) => { event.preventDefault(); onSave(form); }} className="grid gap-5 sm:grid-cols-2">
          <label className={`${label} sm:col-span-2`}>Plan Name<input required autoFocus className={field} name="name" value={form.name} onChange={update} /></label>
          <label className={label}>Duration<input required min="1" type="number" className={field} name="duration" value={form.duration} onChange={update} /></label>
          <label className={label}>Duration Unit<select className={field} name="unit" value={form.unit} onChange={update}><option>Months</option></select></label>
          <label className={`${label} sm:col-span-2`}>Price<input required min="0" type="number" className={field} name="price" value={form.price} onChange={update} /></label>
          <div className="flex flex-col-reverse gap-2 pt-2 sm:col-span-2 sm:flex-row sm:justify-end">
            <button type="button" 
            onClick={onClose} className="min-h-11 rounded-md border border-[#8EB69B]/35 dark:border-gray-300 text-[#DAF1DE] dark:text-gray-900 px-5 text-sm font-bold hover:bg-[#235347] dark:hover:bg-gray-100">Cancel</button>
            <button type="submit" className="min-h-11 rounded-md bg-[#8EB69B] dark:bg-[#E5E7EB] px-5 text-sm font-extrabold text-[#051F20] dark:text-[#111827] hover:bg-[#DAF1DE] dark:hover:bg-[#D1D5DB] transition-colors">{editing ? "Save Changes" : "Add Plan"}</button>
          </div>
          
        </form>
      </section>
    </div>
  );
}

function formatPlan(plan) {
    return {
        id: plan.plan_id,
        name: plan.plan_name,
        duration: String(plan.duration_month),
        unit: "Months",
        price: String(plan.price),
    };
}


export default function MembershipPlans() {
  const [plans, setPlans] = useState([]);
  const[loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    async function loadPlans() {
        try {
            setError("");
            const data = await getMembershipPlans();
            setPlans(data.map(formatPlan));
        } catch (error) {
            console.error("Membership plans loading error:", error);
            setError(
            error.response?.data?.message ||
            error.message ||
            "Could not load membership plans."
    );
} finally {
            setLoading(false);
        }
    }

    loadPlans();
}, []);

const save = async (plan) => {
    try {
        setError("");

        const planData = {
            name: plan.name,
            duration: Number(plan.duration),
            price: Number(plan.price),
        };

        if (plan.id) {
            await updateMembershipPlan(plan.id, planData);
        } else {
            await addMembershipPlan(planData);
        }

        const updatedPlans = await getMembershipPlans();
        setPlans(updatedPlans.map(formatPlan));

        setModal(null);
    } catch (error) {
        setError(
            error.response?.data?.message ||
            "Could not save membership plan."
        );
    }
};



  const th = "border-b border-[#8EB69B]/20 dark:border-gray-300 bg-[#0B2B26] dark:bg-white px-5 py-3.5 text-left text-xs font-extrabold uppercase text-[#8EB69B] dark:text-gray-900";
  const td = "border-b border-[#8EB69B]/15 px-5 py-4 text-sm text-[#8EB69B] dark:text-gray-700";
  return (
    <section className="rounded-lg border border-[#8EB69B]/20 dark:border-gray-200 bg-[#163832] dark:bg-white p-5 text-[#DAF1DE] dark:text-gray-900 shadow-[0_18px_45px_rgba(5,31,32,0.32)] sm:p-7">
      <header className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-[#8EB69B]/20 dark:border-gray-200 pb-5 sm:flex-row sm:items-center">
      <div>
        <h2 className="m-0 text-xl font-extrabold">Membership Plans</h2>
        <p className="mt-1.5 text-sm text-[#8EB69B] dark:text-gray-600">Manage the plans available to your members.</p>
        </div>
        <button type="button" onClick={() => setModal({})} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#8EB69B] dark:bg-gray-200 px-4 text-sm font-extrabold text-[#051F20] dark:text-gray-900 hover:bg-[#DAF1DE] dark:hover:bg-gray-300 transition-colors"><Plus size={17} />
        Add Plan</button>
      </header>

      {loading && (
          <p className="py-4 text-sm">Loading membership plans...</p>
      )}

      {error && (
          <p className="mb-4 text-sm text-red-400">{error}</p>
      )}

      <div className="overflow-x-auto rounded-md border border-[#8EB69B]/20 dark:border-gray-200">
        <table className="w-full min-w-[620px] border-collapse">
          <thead>
            <tr>{["Plan", "Duration", "Price", "Action"].map((item) => <th key={item} className={th}>{item}</th>)}
            </tr>
          </thead>
          <tbody>{plans.map((plan) => <tr key={plan.id} className="hover:bg-[#235347]/55 dark:hover:bg-gray-100 transition-colors">
              <td className={`${td} font-bold`}>{plan.name}</td>
              <td className={`${td} dark:text-gray-700`}>{plan.duration} {plan.unit}</td>
              <td className={`${td} font-extrabold`}>${plan.price}</td>
              <td className={td}><button type="button" onClick={() => setModal(plan)} 
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-[#8EB69B]/35 dark:border-gray-300 bg-[#0B2B26] dark:bg-white text-[#DAF1DE] dark:text-gray-900 px-3 text-xs font-bold hover:bg-[#235347] dark:hover:bg-gray-100"><Pencil size={14} /> Edit</button>
              </td></tr>)}
            </tbody>
          </table>
        </div>
      {modal !== null && <PlanModal plan={modal} onClose={() => setModal(null)} onSave={save} />}
    </section>
  );
}
