import i18n from "./index";
import { localNumber } from "./formatters";

// Preserve native constraint checking and focus behavior, with messages from the active app locale.
const customized = new WeakSet();
function clearMessage(field) {
    if (customized.delete(field)) field.setCustomValidity("");
}

document.addEventListener("invalid", ({ target: field }) => {
    clearMessage(field);
    const { validity } = field;
    if (!validity || validity.valid || validity.customError) return;

    let message = i18n.t("Enter a valid value.");
    if (validity.valueMissing) message = i18n.t("This field is required.");
    else if (validity.typeMismatch && field.type === "email") message = i18n.t("Enter a valid email address.");
    else if (validity.rangeUnderflow || validity.rangeOverflow) {
        message = validity.rangeUnderflow
            ? i18n.t("Enter a number of at least {{min}}.", { min: localNumber(i18n.language, field.min) })
            : i18n.t("Enter a number no greater than {{max}}.", { max: localNumber(i18n.language, field.max) });
    }
    field.setCustomValidity(message);
    customized.add(field);
}, true);

document.addEventListener("input", (event) => {
    const form = event.target.form;
    if (form) Array.from(form.elements).forEach(clearMessage);
});
i18n.on("languageChanged", () => {
    document.querySelectorAll("input, select, textarea").forEach(clearMessage);
});
