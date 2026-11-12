import { useLocale } from "../../i18n/useLocale";
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
    const { t, formatNumber, formatCurrency, formatDate, translateError } = useLocale();
    const [members, setMembers] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboardData() {
            setError("");
            try {
                // Fetch members and payment summary:
                setMembers(await getMembers());
                const summaryData = await getPaymentSummary();
                setPaymentSummary(summaryData.lastMonthIncome);
            } catch (requestError) {
                setError(getApiErrorMessage(requestError, "Could not load members. Please try again."));
            }
        }
        loadDashboardData();
    }, []);


    const summaryCards = [
        { id: "all-members", label: t("Members"), icon: UserGroup, value: members.length, },
        { id: "active-members", label: t("Active"), icon: UserCheck, value: members.filter((item) => item.status === "Active").length },
        { id: "expired-members", label: t("Expired"), icon: UserX, value: members.filter((item) => item.status === "Expired").length },
        { id: "monthly-income", label: t("Monthly Income"), icon: Wallet, value: formatCurrency(paymentSummary || 0)},
    ];

    const now = new Date();
    return(
        <div className="flex min-h-screen bg-background">
            {/* <Sidebar /> */}
            <main className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">

                <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                    <h1 className="!text-4xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t("Manage Your Gym Business")}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">{t("Welcome back! here's your gym business overview.")}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-foreground font-extrabold">{formatDate(now, { dateStyle: "long" })}</h2>
                        <p>{formatDate(now, { weekday: "long", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                </header>

                {error && <p className="mb-4 text-sm text-red-500">{translateError(error)}</p>}
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
                        <InfoRow label={t("Memberships expiring soon: {{total}}", { total: formatNumber(members.filter((item) => item.status === "Expiring Soon").length) })}
                            route="/memberships" action={t("View")}/>
                        <InfoRow label={t("Recent Payments")}
                            route="/payments" action={t("View")}/>
                    </div>
                    <div className="mt-6">
                    </div>
            </main>
        </div>

    )
};
export default Dashboard;
