import React from "react";
import Button from "../Dashboard/Button";



function AddMemberModal({onClose}) {
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2x1 bg-[#163832] p-6 shadow-2x1">

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#DAF1DE]">Add Member</h2>
                    <button onClick={onClose} className="text-[#8EB69B] hover:text-white">x</button>
                </div>
                <form action="#">
                    <label htmlFor="fname">First Name:</label>
                    <input type="text" id="fname" />

                    <label htmlFor="lname">Last Name:</label>
                    <input type="text" id="lname" />
                                
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" />

                    <label htmlFor="gender">Gender:</label>
                    <input type="radio" name="male" id="male" />  
                    <input type="radio" name="female" id="female" />  

                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type="date" />

                    <label htmlFor="address">Address</label>
                    <input type="text" />

                    <label htmlFor="jionDate">Jion Date</label>
                    <input type="date" />

                    <Button buttonName="Add Member" type="submit"/>
                    {/* Modal's Close Button: */}
                    <Button buttonName="Close" type="button" callback={onClose}/>
                </form>
            </div>
        </div>
    );
};
export default AddMemberModal;