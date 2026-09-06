import { Link } from "@tanstack/react-router";
import { usePreferences } from "@/context/PreferencesContext";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/PageHeader";
import { ProductGrid, ProductRow } from "@/components/products/ProductCard";
import { LookBlock } from "@/components/editorial/LookBlock";
import { getNewArrivals, getBestsellers } from "@/lib/commerce";
import { editorialCategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { looks } from "@/data/lookbook";
import { reviews } from "@/data/reviews";
import { gallery, media } from "@/data/media";
import { store } from "@/lib/store.config";

export function NewArrivalsSection() {
  const { t } = usePreferences();
  const items = getNewArrivals().slice(0, 5);
  return (
    <section className="py-20 md:py-32">
      <div className="pad-x mx-auto max-w-[1500px]">
        <SectionHeading
          eyebrow={t("newArrivals.title")}
          title={t("nav.newArrivals")}
          sub={t("home.newArrivalsSub")}
          action={
            <Link
              to="/new-arrivals"
              className="hidden shrink-0 border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.2em] md:block"
            >
              {t("product.viewAll")}
            </Link>
          }
        />
        <ProductRow products={items} />
      </div>
    </section>
  );
}

export function CategoriesSection() {
  const { t, tr } = usePreferences();
  return (
    <section aria-label={t("categories.title")} className="grid gap-px md:grid-cols-3">
      {editorialCategories.map((c) => (
        <Link
          key={c.slug}
          to="/category/$slug"
          params={{ slug: c.slug }}
          className="group relative block h-[70svh] min-h-[420px] overflow-hidden bg-ink md:h-[88svh]"
        >
          <img
            src={c.image}
            alt={tr(c.name)}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.035]"
          />
          <span className="absolute inset-0 bg-ink/30 transition-colors duration-[600ms] group-hover:bg-ink/45" />
          <span className="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
            <span className="block font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl">
              {tr(c.name)}
            </span>
            <span className="mt-3 block max-w-xs text-sm text-white/85">{tr(c.blurb)}</span>
            <span className="label-xs mt-5 inline-block border-b border-transparent pb-1 transition-colors group-hover:border-white">
              {t("common.shop")}
            </span>
          </span>
        </Link>
      ))}
    </section>
  );
}

export function BrandsSection() {
  const { t } = usePreferences();
  return (
    <section className="py-20 md:py-28">
      <div className="pad-x mx-auto max-w-[1500px]">
        <SectionHeading title={t("home.brandsTitle")} />
        <ul className="no-scrollbar flex gap-8 overflow-x-auto md:justify-between md:gap-4">
          {brands.map((b) => (
            <li key={b.slug} className="shrink-0">
              <Link
                to="/brands/$slug"
                params={{ slug: b.slug }}
                className="font-display text-2xl uppercase tracking-tight transition-colors hover:text-terracotta md:text-4xl"
              >
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LookbookSection() {
  const { t } = usePreferences();
  return (
    <section className="space-y-20 py-10 md:space-y-32 md:py-16">
      <div className="pad-x mx-auto max-w-[1500px]">
        <SectionHeading
          eyebrow={t("nav.lookbook")}
          title={t("lookbook.title")}
          action={
            <Link
              to="/lookbook"
              className="hidden shrink-0 border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.2em] md:block"
            >
              {t("product.viewAll")}
            </Link>
          }
        />
      </div>
      {looks.slice(0, 3).map((l) => (
        <LookBlock key={l.id} look={l} />
      ))}
    </section>
  );
}

export function BestsellersSection() {
  const { t } = usePreferences();
  return (
    <section className="py-20 md:py-32">
      <div className="pad-x mx-auto max-w-[1500px]">
        <SectionHeading eyebrow={t("product.badgeBestseller")} title={t("home.bestsellers")} />
        <ProductGrid products={getBestsellers().slice(0, 4)} />
      </div>
    </section>
  );
}

export function StorySection() {
  const { t } = usePreferences();
  return (
    <section className="pad-x mx-auto max-w-[1500px] py-20 md:py-32">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={media.store}
              alt="Inside the Maison Cleo boutique"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="label-xs text-terracotta">{t("home.storyLabel")}</p>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight md:text-5xl">
            {t("home.storyTitle")}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("home.storyBody")}
          </p>
          <Link
            to="/about"
            className="mt-8 inline-block border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.2em]"
          >
            {t("home.storyCta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  const { t, tr } = usePreferences();
  return (
    <section className="bg-surface">
      <div className="pad-x mx-auto max-w-[1500px] py-20 md:py-28">
        <SectionHeading title={t("home.reviewsTitle")} />
        <div className="grid gap-10 md:grid-cols-3 md:gap-14">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.05}>
              <blockquote>
                <p className="text-lg leading-relaxed">“{tr(r.quote)}”</p>
                <footer className="label-xs mt-5 text-muted-foreground">
                  {r.author} · {r.city}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-xs text-muted-foreground">{t("home.reviewsNote")}</p>
      </div>
    </section>
  );
}

export function InstagramSection() {
  const { t } = usePreferences();
  const shots = gallery.slice(0, 6);
  return (
    <section className="py-16 md:py-24">
      <div className="pad-x mx-auto mb-8 flex max-w-[1500px] items-end justify-between">
        <h2 className="font-display text-2xl uppercase tracking-tight md:text-4xl">
          {store.instagramHandle}
        </h2>
        <a
          href={store.social.instagram}
          className="border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.2em]"
        >
          {t("home.instagramCta")}
        </a>
      </div>
      <ul className="no-scrollbar flex gap-1 overflow-x-auto md:grid md:grid-cols-6">
        {shots.map((src, i) => (
          <li key={i} className="w-[42vw] shrink-0 md:w-auto">
            <img
              src={src}
              alt={`Maison Cleo on Instagram ${i + 1}`}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
