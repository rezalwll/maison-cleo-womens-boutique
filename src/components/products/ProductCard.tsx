import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatCurrency, discountPercent } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Product } from "@/data/types";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { t, tr, lang } = usePreferences();
  const wishlist = useWishlist();
  const saved = wishlist.has(product.id);
  const off = discountPercent(product.price, product.compareAtPrice);
  const locale = lang === "fa" ? "fa-IR" : "en-US";

  const badges: string[] = [];
  if (product.sale) badges.push(t("product.badgeSale"));
  else if (product.newArrival) badges.push(t("product.badgeNew"));
  if (product.bestseller && badges.length < 2) badges.push(t("product.badgeBestseller"));
  else if (product.exclusive && badges.length < 2) badges.push(t("product.badgeExclusive"));

  return (
    <article className="group relative">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        onClick={() => track("product_clicked", { id: product.id })}
        className="block"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={`${tr(product.name)} — ${product.brand}`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-[400ms] group-hover:scale-[1.015] group-hover:opacity-0"
          />
          <img
            src={product.images[1] ?? product.images[0]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-[1.015] object-cover opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
          />
          {badges.length > 0 && (
            <div className="absolute start-3 top-3 flex flex-col gap-1">
              {badges.map((b) => (
                <span
                  key={b}
                  className="bg-terracotta px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-white"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      <button
        type="button"
        aria-label={saved ? t("product.wishlistRemove") : t("product.wishlistAdd")}
        aria-pressed={saved}
        onClick={() => wishlist.toggle(product.id)}
        className="absolute end-3 top-3 p-1.5 text-foreground/70 transition-colors hover:text-terracotta"
      >
        <Heart
          className="h-[18px] w-[18px]"
          strokeWidth={1.4}
          fill={saved ? "currentColor" : "none"}
        />
      </button>

      <div className="pt-4">
        <p className="label-xs text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1.5 text-sm font-medium">
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            {tr(product.name)}
          </Link>
        </h3>
        <p className="price mt-1.5 flex items-center gap-2 text-sm">
          {product.compareAtPrice && (
            <span className="text-muted-foreground line-through">
              {formatCurrency(product.compareAtPrice, locale)}
            </span>
          )}
          <span className={product.sale ? "text-terracotta" : "text-foreground/80"}>
            {formatCurrency(product.price, locale)}
          </span>
          {off && <span className="text-[11px] text-terracotta">−{off}%</span>}
        </p>
        {product.colors.length > 1 && (
          <ul className="mt-2 flex items-center gap-1.5">
            {product.colors.map((c) => (
              <li
                key={c.id}
                title={tr(c.name)}
                className="h-2.5 w-2.5 rounded-full border border-border"
                style={{ backgroundColor: c.hex }}
              >
                <span className="sr-only">{tr(c.name)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 2 | 4;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 ${
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-2"
      }`}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}

export function ProductRow({ products }: { products: Product[] }) {
  return (
    <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="w-[68vw] shrink-0 snap-start sm:w-[40vw] lg:w-[calc((100%-4*1.5rem)/5)]"
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
