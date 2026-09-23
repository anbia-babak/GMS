const nameHeaders = [
    {label: "id"},
    {label: "Name"},
    {label: "Payment"},
    {label: "Payed Time"},
    {label: "Status"},
]

function MembersNamesHeader(){

    return(
        <div className="flex min-w-[830px] items-center border-b border-border bg-secondary/40 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {nameHeaders.map((item) => (
                <p key={item.label} className={{
                    id: "w-[72px] shrink-0",
                    Name: "w-[240px] shrink-0",
                    Payment: "w-[130px] shrink-0",
                    "Payed Time": "w-[150px] shrink-0",
                    Status: "w-[170px] shrink-0",
                }[item.label]}>{item.label}</p>
            ))}
            <span className="w-[68px] shrink-0 text-center">Action</span>
        </div>
    );
};
export default MembersNamesHeader;
