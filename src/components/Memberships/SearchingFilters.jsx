import PlanSearchFilter from "./PlanSearchFilter";
import StatusSearchFilter from "./StatusSearchFilter";

function SearchingFilters (){

    return (
        <div className="flex shrink-0 items-center gap-2">
            <StatusSearchFilter />
            <PlanSearchFilter />
        </div>    
    );
};
export default SearchingFilters;
