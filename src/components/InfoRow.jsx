function InfoRow({ label, action = "View" }) {
    return(
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 shadow-lg shadow-black/10 sm:px-6">
            {/* UI fix: each Dashboard instance represents one information row. */}
            <p className="text-sm font-medium text-card-foreground">{label}</p>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-foreground">
                {action}
                <span aria-hidden="true">→</span>
            </a>
        </div>
    );
};
export default InfoRow;
