import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import { createCheckoutSession } from "@/lib/commerce";
import { track } from "@/lib/analytics";
import { PageHeader } from "@/components/ui/PageHeader";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag | Maison Cleo" },
      { name: "description", content: "Review the pieces in your Maison Cleo bag before checkout." },
      { property: "og:title", content: "Your Bag | Maison Cleo" },
      { property: "og:description", content: "Review your Maison Cleo selection." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { t, tr, lang } = usePreferences();
  const cart = useCart();
  const locale = lang === "fa" ? "fa-IR" : "en-US";
  const [notice, setNotice] = useState<string | null>(null);

  const checkout = async () => {
    track("checkout_started", { value: cart.subtotal });
    const result = await createCheckoutSession();
    if (result.status === "redirect") window.location.href = result.url;
    else setNotice(t("cart.checkoutPending"));
  };

  if (cart.lines.length === 0) {
    return (
      <>
        <PageHeader title={t("cart.title")} sub={t("cart.emptyBody")} eyebrow={t("nav.cart")} />
        <div className="pad-x mx-auto max-w-[1500px] pb-32">
          <p className="text-lg">{t("cart.emptyTitle")}</p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-primary px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
          >
            {t("cart.continue")}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title={t("cart.title")} eyebrow={t("nav.cart")} />
      <div className="pad-x mx-auto grid max-w-[1500px] gap-12 pb-32 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-border border-y border-border">
          {cart.lines.map((l) => (
            <li key={l.key} className="flex gap-4 py-6">
              <Link to="/product/$slug" params={{ slug: l.product.slug }} className="shrink-0">
                <img
                  src={l.product.images[0]}
                  alt={tr(l.product.name)}
                  className="h-32 w-24 bg-muted object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="label-xs text-muted-foreground">{l.product.brand}</p>
                    <Link
                      to="/product/$slug"
                      params={{ slug: l.product.slug }}
                      className="mt-1 block text-sm font-medium"
                    >
                      {tr(l.product.name)}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {tr(
                        l.product.colors.find((c) => c.id === l.colorId)?.name ?? {
                          en: "",
                          fa: "",
                        },
                      )}{" "}
                      · {l.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={t("cart.remove")}
                    onClick={() => cart.removeCartItem(l.key)}
                  >
                    <X className="h-4 w-4" strokeWidth={1.4} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-border">
                    <button
                      type="button"
                      aria-label="-"
                      className="px-3 py-2"
                      onClick={() => cart.updateCartItem(l.key, l.quantity - 1)}
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={1.4} />
                    </button>
                    <span className="price w-8 text-center text-sm">{l.quantity}</span>
                    <button
                      type="button"
                      aria-label="+"
                      className="px-3 py-2"
                      onClick={() => cart.updateCartItem(l.key, l.quantity + 1)}
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.4} />
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

        <aside className="h-fit border border-border p-6 lg:sticky lg:top-28">
          <div className="flex justify-between text-sm">
            <span>{t("cart.subtotal")}</span>
            <span className="price">{formatCurrency(cart.subtotal, locale)}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{t("cart.shippingNote")}</p>
          <button
            type="button"
            onClick={checkout}
            className="mt-6 w-full bg-primary py-4 text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
          >
            {t("cart.checkout")}
          </button>
          {notice && <p className="mt-4 text-xs text-terracotta">{notice}</p>}
          <Link
            to="/shop"
            className="mt-4 block w-full border border-border py-4 text-center text-[11px] uppercase tracking-[0.2em]"
          >
            {t("cart.continue")}
          </Link>
        </aside>
      </div>
    </>
  );
}
