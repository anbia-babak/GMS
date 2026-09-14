import React from "react";

const nameHeaders = [
    {label: "id"},
    {label: "Name"},
    {label: "Payment"},
    {label: "Payed Time"},
    {label: "Status"},
]

function MembersNamesHeader(){

    return(
        <div>
            {nameHeaders.map((item)=>{
                <p>{item.label}</p>
            })}
      
        </div>
    );
};
export default MembersNamesHeader;