import PlanSearchFilter from "./PlanSearchFilter";
import Button from "../Dashboard/Button";


function AddMembershipModal({onClose}) {

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2x1 bg-[#163832] p-6 shadow-2x1">

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#DAF1DE]">Assign Membership</h2>
                    <button onClick={onClose} className="text-[#8EB69B] hover:text-white">x</button>
                </div>
                <form action="#">
                    <p>Member: Somenoe</p>

                    <label htmlFor="membershipPlan">Membership Plan:</label>
                    <PlanSearchFilter id="membershipPlan"/>

                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" />

                    <label htmlFor="expirationDate">Expiration Date:</label>
                    {/* <p>Should be Calculated Automatically its expiration date. But NOT NOW</p> */}
                    <p>2026/10/25</p>

                    <Button buttomName="Assign Membership" buttonType="submit"/>
                    {/* Modal's Close Button: */}
                    <Button buttonName="Close" type="button" callback={onClose}/>
                </form>
            </div>
        </div>
    );
};
export default AddMembershipModal;