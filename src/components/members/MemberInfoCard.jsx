import { Link } from "react-router";
import mockData from "../../data/mockData";
import avatar1 from "../../assets/user-avatars/user-avatar-1.JPG";
import avatar2 from "../../assets/user-avatars/user-avatar-2.JPG";
import avatar3 from "../../assets/user-avatars/user-avatar-3.JPG";
import avatar4 from "../../assets/user-avatars/user-avatar-4.JPG";
import avatar5 from "../../assets/user-avatars/user-avatar-5.JPG";
import avatar6 from "../../assets/user-avatars/user-avatar-6.JPG";
import avatar7 from "../../assets/user-avatars/user-avatar-7.JPG";



function MemberInfoCard(){

const {members} = mockData;

const avatarById = {
    "001": avatar1,
    "002": avatar2,
    "003": avatar3,
    "004": avatar4,
    "005": avatar5,
    "006": avatar6,
    "007": avatar7,
};

const statusDotColors = {
    Active: "bg-emerald-400",
    Expired: "bg-red-400",
    "Expiring Soon": "bg-orange-400",
    Deactive: "bg-red-400",
};

    return(
        <div className="space-y-3 p-3 sm:p-4">
        {members.map((member) => (
                <div key={member.id} className="flex min-w-[830px] items-center rounded-xl border border-border bg-background/35 px-4 py-4 shadow-sm shadow-black/10 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/20">
                    <p className="w-[72px] shrink-0 text-sm font-medium text-muted-foreground">#{member.id}</p>
                    <div className="flex w-[240px] shrink-0 items-center gap-3">
                        <img src={avatarById[member.id]} alt={`${member.name}'s profile`} className="h-10 w-10 rounded-full border border-border object-cover" />
                        <p className="font-medium text-card-foreground">{member.name}</p>
                    </div>
                    <p className="w-[130px] shrink-0 text-sm capitalize text-muted-foreground">{member.payment}</p>
                    <p className="w-[150px] shrink-0 text-sm text-muted-foreground">{member.time}</p>
                    <p className="flex w-[170px] shrink-0 items-center gap-2 text-sm font-medium text-card-foreground">
                        <span className={`h-2.5 w-2.5 rounded-full ${statusDotColors[member.status] ?? "bg-muted-foreground"}`} aria-hidden="true" />
                        {member.status}
                    </p>
                    <Link to="#" className="inline-flex w-[68px] shrink-0 items-center justify-center rounded-lg px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-foreground">View</Link>
                </div>
            ))}
        </div>
    );
};
export default MemberInfoCard;
