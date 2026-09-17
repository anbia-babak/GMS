import PlanSearchFilter from "../Memberships/PlanSearchFilter"
import Button from "../Dashboard/Button"

function AddPaymentModal({onClose}) {

    return(

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2x1 bg-[#163832] p-6 shadow-2x1">

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#DAF1DE]">Record Payment</h2>
                    <button onClick={onClose} className="text-[#8EB69B] hover:text-white">x</button>
                </div>

                <p>Record Payment</p>
                <form action="#">
                    <label htmlFor="member">Member:</label>
                    <input type="text" id="member" />

                    <label htmlFor="membershipPlan">Membership:</label>
                    <PlanSearchFilter id="membershipPlan" />

                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" />

                    <label htmlFor="paymentDate">Payment Date:</label>
                    <input type="date" />

                    <label htmlFor="paymentMethod">Payment Method:</label>
                    <select name="paymentMethod" id="paymentMethod">
                        <option value="cash">Cash</option>
                    </select>

                    <Button buttonName="Record Payment" buttonType="submit"/>
                </form>
            </div>
        </div>
    );
};
export default AddPaymentModal;