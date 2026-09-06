import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { usePreferences } from "@/context/PreferencesContext";
import { store } from "@/lib/store.config";
import { media } from "@/data/media";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Visit Maison Cleo | Boutique in Nashville, TN" },
      {
        name: "description",
        content:
          "Visit the Maison Cleo boutique in Nashville, Tennessee — store details, hours and personal styling appointments.",
      },
      { property: "og:title", content: "Visit Maison Cleo | Nashville, TN" },
      { property: "og:description", content: "Come see the edit in person in Nashville." },
    ],
  }),
  component: StorePage,
});

function Detail({ label, value, pending }: { label: string; value: string; pending: string }) {
  return (
    <div className="border-b border-border py-4">
      <p className="label-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm">{value || pending}</p>
    </div>
  );
}

function StorePage() {
  const { t } = usePreferences();
  const pending = t("config.pending");

  return (
    <>
      <PageHeader eyebrow={store.descriptor} title={t("store.title")} />
      <div className="pad-x mx-auto grid max-w-[1500px] gap-12 pb-28 md:grid-cols-2 md:gap-16">
        <div>
          <img
            src={media.store}
            alt="The Maison Cleo boutique interior"
            className="aspect-[4/5] w-full bg-muted object-cover"
          />
          <div className="mt-6 flex aspect-[16/9] items-center justify-center border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
            {t("store.mapPlaceholder")}
          </div>
        </div>

        <div>
          <Detail label={t("store.address")} value={store.address} pending={pending} />
          <div className="border-b border-border py-4">
            <p className="label-xs text-muted-foreground">{t("store.hours")}</p>
            {store.hours.length === 0 ? (
              <p className="mt-1 text-sm">{pending}</p>
            ) : (
              <ul className="mt-1 space-y-1 text-sm">
                {store.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-6">
                    <span>{h.days}</span>
                    <span className="price">{h.hours}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Detail label={t("store.phone")} value={store.phone} pending={pending} />
          <Detail label={t("store.email")} value={store.email} pending={pending} />

          <h2 className="mt-12 font-display text-3xl uppercase tracking-tight">
            {t("store.styling")}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("store.stylingBody")}
          </p>
          <Link
            to="/contact"
            search={{ topic: "styling" }}
            className="mt-6 inline-block bg-primary px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
          >
            {t("store.stylingCta")}
          </Link>
        </div>
      </div>
    </>
  );
}
