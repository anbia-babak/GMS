import apiClient from "./apiClient";

const API_URL = "/members";

export async function getMembers(){

    const result = await apiClient.get(API_URL); 
    return result.data;
};

export async function getSpecificMember(memberId){

    const result = await apiClient.get(`${API_URL}/${memberId}`);
    return result.data;
};

export async function addMember(memberData) {

    const result = await apiClient.post(API_URL, memberData);
    return result.data;
};

export async function editSpecificMember(memberId, newData) {
    
    const result = await apiClient.patch(`${API_URL}/${memberId}`, newData);
    return result.data;
};

export async function deactivateMember(memberId) {
    const result = await apiClient.patch(`${API_URL}/${memberId}/status`);
    return result.data;
}
