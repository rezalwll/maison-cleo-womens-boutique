import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePreferences } from "@/context/PreferencesContext";
import { searchProducts } from "@/lib/commerce";
import { formatCurrency } from "@/lib/format";
import { track } from "@/lib/analytics";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, tr, lang } = usePreferences();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const results = q.trim() ? searchProducts(q).slice(0, 6) : [];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t("search.title")}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] bg-background md:inset-x-0 md:bottom-auto"
        >
          <div className="pad-x mx-auto max-w-[1100px] py-8 md:py-14">
            <div className="flex items-center justify-between gap-6">
              <span className="label-xs text-muted-foreground">{t("search.title")}</span>
              <button type="button" aria-label={t("nav.close")} onClick={onClose}>
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!q.trim()) return;
                track("search", { q });
                onClose();
                navigate({ to: "/search", search: { q } });
              }}
            >
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("search.placeholder")}
                aria-label={t("search.placeholder")}
                className="mt-6 w-full border-b border-border bg-transparent pb-4 font-display text-3xl uppercase tracking-tight outline-none placeholder:text-muted-foreground md:text-5xl"
              />
            </form>

            {!q.trim() && (
              <p className="mt-6 text-sm text-muted-foreground">{t("search.hint")}</p>
            )}

            {q.trim() && results.length === 0 && (
              <p className="mt-6 text-sm text-muted-foreground">{t("search.emptyTitle")}</p>
            )}

            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    onClick={onClose}
                    className="group flex gap-4"
                  >
                    <img
                      src={p.images[0]}
                      alt=""
                      className="h-24 w-20 shrink-0 object-cover"
                      loading="lazy"
                    />
                    <span className="min-w-0">
                      <span className="label-xs block text-muted-foreground">{p.brand}</span>
                      <span className="mt-1 block text-sm">{tr(p.name)}</span>
                      <span className="price mt-1 block text-sm text-muted-foreground">
                        {formatCurrency(p.price, lang === "fa" ? "fa-IR" : "en-US")}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
