import Searchbar from "../Members/Searchbar";
import MembersNavigation from "../Members/MembersNavigation";
import MembersNamesHeader from "../Members/MembersNamesHeader";
import MemberInfoCard from "../Members/MemberInfoCard";
import Button from "../Dashboard/Button";
import { useEffect, useMemo, useState } from "react";
import AddMemberModal from "../Members/AddMemberModal";
import AddMembershipModal from "../Memberships/AddMembershipModal"
import AddPaymentModal from "../Payments/AddPaymentModal";
import MemberInfoModal from "../Members/MemberInfoModal";
import EditMemberModal from "../Members/EditMemberModal";
import DeactivateConfirmationModal from "../Members/DeactivateConfirmationModal";
import { deactivateMember, getMembers } from "../../api/membersApi.js";
import { getApiErrorMessage } from "../../api/apiClient";
import { UserPlus } from "lucide-react";

function Members(){

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    
    useEffect(()=>{
        async function loadMembers() {
            try{
                setLoading(true);
                setError("");

                const data = await getMembers();
                setMembers(data);
            }catch(error){
                console.error("Failed to load members:", error);
                setError("Could not load members. Please try again.");
            }finally{
                setLoading(false);
            }
        }

        loadMembers();
    }, [refreshKey]);

    const [searchTerm, setSearchTerm] = useState("");
    
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
    const [actionError, setActionError] = useState("");
    const [deactivating, setDeactivating] = useState(false);

    // Handling Add New Member Click:
    function handleAddShowMemberClick (){
        setShowAddMember(true);
    }

    // Handling View MeberInfo Click:
    function handleViewMemberInfoClick(member) {
        setShowMemberInfo(true);
        setSelectedMember(member)
    }

    const updateSearch = (event) => {
    setSearchTerm(event.target.value);
    };

    // Search locally because the members endpoint returns the full directory and has no search query contract.
    const filteredMembers = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return members;
        return members.filter((member) => [
            member.member_id, member.first_name, member.last_name, member.phone, member.status,
        ].some((value) => String(value || "").toLowerCase().includes(query)));
    }, [members, searchTerm]);

    async function handleDeactivate() {
        if (!selectedMember) return;
        setActionError("");
        setDeactivating(true);
        try {
            await deactivateMember(selectedMember.member_id);
            // Reloading prevents the list and any later modal from using stale member status.
            setRefreshKey((key) => key + 1);
            setShowDeactivationModal(false);
            setShowMemberInfo(false);
        } catch (requestError) {
            setActionError(getApiErrorMessage(requestError, "Could not deactivate the member."));
        } finally {
            setDeactivating(false);
        }
    }

    return(
        <section className="min-h-screen bg-background px-5 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-1 text-sm font-medium text-primary">Member directory</p>
                        <h1 className="!text-4xl font-extrabold tracking-tight text-foreground">Members</h1>
                        <p className="mt-1 text-sm text-muted-foreground">View and manage your gym members.</p>
                    </div>
                    <Button buttonName="New Member" icon={UserPlus} callback={handleAddShowMemberClick}/>

                </header>
                {/* Showing The Add Members Modal:*/}
                {showAddMember && (
                    <AddMemberModal
                        onClose={()=>{
                        setShowAddMember(false);
                    }}
                    // 
                    onMemberSaved={(newMember) => {
                        setShowAddMember(false);
                        setRefreshKey((key) => key + 1);
                        setSelectedMember(newMember);
                        setShowAssignMembership(true);
                    }}
                    />
                )}

                {/*  */}
                {showAssignMembership && (
                        <AddMembershipModal 
                            member={selectedMember}
                            onClose={()=>{
                            setShowAssignMembership(false);
                        }}
                        
                        onMembershipAssigned={(membership) => {
                            setShowAssignMembership(false);
                            setSelectedMember((currentMember) => ({ ...currentMember, membership }));
                            setShowAddPayment(true);
                        }}
                        /> 
                )}

                {/*  */}
                {showAddPayment && (
                    <AddPaymentModal
                        member={selectedMember}
                        membership={selectedMember?.membership}
                        onClose={()=>{
                        setShowAddPayment(false);
                    }}/>
                )}

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
                )}

                {showDeactivationModal &&(
                    <DeactivateConfirmationModal
                        member={selectedMember}
                        error={actionError}
                        saving={deactivating}
                        onClose={()=>{
                            setShowDeactivationModal(false);
                            setShowMemberInfo(true);
                        }}

                        onDeactivatedMember={handleDeactivate}
                    />
                )}

                {showEditMember && (
                    <EditMemberModal 
                    member={selectedMember}
                    onClose={()=> setShowEditMember(false)}
                    onMemberSaved={() => {
                        setShowEditMember(false);
                        setRefreshKey((key) => key + 1);
                    }}
                    />
                )}   

                
            <div className="mb-5 flex justify-between gap-4 sm:flex-row sm:items-end">
                <MembersNavigation />
                <Searchbar value={searchTerm} onChange={updateSearch} placeHolder={"Search members"}/>

            </div>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-lg shadow-black/10">
                <MembersNamesHeader />
                    
                        {loading ?(
                            <p className="p-6 text-center text-muted-foreground">Loading members...</p>
                        ) : error ? (
                            <div className="p-6 text-center">
                                <p className="mb-3 text-red-500">{error}</p>
                                <button onClick={()=> setRefreshKey((key) => key + 1)}
                                    className="rounded-lg bg-primary px-4 py-2 text-white"
                                    >Try Again</button>
                            </div>
                        ) : filteredMembers.length === 0 ? (
                            <p className="p-6 text-center text-muted-foreground">No members found.</p>
                        ) : (
                            filteredMembers.map((card)=>(
                                <div key={card.member_id}>
                                    <MemberInfoCard member={card} onView={handleViewMemberInfoClick} {...card}/>
                                </div>
                            ))
                        )}                
            </div>
            </div>
        </section>
    );
};
export default Members;
