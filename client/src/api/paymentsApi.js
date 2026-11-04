import apiClient from "./apiClient";

const API_URL = "/payments";

export async function getPayments(filters = {}) {
    const result = await apiClient.get(API_URL, { params: filters });
    return result.data;
}

export async function getPaymentSummary() {
    const result = await apiClient.get(`${API_URL}/summary`);
    return result.data;
}

export async function getPayment(paymentId) {
    const result = await apiClient.get(`${API_URL}/${paymentId}`);
    return result.data;
}

export async function addPayment(paymentData) {
    const result = await apiClient.post(API_URL, paymentData);
    return result.data;
}

export async function editPayment(paymentId, paymentData) {
    const result = await apiClient.patch(`${API_URL}/edit/${paymentId}`, paymentData);
    return result.data;
}

export async function deletePayment(paymentId) {
    const result = await apiClient.delete(`${API_URL}/${paymentId}`);
    return result.data;
}
