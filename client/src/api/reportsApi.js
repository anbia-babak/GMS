import apiClient from "./apiClient";

export async function getMemberReport() {
    return (await apiClient.get("/reports/members")).data;
}

export async function getMembershipReport() {
    return (await apiClient.get("/reports/memberships")).data;
}

export async function getIncomeReport(filters = {}) {
    return (await apiClient.get("/reports/income", { params: filters })).data;
}

export async function getPaymentReport(filters = {}) {
    return (await apiClient.get("/reports/payments", { params: filters })).data;
}
