import Button from "../Dashboard/Button";



function AddMemberModal({onClose, onMemberAdded}) {
    const fieldClass = "h-11 w-full rounded-md border border-[#8EB69B]/40 bg-[#0B2B26] px-3 text-sm text-[#DAF1DE] outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/20";
    const labelClass = "mb-2 block text-sm font-semibold text-[#DAF1DE]";    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#051F20]/70 px-4 py-6 backdrop-blur-sm">
            <div className="max-h-[calc(100vh-3rem)] w-full max-w-xl overflow-y-auto rounded-lg border border-[#8EB69B]/25 bg-[#163832] p-6 shadow-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-[#8EB69B]/25 pb-4">
                    <h2 className="text-xl font-semibold text-[#DAF1DE]">Add Member</h2>
                    {/* Necessary: type prevents this close control from submitting the form. */}
                    <button type="button" onClick={onClose} aria-label="Close modal" className="flex h-9 w-9 items-center justify-center rounded-md text-[#8EB69B] transition-colors hover:bg-[#235347] hover:text-[#DAF1DE]">×</button>
                </div>

                <form action="#" className="mt-5 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(event)=>{
                    event.preventDefault();

                    // ADD MEMBER LOGIC

                    // It CLOSES AddMemberModal and OPENS AssignMembershipModal; WHEN the button is SUBMITTED!
                    onMemberAdded();
                }}>
                    {/* Necessary: each label and control are grouped so the two-column layout stays aligned. */}
                    <div>
                        <label htmlFor="fname" className={labelClass}>First Name:</label>
                        <input type="text" id="fname" className={fieldClass} />
                    </div>

                    <div>
                        <label htmlFor="lname" className={labelClass}>Last Name:</label>
                        <input type="text" id="lname" className={fieldClass} />
                    </div>

                    <div>
                        <label htmlFor="phone" className={labelClass}>Phone:</label>
                        <input type="tel" id="phone" pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}" className={fieldClass} />
                    </div>

                    <fieldset>
                        <legend className={labelClass}>Gender:</legend>
                        {/* Necessary: both radio controls share one name so only one gender can be selected. */}
                        <div className="flex h-11 items-center gap-6 rounded-md border border-[#8EB69B]/30 bg-[#0B2B26] px-3 text-sm text-[#DAF1DE]">
                            <label htmlFor="male" className="flex items-center gap-2">
                                <input type="radio" name="gender" id="male" value="male" className="h-4 w-4 accent-[#8EB69B]" />
                                Male
                            </label>
                            <label htmlFor="female" className="flex items-center gap-2">
                                <input type="radio" name="gender" id="female" value="female" className="h-4 w-4 accent-[#8EB69B]" />
                                Female
                            </label>
                        </div>
                    </fieldset>

                    <div>
                        <label htmlFor="dateOfBirth" className={labelClass}>Date of Birth:</label>
                        <input type="date" id="dateOfBirth" className={fieldClass} />
                    </div>

                    <div>
                        <label htmlFor="address" className={labelClass}>Address</label>
                        <input type="text" id="address" className={fieldClass} />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="joinDate" className={labelClass}>Join Date</label>
                        <input type="date" id="joinDate" className={fieldClass} />
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-[#8EB69B]/25 pt-5 sm:col-span-2 sm:flex-row sm:justify-end">
                        <Button buttonName="Close" buttonType="button" buttonSign="" callback={onClose} />
                        <Button buttonName="Add Member" buttonType="submit" buttonSign="+" />
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddMemberModal;