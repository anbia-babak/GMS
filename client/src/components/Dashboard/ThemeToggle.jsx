import { useEffect, useState } from "react";
import { Moon } from "lucide-react"; 
// Toggles the "dark" class on <html>. Your style.css already has
// :root (light colors) and .dark (dark colors), so this switches the whole app.
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Load the saved choice when the page opens
  useEffect(() => {
    const saved = localStorage.getItem("gms-theme") === "dark";
    setIsDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("gms-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#8EB69B]/40 bg-[#0B2B26] px-4 text-sm font-semibold text-[#DAF1DE] shadow-sm transition hover:bg-[#DAF1DE] dark:border-[#8EB69B]/25 dark:bg-white dark:text-[#0B2B26] dark:hover:bg-[#235347]"
    >
       {/* dark:bg-white bg--[#8EB69B] */}
      <span className="text-base"><Moon /></span>
      {/* {isDark ? "Light " : "Dark "} */}
    </button>
  );
}
