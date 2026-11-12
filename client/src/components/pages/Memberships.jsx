import { useLocale } from "../../i18n/useLocale";
import { useEffect, useMemo, useState } from "react";
import SummaryCard from "../Dashboard/SummaryCard";
import Button from "../Dashboard/Button";
import Searchbar from "../Members/Searchbar";
import SearchingFilters from "../Memberships/SearchingFilters";
import MembershipNamesHeader from "../Memberships/MembershipNamesHeader";
import MembershipInfoCard from "../Memberships/MembershipInfoCard";
import AddMembershipModal from "../Memberships/AddMembershipModal";
import RenewMembershipModal from "../Memberships/RenewMembershipModal";
import MembershipDetailsModal from "../Memberships/MembershipDetailsModal";
import Pagination from "../common/Pagination";
import { getMemberships } from "../../api/membershipsApi";
import { getApiErrorMessage } from "../../api/apiClient";
import { WalletCards, UserGroup, CalendarClock, CalendarX } from "lucide-react";

function Memberships() {
    const { t, translateError } = useLocale();
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const [showAddMembership, setShowAddMembership] = useState(false);
    const [showRenewMembership, setShowRenewMembership] = useState(false);
    const [showMembershipDetails, setShowMembershipDetails] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("All");
    const [plan, setPlan] = useState("All");
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function loadMemberships() {
            setCurrentPage(1);
            setLoading(true);
            setError("");
            try {
                // Fetch once, then filter locally so plan names do not need to be converted into invented IDs.
                setMemberships(await getMemberships());
            } catch (requestError) {
                setError(getApiErrorMessage(requestError, "Could not load memberships. Please try again."));
            } finally {
                setLoading(false);
            }
        }
        loadMemberships();
    }, [refreshKey]);

    const plans = useMemo(() => [...new Set(memberships.map((item) => item.plan_name).filter(Boolean))], [memberships]);
    const filteredMemberships = useMemo(() => memberships.filter((membership) => {
        const query = searchTerm.trim().toLowerCase();
        const matchesSearch = !query || [membership.member_name, membership.membership_id, membership.member_id].some((value) => String(value || "").toLowerCase().includes(query));
        return matchesSearch && (status === "All" || membership.status === status) && (plan === "All" || membership.plan_name === plan);
    }), [memberships, plan, searchTerm, status]);
    const pageCount = Math.max(1, Math.ceil(filteredMemberships.length / pageSize));
    const effectivePage = Math.min(currentPage, pageCount);
    const visibleMemberships = filteredMemberships.slice((effectivePage - 1) * pageSize, effectivePage * pageSize);
    const summaryCards = [
        { id: "active-memberships", label: t("Active"), icon: UserGroup, value: memberships.filter((item) => item.status === "Active").length },
        { id: "expiring-memberships", label: t("Expiring Soon"),icon: CalendarClock, value: memberships.filter((item) => item.status === "Expiring Soon").length },
        { id: "expired-memberships", label: t("Expired"),icon: CalendarX, value: memberships.filter((item) => item.status === "Expired").length },
        { id: "total-memberships", label: t("Total Memberships"),icon: WalletCards, value: memberships.length },
    ];
    const resetPage = (update) => { update(); setCurrentPage(1); };

    return <section className="min-h-screen bg-background px-5 py-8 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
                <p className="mb-1 text-sm font-medium text-primary">{t("Membership management")}</p>
                <h1 className="!text-4xl font-extrabold tracking-tight text-foreground">{t("Memberships")}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{t("Manage and track member memberships.")}</p>
                </div>
                <Button buttonName={t("Assign Membership")} icon={WalletCards} callback={() => setShowAddMembership(true)} />
                </header>
                
        {showAddMembership && <AddMembershipModal onClose={() => setShowAddMembership(false)} onMembershipAssigned={() => { setShowAddMembership(false); setRefreshKey((key) => key + 1); }} />}
        {showMembershipDetails && selectedMembership && <MembershipDetailsModal membership={selectedMembership} onClose={() => setShowMembershipDetails(false)} onRenew={() => { setShowMembershipDetails(false); setShowRenewMembership(true); }} />}
        {showRenewMembership && <RenewMembershipModal membership={selectedMembership} onClose={() => setShowRenewMembership(false)} onRenewedMembership={() => { setShowRenewMembership(false); setRefreshKey((key) => key + 1); }} />}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => <SummaryCard key={card.id} label={card.label} value={card.value} icon={card.icon}/>)}
            </div>
        <div className="mt-6 flex min-w-0 flex-wrap items-center gap-3 pb-1">
            <Searchbar value={searchTerm} onChange={(event) => resetPage(() => setSearchTerm(event.target.value))} 
            placeHolder={t("Search memberships")} />
            <SearchingFilters status={status} plan={plan} plans={plans} onStatusChange={(value) => resetPage(() => setStatus(value))} onPlanChange={(value) => resetPage(() => setPlan(value))} />
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-lg shadow-black/10">
        <div className="space-y-3 p-3 sm:p-4">
        <MembershipNamesHeader />
        {loading ? <p className="min-w-[850px] px-4 py-10 text-center text-sm text-muted-foreground">{t("Loading memberships...")}</p> : error ? <div className="min-w-[850px] px-4 py-10 text-center">
            <p className="mb-3 text-red-500">{translateError(error)}</p>
            <button onClick={() => setRefreshKey((key) => key + 1)} className="rounded-lg bg-primary px-4 py-2 text-white">{t("Try Again")}</button>
                </div> : visibleMemberships.length ? visibleMemberships.map((membership) => <MembershipInfoCard key={membership.membership_id} membership={membership} onView={(item) => { setSelectedMembership(item); setShowMembershipDetails(true); }} {...membership}/>) : <p className="min-w-[850px] rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">{t("No memberships match these filters.")}</p>}
        </div>
        </div>
        {!loading && !error && <Pagination total={filteredMemberships.length} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }} />}
    </div></section>;
}

export default Memberships;
