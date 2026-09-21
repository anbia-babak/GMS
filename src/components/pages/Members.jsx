import Searchbar from "../Members/Searchbar";
import MembersNavigation from "../Members/MembersNavigation";
import MembersNamesHeader from "../Members/MembersNamesHeader";
import MemberInfoCard from "../Members/MemberInfoCard";
import mockData from "../../data/mockData";
import Button from "../Dashboard/Button";
import { useState } from "react";
import AddMemberModal from "../members/AddMemberModal";
import AddMembershipModal from "../Memberships/AddMembershipModal";
import AddPaymentModal from "../Payments/AddPaymentModal";


function Members(){
    const {members} = mockData;
    // Tracking AddMemberModal state:
    const [showAddMember, setShowAddMember] = useState(false);

    // Tracking AssignMembership and AddPayment States to CONNECT all three MODALS TOGETHER:
    const [showAssignMembership, setShowAssignMembership] = useState(false);
    const [showAddPayment, setShowAddPAyment] = useState(false);

    // Hanndling Add New Member Click:
    function handleAddShowMemberClick (){+
        setShowAddMember(true);
    }


    return(
        <section className="min-h-screen bg-background px-5 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-1 text-sm font-medium text-primary">Member directory</p>
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Members</h1>
                        <p className="mt-1 text-sm text-muted-foreground">View and manage your gym members.</p>
                    </div>
                    <Searchbar />
                </header>
                <Button buttonName="New Member" buttonSign="+" callback={handleAddShowMemberClick}/>
                {/* Showing The Add Members Modal:*/}
                {showAddMember && (
                    <AddMemberModal onClose={()=>{
                        setShowAddMember(false);
                    }}
                    // 
                    onMemberAdded={()=>{
                        setShowAddMember(false);
                        setShowAssignMembership(true);
                    }}
                    />
                )}

                {/*  */}
                {showAssignMembership && (
                        <AddMembershipModal onClose={()=>{
                            setShowAssignMembership(false);
                        }}
                        
                        onMembershipAssigned={()=>{
                            setShowAssignMembership(false);
                            setShowAddPAyment(true);
                        }}
                        /> 
                )}

                {/*  */}
                {showAddPayment && (
                    <AddPaymentModal onClose={()=>{
                        setShowAddPAyment(false);
                    }}/>
                )}

            <div className="mb-5">
                <MembersNavigation />
            </div>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-lg shadow-black/10">
                <MembersNamesHeader />
                    {members.map((card)=>(
                       <MemberInfoCard key={card.id} {...card}/> 
                    ))}
            </div>
            </div>
        </section>
    );
};
export default Members;
