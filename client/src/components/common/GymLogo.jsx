import { useLocale } from "../../i18n/useLocale";

/** Theme variants keep their original artwork and transparency; Tailwind selects the active one. */
export default function GymLogo({ className = "h-12 w-12", alt }) {
    const { t } = useLocale();
    const accessibleName = alt || t("Gym logo");

    return <>
        <img src="/images/gym-logo-light.png" alt={accessibleName} className={`block object-contain dark:hidden ${className}`} draggable="false" />
        <img src="/images/gym-logo-dark.png" alt={accessibleName} className={`hidden object-contain dark:block ${className}`} draggable="false" />
    </>;
}
