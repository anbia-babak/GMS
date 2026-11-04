import { useEffect, useState } from "react";
import Button from "../Dashboard/Button";
import { getMembers } from "../../api/membersApi";
import { getMemberMemberships } from "../../api/membershipsApi";
import { addPayment } from "../../api/paymentsApi";
import { getApiErrorMessage } from "../../api/apiClient";

function AddPaymentModal({ member: initialMember, membership: initialMembership, onClose, onPaymentAdded }) {
     const fieldClass = `h-11 w-full rounded-md border
    border-[#8EB69B]/40 dark:border-gray-300 bg-[#0B2B26] dark:bg-white px-3 text-sm text-[#DAF1DE] dark:text-gray-900
    outline-none transition focus:border-[#8EB69B] dark:focus:border-gray-400 focus:ring-2
    focus:ring-[#8EB69B]/20`;
    const labelClass = `mb-2 block text-sm font-semibold
    text-[#DAF1DE] dark:text-gray-900`;
    const [members, setMembers] = useState(initialMember ? [initialMember] : []);
    const [memberships, setMemberships] = useState(initialMembership ? [initialMembership] : []);
    const [form, setForm] = useState({ member_id: initialMember?.member_id || "", membership_id: initialMembership?.membership_id || "", amount: "", payment_date: "", payment_method: "Cash" });
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!initialMember) getMembers().then(setMembers).catch(() => setError("Could not load members for this payment."));
    }, [initialMember]);

    useEffect(() => {
        if (!form.member_id || initialMembership) return;
        // Memberships are loaded after selecting a member so the payment cannot be attached to another member's plan.
        getMemberMemberships(form.member_id).then(setMemberships).catch(() => setError("Could not load this member's memberships."));
    }, [form.member_id, initialMembership]);

    function handleMemberChange(event) {
        // Clear the old membership before loading choices for the newly selected member.
        setForm({ ...form, member_id: event.target.value, membership_id: "" });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSaving(true);
        try {
            const payment = await addPayment({ ...form, member_id: Number(form.member_id), membership_id: Number(form.membership_id), amount: Number(form.amount) });
            onPaymentAdded?.(payment);
            onClose();
        } catch (requestError) {
            setError(getApiErrorMessage(requestError, "Could not record the payment."));
        } finally {
            setSaving(false);
        }
    }

    return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#051F20]/70 px-4 py-6 backdrop-blur-sm">
        <div className="max-h-[calc(100vh-3rem)] w-full max-w-lg overflow-y-auto rounded-lg border border-[#8EB69B]/25 bg-[#163832] dark:bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between border-b border-[#8EB69B]/25 pb-4">
        <h2 className="text-xl font-semibold text-[#DAF1DE] dark:text-gray-900">Record Payment</h2>
        <button type="button" onClick={onClose} aria-label="Close modal"
        className="flex h-9 w-9 items-center justify-center rounded-md text-[#8EB69B] dark:text-gray-600 transition-colors hover:bg-[#235347] dark:hover:bg-gray-100 hover:text-[#DAF1DE] dark:hover:text-gray-900">×</button>
        </div>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="member" className={labelClass}>Member:</label>
                <select required id="member" value={form.member_id} disabled={Boolean(initialMember)} onChange={handleMemberChange} className={fieldClass}>
                    <option value="">Choose a member</option>{members.map((member) => <option key={member.member_id} value={member.member_id}>{member.first_name} {member.last_name} — {member.phone}</option>)}</select>
                    </div>
                    <div>
                        <label htmlFor="membership" className={labelClass}>Membership:</label>
                        <select required id="membership" value={form.membership_id} disabled={Boolean(initialMembership)} onChange={(event) => setForm({ ...form, membership_id: event.target.value })} className={fieldClass}><option value="">Choose a membership</option>{memberships.map((membership) => <option key={membership.membership_id} value={membership.membership_id}>Membership #{membership.membership_id} ({String(membership.start_date).slice(0, 10)} to {String(membership.expiration_date).slice(0, 10)})</option>)}</select>
                        </div>
                        <div>
                            <label htmlFor="amount" className={labelClass}>Amount:</label>
                            <input required min="0.01" step="0.01" type="number" id="amount" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} className={fieldClass} />
                            </div>
                            <div>
                                <label htmlFor="paymentDate" className={labelClass}>Payment Date:</label><input required type="date" id="paymentDate" value={form.payment_date} onChange={(event) => setForm({ ...form, payment_date: event.target.value })} className={fieldClass} />
                                </div>
                                <div>
                                    <label htmlFor="paymentMethod" className={labelClass}>Payment Method:</label><select id="paymentMethod" value={form.payment_method} onChange={(event) => setForm({ ...form, payment_method: event.target.value })} className={fieldClass}><option value="Cash">Cash</option>
                                    <option value="Card">Card</option><option value="Bank Transfer">Bank Transfer</option></select>
                                    </div>{error && <p className="text-sm text-red-300">{error}</p>}<div className="flex justify-end border-t border-[#8EB69B]/25 pt-5"><Button buttonName={saving ? "Recording..." : "Record Payment"} buttonType="submit" buttonSign=""/></div></form></div></div>;
}

export default AddPaymentModal;
