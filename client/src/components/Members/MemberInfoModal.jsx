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
            <div className="max-h-[calc(100vh-3rem)] w-full max-w-xl overflow-y-auto rounded-lg border border-[#8EB69B]/25 bg-[#163832] p-6 shadow-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-[#8EB69B]/25 pb-4">
                    <h2 className="text-xl font-semibold text-[#DAF1DE]">Member Information</h2>
                    {/* Necessary: type prevents this close control from submitting the form. */}
                    <button type="button" onClick={onClose} aria-label="Close modal"
                    className="flex h-9 w-9 items-center justify-center rounded-md text-[#8EB69B] transition-colors hover:bg-[#235347] hover:text-[#DAF1DE]">×</button>
                </div>
                <div>
                    <p>AVATAR</p>
                    <p>Member's Name</p>
                    <p>Member's ID</p>
                </div>
                <div>
                    <div>
                        {infoLabels.map((label)=>(
                            <div className="flex justify-between">
                                <p>{label.label}</p>
                                <p>{label.value}</p>
                            </div>
                        ))}
                        
                    </div>
                </div>
                
                <Button buttonName="Edit" buttonSign="" buttonType="button" callback={onMemberEdited}/>
                <Button buttonName="Deactivate" buttonSign="" buttonType="button" callback={onMemberDeactivated}/>
                <Button buttonName="Okay" buttonSign="" buttonType="button" callback={onClose}/>
            </div>
        </div>
    );
};
export default MemberInfoModal;