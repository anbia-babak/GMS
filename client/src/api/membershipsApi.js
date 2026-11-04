import apiClient from "./apiClient";

const API_URL = "/memberships";

export async function getMemberships(filters = {}) {
    const result = await apiClient.get(API_URL, { params: filters });
    return result.data;
}

export async function getMemberMemberships(memberId) {
    const result = await apiClient.get(`${API_URL}/member/${memberId}`);
    return result.data;
}

export async function addMembership(membershipData) {
    const result = await apiClient.post(API_URL, membershipData);
    return result.data;
}

export async function editMembership(membershipId, membershipData) {
    const result = await apiClient.patch(`${API_URL}/${membershipId}`, membershipData);
    return result.data;
}

export async function renewMembership(membershipId, renewalData) {
    const result = await apiClient.post(`${API_URL}/${membershipId}/renew`, renewalData);
    return result.data;
}
