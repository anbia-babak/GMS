

function PlanSearchFilter ({ plan, onPlanChange, id, options = [] }){
    return(
        <div className="relative">
                <select name="plan" id={id} value={plan} onChange={(event) => onPlanChange(event.target.value)}
                className="h-11 w-25 appearance-none rounded-xl border-b !border-border !bg-card py-2 pl-4 pr-10 text-sm
                 text-card-foreground outline-none transition !focus:border-primary focus:ring-2 focus:ring-primary/20">
                    <option value="All" className="!bg-card border-b !border-border">All plans</option>
                    {options.map((option) => <option key={option} value={option} className="!bg-card border-b !border-border">{option}</option>)}
                </select>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
        </div>
    );
};
export default PlanSearchFilter;
