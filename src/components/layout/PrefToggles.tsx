import { Moon, Sun, MonitorSmartphone } from "lucide-react";
import { usePreferences, type ThemeChoice } from "@/context/PreferencesContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = usePreferences();
  return (
    <div
      className={`flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] ${className}`}
      role="group"
      aria-label={t("nav.language")}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={lang === "en" ? "text-terracotta" : "opacity-60 hover:opacity-100"}
      >
        EN
      </button>
      <span aria-hidden="true" className="opacity-40">
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("fa")}
        aria-pressed={lang === "fa"}
        className={lang === "fa" ? "text-terracotta" : "opacity-60 hover:opacity-100"}
      >
        FA
      </button>
    </div>
  );
}

const order: ThemeChoice[] = ["light", "dark", "system"];

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, t } = usePreferences();
  const next = order[(order.indexOf(theme) + 1) % order.length]!;
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : MonitorSmartphone;
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`${t("nav.theme")}: ${t(`theme.${theme}` as "theme.light")}`}
      title={t(`theme.${theme}` as "theme.light")}
      className={`transition-colors hover:text-terracotta ${className}`}
    >
      <Icon className="h-[17px] w-[17px]" strokeWidth={1.4} />
    </button>
  );
}
