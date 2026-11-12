import { useTranslation } from "react-i18next";
import { localDate, localNumber } from "./formatters";

const predefinedValues = new Map([
    ["active", "Active"],
    ["expired", "Expired"],
    ["expiring soon", "Expiring Soon"],
    ["deactive", "Deactive"],
    ["deactivated", "Deactive"],
    ["male", "Male"],
    ["female", "Female"],
    ["cash", "Cash"],
    ["card", "Card"],
    ["bank transfer", "Bank Transfer"],
]);

const settingsFields = {
    gym_name: "Gym Name",
    phone: "Phone",
    email: "Email",
    address: "Address",
};

const reportDateFields = { start_date: "Start Date", end_date: "End Date" };

export function useLocale() {
    const { t, i18n } = useTranslation();
    const language = i18n.resolvedLanguage;
    const formatNumber = (value, options) => localNumber(language, value, options);
    const formatCurrency = (value, options) => formatNumber(value, {
        style: "currency", currency: "AFN", minimumFractionDigits: 0, maximumFractionDigits: 2, ...options,
    });
    const formatDate = (value, options) => localDate(language, value, options);

    // Translate only values from known enum fields. Names, plans and other records stay as entered.
    const translateValue = (value) => {
        const key = typeof value === "string" && predefinedValues.get(value.toLowerCase());
        return key ? t(key) : value;
    };

    // Keep raw API messages in state so an already-visible error can follow a language switch.
    const translateError = (message) => {
        if (!message) return "";
        if (typeof message !== "string") return t("Request failed. Please try again.");
        const length = /^(gym_name|phone|email|address) must contain between 1 and (\d+) characters\.$/.exec(message);
        if (length) return t("{{field}} must contain between 1 and {{max}} characters.", {
            field: t(settingsFields[length[1]]), max: formatNumber(length[2]),
        });
        const type = /^(gym_name|phone|email|address) must be a string or null\.$/.exec(message);
        if (type) return t("{{field}} must be a string or null.", { field: t(settingsFields[type[1]]) });
        const reportDate = /^(start_date|end_date) (must use the YYYY-MM-DD format\.|must be a valid calendar date\.)$/.exec(message);
        if (reportDate) return t(`{{field}} ${reportDate[2]}`, { field: t(reportDateFields[reportDate[1]]) });
        return i18n.exists(message) ? t(message) : t("Request failed. Please try again.");
    };

    return { t, i18n, language, formatNumber, formatCurrency, formatDate, translateValue, translateError };
}
