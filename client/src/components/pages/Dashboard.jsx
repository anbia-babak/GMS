import IncomeChart from "../Dashboard/IncomeChart";
import InfoRow from "../Dashboard/InfoRow";
import MemberShipOverview from "../Dashboard/MemberShipOverview";
import SummaryCard from "../Dashboard/SummaryCard.jsx";
import { getMembers } from "../../api/membersApi.js";
import { getPaymentSummary } from "../../api/paymentsApi.js";
import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../../api/apiClient";
import { UserGroup, UserCheck, UserX, Wallet} from "lucide-react";

function Dashboard(){
    const [refreshKey, setRefreshKey] = useState(0);
    const [members, setMembers] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboardData() {
            setLoading(true);
            setError("");
            try {
                // Fetch members and payment summary:
                setMembers(await getMembers());
                const summaryData = await getPaymentSummary();
                setPaymentSummary(summaryData.lastMonthIncome);
                console.log(await getPaymentSummary());
            } catch (requestError) {
                setError(getApiErrorMessage(requestError, "Could not load members. Please try again."));
            } finally {
                setLoading(false);
            }
        }
        loadDashboardData();
    }, [refreshKey]);


    const summaryCards = [
        { id: "all-members", label: "Members", icon: UserGroup, value: members.length, },
        { id: "active-members", label: "Active", icon: UserCheck, value: members.filter((item) => item.status === "Active").length },
        { id: "expired-members", label: "Expired", icon: UserX, value: members.filter((item) => item.status === "Expired").length },
        { id: "monthly-income", label: "Monthly Income", icon: Wallet, value: `${Number(paymentSummary || 0).toLocaleString()} AFN`},
    ];

    const weekDayNumber = new Date().getDay();
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekDayName = weekDays[weekDayNumber];
    const currentYear = new Date().getFullYear();
    const dayOfMonth = new Date().getDay() + 1;
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentDate = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return(
        <div className="flex min-h-screen bg-background">
            {/* <Sidebar /> */}
            <main className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">

                <header className="mb-6 flex items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                    <div>
                    <h1 className="!text-4xl font-extrabold tracking-tight text-foreground sm:text-3xl">Manage Your Gym Business</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Welcome back! here's your gym business overview.</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-foreground font-extrabold">{currentYear} , {dayOfMonth} {currentMonth}</h2>
                        <p>{weekDayName} {currentDate}</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {summaryCards.map((card)=>{
                        return <SummaryCard key={card.id} label={card.label} value={card.value} icon={card.icon}/>
                    })}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <IncomeChart />
                    </div>
                    <div className="lg:col-span-2">
                        <MemberShipOverview/>
                    </div>
                </div>
                    <div className="mt-6 space-y-3">
                        <InfoRow label={`${members.filter((item) => item.status === "Expiring Soon").length } Memberships Expiring Soon`}
                            route="/memberships" action="View"/>
                        <InfoRow label="Recent Payments" 
                            route="/payments" action="View"/>
                    </div>
                    <div className="mt-6">
                    </div>
            </main>
        </div>

    )
};
export default Dashboard;
