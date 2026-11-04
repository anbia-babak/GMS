import { UserRoundGroup } from "lucide-react";
import { UserCheck } from "lucide-react";
import { UserX } from "lucide-react";
import { Wallet } from "lucide-react";

const icons = [
    {"icon": UserRoundGroup },
    {"icon": UserCheck },
    {"icon": UserX },
    {"icon": Wallet }
]
function SummaryIcon({icon: IconComponent}) {
    
    return (
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden="true">
            {IconComponent && <IconComponent className="h-5 w-5 "/>}
        </span>
    );
}

function SummaryCard({label, value, icon}) {

    return(
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/10">
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-bold text-card-foreground">{value}</p>
            </div>

                <SummaryIcon icon={icon} />
           
        </div>
    );

};
export default SummaryCard;
