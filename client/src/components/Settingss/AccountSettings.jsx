import { useEffect, useState } from "react";
import { KeyRound, X } from "lucide-react";

const field = "h-11 w-full rounded-md border border-[#8EB69B]/30 bg-[#0B2B26] px-3.5 text-sm text-[#DAF1DE] outline-none placeholder:text-[#8EB69B]/60 focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/20";
const label = "grid gap-2 text-xs font-bold text-[#8EB69B]";

function PasswordModal({ onClose }) {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  useEffect(() => { const escape = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape); }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" onMouseDown={(event) => event.target === event.currentTarget && onClose()} className="fixed inset-0 z-50 
    grid place-items-center overflow-y-auto bg-[#051F20]/80 p-4 backdrop-blur-sm">
      <section className="w-full max-w-lg rounded-lg border border-[#8EB69B]/25 bg-[#163832] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.45)] sm:p-7">
        <header className="mb-6 flex justify-between border-b border-[#8EB69B]/20 pb-5">
          <div><p className="mb-1 text-xs font-extrabold uppercase text-[#8EB69B]">Account Security</p>
          <h2 className="m-0 text-xl font-extrabold">Change Password</h2>
          </div>
          <button type="button" aria-label="Close modal" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-md text-[#8EB69B] hover:bg-[#235347] hover:text-[#DAF1DE]"><X size={19} /></button>
        </header>
        <form onSubmit={(event) => { event.preventDefault(); onClose(); }} className="grid gap-5">
          <label className={label}>Current Password<input required autoFocus type="password" className={field} name="current" value={form.current} onChange={update} /></label>
          <label className={label}>New Password<input required type="password" className={field} name="next" value={form.next} onChange={update} /></label>
          <label className={label}>Confirm New Password<input required type="password" className={field} name="confirm" value={form.confirm} onChange={update} />
          </label><div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="min-h-11 rounded-md border border-[#8EB69B]/35 px-5 text-sm font-bold hover:bg-[#235347]">Cancel</button>
          <button type="submit" className="min-h-11 rounded-md bg-[#8EB69B] px-5 text-sm font-extrabold text-[#051F20] hover:bg-[#DAF1DE]">Change Password</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function AccountSettings() {
  const [form, setForm] = useState({ username: "Anbia Babak", email: "irongym@example.com" });
  const [open, setOpen] = useState(false);
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  return (
    <section className="rounded-lg border border-[#8EB69B]/20 bg-[#163832] p-5 shadow-[0_18px_45px_rgba(5,31,32,0.32)] sm:p-7">
      <header className="mb-6 border-b border-[#8EB69B]/20 pb-5"><h2 className="m-0 text-xl font-extrabold">Account</h2></header>
      <form onSubmit={(event) => event.preventDefault()} className="grid gap-5 sm:grid-cols-2">
        <label className={label}>Username<input className={field} name="username" value={form.username} onChange={update} /></label>
        <label className={label}>Email<input className={field} name="email" type="email" value={form.email} onChange={update} /></label>
        <div className="flex justify-end sm:col-span-2">
          <button type="submit" className="min-h-11 rounded-md bg-[#8EB69B] px-5 text-sm font-extrabold text-[#051F20] hover:bg-[#DAF1DE]">Save Changes</button>
        </div>
      </form>
      <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-[#8EB69B]/20 pt-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="m-0 text-base font-extrabold">Password</h3>
          <p className="mt-1 text-sm text-[#8EB69B]">Change your account password securely.</p>
        </div><button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-md border 
        border-[#8EB69B]/40 bg-[#0B2B26] px-4 text-sm font-bold hover:bg-[#235347]"><KeyRound size={17} />
        Change Password</button>
      </div>
      {open && <PasswordModal onClose={() => setOpen(false)} />}
    </section>
  );
}
