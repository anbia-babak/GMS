import { useEffect, useState } from "react";
import Button from "../Dashboard/Button";
import { getMembers } from "../../api/membersApi";
import { addMembership } from "../../api/membershipsApi";
import { getApiErrorMessage } from "../../api/apiClient";

function AddMembershipModal({ member: initialMember, onClose, onMembershipAssigned }) {
    const fieldClass = `h-11 w-full rounded-md border
    border-[#8EB69B]/40 dark:border-gray-300 bg-[#0B2B26] dark:bg-white px-3 text-sm text-[#DAF1DE] dark:text-gray-900
    outline-none transition focus:border-[#8EB69B] dark:focus:border-gray-400 focus:ring-2
    focus:ring-[#8EB69B]/20`;
    const labelClass = `mb-2 block text-sm font-semibold
    text-[#DAF1DE] dark:text-gray-900`;
    const [members, setMembers] = useState(initialMember ? [initialMember] : []);
    const [memberId, setMemberId] = useState(initialMember?.member_id || "");
    const [form, setForm] = useState({ plan_id: "", start_date: "", expiration_date: "" });
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initialMember) return;
        getMembers().then(setMembers).catch(() => setError("Could not load members for this membership."));
    }, [initialMember]);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSaving(true);
        try {
            // The API requires an explicit expiration date, so the UI must not guess a plan duration.
            const membership = await addMembership({ member_id: Number(memberId), plan_id: Number(form.plan_id), start_date: form.start_date, expiration_date: form.expiration_date });
            onMembershipAssigned(membership);
        } catch (requestError) {
            setError(getApiErrorMessage(requestError, "Could not assign the membership."));
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
            <h2 className="text-xl font-semibold text-[#DAF1DE] dark:text-gray-900">Assign Membership</h2>
            <button type="button" onClick={onClose} aria-label="Close modal" className="flex h-9 w-9 items-center justify-center rounded-md text-[#8EB69B] dark:text-gray-600 transition-colors hover:bg-[#235347] dark:hover:bg-gray-100 hover:text-[#DAF1DE] dark:hover:text-gray-900">×</button></div>
            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <div><label htmlFor="membershipMember" className={labelClass}>Member:</label><select required className="!bg-[#163832]" id="membershipMember" value={memberId} onChange={(event) => setMemberId(event.target.value)} disabled={Boolean(initialMember)} ><option value="">Choose a member</option>{members.map((member) => <option key={member.member_id} value={member.member_id}>{member.first_name} {member.last_name}</option>)}</select></div>
                <div><label htmlFor="membershipPlan" className={labelClass}>Membership Plan ID:</label><input required min="1" type="number" id="membershipPlan" value={form.plan_id} onChange={(event) => setForm({ ...form, plan_id: event.target.value })} className={fieldClass} /></div>
                <div><label htmlFor="startDate" className={labelClass}>Start Date:</label><input required type="date" id="startDate" value={form.start_date} onChange={(event) => setForm({ ...form, start_date: event.target.value })} className={fieldClass} /></div>
                <div><label htmlFor="expirationDate" className={labelClass}>Expiration Date:</label><input required type="date" id="expirationDate" value={form.expiration_date} onChange={(event) => setForm({ ...form, expiration_date: event.target.value })} className={fieldClass} /></div>
                {error && <p className="text-sm text-red-300">{error}</p>}
                <div className="flex flex-col-reverse gap-3
                border-t border-[#8EB69B]/25 pt-5 sm:flex-row
                sm:justify-end"><Button buttonName="Close" buttonType="button" buttonSign="" callback={onClose}/><Button buttonName={saving ? "Assigning..." : "Assign Membership"} buttonType="submit" buttonSign=""/></div>
            </form>
        </div>
    </div>;
}

export default AddMembershipModal;
