function Searchbar(){

    return(
        <div className="relative w-full sm:max-w-sm">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="6" />
                <path d="m16 16 4 4" />
            </svg>
            <input type="search" name="searchMember" id="searchMember"
            placeholder="Search members"
            className="h-11 w-full rounded-xl border border-border bg-card py-2 pl-11 pr-4 text-sm text-card-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"/>
        </div>
    );
};
export default Searchbar;
