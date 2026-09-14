import React from "react";
import { Link } from "react-router";

const navItems = [
    {label: "All Members", path: "/allMembers"},
    {label: "Active", path: "/activeMembers"},
    {label: "Expired", path: "/expiredMembers"},
    {label: "Expiring Soon", path: "/expiringSoonMembers"},
];

function MembersNavigation(){

    return(
        <div>
            <div>
            {navItems.map((item,index)=>{
                <Link to={item.path} key={item.index}/>
            })}
            </div>
            <div>
                {/* Calenders Icon */}
            </div>
        </div>
    );
};

export default MembersNavigation;