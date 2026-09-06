import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePreferences } from "@/context/PreferencesContext";
import { LanguageToggle, ThemeToggle } from "./PrefToggles";

const links = [
  { to: "/shop", key: "nav.shop" },
  { to: "/new-arrivals", key: "nav.newArrivals" },
  { to: "/collections", key: "nav.collections" },
  { to: "/categories", key: "nav.categories" },
  { to: "/brands", key: "nav.brands" },
  { to: "/sale", key: "nav.sale" },
  { to: "/lookbook", key: "nav.lookbook" },
  { to: "/journal", key: "nav.journal" },
  { to: "/about", key: "nav.about" },
  { to: "/store", key: "nav.store" },
  { to: "/contact", key: "nav.contact" },
  { to: "/wishlist", key: "nav.wishlist" },
] as const;

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = usePreferences();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.menu")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-background px-5 py-5 md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="label-xs">{t("nav.menu")}</span>
            <button type="button" aria-label={t("nav.close")} onClick={onClose}>
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>

          <nav className="mt-10">
            <ul className="space-y-5">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className="block py-1 font-display text-3xl uppercase tracking-tight"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
