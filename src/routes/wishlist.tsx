import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductGrid } from "@/components/products/ProductCard";
import { usePreferences } from "@/context/PreferencesContext";
import { useWishlist } from "@/context/WishlistContext";
import { getProductsByIds } from "@/lib/commerce";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | Maison Cleo" },
      { name: "description", content: "The Maison Cleo pieces you've saved for later." },
      { property: "og:title", content: "Wishlist | Maison Cleo" },
      { property: "og:description", content: "Your saved pieces at Maison Cleo." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { t } = usePreferences();
  const wishlist = useWishlist();
  const items = getProductsByIds(wishlist.ids);

  return (
    <>
      <PageHeader eyebrow={t("nav.wishlist")} title={t("wishlist.title")} />
      <div className="pad-x mx-auto max-w-[1500px] pb-32">
        {items.length === 0 ? (
          <>
            <p className="text-lg">{t("wishlist.emptyTitle")}</p>
            <Link
              to="/shop"
              className="mt-6 inline-block bg-primary px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
            >
              {t("wishlist.emptyCta")}
            </Link>
          </>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </>
  );
}
