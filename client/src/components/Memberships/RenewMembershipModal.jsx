import { useLocale } from "../../i18n/useLocale";
import { useState , useEffect} from "react";
import Button from "../Dashboard/Button";
import { renewMembership, getMembershipPlans } from "../../api/membershipsApi";
import CustomSelect from "../Dashboard/CustomSelect";
import { getApiErrorMessage } from "../../api/apiClient";

function RenewMembershipModal({ membership, onClose, onRenewedMembership }) {
    const { t, translateError } = useLocale();
    const fieldClass = `h-11 w-full rounded-md border
    border-[#8EB69B]/40 dark:border-gray-300 bg-[#0B2B26] dark:bg-white px-3 text-sm text-[#DAF1DE] dark:text-gray-900
    outline-none transition focus:border-[#8EB69B] dark:focus:border-gray-400 focus:ring-2
    focus:ring-[#8EB69B]/20`;
    const labelClass = `mb-2 block text-sm font-semibold
    text-[#DAF1DE] dark:text-gray-900`;

    function getRenewalStartDate() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (membership.expiration_date) {
            const currentExpiration = new Date(
                `${membership.expiration_date.slice(0, 10)}T00:00:00`
            );

            if (currentExpiration >= today) {
                currentExpiration.setDate(currentExpiration.getDate() + 1);

                const year = currentExpiration.getFullYear();
                const month = String(currentExpiration.getMonth() + 1).padStart(2, "0");
                const day = String(currentExpiration.getDate()).padStart(2, "0");

                return `${year}-${month}-${day}`;
            }
        }

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const [plans, setPlans] = useState([]);
    const [form, setForm] = useState({ planId: "", newDate: getRenewalStartDate(),});
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() =>{
        getMembershipPlans()
            .then(setPlans)
            .catch(() => setError("Could not load membership plans."));
    }, []);

    const selectedPlan = plans.find(
    (plan) => String(plan.plan_id) === String(form.planId)
    );

    const calculatedExpirationDate = (() => {
        if (!form.newDate || !selectedPlan) return "";

        const [year, month, day] = form.newDate.split("-").map(Number);

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
                <h2 className="text-xl font-semibold text-[#DAF1DE] dark:text-gray-900">{t("Renew Membership")}</h2>
                <button type="button" onClick={onClose}
                aria-label={t("Close modal")} className="flex h-9 w-9
                items-center justify-center rounded-md text-[#8EB69B] dark:text-gray-600 
                transition-colors hover:bg-[#235347] dark:hover:bg-gray-100
                hover:text-[#DAF1DE] dark:hover:text-gray-900">×</button>
                </div>
                <form className="mt-5 space-y-4" 
                onSubmit={handleSubmit}>
                    <p className="rounded-md border border-[#8EB69B]/30
                    bg-[#0B2B26] dark:bg-gray-100 px-3 py-3 text-sm font-medium
                    text-[#DAF1DE] dark:text-gray-900">{t("Member")}: <bdi>{membership.member_name}</bdi></p>
                <div>
                    <label htmlFor="renewalPlan" className={labelClass}>{t("Membership Plan")}</label>

                    <CustomSelect
                        id="renewalPlan"
                        value={form.planId}
                        onChange={(value) =>
                            setForm({ ...form, planId: value })
                        }
                        className={fieldClass}
                        placeholder={t("Select a membership plan")}
                        options={plans.map((plan) => ({
                            value: plan.plan_id,
                            label: plan.plan_name,
                        }))}
                    />
                    </div>
                    <div><label htmlFor="startDate" className={labelClass}>{t("Start Date")}</label><input required type="date" id="startDate" value={form.newDate} onChange={(event) => setForm({ ...form, newDate: event.target.value })} className={fieldClass} /></div>
                    <div>
                    <label htmlFor="renewalExpiration" className={labelClass}>{t("Expiration Date")}</label>

                    <input
                        type="date"
                        id="renewalExpiration"
                        value={calculatedExpirationDate}
                        readOnly
                        className={`${fieldClass} cursor-not-allowed opacity-80`}
                    />
                    </div>

                    {error && <p className="text-sm text-red-300">{translateError(error)}</p>}<div className="flex flex-col-reverse gap-3 border-t border-[#8EB69B]/25 pt-5 sm:flex-row sm:justify-end"><Button buttonName={t("Cancel")} buttonType="button" buttonSign="" callback={onClose}/><Button buttonName={saving ? t("Renewing...") : t("Renew")} buttonType="submit" buttonSign=""/></div></form></div></div>;
}

export default RenewMembershipModal;
