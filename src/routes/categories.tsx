import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animation/Reveal";
import { usePreferences } from "@/context/PreferencesContext";
import { categories } from "@/data/categories";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Shop by Category | Maison Cleo" },
      {
        name: "description",
        content:
          "Browse Maison Cleo by category — tops and blouses, dresses and skirts, outerwear, knitwear and more.",
      },
      { property: "og:title", content: "Shop by Category | Maison Cleo" },
      { property: "og:description", content: "Every category in the Maison Cleo edit." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { t, tr } = usePreferences();
  return (
    <>
      <PageHeader eyebrow={t("nav.shop")} title={t("categories.title")} />
      <div className="pad-x mx-auto grid max-w-[1500px] gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.05}>
            <Link
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group block overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={c.image}
                  alt={tr(c.name)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.035]"
                />
              </div>
              <h2 className="mt-4 font-display text-2xl uppercase tracking-tight">
                {tr(c.name)}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{tr(c.blurb)}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
