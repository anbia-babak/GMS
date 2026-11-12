import { useLocale } from "../../i18n/useLocale";
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
import Pagination from "../common/Pagination";
import { deactivateMember, getMembers } from "../../api/membersApi.js";
import { getApiErrorMessage } from "../../api/apiClient";
import { UserPlus } from "lucide-react";

function Members(){
    const { t, translateError } = useLocale();

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const [selectedTab, setSelectedTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    
    useEffect(()=>{
        async function loadMembers() {
            setCurrentPage(1);
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
    setCurrentPage(1);
    };


    // Search locally because the members endpoint returns the full directory and has no search query contract.
    const filteredMembers = useMemo(() => {

    const query = searchTerm.trim().toLowerCase();

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toLocaleDateString("en-CA");

    // Calculate the date 7 days from today
    const nextSevenDays = new Date();
    nextSevenDays.setDate(nextSevenDays.getDate() + 7);

    const sevenDaysLater = [
        nextSevenDays.getFullYear(),
        String(nextSevenDays.getMonth() + 1).padStart(2, "0"),
        String(nextSevenDays.getDate()).padStart(2, "0"),
    ].join("-");
    
    return members.filter((member) => {
        // Search filter
        const matchesSearch = [
        member.member_id,
        member.first_name,
        member.last_name,
        member.phone,
        member.status,
        ].some((value) =>
        String(value || "").toLowerCase().includes(query)
        );

        if (!matchesSearch) return false;

        // Membership date information
        const startDate = member.membership_start_date;
        const expirationDate = member.membership_expiration_date;

        if (selectedTab === "all") return true;

        // Members without a membership are excluded from these tabs
        if (!startDate || !expirationDate) return false;

        if (selectedTab === "active") {
        return startDate <= today && expirationDate > sevenDaysLater;
        }

        if (selectedTab === "expired") {
        return expirationDate < today;
        }

        if (selectedTab === "expiringSoon") {
        return (
            expirationDate >= today &&
            expirationDate <= sevenDaysLater &&
            startDate <= today
        );
        }

    return true;
    });
    }, [members, searchTerm, selectedTab]);
    const pageCount = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
    const effectivePage = Math.min(currentPage, pageCount);
    const visibleMembers = filteredMembers.slice((effectivePage - 1) * pageSize, effectivePage * pageSize);

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
                        <p className="mb-1 text-sm font-medium text-primary">{t("Member directory")}</p>
                        <h1 className="!text-4xl font-extrabold tracking-tight text-foreground">{t("Members")}</h1>
                        <p className="mt-1 text-sm text-muted-foreground">{t("View and manage your gym members.")}</p>
                    </div>
                    <Button buttonName={t("New Member")} icon={UserPlus} callback={handleAddShowMemberClick}/>

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
                            setRefreshKey((key) => key + 1);
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

                
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <MembersNavigation selectedTab={selectedTab} onTabChange={(tab) => { setSelectedTab(tab); setCurrentPage(1); }}/>
                <Searchbar value={searchTerm} onChange={updateSearch} placeHolder={t("Search members")}/>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-lg shadow-black/10">
                <div className="space-y-3 p-3 sm:p-4">
                        <MembersNamesHeader />
                        {loading ?(
                            <p className="min-w-[850px] p-6 text-center text-muted-foreground">{t("Loading members...")}</p>
                        ) : error ? (
                            <div className="min-w-[850px] p-6 text-center">
                                <p className="mb-3 text-red-500">{translateError(error)}</p>
                                <button onClick={()=> setRefreshKey((key) => key + 1)}
                                    className="rounded-lg bg-primary px-4 py-2 text-white"
                                    >{t("Try Again")}</button>
                            </div>
                        ) : filteredMembers.length === 0 ? (
                            <p className="min-w-[850px] p-6 text-center text-muted-foreground">{t("No members found.")}</p>
                        ) : (
                            visibleMembers.map((card)=>(
                                <MemberInfoCard key={card.member_id} member={card} onView={handleViewMemberInfoClick} {...card}/>
                            ))
                        )}
                </div>
            </div>
            {!loading && !error && <Pagination total={filteredMembers.length} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }} />}
            </div>
        </section>
    );
};
export default Members;
