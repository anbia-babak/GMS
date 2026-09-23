import { useMemo, useState } from "react";
import SummaryCard from "../Dashboard/SummaryCard";
import Button from "../Dashboard/Button";
import Searchbar from "../Members/Searchbar";
import SearchingFilters from "../Memberships/SearchingFilters";
import MembershipNamesHeader from "../Memberships/MembershipNamesHeader";
import MembershipInfoCard from "../Memberships/MembershipInfoCard";
import mockData from "../../data/mockData";
import AddMembershipModal from "../Memberships/AddMembershipModal";
import {UserCheck, UserX, UserRoundGroup, WalletCards} from "lucide-react";



function Memberships(){
const { memberships } = mockData;
// Tracking AddMembershipModal State:
const [showAddMembership, setShowAddMembership] = useState(false);


const [searchTerm, setSearchTerm] = useState("");
const [status, setStatus] = useState("All");
const [plan, setPlan] = useState("All");
// UI-only pagination: records remain in mock data until your backend is connected.
const pageSize = 10;
const [currentPage, setCurrentPage] = useState(1);

const filteredMemberships = useMemo(() => memberships.filter((membership) => {
    const matchesSearch = membership.member.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = status === "All" || membership.status === status;
    const matchesPlan = plan === "All" || membership.plan === plan;
    return matchesSearch && matchesStatus && matchesPlan;
}), [memberships, plan, searchTerm, status]);

const pageCount = Math.max(1, Math.ceil(filteredMemberships.length / pageSize));
const visibleMemberships = filteredMemberships.slice((currentPage - 1) * pageSize, currentPage * pageSize);
const summaryCards = [
    { id: "active-memberships", label: "Active", value: memberships.filter((membership) => membership.status === "Active").length },
    { id: "expiring-memberships", label: "Expiring Soon", value: memberships.filter((membership) => membership.status === "Expiring Soon").length },
    { id: "expired-memberships", label: "Expired", value: memberships.filter((membership) => membership.status === "Expired").length },
    { id: "total-memberships", label: "Total Memberships", value: memberships.length },
];



// Handling Assign Membership Click:
function handleAssignMembershipClick() {
    setShowAddMembership(true);
}

const updateSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
};

const updateStatus = (nextStatus) => {
    setStatus(nextStatus);
    setCurrentPage(1);
};

const updatePlan = (nextPlan) => {
    setPlan(nextPlan);
    setCurrentPage(1);
};

    return(
        <section className="min-h-screen bg-background px-5 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-7 flex justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-1 text-sm font-medium text-primary">Membership management</p>
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Memberships</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage and track member memberships.</p>
                    </div>
                    <Button buttonName="Assign Membership" buttonSign="+" callback={handleAssignMembershipClick} /> 

                    {/* Showing The AddMembershipModal: */}
                    {showAddMembership &&(
                        <AddMembershipModal onClose={()=>{
                            setShowAddMembership(false);
                        }}/>
                    )}
                </header>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {summaryCards.map((card) => (
                        <SummaryCard key={card.id} {...card}/>
                    ))}
                </div>
                <div className="mt-6 flex min-w-0 items-center gap-3 overflow-x-auto pb-1">
                    <Searchbar value={searchTerm} onChange={updateSearch} placeholder="Search memberships" />
                    <SearchingFilters status={status} plan={plan} onStatusChange={updateStatus} onPlanChange={updatePlan} />
                </div>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-lg shadow-black/10">
                    <MembershipNamesHeader />
                    <div className="space-y-3 p-3 sm:p-4">
                        {visibleMemberships.length > 0 ? visibleMemberships.map((card) => (
                            <MembershipInfoCard key={card.id} {...card}/>
                        )) : (
                            <p className="min-w-[800px] rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">No memberships match these filters.</p>
                        )}
                    </div>
                </div>
                <nav className="mt-5 flex items-center justify-center gap-2" aria-label="Membership pages">
                    {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                        <button key={page} type="button" onClick={() => setCurrentPage(page)} aria-current={page === currentPage ? "page" : undefined}
                        className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors ${page === currentPage ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
                            {page}
                        </button>
                    ))}
                </nav>
            </div>
        </section>
    );
};
export default Memberships;
