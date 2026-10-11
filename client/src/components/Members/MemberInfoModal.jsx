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
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#051F20]/70 px-4 py-6 backdrop-blur-sm">
            <div className="max-h-[calc(100vh-3rem)] w-full max-w-xl overflow-y-auto rounded-lg border border-[#8EB69B]/25 bg-[#163832] text-primary-foreground p-6 shadow-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-[#8EB69B]/25 pb-4">
                    <h2 className="text-xl font-semibold text-[#DAF1DE]">Member Information</h2>
                    {/* Necessary: type prevents this close control from submitting the form. */}
                    <button type="button" onClick={onClose} aria-label="Close modal"
                    className="flex h-9 w-9 items-center justify-center rounded-md text-[#8EB69B] transition-colors hover:bg-[#235347] hover:text-[#DAF1DE]">×</button>
                </div>
                <div className="flex flex-col items-center gap-2 border-b border-inherit py-6 text-center">
                    <p className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">AVATAR</p>
                    <p className="break-words text-lg font-semibold">Member's Name</p>
                    <p className="text-xs opacity-70">Member's ID</p>
                </div>
                <div className="py-3">
                    <div className="divide-y divide-border/25">
                        {infoLabels.map((label)=>(
                            <div className="grid grid-cols-2 items-start gap-4 py-3 text-sm leading-6">
                                <p className="break-words opacity-70">{label.label}</p>
                                <p className="min-w-0 break-words text-right font-medium">{label.value}</p>
                            </div>
                        ))}
                        
                    </div>
                </div>
                
                <div className="flex flex-col gap-3 border-t border-inherit pt-5 sm:flex-row sm:justify-end [&>*]:w-full sm:[&>*]:w-auto [&_button]:min-h-11 [&_button]:rounded-md [&_button]:px-5 [&_button]:text-sm [&_button]:font-semibold">
                <Button buttonName="Edit" buttonSign="" buttonType="button" callback={onMemberEdited}/>
                <Button buttonName="Deactivate" buttonSign="" buttonType="button" callback={onMemberDeactivated}/>
                <Button buttonName="Okay" buttonSign="" buttonType="button" callback={onClose}/>
                </div>
            </div>
        </div>
    );
};
export default MemberInfoModal;