import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { usePreferences } from "@/context/PreferencesContext";
import { getCategory, getCategoryProducts } from "@/lib/commerce";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { name: category.name.en, blurb: category.blurb.en };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found | Maison Cleo" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} | Maison Cleo Nashville`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.blurb },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { tr } = usePreferences();
  const category = getCategory(slug)!;
  return (
    <>
      <PageHeader
        eyebrow={tr({ en: "Category", fa: "دسته" })}
        title={tr(category.name)}
        sub={tr(category.blurb)}
      />
      <ProductBrowser products={getCategoryProducts(slug)} hideCategory />
    </>
  );
}
