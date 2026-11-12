import { useLocale } from "../../i18n/useLocale";
function SummaryIcon({icon: IconComponent}) {
    
    return (
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden="true">
            {IconComponent && <IconComponent className="h-5 w-5 "/>}
        </span>
    );
}

function SummaryCard({label, value, icon}) {
    const { formatNumber } = useLocale();

    return(
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/10">
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-bold text-card-foreground">{typeof value === "number" ? formatNumber(value) : value}</p>
            </div>

                <SummaryIcon icon={icon} />
           
        </div>
    );

};
export default SummaryCard;
