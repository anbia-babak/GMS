
function SummaryIcon({ label }) {
    const isIncome = label === "Monthly Income";

    return (
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden="true">
            {isIncome ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 9h18M16 14h2" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                    <circle cx="9" cy="8" r="3" />
                    <path d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19M16 7.5a3 3 0 0 1 0 5.8M19.5 19v-1.5a5.5 5.5 0 0 0-2.8-4.8" />
                </svg>
            )}
        </span>
    );
}

function SummaryCard({label, value}) {

    return(
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/10">
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-bold text-card-foreground">{value}</p>
            </div>
            <SummaryIcon label={label} />
        </div>
    );

};
export default SummaryCard;
