import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../api/settingsApi";
import { getApiErrorMessage } from "../../api/apiClient";

const input = "h-11 w-full rounded-md border border-[#8EB69B]/30 dark:border-gray-300 bg-[#0B2B26] dark:bg-white px-3.5 text-sm text-[#DAF1DE] dark:text-gray-900 outline-none focus:border-[#8EB69B] dark:focus:border-gray-400 focus:ring-2 focus:ring-[#8EB69B]/20";
const label = "grid gap-2 text-xs font-bold text-[#8EB69B] dark:text-gray-700";
const saveButton = "min-h-11 rounded-md bg-[#8EB69B] dark:bg-[#E5E7EB] px-5 text-sm font-extrabold text-[#051F20] dark:text-[#111827] hover:bg-[#DAF1DE] dark:hover:bg-[#D1D5DB] transition-colors";

export default function GymInformation() {
    const [form, setForm] = useState({ gym_name: "", phone: "", email: "", address: "" });
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadSettings() {
            try {
                // Map the server's snake_case response directly into the form to avoid accidental payload changes.
                const settings = await getSettings();
                setForm({ gym_name: settings.gym_name || "", phone: settings.phone || "", email: settings.email || "", address: settings.address || "" });
            } catch (requestError) {
                setError(getApiErrorMessage(requestError, "Could not load gym information."));
            }
        }
        loadSettings();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setNotice("");
        setSaving(true);
        try {
            const savedSettings = await updateSettings(form);
            setForm({ gym_name: savedSettings.gym_name || "", phone: savedSettings.phone || "", email: savedSettings.email || "", address: savedSettings.address || "" });
            setNotice("Gym information saved.");
        } catch (requestError) {
            setError(getApiErrorMessage(requestError, "Could not save gym information."));
        } finally {
            setSaving(false);
        }
    }

    return <section className="rounded-lg border border-[#8EB69B]/20 dark:border-gray-200 bg-[#163832] dark:bg-white text-[#DAF1DE] dark:text-gray-900 p-5 shadow-[0_18px_45px_rgba(5,31,32,0.32)] sm:p-7">
        <header className="mb-6 border-b border-[#8EB69B]/20 dark:text-gray-900 pb-5">
        <h2 className="m-0 text-xl font-extrabold">Gym Information</h2>
        <p className="mt-1.5 text-sm text-[#8EB69B] dark:text-gray-600">Manage your gym&apos;s basic information.</p></header>
        <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2"><label className={label}>Gym Name<input required className={input} name="gym_name" value={form.gym_name} onChange={(event) => setForm({ ...form, gym_name: event.target.value })} /></label><label className={label}>Phone<input className={input} name="phone" value={form.phone || ""} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label><label className={label}>Email<input className={input} name="email" type="email" value={form.email || ""} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label className={label}>Address<input className={input} name="address" value={form.address || ""} onChange={(event) => setForm({ ...form, address: event.target.value })} /></label>{error && <p className="text-sm text-red-300 sm:col-span-2">{error}</p>}{notice && <p className="text-sm text-[#DAF1DE] sm:col-span-2">{notice}</p>}<div className="flex justify-end sm:col-span-2"><button type="submit" disabled={saving} className={saveButton}>{saving ? "Saving..." : "Save Changes"}</button></div></form></section>;
}
