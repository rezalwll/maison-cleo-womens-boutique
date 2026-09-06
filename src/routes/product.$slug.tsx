import { useEffect, useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Heart, Minus, Plus } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { getProduct, getRelatedProducts } from "@/lib/commerce";
import { formatCurrency, discountPercent } from "@/lib/format";
import { track } from "@/lib/analytics";
import { ProductGrid } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/PageHeader";
import { shippingPolicy } from "@/lib/store.config";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { name: product.name.en, brand: product.brand, description: product.description.en };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found | Maison Cleo" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} by ${loaderData.brand} | Maison Cleo`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
});

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-start text-[11px] uppercase tracking-[0.15em]"
      >
        {title}
        {open ? (
          <Minus className="h-4 w-4" strokeWidth={1.4} />
        ) : (
          <Plus className="h-4 w-4" strokeWidth={1.4} />
        )}
      </button>
      {open && <div className="pb-5 text-sm leading-relaxed text-muted-foreground">{children}</div>}
    </div>
  );
}

function ProductPage() {
  const { slug } = Route.useParams();
  const { t, tr, lang } = usePreferences();
  const cart = useCart();
  const wishlist = useWishlist();
  const product = getProduct(slug)!;
  const locale = lang === "fa" ? "fa-IR" : "en-US";

  const [colorId, setColorId] = useState(product.colors[0]?.id ?? "");
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setColorId(product.colors[0]?.id ?? "");
    setSize(null);
    setAdded(false);
    track("product_view", { slug: product.slug });
  }, [product]);

  const off = discountPercent(product.price, product.compareAtPrice);
  const soldOut = product.inventory === 0;
  const low = typeof product.inventory === "number" && product.inventory > 0 && product.inventory <= 3;

  const add = () => {
    if (!size) {
      setError(true);
      return;
    }
    setError(false);
    cart.addToCart({ productId: product.id, colorId, size });
    cart.setDrawerOpen(true);
    setAdded(true);
  };

  return (
    <>
      <div className="pad-x mx-auto max-w-[1500px] pt-28 md:pt-36">
        <div className="grid gap-10 lg:grid-cols-[62%_1fr] lg:gap-16">
          <div>
            <div className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto lg:grid lg:grid-cols-2 lg:gap-2 lg:overflow-visible">
              {product.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${tr(product.name)} — view ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="aspect-[3/4] w-[86vw] shrink-0 snap-center bg-muted object-cover lg:w-auto"
                />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <Link
              to="/brands/$slug"
              params={{ slug: product.brand.toLowerCase().replace(/\s+/g, "-") }}
              className="label-xs text-muted-foreground hover:text-terracotta"
            >
              {product.brand}
            </Link>
            <h1 className="mt-3 font-display text-3xl uppercase leading-tight tracking-tight md:text-4xl">
              {tr(product.name)}
            </h1>
            <p className="price mt-4 flex items-center gap-3 text-base">
              {product.compareAtPrice && (
                <span className="text-muted-foreground line-through">
                  {formatCurrency(product.compareAtPrice, locale)}
                </span>
              )}
              <span className={product.sale ? "text-terracotta" : ""}>
                {formatCurrency(product.price, locale)}
              </span>
              {off && <span className="text-xs text-terracotta">−{off}%</span>}
            </p>

            <div className="mt-8">
              <p className="label-xs text-muted-foreground">
                {t("product.color")} ·{" "}
                {tr(product.colors.find((c) => c.id === colorId)?.name ?? { en: "", fa: "" })}
              </p>
              <div className="mt-3 flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={tr(c.name)}
                    aria-pressed={colorId === c.id}
                    onClick={() => setColorId(c.id)}
                    style={{ backgroundColor: c.hex }}
                    className={`h-8 w-8 rounded-full border transition-shadow ${
                      colorId === c.id
                        ? "border-foreground ring-1 ring-foreground ring-offset-2 ring-offset-background"
                        : "border-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="label-xs text-muted-foreground">{t("product.size")}</p>
                <Link to="/size-guide" className="text-[11px] underline underline-offset-4">
                  {t("product.sizeGuide")}
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    disabled={!s.available}
                    aria-pressed={size === s.label}
                    onClick={() => {
                      setSize(s.label);
                      setError(false);
                    }}
                    className={`min-w-14 border px-4 py-2.5 text-xs transition-colors ${
                      size === s.label
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    } ${!s.available ? "cursor-not-allowed text-muted-foreground line-through opacity-50" : ""}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {error && <p className="mt-3 text-xs text-terracotta">{t("product.selectSize")}</p>}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              {soldOut
                ? t("product.soldOut")
                : low
                  ? t("product.lowStock", { n: product.inventory ?? 0 })
                  : t("product.inStock")}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={add}
                disabled={soldOut}
                className="flex-1 bg-primary py-4 text-[11px] uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                {soldOut ? t("product.soldOut") : added ? t("product.added") : t("product.addToBag")}
              </button>
              <button
                type="button"
                onClick={() => wishlist.toggle(product.id)}
                aria-label={
                  wishlist.has(product.id)
                    ? t("product.wishlistRemove")
                    : t("product.wishlistAdd")
                }
                className="flex h-[52px] w-[52px] items-center justify-center border border-border"
              >
                <Heart
                  className="h-5 w-5"
                  strokeWidth={1.4}
                  fill={wishlist.has(product.id) ? "currentColor" : "none"}
                />
              </button>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {tr(product.description)}
            </p>

            <div className="mt-10">
              <Accordion title={t("product.details")}>{tr(product.description)}</Accordion>
              <Accordion title={t("product.fit")}>
                {t("size.note")}{" "}
                <Link to="/size-guide" className="underline underline-offset-4">
                  {t("product.sizeGuide")}
                </Link>
              </Accordion>
              <Accordion title={t("product.materials")}>{t("config.pending")}</Accordion>
              <Accordion title={t("product.shipping")}>
                {shippingPolicy.domesticShipping || t("config.pending")}{" "}
                <Link to="/shipping-returns" className="underline underline-offset-4">
                  {t("shipping.title")}
                </Link>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <section className="pad-x mx-auto max-w-[1500px] py-24">
        <SectionHeading title={t("product.related")} />
        <ProductGrid products={getRelatedProducts(product, 4)} />
      </section>
    </>
  );
}
