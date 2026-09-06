import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { usePreferences } from "@/context/PreferencesContext";
import { getSaleProducts } from "@/lib/commerce";

export const Route = createFileRoute("/sale")({
  head: () => ({
    meta: [
      { title: "The Sale Edit | Maison Cleo Nashville" },
      {
        name: "description",
        content:
          "A short list of Maison Cleo pieces at a reduced price — designer tops, dresses and outerwear while they last.",
      },
      { property: "og:title", content: "The Sale Edit | Maison Cleo" },
      { property: "og:description", content: "Selected pieces at a reduced price." },
    ],
  }),
  component: SalePage,
});

function SalePage() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader eyebrow={t("nav.sale")} title={t("sale.title")} sub={t("sale.sub")} />
      <ProductBrowser products={getSaleProducts()} />
    </>
  );
}
