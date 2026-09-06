import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animation/Reveal";
import { usePreferences } from "@/context/PreferencesContext";
import { collections } from "@/data/collections";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections | Maison Cleo Nashville" },
      {
        name: "description",
        content:
          "Shop Maison Cleo collections — The Autumn Edit, Everyday Essentials, Dinner Plans, Soft Tailoring, Weekend Away and Under $250.",
      },
      { property: "og:title", content: "Collections | Maison Cleo" },
      { property: "og:description", content: "Edits built around how you actually dress." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const { t, tr } = usePreferences();
  return (
    <>
      <PageHeader eyebrow={t("nav.shop")} title={t("collections.title")} />
      <div className="pad-x mx-auto grid max-w-[1500px] gap-6 pb-24 md:grid-cols-2">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 2) * 0.05}>
            <Link
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="group block"
            >
              <div className="aspect-[3/2] overflow-hidden bg-muted">
                <img
                  src={c.image}
                  alt={tr(c.title)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.035]"
                />
              </div>
              <h2 className="mt-4 font-display text-3xl uppercase tracking-tight">
                {tr(c.title)}
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {tr(c.description)}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
