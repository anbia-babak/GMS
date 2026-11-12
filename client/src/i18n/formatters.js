const pashtoMonths = {
    persian: ["وری", "غویی", "غبرګولی", "چنګاښ", "زمری", "وږی", "تله", "لړم", "لیندۍ", "مرغومی", "سلواغه", "کب"],
    gregory: ["جنوري", "فبروري", "مارچ", "اپرېل", "مې", "جون", "جولای", "اګست", "سپټمبر", "اکتوبر", "نومبر", "ډسمبر"],
};
const pashtoWeekdays = ["یکشنبه", "دوشنبه", "سې شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];

function locales(language) {
    // Some Chromium builds omit Pashto ICU data. Dari provides Afghan patterns and symbols.
    return language === "en" ? ["en"] : [language, "fa-AF", "fa"];
}

export function localNumber(language, value, options) {
    return new Intl.NumberFormat(locales(language), {
        numberingSystem: language === "en" ? "latn" : "arabext",
        ...options,
    }).format(value);
}

export function localDate(language, value, options = { dateStyle: "medium" }) {
    if (!value) return "—";
    // Treat API calendar dates as date-only values so timezone offsets cannot shift them.
    const dateOnly = typeof value === "string" && /^\d{4}-\d{2}-\d{2}(?:$|T)/.test(value);
    const date = new Date(dateOnly ? `${value.slice(0, 10)}T00:00:00Z` : value);
    if (Number.isNaN(date.getTime())) return value;

    const calendar = options.calendar ?? (language === "en" ? "gregory" : "persian");
    const timeZone = dateOnly ? "UTC" : undefined;
    const formatter = new Intl.DateTimeFormat(locales(language), {
        calendar,
        numberingSystem: language === "en" ? "latn" : "arabext",
        timeZone,
        ...(language === "ps-AF" && { hourCycle: "h23" }),
        ...options,
    });
    if (language !== "ps-AF" || formatter.resolvedOptions().locale.startsWith("ps")) {
        return formatter.format(date);
    }

    // Supply Pashto names when Intl has to fall back to Dari for the date pattern.
    return formatter.formatToParts(date).map((part) => {
        if (part.type === "weekday") return pashtoWeekdays[dateOnly ? date.getUTCDay() : date.getDay()];
        if (part.type === "month" && /\p{L}/u.test(part.value) && pashtoMonths[calendar]) {
            const month = new Intl.DateTimeFormat("en", { calendar, timeZone, month: "numeric" }).format(date);
            return pashtoMonths[calendar][Number(month) - 1] ?? part.value;
        }
        return part.value;
    }).join("");
}
