import PlanSearchFilter from "../Memberships/PlanSearchFilter"
import Button from "../Dashboard/Button"

function AddPaymentModal({onClose}) {

    const fieldClass = "h-11 w-full rounded-md border border-[#8EB69B]/40 bg-[#0B2B26] px-3 text-sm text-[#DAF1DE] outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/20";
    const labelClass = "mb-2 block text-sm font-semibold text-[#DAF1DE]";

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#051F20]/70 px-4 py-6 backdrop-blur-sm">
            <div className="max-h-[calc(100vh-3rem)] w-full max-w-lg overflow-y-auto rounded-lg border border-[#8EB69B]/25 bg-[#163832] p-6 shadow-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-[#8EB69B]/25 pb-4">
                    <h2 className="text-xl font-semibold text-[#DAF1DE]">Record Payment</h2>
                    {/* Necessary: type prevents this close control from submitting the form. */}
                    <button type="button" onClick={onClose} aria-label="Close modal" className="flex h-9 w-9 items-center justify-center rounded-md text-[#8EB69B] transition-colors hover:bg-[#235347] hover:text-[#DAF1DE]">×</button>
                </div>

                <p className="mt-4 text-sm text-[#8EB69B]">Record Payment</p>
                <form action="#" className="mt-5 space-y-4">
                    <div>
                        <label htmlFor="member" className={labelClass}>Member:</label>
                        <input type="text" id="member" className={fieldClass} />
                    </div>

                    <div>
                        <label htmlFor="membershipPlan" className={labelClass}>Membership:</label>
                        {/* Necessary: the wrapper forces the existing filter control to fill the modal width. */}
                        <div className="w-full [&>*]:w-full [&_input]:w-full [&_select]:w-full">
                            <PlanSearchFilter id="membershipPlan" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="amount" className={labelClass}>Amount:</label>
                        <input type="number" id="amount" className={fieldClass} />
                    </div>

                    <div>
                        <label htmlFor="paymentDate" className={labelClass}>Payment Date:</label>
                        <input type="date" id="paymentDate" className={fieldClass} />
                    </div>

                    <div>
                        <label htmlFor="paymentMethod" className={labelClass}>Payment Method:</label>
                        <select name="paymentMethod" id="paymentMethod" className={fieldClass}>
                            <option value="cash">Cash</option>
                        </select>
                    </div>

                    <div className="flex justify-end border-t border-[#8EB69B]/25 pt-5">
                        <Button buttonName="Record Payment" buttonType="submit" buttonSign="+"/>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddPaymentModal;