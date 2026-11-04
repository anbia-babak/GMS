import avatar1 from "../../assets/user-avatars/user-avatar-1.JPG";
import avatar2 from "../../assets/user-avatars/user-avatar-2.JPG";
import avatar3 from "../../assets/user-avatars/user-avatar-3.JPG";
import avatar4 from "../../assets/user-avatars/user-avatar-4.JPG";
import avatar5 from "../../assets/user-avatars/user-avatar-5.JPG";
import avatar6 from "../../assets/user-avatars/user-avatar-6.JPG";
import avatar7 from "../../assets/user-avatars/user-avatar-7.JPG";
import Button from "../Dashboard/Button";

const statusDotColors = {
    Active: "bg-emerald-400",
    Expired: "bg-red-400",
    "Expiring Soon": "bg-orange-400",
    Deactive: "bg-red-400",
};


function MemberInfoCard(props){
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];

    const randomNumber =  Math.floor(Math.random() * avatars.length);
    const randomAvatar = avatars[randomNumber];
;
    return(
        <div className="space-y-3 p-3 sm:p-1.5">
                <div className="flex min-w-[830px] items-center rounded-xl border border-border bg-background/35
                        px-4 py-4 shadow-sm shadow-black/10 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/20">
                    <p className="w-[72px] shrink-0 text-sm font-medium text-muted-foreground">#{props.member_id}</p>
                    <div className="flex w-[240px] shrink-0 items-center gap-3">
                        <img src={randomAvatar} alt={`${props.first_name}'s profile`} className="h-10 w-10 rounded-full border border-border object-cover" />
                        <p className="font-medium text-card-foreground">{props.first_name} {props.last_name}</p>
                    </div>
                    <p className="w-[130px] shrink-0 text-sm text-muted-foreground">{props.phone}</p>
                    <p className="w-[170px] shrink-0 text-sm text-muted-foreground">{String(props.join_date || "").slice(0, 10)}</p>
                    <p className="flex w-[170px] shrink-0 items-center gap-2 text-sm font-medium text-card-foreground">
                        <span className={`h-2.5 w-2.5 rounded-full ${statusDotColors[props.status] ?? "bg-muted-foreground"}`} aria-hidden="true" />
                        {props.status}
                    </p>
                    <Button buttonName="View" buttonType="button" buttonSign="" callback={()=> props.onView(props.member)}/>
                </div>
        </div>
    );
};
export default MemberInfoCard;
