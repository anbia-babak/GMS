import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { languages } from "../../i18n";

export default function LanguageSelector() {
    const { t, i18n } = useTranslation();
    return (
        <div className="relative min-w-0">
            <Languages
                size={15}
                aria-hidden="true"
                className="pointer-events-none absolute start-2.5 top-1/2 -translate-y-1/2 text-[#8EB69B]"
            />
            <select
                aria-label={t("Language")}
                value={i18n.resolvedLanguage}
                onChange={(event) => i18n.changeLanguage(event.target.value)}
                className="h-10 w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-[#8EB69B]/30 bg-[#0B2B26] ps-8 pe-2 text-xs font-semibold text-[#DAF1DE] shadow-sm outline-none transition duration-200 hover:border-[#8EB69B]/60 focus-visible:ring-2 focus-visible:ring-[#8EB69B] dark:border-gray-300 dark:bg-white dark:text-gray-900"
            >
                {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code} lang={code}>{name}</option>
                ))}
            </select>
        </div>
    );
}
