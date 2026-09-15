import mockData from "../../data/mockData";
import IncomeChart from "../IncomeChart";
import InfoRow from "../InfoRow";
import MemberShipOverview from "../MemberShipOverview";
import SummaryCard from "../SummaryCard";



function Dashboard(){
    const {summaryData} = mockData;
    const {expiringSoonCount} = mockData;
    return(
        <div className="flex min-h-screen bg-background">
            {/* <Sidebar /> */}
            <main className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">

                <header className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Manage Your Gym Business</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Welcome back! here's your gym business overview.</p>
                </header>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {summaryData.map((card)=>(
                        <SummaryCard key={card.id} {...card}/>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <IncomeChart />
                    </div>
                    <div className="lg:col-span-2">
                        <MemberShipOverview />
                    </div>
                </div>
                    <div className="mt-6 space-y-3">
                        <InfoRow label={`${expiringSoonCount} Memberships Expiring Soon`}/>
                        <InfoRow label="Recent Payments"/>
                    </div>
                    <div className="mt-6">
                    </div>
            </main>
        </div>

    )
};
export default Dashboard;
