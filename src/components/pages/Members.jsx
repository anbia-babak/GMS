import Searchbar from "../members/Searchbar";
import MembersNavigation from "../members/MembersNavigation";
import MembersNamesHeader from "../members/MembersNamesHeader";
import MemberInfoCard from "../members/MemberInfoCard";
import mockData from "../../data/mockData";

function Members(){
    const {members} = mockData;
    return(
        <section className="min-h-screen bg-background px-5 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-1 text-sm font-medium text-primary">Member directory</p>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Members</h1>
                        <p className="mt-1 text-sm text-muted-foreground">View and manage your gym members.</p>
                    </div>
                    <Searchbar />
                </header>
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
