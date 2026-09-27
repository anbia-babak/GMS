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
import {Truck, UserPlus} from "lucide-react";
import MemberInfoModal from "../Members/MemberInfoModal";
import EditMemberModal from "../Members/EditMemberModal";
import DeactivateConfirmationModal from "../Members/DeactivateConfirmationModal";


function Members(){
    const {members} = mockData;
    // Tracking AddMemberModal state:
    const [showAddMember, setShowAddMember] = useState(false);

    // Tracking AssignMembership and AddPayment States to CONNECT all three MODALS TOGETHER:
    const [showAssignMembership, setShowAssignMembership] = useState(false);
    const [showAddPayment, setShowAddPayment] = useState(false);

    // Tracking Which member info is clicked:
    const [selectedMember, setSelectedMember] = useState();
    const [showMemberInfo, setShowMemberInfo] = useState(false);
    const [showEditMember, setShowEditMember] = useState(false);

    // Tracking Deactivating Member:
    const [showDeactivationModal, setShowDeactivationModal] = useState(false);

    // Handling Add New Member Click:
    function handleAddShowMemberClick (){
        setShowAddMember(true);
    }

    // Handling View MeberInfo Click:
    function handleViewMemberInfoClick(member) {
        setShowMemberInfo(true);
        setSelectedMember(member)
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
                    <Button buttonName="New Member" buttonSign="+" callback={handleAddShowMemberClick}/>

                </header>
                {/* Showing The Add Members Modal:*/}
                {showAddMember && (
                    <AddMemberModal
                        onClose={()=>{
                        setShowAddMember(false);
                    }}
                    // 
                    onMemberAdded={()=>{
                        setShowAddMember(false);
                        setShowAssignMembership(true);
                    }}
                    />
                )};

                {/*  */}
                {showAssignMembership && (
                        <AddMembershipModal 
                            onClose={()=>{
                            setShowAssignMembership(false);
                        }}
                        
                        onMembershipAssigned={()=>{
                            setShowAssignMembership(false);
                            setShowAddPayment(true);
                        }}
                        /> 
                )};

                {/*  */}
                {showAddPayment && (
                    <AddPaymentModal
                        onClose={()=>{
                        setShowAddPayment(false);
                    }}/>
                )};

                {/* Showing The MemberInfoModal :*/}
                {showMemberInfo && (
                    <MemberInfoModal 
                        member={selectedMember}
                        onClose={()=> setShowMemberInfo(false)}

                        onMemberDeactivated={()=>{
                            setShowDeactivationModal(true);
                            setShowMemberInfo(false);
                        }}
                        onMemberEdited={()=>{
                            setShowMemberInfo(false);
                            setShowEditMember(true);
                        }}
                    />   
                )};

                {showDeactivationModal &&(
                    <DeactivateConfirmationModal
                        onClose={()=>{
                            setShowDeactivationModal(false);
                            setShowMemberInfo(true);
                        }}

                        onDeactivatedMember={()=>{
                            setShowDeactivationModal(false);
                            setShowMemberInfo(true);
                        }}
                    />
                )}

                {showEditMember && (
                    <EditMemberModal 
                    member={selectedMember}
                    onClose={()=> setShowEditMember(false)}
                    />
                )};

                
            
            <div className="mb-5 flex justify-between gap-4 sm:flex-row sm:items-end">
                <MembersNavigation />
                <Searchbar />

            </div>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-lg shadow-black/10">
                <MembersNamesHeader />
                    {members.map((card)=>(
                       <MemberInfoCard key={card.id} member={card} onView={handleViewMemberInfoClick} {...card}/> 
                    ))}
            </div>
            </div>
        </section>
    );
};
export default Members;
