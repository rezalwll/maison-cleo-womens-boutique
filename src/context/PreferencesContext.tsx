import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type TKey } from "@/i18n/en";
import { fa } from "@/i18n/fa";

export type Lang = "en" | "fa";
export type ThemeChoice = "light" | "dark" | "system";

const dicts = { en, fa };

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  theme: ThemeChoice;
  setTheme: (t: ThemeChoice) => void;
  resolvedTheme: "light" | "dark";
  t: (key: TKey, vars?: Record<string, string | number>) => string;
  /** picks the right side of a bilingual field */
  tr: (value: { en: string; fa: string }) => string;
};

const PreferencesContext = createContext<Ctx | null>(null);

const LANG_KEY = "mc.lang";
const THEME_KEY = "mc.theme";

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setThemeState] = useState<ThemeChoice>("system");
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_KEY);
    if (storedLang === "en" || storedLang === "fa") setLangState(storedLang);
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
      setThemeState(storedTheme);
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? (systemDark ? "dark" : "light") : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.lang = lang;
    root.dir = lang === "fa" ? "rtl" : "ltr";
    root.classList.toggle("font-fa", lang === "fa");
  }, [resolvedTheme, lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  }, []);

  const setTheme = useCallback((t: ThemeChoice) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
  }, []);

  const value = useMemo<Ctx>(() => {
    const dict = dicts[lang];
    return {
      lang,
      dir: lang === "fa" ? "rtl" : "ltr",
      setLang,
      theme,
      setTheme,
      resolvedTheme,
      t: (key, vars) => {
        let out = (dict[key] as string) ?? (en[key] as string) ?? String(key);
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            out = out.replaceAll(`{${k}}`, String(v));
          }
        }
        return out;
      },
      tr: (v) => (lang === "fa" ? v.fa : v.en),
    };
  }, [lang, theme, resolvedTheme, setLang, setTheme]);

  return (
    <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
  return ctx;
}
