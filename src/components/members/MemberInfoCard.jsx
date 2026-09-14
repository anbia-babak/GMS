import React from "react";
import { Link } from "react-router";

const members = [
    {
        id: "001",
        img: "imgURL",
        name: "name",
        payment: "cash",
        time: "20min",
        status: "Active",
    },
];

function MemberInfoCard(){

    return(
        <div>
        {members.map((member)=>{
                <div>
                    <p>{member.id}</p>
                    <img src="" alt="" />
                    <p>{member.name}</p>
                    <p>{member.payment}</p>
                    <p>{member.time}</p>
                    <p>{member.status}</p>
                    <Link to={""} key={"View"}/>
                </div>
            })}
        </div>
    );
};
export default MemberInfoCard;