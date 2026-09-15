import { Link } from "react-router";


const navItems = [
    {label: "Dashboard", path: "/dashboard"},
    {label: "Members", path: "/members"},
    {label: "Membership", path: "/membership"},
    {label: "Payments", path: "/payments"},
    {label: "Reports", path: "/reports"},
    {label: "Settings", path: "/settings"},
];

function NavigationIcon({ label }) {
    const iconPaths = {
        Dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
        Members: <><circle cx="9" cy="8" r="3" /><path d="M3.5 20v-1.5a5.5 5.5 0 0 1 11 0V20M16 7a3 3 0 0 1 0 5.8M19.5 20v-1.5a5.5 5.5 0 0 0-2.6-4.7" /></>,
        Membership: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>,
        Payments: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 14h3M3 10h18" /></>,
        Reports: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
        Settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1 1.9-2.1 2.1-1.9-.1-1.2 1.1-2.6-.1-.9-1.3-1.8-.7-1.5.6-2.1-2.1.6-1.5-.7-1.8-1.3-.9-.1-2.6 1.1-1.2-.1-1.9 2.1-2.1 1.9.1L11 4l.9-1.3 2.6-.1 1.2 1.1 1.9-.1 2.1 2.1-.1 1.9 1.1 1.2-.1 2.6-1.3.9-.7 1.8Z" /></>,
    };

    return <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-none stroke-current" strokeWidth="1.8">{iconPaths[label]}</svg>;
}

function Sidebar(){
    return(
        <aside className="hidden sticky top-0 h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
            <div className="flex items-center gap-3 px-5 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2"><path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12" /><path d="m8 7 2-2M14 19l2-2" /></svg>
                </div>
                <div>
                    <p className="text-sm font-bold tracking-wide">IRON GYM</p>
                    <p className="text-xs text-muted-foreground">Management System</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-2">
                {navItems.map((item)=>(
                    <Link to={item.path} key={item.label}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${item.label === "Dashboard" ? "bg-primary text-primary-foreground shadow-md shadow-primary/10" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
                        <NavigationIcon label={item.label} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="border-t border-sidebar-border p-3">
                <a href="#" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="1.8"><path d="M10 17l5-5-5-5M15 12H3M14 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></svg>
                    Logout
                </a>
            </div>

        </aside>
    )
}

export default Sidebar;
