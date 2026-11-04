import Button from "../Dashboard/Button";


function DeactivateConfirmationModal({member, onClose, onDeactivatedMember, error, saving}) {
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center
         overflow-y-auto bg-[#051F20]/70 px-4 py-6 backdrop-blur-sm">
            <div className="max-h-[calc(100vh-3rem)] w-full max-w-xl
             overflow-y-auto rounded-lg border border-[#8EB69B]/25 dark:border-gray-200
              bg-[#163832] dark:bg-white text-[#DAF1DE] dark:text-gray-900 p-6 shadow-2xl sm:p-7">
                <div className="flex items-center justify-between border-b
                 border-[#8EB69B]/25 pb-4">
                    <h2 className="text-xl font-semibold text-[#DAF1DE] dark:text-gray-900">Member Deactivation</h2>
                    {/* Necessary: type prevents this close control from submitting the form. */}
                    <button type="button" onClick={onClose} aria-label="Close modal"
                    className="flex h-9 w-9 items-center justify-center
                     rounded-md text-[#8EB69B]  dark:text-gray-600 transition-colors
                      hover:bg-[#235347] dark:hover:bg-gray-100 hover:text-[#DAF1DE] dark:hover:text-gray-900">×</button>
                </div>
                <div className="space-y-3 py-6">
                    <p className="break-words text-[#DAF1DE] dark:text-gray-700 font-semibold leading-7">Are you sure you want to deactivate {member.first_name} {member.last_name}?</p>
                    <p className="text-sm leading-6 opacity-75">The member's history and payment records will remain preserved.</p>
                </div>
                
                {error && <p className="pb-3 text-sm text-red-300">{error}</p>}
                <div className="flex flex-col-reverse gap-3 border-t
                 border-inherit pt-5 sm:flex-row sm:justify-end [&>*]:w-full
                  sm:[&>*]:w-auto [&_button]:min-h-11 [&_button]:rounded-md
                   [&_button]:px-5 [&_button]:text-sm [&_button]:font-semibold">
                <Button buttonName="Cancel" buttonSign="" buttonType="button" callback={onClose}/>
                <Button buttonName={saving ? "Deactivating..." : "Deactivate"} buttonSign="" buttonType="button" callback={onDeactivatedMember}/>
                </div>

            </div>
        </div>
    );
};
export default DeactivateConfirmationModal;
