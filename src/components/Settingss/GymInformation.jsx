import { useState } from "react";

const input = "h-11 w-full rounded-md border border-[#8EB69B]/30 bg-[#0B2B26] px-3.5 text-sm text-[#DAF1DE] outline-none focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/20";
const label = "grid gap-2 text-xs font-bold text-[#8EB69B]";
const saveButton = "min-h-11 rounded-md border border-[#8EB69B] bg-[#8EB69B] px-5 text-sm font-extrabold text-[#051F20] hover:bg-[#DAF1DE] focus:outline-none focus:ring-2 focus:ring-[#DAF1DE]/40";

export default function GymInformation() {
  const [form, setForm] = useState({ gymName: "Iron Gym", phone: "0700 000 000", email: "irongym@example.com", address: "Kabul, Afghanistan" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  return (
    <section className="rounded-lg border border-[#8EB69B]/20 bg-[#163832] p-5 shadow-[0_18px_45px_rgba(5,31,32,0.32)] sm:p-7">
      <header className="mb-6 border-b border-[#8EB69B]/20 pb-5">
        <h2 className="m-0 text-xl font-extrabold">Gym Information</h2>
        <p className="mt-1.5 text-sm text-[#8EB69B]">Manage your gym&apos;s basic information.</p>
      </header>
      <form onSubmit={(event) => event.preventDefault()} className="grid gap-5 sm:grid-cols-2">
        <label className={label}>Gym Name<input className={input} name="gymName" value={form.gymName} onChange={update} /></label>
        <label className={label}>Phone<input className={input} name="phone" value={form.phone} onChange={update} /></label>
        <label className={label}>Email<input className={input} name="email" type="email" value={form.email} onChange={update} /></label>
        <label className={label}>Address<input className={input} name="address" value={form.address} onChange={update} /></label>
        <div className="flex justify-end sm:col-span-2"><button type="submit" className={saveButton}>Save Changes</button></div>
      </form>
    </section>
  );
}
