import { Link } from "react-router";

const navItems = [
    {label: "All Members", path: "/allMembers"},
    {label: "Active", path: "/activeMembers"},
    {label: "Expired", path: "/expiredMembers"},
    {label: "Expiring Soon", path: "/expiringSoonMembers"},
];

function MembersNavigation(){

    return(
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex w-full gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1 sm:w-auto">
            {navItems.map((item) => (
                <Link to={item.path} key={item.label}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${item.label === "All Members" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}>
                    {item.label}
                </Link>
            ))}
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-primary" aria-label="Calendar">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
            </div>
        </div>
    );
};

export default MembersNavigation;
