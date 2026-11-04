import axios from "axios";

// Keeping the base URL relative lets Vite's existing /api proxy work in development
// and avoids tying the browser code to a particular backend host.
const apiClient = axios.create({ baseURL: "/api" });

// Server errors are intentionally reduced to a safe, short message for the UI.
// Axios/network details are still available in the browser console for debugging.
export function getApiErrorMessage(error, fallbackMessage) {
    return error.response?.data?.message || fallbackMessage;
}

export default apiClient;
