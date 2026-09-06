import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/context/CartContext";
import { usePreferences } from "@/context/PreferencesContext";
import { formatCurrency } from "@/lib/format";

export function CartDrawer() {
  const cart = useCart();
  const { t, tr, lang, dir } = usePreferences();
  const locale = lang === "fa" ? "fa-IR" : "en-US";
  const open = cart.drawerOpen;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, cart]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => cart.setDrawerOpen(false)}
            className="fixed inset-0 z-[80] bg-ink/40"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={t("cart.title")}
            initial={{ x: dir === "rtl" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: dir === "rtl" ? "-100%" : "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 end-0 z-[81] flex w-full max-w-[420px] flex-col bg-background"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-5">
              <h2 className="label-xs">
                {t("cart.title")} ({cart.count})
              </h2>
              <button
                type="button"
                aria-label={t("nav.close")}
                onClick={() => cart.setDrawerOpen(false)}
              >
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              {cart.lines.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("cart.emptyBody")}</p>
              ) : (
                <ul className="space-y-6">
                  {cart.lines.map((l) => (
                    <li key={l.key} className="flex gap-4">
                      <img
                        src={l.product.images[0]}
                        alt=""
                        className="h-28 w-20 shrink-0 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="label-xs text-muted-foreground">{l.product.brand}</p>
                        <p className="mt-1 text-sm">{tr(l.product.name)}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {l.size} · {tr(
                            l.product.colors.find((c) => c.id === l.colorId)?.name ?? {
                              en: l.colorId,
                              fa: l.colorId,
                            },
                          )}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border border-border">
                            <button
                              type="button"
                              aria-label="-"
                              className="px-2 py-1 text-sm"
                              onClick={() => cart.updateCartItem(l.key, l.quantity - 1)}
                            >
                              −
                            </button>
                            <span className="price px-2 text-sm">{l.quantity}</span>
                            <button
                              type="button"
                              aria-label="+"
                              className="px-2 py-1 text-sm"
                              onClick={() => cart.updateCartItem(l.key, l.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <span className="price text-sm">
                            {formatCurrency(l.product.price * l.quantity, locale)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-border px-5 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="label-xs">{t("cart.subtotal")}</span>
                <span className="price">{formatCurrency(cart.subtotal, locale)}</span>
              </div>
              <Link
                to="/cart"
                onClick={() => cart.setDrawerOpen(false)}
                className="mt-4 block bg-primary py-4 text-center text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
              >
                {t("cart.title")}
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
