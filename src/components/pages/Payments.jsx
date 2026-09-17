import { useState } from "react";
import mockData from "../../data/mockData";
import SummaryCard from "../Dashboard/SummaryCard";
import Button from "../Dashboard/Button";
import Searchbar from "../members/Searchbar";
import SearchingFilters from "../Memberships/SearchingFilters";
import PaymentsNamesHeader from "../Payments/PaymentsNamesHeader";
import PaymentInfoCard from "../Payments/PaymentInfoCard";
import AddPaymentModal from "../Payments/AddPaymentModal";



function Payments(){

    // Tracking AddPaymentModal State:
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const {paymentsOverview} = mockData;
    const {PaymentNameHeaders} = mockData;
    const {payment} = mockData;


    function handleAddPaymentClick(){
        setShowPaymentModal(true);
    }

    return(
        <section>
            <div>
                <p>Payments</p>
                <p>Manage and Track member Payments</p>
            </div>
            <div>
                <Button buttonName="Add Payment" callback={handleAddPaymentClick}/>
            </div>
            {/* Showing The AppPaymentModal: */}
            {showPaymentModal && (
                <AddPaymentModal onClose={()=>{
                    setShowPaymentModal(false);
                }}/>
            )}

            <div>
                {paymentsOverview.map((card)=>(
                    <SummaryCard key={card.id} {...card}/>
                ))}
            </div>

            <div>
                <Searchbar/>
                <SearchingFilters/>
            </div>

            <div>
                <div>
                    {PaymentNameHeaders.map((name)=>(
                        <PaymentsNamesHeader label={name.label}/>
                    ))}
                </div>
                <div>
                    {payment.map((card)=>(
                        <PaymentInfoCard key={card.id} {...card}/>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Payments;