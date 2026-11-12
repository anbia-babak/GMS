import { useLocale } from "../../i18n/useLocale";
import { useEffect, useState } from "react";
import { SunMoon } from "lucide-react";
// Toggles the "dark" class on <html>. Your style.css already has
// :root (light colors) and .dark (dark colors), so this switches the whole app.
export default function ThemeToggle() {
    const { t } = useLocale();
  const [isDark, setIsDark] = useState(() => localStorage.getItem("gms-theme") === "dark");

  // Apply the saved theme when this control mounts and whenever it changes.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("gms-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? t("Switch to light mode") : t("Switch to dark mode")}
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#8EB69B]/30 bg-[#0B2B26] text-[#DAF1DE] shadow-sm transition duration-200 hover:border-[#8EB69B]/60 hover:bg-[#235347] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EB69B] dark:border-gray-300 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
    >
      <SunMoon size={19} aria-hidden="true" />
    </button>
  );
}
