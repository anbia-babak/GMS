import Button from "../Dashboard/Button";

function MembershipInfoCard(props){
    const statusDotColors = {
        Active: "bg-emerald-400",
        Expired: "bg-red-400",
        "Expiring Soon": "bg-orange-400",
    };
    
    return(
        <div className="flex min-w-[800px] items-center rounded-xl border border-border bg-background/35 px-4 py-4 shadow-sm shadow-black/10 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/20">
            <p className="w-[240px] shrink-0 font-medium text-card-foreground">{props.member}</p>
            <p className="w-[120px] shrink-0 text-sm text-muted-foreground">{props.plan}</p>
            <p className="w-[140px] shrink-0 text-sm text-muted-foreground">{props.start}</p>
            <p className="w-[150px] shrink-0 text-sm text-muted-foreground">{props.expire}</p>
            <p className="flex w-[150px] shrink-0 items-center gap-2 text-sm font-medium text-card-foreground">
                <span className={`h-2.5 w-2.5 rounded-full ${statusDotColors[props.status] ?? "bg-muted-foreground"}`} aria-hidden="true" />
                {props.status}
            </p>
            <Button buttonName="Renew" buttonType="button" callback={()=> props.onView(props.membership)}/>
        </div>
    );
};
export default MembershipInfoCard;
