import { useLocale } from "../../i18n/useLocale";
import avatar1 from "../../assets/user-avatars/user-avatar-1.JPG";
import avatar2 from "../../assets/user-avatars/user-avatar-2.JPG";
import avatar3 from "../../assets/user-avatars/user-avatar-3.JPG";
import avatar4 from "../../assets/user-avatars/user-avatar-4.JPG";
import avatar5 from "../../assets/user-avatars/user-avatar-5.JPG";
import avatar6 from "../../assets/user-avatars/user-avatar-6.JPG";
import avatar7 from "../../assets/user-avatars/user-avatar-7.JPG";
import { Eye } from "lucide-react";

const statusDotColors = {
    Active: "bg-emerald-400",
    Expired: "bg-red-400",
    "Expiring Soon": "bg-orange-400",
    Deactive: "bg-red-400",
};


function MemberInfoCard(props){
    const { t, formatNumber, formatDate, translateValue } = useLocale();
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];

    const avatarNumber =  props.avatar_number || 1;
    const randomAvatar = avatars[avatarNumber - 1];

    return(
                <div className="grid w-full min-w-[850px] grid-cols-[minmax(4.5rem,.45fr)_minmax(14rem,1.8fr)_minmax(9rem,1fr)_minmax(10rem,1.1fr)_minmax(9rem,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-background/35 px-4 py-4 shadow-sm shadow-black/10 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/20">
                    <p className="text-sm font-medium text-muted-foreground">#{formatNumber(props.member_id, { useGrouping: false })}</p>
                    <div className="flex min-w-0 items-center gap-3">
                        <img src={randomAvatar} alt={t("{{name}}'s profile", { name: props.first_name })} className="h-10 w-10 shrink-0 rounded-full border border-border object-cover" />
                        <p className="min-w-0 truncate font-bold text-card-foreground"><bdi>{props.first_name} {props.last_name}</bdi></p>
                    </div>
                    <p className="min-w-0 truncate text-sm text-muted-foreground"><bdi>{props.phone}</bdi></p>
                    <p className="text-sm text-muted-foreground">{formatDate(props.join_date)}</p>
                    <p className="flex min-w-0 items-center gap-2 text-sm font-medium text-card-foreground">
                        <span className={`h-2.5 w-2.5 rounded-full ${statusDotColors[props.status] ?? "bg-muted-foreground"}`} aria-hidden="true" />
                        {translateValue(props.status)}
                    </p>
                    <button type="button" onClick={() => props.onView(props.member)} aria-label={`${t("View")} ${t("Member #{{id}}", { id: formatNumber(props.member_id, { useGrouping: false }) })}`} className="inline-flex min-h-10 items-center justify-self-end gap-2 rounded-lg border border-primary/30 px-3 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <Eye className="h-4 w-4" aria-hidden="true" /><span>{t("View")}</span>
                    </button>
                </div>
    );
};
export default MemberInfoCard;
