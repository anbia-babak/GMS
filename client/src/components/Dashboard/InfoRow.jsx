import { NavLink } from "react-router";

function InfoRow({ label, action, route }) {
    return(
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 shadow-lg shadow-black/10 sm:px-6">
            {/* UI fix: each Dashboard instance represents one information row. */}
            <p className="text-sm font-medium text-card-foreground">{label}</p>
            <NavLink to={route} key={action} className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-foreground">
                {action}
                <span aria-hidden="true">→</span>
            </NavLink>
        </div>
    );
};
export default InfoRow;
