import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { usePreferences } from "@/context/PreferencesContext";
import { shippingPolicy } from "@/lib/store.config";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns | Maison Cleo" },
      {
        name: "description",
        content:
          "How Maison Cleo orders are shipped from Nashville and how to arrange a return or exchange.",
      },
      { property: "og:title", content: "Shipping & Returns | Maison Cleo" },
      { property: "og:description", content: "Shipping, processing times and returns." },
    ],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  const { t } = usePreferences();
  const pending = t("config.pending");

  const rows = [
    { label: "Domestic shipping", value: shippingPolicy.domesticShipping },
    {
      label: "Free shipping threshold",
      value:
        shippingPolicy.freeShippingThreshold === null
          ? ""
          : `$${shippingPolicy.freeShippingThreshold}`,
    },
    { label: "Processing time", value: shippingPolicy.processingTime },
    { label: "Return window", value: shippingPolicy.returnWindow },
    {
      label: "Sale items returnable",
      value:
        shippingPolicy.saleItemsReturnable === null
          ? ""
          : shippingPolicy.saleItemsReturnable
            ? "Yes"
            : "No",
    },
  ];

  return (
    <>
      <PageHeader title={t("shipping.title")} sub={t("shipping.sub")} />
      <div className="pad-x mx-auto max-w-3xl pb-28">
        <dl className="divide-y divide-border border-y border-border">
          {rows.map((r) => (
            <div key={r.label} className="flex flex-wrap justify-between gap-4 py-5">
              <dt className="label-xs text-muted-foreground">{r.label}</dt>
              <dd className="text-sm">{r.value || pending}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-xs text-muted-foreground">{t("common.configNote")}</p>
      </div>
    </>
  );
}
