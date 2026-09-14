import React from "react";
import Searchbar from "../members/Searchbar";
import MembersNavigation from "../members/MembersNavigation";
import MembersNamesHeader from "../members/MembersNamesHeader";
import MemberInfoCard from "../members/MemberInfoCard";

function Members(){
    return(
        <div>
            <h1>Members Page</h1>
            <Searchbar />
            <div>
                <MembersNavigation />
            </div>
            <div>
                <MembersNamesHeader />
            </div>
            <div>
                <MemberInfoCard />
            </div>
        </div>
    );
};
export default Members;