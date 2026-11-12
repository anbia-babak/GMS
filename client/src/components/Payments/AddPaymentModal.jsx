import { useLocale } from "../../i18n/useLocale";
import { useEffect, useState } from "react";
import Button from "../Dashboard/Button";
import CustomSelect from "../Dashboard/CustomSelect";
import { getMembers } from "../../api/membersApi";
import { getMemberMemberships } from "../../api/membershipsApi";
import { addPayment } from "../../api/paymentsApi";
import { getApiErrorMessage } from "../../api/apiClient";

function AddPaymentModal({ member: initialMember, membership: initialMembership, onClose, onPaymentAdded }) {
    const { t, formatDate, formatNumber, translateError } = useLocale();
     const fieldClass = `h-11 w-full rounded-md border
    border-[#8EB69B]/40 dark:border-gray-300 bg-[#0B2B26] dark:bg-white px-3 text-sm text-[#DAF1DE] dark:text-gray-900
    outline-none transition focus:border-[#8EB69B] dark:focus:border-gray-400 focus:ring-2
    focus:ring-[#8EB69B]/20`;
    const labelClass = `mb-2 block text-sm font-semibold
    text-[#DAF1DE] dark:text-gray-900`;
    const [members, setMembers] = useState(initialMember ? [initialMember] : []);
    const [memberships, setMemberships] = useState(initialMembership ? [initialMembership] : []);
    const [form, setForm] = useState({ member_id: initialMember?.member_id || "", membership_id: initialMembership?.membership_id || "", amount: "", payment_date: "", payment_method: "Cash" });
    const [memberSearch, setMemberSearch] = useState(
    initialMember
        ? `${initialMember.first_name} ${initialMember.last_name} — ${initialMember.phone}`
        : ""
    );
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!initialMember) getMembers().then(setMembers).catch(() => setError("Could not load members for this payment."));
    }, [initialMember]);

    useEffect(() => {
    if (!form.member_id || initialMembership) return;

    let cancelled = false;

    // Memberships are loaded after selecting a member so the payment cannot be attached to another member's plan.
    getMemberMemberships(form.member_id)
        .then((data) => {
            if (!cancelled) setMemberships(data);
        })
        .catch(() => {
            if (!cancelled) {
                setError("Could not load this member's memberships.");
            }
        });

    return () => {
        cancelled = true;
    };
}, [form.member_id, initialMembership]);


    function handleMemberSearch(event) {
    setMemberSearch(event.target.value);

    setForm((prev) => ({
        ...prev,
        member_id: "",
        membership_id: "",
    }));

    setMemberships([]);
    setError("");
    }


    async function handleSubmit(event) {
        event.preventDefault();
        if (!form.member_id) {
            setError("Please select a member from the search results.");
            return;
        }

        if (!form.membership_id) {
            setError("Please select a membership.");
            return;
        }
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
        <h2 className="text-xl font-semibold text-[#DAF1DE] dark:text-gray-900">{t("Record Payment")}</h2>
        <button type="button" onClick={onClose} aria-label={t("Close modal")}
        className="flex h-9 w-9 items-center justify-center rounded-md text-[#8EB69B] dark:text-gray-600 transition-colors hover:bg-[#235347] dark:hover:bg-gray-100 hover:text-[#DAF1DE] dark:hover:text-gray-900">×</button>
        </div>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="paymentMember" className={labelClass}>{t("Member")}</label>

            <input
                required
                id="paymentMember"
                type="text"
                placeholder={t("Search by name or phone...")}
                value={memberSearch}
                onChange={handleMemberSearch}
                disabled={Boolean(initialMember)}
                className={fieldClass}
                autoComplete="off"
            />

            {memberSearch.trim() && !form.member_id && !initialMember && (
                <div className="mt-1 max-h-48 overflow-y-auto rounded-md border border-[#8EB69B]/30 bg-[#0B2B26] dark:bg-white">
                    {members
                        .filter((member) =>
                            `${member.first_name} ${member.last_name} ${member.phone}`
                                .toLowerCase()
                                .includes(memberSearch.trim().toLowerCase())
                        )
                        .map((member) => (
                            <button
                                key={member.member_id}
                                type="button"
                                onClick={() => {
                                    setForm((prev) => ({
                                        ...prev,
                                        member_id: String(member.member_id),
                                        membership_id: "",
                                    }));

                                    setMemberSearch(
                                        `${member.first_name} ${member.last_name} — ${member.phone}`
                                    );
                                }}
                                className="block w-full px-3 py-3 text-start text-sm text-[#DAF1DE] dark:text-gray-900 hover:bg-[#235347] dark:hover:bg-gray-100"
                            >
                                <span className="font-semibold">
                                    {member.first_name} {member.last_name}
                                </span>
                                <span className="ms-2 text-[#8EB69B] dark:text-gray-500">
                                    {member.phone}
                                </span>
                            </button>
                        ))}

                    {!members.some((member) =>
                        `${member.first_name} ${member.last_name} ${member.phone}`
                            .toLowerCase()
                            .includes(memberSearch.trim().toLowerCase())
                    ) && (
                        <p className="px-3 py-3 text-sm text-[#8EB69B]">{t("No members found.")}</p>
                    )}
                </div>
            )}
            </div>


            <div>
            <label htmlFor="paymentMembership" className={labelClass}>{t("Membership")}</label>
            <CustomSelect
                id="paymentMembership"
                value={form.membership_id}
                disabled={!form.member_id || Boolean(initialMembership)}
                onChange={(value) =>
                    setForm({ ...form, membership_id: value })
                }
                className={fieldClass}
                placeholder={
                    !form.member_id
                        ? t("Select a member first")
                        : memberships.length === 0
                            ? t("No memberships found")
                            : t("Select a membership")
                }
                options={memberships.map((membership) => ({
                    value: membership.membership_id,
                    label: `${t("Membership #{{id}}", { id: formatNumber(membership.membership_id, { useGrouping: false }) })} — ${t("{{start}} to {{end}}", { start: formatDate(membership.start_date), end: formatDate(membership.expiration_date) })}`,
                }))}
            />
            </div>
                        <div>
                            <label htmlFor="amount" className={labelClass}>{t("Amount")}</label>
                            <input required min="0.01" step="0.01" type="number" id="amount" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} className={fieldClass} />
                            </div>
                            <div>
                                <label htmlFor="paymentDate" className={labelClass}>{t("Payment Date")}</label><input required type="date" id="paymentDate" value={form.payment_date} onChange={(event) => setForm({ ...form, payment_date: event.target.value })} className={fieldClass} />
                                </div>
                                <div>
                                    <label htmlFor="paymentMethod" className={labelClass}>{t("Payment Method")}</label>
                                    <CustomSelect
                                        id="paymentMethod"
                                        value={form.payment_method}
                                        onChange={(value) =>
                                            setForm({ ...form, payment_method: value })
                                        }
                                        className={fieldClass}
                                        placeholder={t("Select payment method")}
                                        options={[
                                            { value: "Cash", label: t("Cash") },
                                            { value: "Card", label: t("Card") },
                                            { value: "Bank Transfer", label: t("Bank Transfer") },
                                        ]}
                                    />
                                    </div>{error && <p className="text-sm text-red-300">{translateError(error)}</p>}<div className="flex justify-end border-t border-[#8EB69B]/25 pt-5"><Button buttonName={saving ? t("Recording...") : t("Record Payment")} buttonType="submit" buttonSign=""/></div></form></div></div>;
}

export default AddPaymentModal;
