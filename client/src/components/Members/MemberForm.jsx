import { useLocale } from "../../i18n/useLocale";
import { useState } from "react";
import Button from "../Dashboard/Button";
import { addMember, editSpecificMember } from "../../api/membersApi";
import { getApiErrorMessage } from "../../api/apiClient";

function toDateInputValue(value) {
    return value ? String(value).slice(0, 10) : "";
}

function MemberForm({ member, onClose, onMemberSaved }) {
    const { t, translateError } = useLocale();
    // One form supports add and edit so both flows send the same backend field names.
    const [form, setForm] = useState({
        first_name: member?.first_name || "",
        last_name: member?.last_name || "",
        phone: member?.phone || "",
        gender: member?.gender || "",
        date_of_birth: toDateInputValue(member?.date_of_birth),
        address: member?.address || "",
        join_date: toDateInputValue(member?.join_date),
    });
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    
    const fieldClass = `h-11 w-full rounded-md border border-[#235437] dark:border-gray-300
     dark:border-[#8EB69B]/40 
     bg-[#0B2B26] dark:bg-white px-3 text-sm dark:text-gray-900 text-[#DAF1DE]
     outline-none transition
     focus:border-[#8EB69B] focus:ring-2 dark:focus:ring-[#8EB69B]/20`;
    const labelClass = `mb-2 block text-sm font-semibold text-[#DAF1DE]
     dark:text-gray-900`; 

    return(
    <form className="mt-5 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setSaving(true);
        try {
            // The server owns member validation; this component only sends its documented snake_case payload.
            const savedMember = member
                ? await editSpecificMember(member.member_id, form)
                : await addMember({ ...form, status: "Active" });
            onMemberSaved(savedMember);
        } catch (requestError) {
            setError(getApiErrorMessage(requestError, "Could not save the member. Please try again."));
        } finally {
            setSaving(false);
        }
        }}>
        {/* Necessary: each label and control are grouped so the two-column layout stays aligned. */}
        <div>
            <label htmlFor="fname" className={labelClass}>{t("First Name")}</label>
            <input required type="text" id="fname" value={form.first_name} onChange={(event) => setForm({ ...form, first_name: event.target.value })} className={fieldClass} />
        </div>

        <div>
            <label htmlFor="lname" className={labelClass}>{t("Last Name")}</label>
            <input required type="text" id="lname" value={form.last_name} onChange={(event) => setForm({ ...form, last_name: event.target.value })} className={fieldClass} />
        </div>

        <div>
            <label htmlFor="phone" className={labelClass}>{t("Phone")}</label>
            <input required type="tel" id="phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className={fieldClass} />
        </div>

        <fieldset>
            <legend className={labelClass}>{t("Gender")}</legend>
            {/* Necessary: both radio controls share one name so only one gender can be selected. */}
            <div className="flex h-11 items-center gap-6 rounded-md border
             border-[#235347] dark:border-gray-300 bg-[#0B2B26] dark:bg-white px-3 text-sm text-[#DAF1DE] dark:text-gray-900">
                <label htmlFor="male" className="flex items-center gap-2">
                    <input required type="radio" name="gender" id="male" value="male" checked={form.gender === "male"} onChange={(event) => setForm({ ...form, gender: event.target.value })} className="h-4 w-4 accent-[#8EB69B] dark:accent-gray-700" />{t("Male")}</label>
                <label htmlFor="female" className="flex items-center gap-2">
                    <input required type="radio" name="gender" id="female" value="female" checked={form.gender === "female"} onChange={(event) => setForm({ ...form, gender: event.target.value })} className="h-4 w-4 accent-[#8EB69B] dark:accent-gray-700" />{t("Female")}</label>
            </div>
        </fieldset>

        <div>
            <label htmlFor="dateOfBirth" className={labelClass}>{t("Date of Birth")}</label>
            <input required type="date" id="dateOfBirth" value={form.date_of_birth} onChange={(event) => setForm({ ...form, date_of_birth: event.target.value })} className={fieldClass} />
        </div>

        <div>
            <label htmlFor="address" className={labelClass}>{t("Address")}</label>
            <input required type="text" id="address" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className={fieldClass} />
        </div>

        <div className="sm:col-span-2">
            <label htmlFor="joinDate" className={labelClass}>{t("Join Date")}</label>
            <input required type="date" id="joinDate" value={form.join_date} onChange={(event) => setForm({ ...form, join_date: event.target.value })} className={fieldClass} />
        </div>

        {error && <p className="text-sm text-red-300 sm:col-span-2">{translateError(error)}</p>}

        <div className="flex flex-col-reverse gap-3 border-t border-[#8EB69B]/25 pt-5 sm:col-span-2 sm:flex-row sm:justify-end">
            <Button buttonName={t("Close")} buttonType="button" buttonSign="" callback={onClose} />
            <Button buttonName={saving ? t("Saving...") : member ? t("Save Changes") : t("Add Member")} buttonType="submit" buttonSign="" />
        </div>
    </form>
    );
};
export default MemberForm;
