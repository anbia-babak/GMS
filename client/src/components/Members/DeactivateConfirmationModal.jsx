import Button from "../Dashboard/Button";


function DeactivateConfirmationModal({member, onClose, onDeactivatedMember}) {
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#051F20]/70 px-4 py-6 backdrop-blur-sm">
            <div className="max-h-[calc(100vh-3rem)] w-full max-w-xl overflow-y-auto rounded-lg border border-[#8EB69B]/25 bg-[#163832] p-6 shadow-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-[#8EB69B]/25 pb-4">
                    <h2 className="text-xl font-semibold text-[#DAF1DE]">Member Deactivation</h2>
                    {/* Necessary: type prevents this close control from submitting the form. */}
                    <button type="button" onClick={onClose} aria-label="Close modal"
                    className="flex h-9 w-9 items-center justify-center rounded-md text-[#8EB69B] transition-colors hover:bg-[#235347] hover:text-[#DAF1DE]">×</button>
                </div>
                <div>
                    <p>Are you sure you want to deactivate {member}?</p>
                    <p>The member's history and payment records will remain preserved.</p>
                </div>
                
                <Button buttonName="Cancel" buttonSign="" buttonType="button" callback={onClose}/>
                <Button buttonName="Deactivate" buttonSign="" buttonType="button" callback={onDeactivatedMember}/>

            </div>
        </div>
    );
};
export default DeactivateConfirmationModal;