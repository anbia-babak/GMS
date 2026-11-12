import { useLocale } from "../../i18n/useLocale";
import { useEffect, useState } from "react";
import Button from "../Dashboard/Button";
import { getMembers } from "../../api/membersApi";
import { addMembership, getMembershipPlans } from "../../api/membershipsApi";
import CustomSelect from "../Dashboard/CustomSelect";
import { getApiErrorMessage } from "../../api/apiClient";

function AddMembershipModal({ member: initialMember, onClose, onMembershipAssigned }) {
    const { t, translateError } = useLocale();
    const fieldClass = `h-11 w-full rounded-md border
    border-[#8EB69B]/40 dark:border-gray-300 bg-[#0B2B26] dark:bg-white px-3 text-sm text-[#DAF1DE] dark:text-gray-900
    outline-none transition focus:border-[#8EB69B] dark:focus:border-gray-400 focus:ring-2
    focus:ring-[#8EB69B]/20`;
    const labelClass = `mb-2 block text-sm font-semibold
    text-[#DAF1DE] dark:text-gray-900`;
    const [members, setMembers] = useState(initialMember ? [initialMember] : []);
    const [memberId, setMemberId] = useState(initialMember?.member_id || "");
    const [memberSearch, setMemberSearch] = useState(
    initialMember
        ? `${initialMember.first_name} ${initialMember.last_name} — ${initialMember.phone}`
        : "");

    const [form, setForm] = useState({ plan_id: "", start_date: "", expiration_date: "" });
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [plans, setPlans] = useState([]);

    // For loading members:
    useEffect(() => {
        if (initialMember) return;
        getMembers().then(setMembers).catch(() => setError("Could not load members for this membership."));
    }, [initialMember]);
    // For loading membership plans:
    useEffect(() => {
        getMembershipPlans()
        .then(setPlans)
        .catch(() => {
        setError("Could not load membership plans.");
    });
    }, []);

    function handleMemberSearch(event) {
    setMemberSearch(event.target.value);
    setMemberId("");
    }


    const selectedPlan = plans.find(
    (plan) => String(plan.plan_id) === String(form.plan_id)
    );

    // Calculating automatically the expiration date:
    const calculatedExpirationDate = (() => {
        if (!form.start_date || !selectedPlan) return "";

        const [year, month, day] = form.start_date.split("-").map(Number);

        const targetMonth = month - 1 + Number(selectedPlan.duration_month);
        const targetYear = year + Math.floor(targetMonth / 12);
        const finalMonth = targetMonth % 12;

        const lastDay = new Date(
            Date.UTC(targetYear, finalMonth + 1, 0)
        ).getUTCDate();

        const expirationDay = Math.min(day, lastDay);

        return [
            targetYear,
            String(finalMonth + 1).padStart(2, "0"),
            String(expirationDay).padStart(2, "0"),
        ].join("-");
    })();


    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSaving(true);
        try {
            // The API requires an explicit expiration date, so the UI must not guess a plan duration.
            const membership = await addMembership({ member_id: Number(memberId), plan_id: Number(form.plan_id), start_date: form.start_date});
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
            <h2 className="text-xl font-semibold text-[#DAF1DE] dark:text-gray-900">{t("Assign Membership")}</h2>
            <button type="button" onClick={onClose} aria-label={t("Close modal")} className="flex h-9 w-9 items-center justify-center rounded-md text-[#8EB69B] dark:text-gray-600 transition-colors hover:bg-[#235347] dark:hover:bg-gray-100 hover:text-[#DAF1DE] dark:hover:text-gray-900">×</button></div>
            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="membershipMember" className={labelClass}>{t("Member")}</label>

                    <input
                        required
                        id="membershipMember"
                        type="text"
                        placeholder={t("Search by name or phone...")}
                        value={memberSearch}
                        onChange={handleMemberSearch}
                        disabled={Boolean(initialMember)}
                        className={fieldClass}
                        autoComplete="off"
                    />

                    {memberSearch.trim() && !memberId && !initialMember && (
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
                                            setMemberId(member.member_id);
                                            setMemberSearch(
                                                `${member.first_name} ${member.last_name} — ${member.phone}`
                                            );
                                        }}
                                        className="block w-full px-3 py-3 text-start text-sm text-[#DAF1DE] dark:text-gray-900 transition hover:bg-[#235347] dark:hover:bg-gray-100"
                                    >
                                        <span className="font-semibold">
                                            {member.first_name} {member.last_name}
                                        </span>
                                        <span className="ms-2 text-[#8EB69B] dark:text-gray-500">
                                            {member.phone}
                                        </span>
                                    </button>
                                ))}

                            {members.filter((member) =>
                                `${member.first_name} ${member.last_name} ${member.phone}`
                                    .toLowerCase()
                                    .includes(memberSearch.trim().toLowerCase())
                            ).length === 0 && (
                                <p className="px-3 py-3 text-sm text-[#8EB69B] dark:text-gray-500">{t("No members found.")}</p>
                            )}
                        </div>
                    )}
                </div>
                <div><label htmlFor="membershipPlan" className={labelClass}>{t("Membership Plan")}</label>
                <CustomSelect
                    id="membershipPlan"
                    value={form.plan_id}
                    onChange={(value) =>
                        setForm({ ...form, plan_id: value })
                    }
                    disabled={!memberId}
                    className={fieldClass}
                    placeholder={t("Select a membership plan")}
                    options={plans.map((plan) => ({
                        value: plan.plan_id,
                        label: plan.plan_name,
                    }))}
                />
                </div>
                <div><label htmlFor="startDate" className={labelClass}>{t("Start Date")}</label><input required type="date" id="startDate" value={form.start_date} onChange={(event) => setForm({ ...form, start_date: event.target.value })} className={fieldClass} /></div>
                <div>
                    <label htmlFor="expirationDate" className={labelClass}>{t("Expiration Date")}</label>

                    <input
                        type="date"
                        id="expirationDate"
                        value={calculatedExpirationDate}
                        readOnly
                        className={`${fieldClass} cursor-not-allowed opacity-80`}
                    />
                </div>
                {error && <p className="text-sm text-red-300">{translateError(error)}</p>}
                <div className="flex flex-col-reverse gap-3
                border-t border-[#8EB69B]/25 pt-5 sm:flex-row
                sm:justify-end"><Button buttonName={t("Close")} buttonType="button" buttonSign="" callback={onClose}/><Button buttonName={saving ? t("Assigning...") : t("Assign Membership")} buttonType="submit" buttonSign=""/></div>
            </form>
        </div>
    </div>;
}

export default AddMembershipModal;
