import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { ProductGrid } from "./ProductCard";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { track } from "@/lib/analytics";
import type { Product } from "@/data/types";

type Sort = "featured" | "newest" | "priceAsc" | "priceDesc";

const SIZES = ["XS", "S", "M", "L", "XL"];

export function ProductBrowser({
  products,
  hideCategory = false,
  hideBrand = false,
}: {
  products: Product[];
  hideCategory?: boolean;
  hideBrand?: boolean;
}) {
  const { t, tr } = usePreferences();
  const [sort, setSort] = useState<Sort>("featured");
  const [cats, setCats] = useState<string[]>([]);
  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [visible, setVisible] = useState(12);
  const [columns, setColumns] = useState<2 | 4>(4);

  const allColors = useMemo(() => {
    const map = new Map<string, { id: string; name: { en: string; fa: string } }>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.id, c)));
    return [...map.values()];
  }, [products]);

  const toggle = (
    value: string,
    list: string[],
    setter: (v: string[]) => void,
    filterName: string,
  ) => {
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
    track("filter_applied", { filter: filterName, value });
  };

  const filtered = useMemo(() => {
    let out = products.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (brandSel.length && !brandSel.includes(p.brand)) return false;
      if (sizes.length && !p.sizes.some((s) => s.available && sizes.includes(s.label)))
        return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.id))) return false;
      if (maxPrice !== null && p.price > maxPrice) return false;
      if (inStockOnly && !(p.inventory && p.inventory > 0)) return false;
      if (saleOnly && !p.sale) return false;
      return true;
    });
    out = [...out];
    if (sort === "newest") out.sort((a, b) => +new Date(b.releasedAt) - +new Date(a.releasedAt));
    if (sort === "priceAsc") out.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") out.sort((a, b) => b.price - a.price);
    return out;
  }, [products, cats, brandSel, sizes, colors, maxPrice, inStockOnly, saleOnly, sort]);

  const activeCount =
    cats.length +
    brandSel.length +
    sizes.length +
    colors.length +
    (maxPrice !== null ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (saleOnly ? 1 : 0);

  const clearAll = () => {
    setCats([]);
    setBrandSel([]);
    setSizes([]);
    setColors([]);
    setMaxPrice(null);
    setInStockOnly(false);
    setSaleOnly(false);
  };

  const Chip = ({
    active,
    children,
    onClick,
  }: {
    active: boolean;
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-1.5 text-xs transition-colors ${
        active
          ? "border-terracotta bg-terracotta text-white"
          : "border-border hover:border-foreground"
      }`}
    >
      {children}
    </button>
  );

  const Panel = (
    <div className="space-y-8">
      {!hideCategory && (
        <fieldset>
          <legend className="label-xs text-muted-foreground">{t("shop.category")}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Chip
                key={c.slug}
                active={cats.includes(c.slug)}
                onClick={() => toggle(c.slug, cats, setCats, "category")}
              >
                {tr(c.name)}
              </Chip>
            ))}
          </div>
        </fieldset>
      )}

      {!hideBrand && (
        <fieldset>
          <legend className="label-xs text-muted-foreground">{t("shop.brand")}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {brands.map((b) => (
              <Chip
                key={b.slug}
                active={brandSel.includes(b.name)}
                onClick={() => toggle(b.name, brandSel, setBrandSel, "brand")}
              >
                {b.name}
              </Chip>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="label-xs text-muted-foreground">{t("shop.sizeF")}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <Chip
              key={s}
              active={sizes.includes(s)}
              onClick={() => toggle(s, sizes, setSizes, "size")}
            >
              {s}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-xs text-muted-foreground">{t("shop.color")}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {allColors.map((c) => (
            <Chip
              key={c.id}
              active={colors.includes(c.id)}
              onClick={() => toggle(c.id, colors, setColors, "color")}
            >
              {tr(c.name)}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-xs text-muted-foreground">{t("shop.price")}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[200, 350, 500, 800].map((v) => (
            <Chip
              key={v}
              active={maxPrice === v}
              onClick={() => setMaxPrice(maxPrice === v ? null : v)}
            >
              ≤ ${v}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-xs text-muted-foreground">{t("shop.availability")}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip active={inStockOnly} onClick={() => setInStockOnly(!inStockOnly)}>
            {t("shop.inStockOnly")}
          </Chip>
          <Chip active={saleOnly} onClick={() => setSaleOnly(!saleOnly)}>
            {t("shop.onSale")}
          </Chip>
        </div>
      </fieldset>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.2em]"
        >
          {t("shop.clear")}
        </button>
      )}
    </div>
  );

  return (
    <div className="pad-x mx-auto max-w-[1500px] pb-24">
      <div className="mb-8 flex items-center justify-between gap-4 border-y border-border py-4">
        <button
          type="button"
          onClick={() => setDrawer(true)}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.4} />
          {t("shop.filters")}
          {activeCount > 0 && <span className="text-terracotta">({activeCount})</span>}
        </button>
        <span className="price hidden text-xs text-muted-foreground lg:block">
          {t("shop.results", { n: filtered.length })}
        </span>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 lg:flex">
            <span className="label-xs text-muted-foreground">{t("shop.density")}</span>
            {([2, 4] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColumns(c)}
                aria-pressed={columns === c}
                className={`text-xs ${columns === c ? "text-terracotta" : "text-muted-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em]">
            <span className="sr-only sm:not-sr-only">{t("shop.sort")}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border border-border bg-transparent px-2 py-1.5 text-xs"
            >
              <option value="featured">{t("sort.featured")}</option>
              <option value="newest">{t("sort.newest")}</option>
              <option value="priceAsc">{t("sort.priceAsc")}</option>
              <option value="priceDesc">{t("sort.priceDesc")}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside className="hidden lg:block">{Panel}</aside>
        <div>
          <ProductGrid products={filtered.slice(0, visible)} columns={columns} />
          {filtered.length > visible && (
            <div className="mt-14 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + 8)}
                className="border border-foreground px-9 py-4 text-[11px] uppercase tracking-[0.2em]"
              >
                {t("shop.loadMore")}
              </button>
            </div>
          )}
          {filtered.length === 0 && (
            <p className="py-20 text-sm text-muted-foreground">{t("search.emptyTitle")}</p>
          )}
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-[85] lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("shop.filters")}
            className="absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto bg-background p-5"
          >
            <div className="flex items-center justify-between">
              <span className="label-xs">{t("shop.filters")}</span>
              <button type="button" aria-label={t("nav.close")} onClick={() => setDrawer(false)}>
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
            <div className="mt-6">{Panel}</div>
            <button
              type="button"
              onClick={() => setDrawer(false)}
              className="mt-8 w-full bg-primary py-4 text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
            >
              {t("shop.apply")} ({filtered.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
