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
        <section className="min-h-screen bg-background px-5 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <p className="mb-1 text-sm font-medium text-primary">Payment management</p>
                <p className="text-3xl font-bold tracking-tight text-foreground">Payments</p>
                <p className="mt-1 text-sm text-muted-foreground">Manage and Track member Payments</p>
            </div>
            <div className="mx-auto mt-4 flex max-w-7xl justify-end">
                <Button buttonName="Add Payment" callback={handleAddPaymentClick}/>
            </div>
            {/* Showing The AppPaymentModal: */}
            {showPaymentModal && (
                <AddPaymentModal onClose={()=>{
                    setShowPaymentModal(false);
                }}/>
            )}

            <div className="mx-auto mt-7 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {paymentsOverview.map((card)=>(
                    <SummaryCard key={card.id} {...card}/>
                ))}
            </div>

            <div className="mx-auto mt-6 flex max-w-7xl min-w-0 items-center gap-3 overflow-x-auto pb-1">
                <Searchbar/>
                <SearchingFilters/>
            </div>

            <div className="mx-auto mt-6 max-w-7xl overflow-x-auto rounded-xl border border-border bg-card shadow-lg shadow-black/10">
                <div className="grid min-w-[900px] grid-cols-[0.7fr_1.3fr_1.3fr_0.9fr_1fr_0.9fr_0.7fr] items-center gap-4 border-b border-border bg-muted/60 px-5 py-3">
                    {PaymentNameHeaders.map((name)=>(
                        <PaymentsNamesHeader label={name.label}/>
                    ))}
                </div>
                <div className="min-w-[900px]">
                    {payment.map((card)=>(
                        <PaymentInfoCard key={card.id} {...card}/>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Payments;