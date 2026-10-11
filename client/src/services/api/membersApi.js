import axios from "axios";

const API_URL = "/api/members";

export async function getMembers(){

    const result = await axios.get(API_URL); 
    return result.data;
};

export async function getSpecificMember(memberId){

    const result = await axios.get(`${API_URL}/${memberId}`);
    return result.data;
};

export async function addMember(memberData) {

    const result = await axios.post(API_URL, memberData);
    return result.data;
};

export async function editSpecificMember(memberId, newData) {
    
    const result = await axios.patch(`${API_URL}/${memberId}`, newData);
    return result.data;
};