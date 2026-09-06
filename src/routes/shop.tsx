import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { usePreferences } from "@/context/PreferencesContext";
import { getProducts } from "@/lib/commerce";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "The Collection | Shop Maison Cleo" },
      {
        name: "description",
        content:
          "Shop the full Maison Cleo collection — tops, dresses, outerwear and knitwear from contemporary designers, filtered by size, brand and price.",
      },
      { property: "og:title", content: "The Collection | Shop Maison Cleo" },
      {
        property: "og:description",
        content: "Browse every piece in the Maison Cleo edit, filtered your way.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader title={t("shop.title")} eyebrow={t("nav.shop")} sub={t("shop.sub")} />
      <ProductBrowser products={getProducts()} />
    </>
  );
}
