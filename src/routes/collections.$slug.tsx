import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { usePreferences } from "@/context/PreferencesContext";
import { getCollection, getCollectionProducts } from "@/lib/commerce";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { title: collection.title.en, description: collection.description.en };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found | Maison Cleo" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} | Maison Cleo`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const { t, tr } = usePreferences();
  const collection = getCollection(slug)!;
  return (
    <>
      <PageHeader
        eyebrow={t("collections.title")}
        title={tr(collection.title)}
        sub={tr(collection.description)}
      />
      <ProductBrowser products={getCollectionProducts(slug)} />
    </>
  );
}
