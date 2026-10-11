import Button from "../Dashboard/Button";


function DeactivateConfirmationModal({member, onClose, onDeactivatedMember}) {
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#051F20]/70 px-4 py-6 backdrop-blur-sm">
            <div className="max-h-[calc(100vh-3rem)] w-full max-w-xl overflow-y-auto rounded-lg border border-[#8EB69B]/25 bg-[#163832] text-primary-foreground p-6 shadow-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-[#8EB69B]/25 pb-4">
                    <h2 className="text-xl font-semibold text-[#DAF1DE]">Member Deactivation</h2>
                    {/* Necessary: type prevents this close control from submitting the form. */}
                    <button type="button" onClick={onClose} aria-label="Close modal"
                    className="flex h-9 w-9 items-center justify-center rounded-md text-[#8EB69B] transition-colors hover:bg-[#235347] hover:text-[#DAF1DE]">×</button>
                </div>
                <div className="space-y-3 py-6">
                    <p className="break-words text-base font-semibold leading-7">Are you sure you want to deactivate {member}?</p>
                    <p className="text-sm leading-6 opacity-75">The member's history and payment records will remain preserved.</p>
                </div>
                
                <div className="flex flex-col-reverse gap-3 border-t border-inherit pt-5 sm:flex-row sm:justify-end [&>*]:w-full sm:[&>*]:w-auto [&_button]:min-h-11 [&_button]:rounded-md [&_button]:px-5 [&_button]:text-sm [&_button]:font-semibold">
                <Button buttonName="Cancel" buttonSign="" buttonType="button" callback={onClose}/>
                <Button buttonName="Deactivate" buttonSign="" buttonType="button" callback={onDeactivatedMember}/>
                </div>

            </div>
        </div>
    );
};
export default DeactivateConfirmationModal;