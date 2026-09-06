import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductGrid } from "@/components/products/ProductCard";
import { usePreferences } from "@/context/PreferencesContext";
import { searchProducts } from "@/lib/commerce";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): { q?: string } =>
    typeof search["q"] === "string" ? { q: search["q"] } : {},
  head: () => ({
    meta: [
      { title: "Search | Maison Cleo" },
      { name: "description", content: "Search products, brands and categories at Maison Cleo." },
      { property: "og:title", content: "Search | Maison Cleo" },
      { property: "og:description", content: "Find a piece in the Maison Cleo edit." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { t } = usePreferences();
  const [value, setValue] = useState(q);

  useEffect(() => setValue(q), [q]);
  useEffect(() => {
    if (q) track("search", { query: q });
  }, [q]);

  const results = searchProducts(q);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.search")}
        title={q ? t("search.resultsFor", { q }) : t("search.title")}
        sub={q ? t("shop.results", { n: results.length }) : t("search.hint")}
      >
        <form
          className="mt-8 flex max-w-lg items-center gap-3 border-b border-border pb-3"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: ".", search: { q: value } });
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("search.placeholder")}
            aria-label={t("search.placeholder")}
            className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" className="label-xs">
            {t("nav.search")}
          </button>
        </form>
      </PageHeader>

      <div className="pad-x mx-auto max-w-[1500px] pb-32">
        {q && results.length === 0 ? (
          <div>
            <p className="text-lg">{t("search.emptyTitle")}</p>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              <li>{t("search.tip1")}</li>
              <li>{t("search.tip2")}</li>
              <li>{t("search.tip3")}</li>
            </ul>
          </div>
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </>
  );
}
