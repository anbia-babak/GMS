


const nameHeaders = [
    {label: "Member"},
    {label: "Plan"},
    {label: "Start"},
    {label: "Expiration"},
    {label: "Status"},
]

function MembershipNamesHeader (){
    
    return(
        <div className="flex min-w-[800px] items-center border-b border-border bg-secondary/40 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {nameHeaders.map((item)=>{
                const widths = {
                    Member: "w-[240px] shrink-0",
                    Plan: "w-[120px] shrink-0",
                    Start: "w-[140px] shrink-0",
                    Expiration: "w-[150px] shrink-0",
                    Status: "w-[150px] shrink-0",
                };
                return <p key={item.label} className={widths[item.label]}>{item.label}</p>
            })}
            <span className="w-[68px] shrink-0 text-center">Action</span>
        </div>
    );
};
export default MembershipNamesHeader;
