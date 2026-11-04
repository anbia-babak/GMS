import { useState } from "react";
import Button from "../Dashboard/Button";
import { renewMembership } from "../../api/membershipsApi";
import { getApiErrorMessage } from "../../api/apiClient";

function RenewMembershipModal({ membership, onClose, onRenewedMembership }) {
    const fieldClass = `h-11 w-full rounded-md border
    border-[#8EB69B]/40 dark:border-gray-300 bg-[#0B2B26] dark:bg-white px-3 text-sm text-[#DAF1DE] dark:text-gray-900
    outline-none transition focus:border-[#8EB69B] dark:focus:border-gray-400 focus:ring-2
    focus:ring-[#8EB69B]/20`;
    const labelClass = `mb-2 block text-sm font-semibold
    text-[#DAF1DE] dark:text-gray-900`;
    const [form, setForm] = useState({ planId: "", newDate: "" });
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSaving(true);
        try {
            // Renewal uses planId/newDate because those are the names validated by this endpoint.
            const renewed = await renewMembership(membership.membership_id, { planId: Number(form.planId), newDate: form.newDate });
            onRenewedMembership(renewed);
        } catch (requestError) {
            setError(getApiErrorMessage(requestError, "Could not renew the membership."));
        } finally {
            setSaving(false);
        }
    }

    return <div className="fixed inset-0 z-50 flex items-center
    justify-center overflow-y-auto bg-[#051F20]/70 px-4 py-6
    backdrop-blur-sm">
        <div className="max-h-[calc(100vh-3rem)] w-full max-w-lg
        overflow-y-auto rounded-lg border border-[#8EB69B]/25
        bg-[#163832] dark:bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between
            border-b border-[#8EB69B]/25 pb-4">
                <h2 className="text-xl font-semibold text-[#DAF1DE] dark:text-gray-900">Renew Membership</h2>
                <button type="button" onClick={onClose}
                aria-label="Close modal" className="flex h-9 w-9
                items-center justify-center rounded-md text-[#8EB69B] dark:text-gray-600 
                transition-colors hover:bg-[#235347] dark:hover:bg-gray-100
                hover:text-[#DAF1DE] dark:hover:text-gray-900">×</button>
                </div>
                <form className="mt-5 space-y-4" 
                onSubmit={handleSubmit}>
                    <p className="rounded-md border border-[#8EB69B]/30
                    bg-[#0B2B26] dark:bg-gray-100 px-3 py-3 text-sm font-medium
                    text-[#DAF1DE] dark:text-gray-900">Member: {membership.member_name}</p>
                    <div>
                    <label htmlFor="renewalPlan" className={labelClass}>Membership Plan ID:</label>
                    <input required min="1" type="number" id="renewalPlan"
                    value={form.planId} onChange={(event) => setForm({ ...form, planId: event.target.value })} className={fieldClass} />
                    </div><div><label htmlFor="startDate" className={labelClass}>Start Date:</label><input required type="date" id="startDate" value={form.newDate} onChange={(event) => setForm({ ...form, newDate: event.target.value })} className={fieldClass} /></div>
                    <div><label className={labelClass}>Expiration Date:</label>
                    <p className="rounded-md border border-[#8EB69B]/30
                    bg-[#0B2B26] px-3 py-3 text-sm text-[#8EB69B]">The backend calculates the expiration date.</p></div>
                    {error && <p className="text-sm text-red-300">{error}</p>}<div className="flex flex-col-reverse gap-3 border-t border-[#8EB69B]/25 pt-5 sm:flex-row sm:justify-end"><Button buttonName="Cancel" buttonType="button" buttonSign="" callback={onClose}/><Button buttonName={saving ? "Renewing..." : "Renew"} buttonType="submit" buttonSign=""/></div></form></div></div>;
}

export default RenewMembershipModal;
