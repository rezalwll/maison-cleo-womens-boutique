import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animation/Reveal";
import { usePreferences } from "@/context/PreferencesContext";
import { brands } from "@/data/brands";
import { getBrandProducts } from "@/lib/commerce";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "Designers We Love | Maison Cleo Nashville" },
      {
        name: "description",
        content:
          "The designers stocked at Maison Cleo: Vince, Velvet, Ulla Johnson, Free People, Veronica Beard and Rails.",
      },
      { property: "og:title", content: "Designers We Love | Maison Cleo" },
      { property: "og:description", content: "The labels on our rack, and why we carry them." },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  const { t, tr } = usePreferences();
  return (
    <>
      <PageHeader eyebrow={t("nav.brands")} title={t("brands.title")} />
      <div className="pad-x mx-auto max-w-[1500px] pb-24">
        <ul className="divide-y divide-border border-y border-border">
          {brands.map((b, i) => (
            <li key={b.slug}>
              <Reveal delay={i * 0.03}>
                <Link
                  to="/brands/$slug"
                  params={{ slug: b.slug }}
                  className="group flex items-center gap-6 py-7"
                >
                  <img
                    src={b.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="hidden h-24 w-20 object-cover sm:block"
                  />
                  <div className="flex-1">
                    <h2 className="font-display text-3xl uppercase tracking-tight transition-colors group-hover:text-terracotta md:text-5xl">
                      {b.name}
                    </h2>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground">{tr(b.intro)}</p>
                  </div>
                  <span className="price hidden text-xs text-muted-foreground sm:block">
                    {t("shop.results", { n: getBrandProducts(b.slug).length })}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
