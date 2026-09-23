


function StatusSearchFilter (status, onStatusChange,){

    return (
    <div className="relative">
        <select name="status" id="memberStatus" value={status} onChange={(event) => onStatusChange(event.target.value)} 
        className="h-11 w-25 appearance-none rounded-xl border !border-[#235347] !bg-[#163832] py-2 pl-4 pr-10 
        text-sm text-card-foreground outline-none transition !focus:border-primary focus:ring-2 focus:ring-primary/20">
            <option value="All" className="bg-[#163832]">Status: All</option>
            <option value="Active" className="bg-[#163832]">Active</option>
            <option value="Expiring Soon" className="bg-[#163832]">Expiring Soon</option>
            <option value="Expired" className="bg-[#163832]">Expired</option>
        </select>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
    </div>
    );
};
export default StatusSearchFilter;