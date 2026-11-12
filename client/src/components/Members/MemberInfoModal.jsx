import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useLocale } from "../../i18n/useLocale";
import avatar1 from "../../assets/user-avatars/user-avatar-1.JPG";
import avatar2 from "../../assets/user-avatars/user-avatar-2.JPG";
import avatar3 from "../../assets/user-avatars/user-avatar-3.JPG";
import avatar4 from "../../assets/user-avatars/user-avatar-4.JPG";
import avatar5 from "../../assets/user-avatars/user-avatar-5.JPG";
import avatar6 from "../../assets/user-avatars/user-avatar-6.JPG";
import avatar7 from "../../assets/user-avatars/user-avatar-7.JPG";
import Button from "../Dashboard/Button";

const infoLabels = [
    {label: "First Name", value: "info"},
    {label: "Last Name", value: "info" },
    {label: "Phone", value: "info"},
    {label: "Gender", value: "info"},
    {label: "Date of Birth", value: "info"},
    {label: "Address", value: "info"},
    {label: "Join Date", value: "info"},
    {label: "Status", value: "info"},
];

function MemberInfoModal({member, onClose, onMemberEdited, onMemberDeactivated}) {
    const { t, formatNumber, formatDate, translateValue } = useLocale();
    const closeButton = useRef(null);
    
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];
    const avatarNumber =  member?.avatar_number || 1;
    const randomAvatar = avatars[avatarNumber - 1];

    useEffect(() => {
        const previousFocus = document.activeElement;
        closeButton.current?.focus();
        function handleKeyDown(event) {
            if (event.key === "Escape") onClose();
            if (event.key !== "Tab") return;
            const buttons = closeButton.current?.closest('[role="dialog"]')?.querySelectorAll("button:not(:disabled)");
            if (!buttons?.length) return;
            if (event.shiftKey && document.activeElement === buttons[0]) {
                event.preventDefault(); buttons[buttons.length - 1].focus();
            } else if (!event.shiftKey && document.activeElement === buttons[buttons.length - 1]) {
                event.preventDefault(); buttons[0].focus();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previousFocus?.focus?.();
        };
    }, [onClose]);

    return(
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#051F20]/70 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <section role="dialog" aria-modal="true" aria-labelledby="member-details-title" className="max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto rounded-xl border border-[#8EB69B]/25 bg-[#163832] p-5 text-[#DAF1DE] shadow-2xl dark:border-gray-200 dark:bg-white dark:text-gray-900 sm:p-7">
                <header className="mb-4 flex items-center justify-between gap-4 border-b border-[#8EB69B]/25 pb-4 dark:border-gray-200">
                    <h2 id="member-details-title" className="text-xl font-bold">{t("Member Information")}</h2>
                    <button ref={closeButton} type="button" onClick={onClose} aria-label={t("Close modal")} className="grid size-10 shrink-0 place-items-center rounded-md text-[#8EB69B] transition-colors hover:bg-[#235347] hover:text-white dark:text-gray-600 dark:hover:bg-gray-100 dark:hover:text-gray-900"><X size={20} aria-hidden="true" /></button>
                </header>
                <div className="mb-2 flex flex-col items-center gap-2 rounded-xl bg-[#0B2B26]/50 py-4 text-center dark:bg-gray-50">
                    <img src={randomAvatar} alt={t("{{name}}'s avatar", { name: member.first_name })}
                        className="size-20 rounded-full border-2 border-[#8EB69B]/50 object-cover"
                    />
                    <p className="break-words text-lg font-semibold">{member.first_name} {member.last_name}</p>
                    <p className="text-xs opacity-70">{t("Member #{{id}}", { id: formatNumber(member.member_id, { useGrouping: false }) })}</p>
                </div>
                <div className="py-2">
                    <dl className="divide-y divide-[#8EB69B]/20 dark:divide-gray-200">
                        {infoLabels.map((label) => {
                            const fieldByLabel = {
                                "First Name": "first_name", "Last Name": "last_name", Phone: "phone", Gender: "gender",
                                "Date of Birth": "date_of_birth", Address: "address", "Join Date": "join_date", Status: "status",
                            };
                            const field = fieldByLabel[label.label];
                            const value = member[field];
                            const displayValue = field.endsWith("_date") || field === "date_of_birth"
                                ? formatDate(value)
                                : field === "gender" || field === "status" ? translateValue(value) : value;
                            return <div key={label.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-start gap-4 py-3 text-sm leading-6">
                                <dt className="break-words font-semibold text-[#8EB69B] dark:text-gray-600">{t(label.label)}</dt>
                                <dd className="m-0 min-w-0 break-words text-end font-medium">{displayValue ? <bdi>{displayValue}</bdi> : "—"}</dd>
                            </div>
                        })}

                    </dl>
                </div>

                <footer className="flex flex-col-reverse gap-3 border-t border-[#8EB69B]/25 pt-5 dark:border-gray-200 sm:flex-row sm:justify-end [&>*]:w-full sm:[&>*]:w-auto [&_button]:min-h-11 [&_button]:rounded-md [&_button]:px-5 [&_button]:text-sm [&_button]:font-semibold">
                <Button buttonName={t("Edit")} buttonSign="" buttonType="button" callback={onMemberEdited}/>
                <Button buttonName={t("Deactivate")} buttonSign="" buttonType="button" callback={onMemberDeactivated}/>
                <Button buttonName={t("Close")} buttonSign="" buttonType="button" callback={onClose}/>
                </footer>
            </section>
        </div>
    );
};
export default MemberInfoModal;
