import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import dari from "./locales/fa-AF.json";
import pashto from "./locales/ps-AF.json";

export const languages = {
    en: "English",
    "fa-AF": "دری",
    "ps-AF": "پښتو",
};

const storageKey = "gms-language";

function savedLanguage() {
    try {
        const saved = localStorage.getItem(storageKey);
        return Object.hasOwn(languages, saved) ? saved : "en";
    } catch {
        return "en";
    }
}

function applyLanguage(language) {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "en" ? "ltr" : "rtl";
    document.title = i18n.t("Gym Management System");
    try {
        localStorage.setItem(storageKey, language);
    } catch {
        // Switching still works if the runtime disables storage.
    }
}

// Load all languages before the first render, including in an offline desktop renderer.
i18n.on("languageChanged", applyLanguage);
i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, "fa-AF": { translation: dari }, "ps-AF": { translation: pashto } },
    supportedLngs: Object.keys(languages),
    lng: savedLanguage(),
    fallbackLng: "en",
    initAsync: false,
    keySeparator: false,
    nsSeparator: false,
    interpolation: { escapeValue: false }, // React escapes interpolated text.
    showSupportNotice: false,
});

export default i18n;
