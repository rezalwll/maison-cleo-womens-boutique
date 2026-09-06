import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { usePreferences } from "@/context/PreferencesContext";
import { getNewArrivals } from "@/lib/commerce";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "Just In — New Arrivals | Maison Cleo" },
      {
        name: "description",
        content:
          "The newest pieces on the rack at Maison Cleo Nashville, added throughout the season.",
      },
      { property: "og:title", content: "Just In — New Arrivals | Maison Cleo" },
      {
        property: "og:description",
        content: "The latest arrivals at our Nashville boutique, chosen with intention.",
      },
    ],
  }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader
        eyebrow={t("newArrivals.title")}
        title={t("nav.newArrivals")}
        sub={t("home.newArrivalsSub")}
      />
      <ProductBrowser products={getNewArrivals()} />
    </>
  );
}
