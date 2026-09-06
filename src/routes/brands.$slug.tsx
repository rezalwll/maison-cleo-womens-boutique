import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { usePreferences } from "@/context/PreferencesContext";
import { brandBySlug } from "@/data/brands";
import { getBrandProducts } from "@/lib/commerce";

export const Route = createFileRoute("/brands/$slug")({
  loader: ({ params }) => {
    const brand = brandBySlug(params.slug);
    if (!brand) throw notFound();
    return { name: brand.name, intro: brand.intro.en };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found | Maison Cleo" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} at Maison Cleo | Nashville`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.intro },
      ],
    };
  },
  component: BrandPage,
});

function BrandPage() {
  const { slug } = Route.useParams();
  const { t, tr } = usePreferences();
  const brand = brandBySlug(slug)!;
  return (
    <>
      <PageHeader eyebrow={t("nav.brands")} title={brand.name} sub={tr(brand.intro)} />
      <ProductBrowser products={getBrandProducts(slug)} hideBrand />
    </>
  );
}
