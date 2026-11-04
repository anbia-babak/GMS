import apiClient from "./apiClient";

export async function getSettings() {
    return (await apiClient.get("/settings")).data;
}

export async function updateSettings(settingsData) {
    return (await apiClient.patch("/settings", settingsData)).data;
}
