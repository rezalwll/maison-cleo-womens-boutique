import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { usePreferences } from "@/context/PreferencesContext";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms | Maison Cleo" },
      {
        name: "description",
        content: "Terms of use for the Maison Cleo website and online storefront.",
      },
      { property: "og:title", content: "Terms | Maison Cleo" },
      { property: "og:description", content: "Terms of use for this site." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader title={t("terms.title")} />
      <div className="pad-x mx-auto max-w-2xl space-y-5 pb-28 text-sm leading-relaxed text-muted-foreground">
        <p className="border border-dashed border-border p-4 text-foreground">
          {t("policy.review")}
        </p>
        <p>
          Product photography, descriptions and editorial content on this site belong to Maison
          Cleo and the designers represented.
        </p>
        <p>
          Prices and availability are shown as accurately as possible and may change. A piece in
          your bag is not reserved until an order is completed.
        </p>
        <p>
          Online checkout is not connected on this site yet, so no orders can be placed through it
          at this time.
        </p>
      </div>
    </>
  );
}
