import { useLocale } from "../../i18n/useLocale";
import { NavLink } from "react-router";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router";
import GymLogo from "../common/GymLogo";

const navItems = [
    {label: "Dashboard", path: "/dashboard"},
    {label: "Members", path: "/members"},
    {label: "Membership", path: "/memberships"},
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
    const { t } = useLocale();

    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
        const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        });

        if (response.ok) {
        // The protected layout unmounts as soon as logout succeeds and replaces browser history.
        navigate("/login", { replace: true });
        } else {
        alert(t("Logout failed. Please try again."));
        }
    } catch (error) {
        console.error("Logout error:", error);
        alert(t("Unable to connect to the server."));
    }
    };
    return(
        <aside className="no-print flex shrink-0 flex-col border-b border-sidebar-border bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:h-screen md:w-60 md:border-b-0 md:border-e">
            <div className="flex items-center gap-3 px-5 py-6">
                <GymLogo className="h-11 w-11 shrink-0" />
                <div>
                    <p className="text-sm font-bold tracking-wide">SUPER POWER GYM</p>
                    <p className="text-xs text-muted-foreground">{t("Management System")}</p>
                </div>
            </div>

            <nav className="grid grid-cols-2 gap-1 px-3 py-2 sm:grid-cols-3 md:flex-1 md:grid-cols-1 md:content-start">
                {navItems.map((item)=>(
                    <NavLink to={item.path} key={item.path}
                    className={({ isActive }) => `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium 
                    transition-colors ${isActive ? "bg-primary text-primary-foreground shadow-md shadow-primary/10" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
                        <NavigationIcon label={item.label} />
                        {t(item.label)}
                    </NavLink>
                ))}
            </nav>

            {/* Fixed grid columns keep the three compact controls aligned in both text directions. */}
            <div className="grid grid-cols-[minmax(0,1fr)_2.75rem_auto] items-center gap-2 border-t border-sidebar-border p-3">
                <LanguageSelector />
                <ThemeToggle />
                <button
                    onClick={handleLogout}
                    className="flex min-h-10 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-white/10 bg-white/5 px-2 text-xs font-semibold text-sidebar-foreground shadow-sm transition duration-200 hover:border-[#8EB69B]/40 hover:bg-[#235347] hover:text-[#DAF1DE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EB69B] dark:border-white/10 dark:hover:border-primary dark:text-muted-foreground dark:hover:text-sidebar-accent-foreground dark:hover:bg-sidebar"
                    >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-[18px] w-[18px] shrink-0 fill-none stroke-current rtl:-scale-x-100"
                        strokeWidth="1.8"
                    >
                        <path d="M10 17l5-5-5-5M15 12H3" />
                        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
                    </svg>
                    {t("Logout")}
                </button>
            </div>

        </aside>
    )
}

export default Sidebar;
