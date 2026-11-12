import { useLocale } from "../../i18n/useLocale";
import MemberForm from "../Members/MemberForm";

function AddMemberModal({onClose, onMemberSaved}) {
    const { t } = useLocale();
   
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center
         overflow-y-auto bg-black/40 dark:bg-black/70 px-4 py-6 backdrop-blur-sm">
            <div className="max-h-[calc(100vh-3rem)] w-full max-w-xl
             overflow-y-auto rounded-lg border 
              border-[#8EB69B]/25 dark:border-gray-200 bg-[#163832] dark:bg-white p-6
              shadow-2xl sm:p-7">
                <div className="flex items-center justify-between border-b
                 border-[#8EB69B]/25 pb-4">
                    <h2 className="text-xl font-semibold text-[#DAF1DE] dark:text-gray-900">{t("Add Member")}</h2>
                    {/* Necessary: type prevents this close control from submitting the form. */}
                    <button type="button" onClick={onClose} aria-label={t("Close modal")}
                    className="flex h-9 w-9 items-center justify-center
                     rounded-md text-[#8EB69B] dark:text-gray-600 transition-colors
                      hover:bg-[#235347] dark:hover:bg-gray-100 hover:text-[#DAF1DE] dark:hover:text-gray-900">×</button>
                </div>

                <MemberForm 
                    onClose={onClose}
                    onMemberSaved={onMemberSaved}
                />
            </div>-
        </div>
    );
};
export default AddMemberModal;
