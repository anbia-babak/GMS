import { useLocale } from "../../i18n/useLocale";
import { Eye } from "lucide-react";

function MembershipInfoCard(props){
    const { t, formatDate, translateValue } = useLocale();
    const statusDotColors = {
        Active: "bg-emerald-400",
        Expired: "bg-red-400",
        "Expiring Soon": "bg-orange-400",
    };
    
    return(
        <div className="grid w-full min-w-[850px] grid-cols-[minmax(12rem,1.7fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(9rem,1.1fr)_minmax(9rem,1.1fr)_auto] items-center gap-3 rounded-xl border border-border bg-background/35 px-4 py-4 shadow-sm shadow-black/10 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/20">
            <p className="min-w-0 truncate font-bold text-card-foreground"><bdi>{props.member_name}</bdi></p>
            <p className="min-w-0 truncate text-sm text-muted-foreground"><bdi>{props.plan_name}</bdi></p>
            <p className="text-sm text-muted-foreground">{formatDate(props.start_date)}</p>
            <p className="text-sm text-muted-foreground">{formatDate(props.expiration_date)}</p>
            <p className="flex min-w-0 items-center gap-2 text-sm font-medium text-card-foreground">
                <span className={`h-2.5 w-2.5 rounded-full ${statusDotColors[props.status] ?? "bg-muted-foreground"}`} aria-hidden="true" />
                {translateValue(props.status)}
            </p>
            <button type="button" onClick={() => props.onView(props.membership)} aria-label={`${t("View")} ${t("Membership #{{id}}", { id: props.membership_id })}`} className="inline-flex min-h-10 items-center justify-self-end gap-2 rounded-lg border border-primary/30 px-3 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Eye className="h-4 w-4" aria-hidden="true" />
                <span>{t("View")}</span>
            </button>
        </div>
    );
};
export default MembershipInfoCard;
