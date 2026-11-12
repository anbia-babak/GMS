import PlanSearchFilter from "./PlanSearchFilter";
import StatusSearchFilter from "./StatusSearchFilter";

function SearchingFilters ({ status, plan, plans, onStatusChange, onPlanChange }){

    return (
        <div className="flex max-w-full flex-wrap items-center gap-2">
            <StatusSearchFilter status={status} onStatusChange={onStatusChange} />
            <PlanSearchFilter plan={plan} options={plans} onPlanChange={onPlanChange} />
        </div>    
    );
};
export default SearchingFilters;
