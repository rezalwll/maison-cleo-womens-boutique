import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { usePreferences } from "@/context/PreferencesContext";
import { articleBySlug, journal } from "@/data/journal";
import { getProductsByIds } from "@/lib/commerce";
import { ProductGrid } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/PageHeader";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { title: article.title.en, intro: article.intro.en };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found | Maison Cleo" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} | Maison Cleo Journal`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.intro },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { t, tr, lang } = usePreferences();
  const article = articleBySlug(slug)!;
  const locale = lang === "fa" ? "fa-IR" : "en-US";
  const edit = getProductsByIds(article.productIds);
  const more = journal.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <article>
      <header className="pad-x mx-auto max-w-3xl pb-10 pt-32 text-center md:pt-44">
        <p className="label-xs text-terracotta">{tr(article.category)}</p>
        <h1 className="mt-4 font-display text-4xl uppercase leading-[1.05] tracking-tight md:text-6xl">
          {tr(article.title)}
        </h1>
        <p className="price mt-5 text-xs text-muted-foreground">
          {formatDate(article.date, locale)}
        </p>
      </header>

      <div className="mx-auto mb-14 aspect-[16/9] w-full max-w-[1200px] overflow-hidden bg-muted">
        <img src={article.image} alt={tr(article.title)} className="h-full w-full object-cover" />
      </div>

      <div className="pad-x mx-auto max-w-2xl">
        <p className="text-lg leading-relaxed">{tr(article.intro)}</p>
        {article.body.map((p, i) => (
          <div key={i}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{tr(p)}</p>
            {i === 0 && (
              <blockquote className="my-10 border-s-2 border-terracotta ps-6 font-display text-2xl uppercase leading-snug tracking-tight">
                {tr(article.pullQuote)}
              </blockquote>
            )}
          </div>
        ))}
      </div>

      {edit.length > 0 && (
        <section className="pad-x mx-auto max-w-[1500px] py-24">
          <SectionHeading title={t("journal.edit")} />
          <ProductGrid products={edit} />
        </section>
      )}

      <section className="pad-x mx-auto max-w-[1500px] pb-28">
        <SectionHeading title={t("journal.more")} />
        <div className="grid gap-8 md:grid-cols-3">
          {more.map((a) => (
            <Link key={a.slug} to="/journal/$slug" params={{ slug: a.slug }} className="group">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={a.image}
                  alt={tr(a.title)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.035]"
                />
              </div>
              <h3 className="mt-3 font-display text-xl uppercase tracking-tight">{tr(a.title)}</h3>
            </Link>
          ))}
        </div>
        <Link
          to="/journal"
          className="mt-10 inline-block border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.2em]"
        >
          {t("journal.back")}
        </Link>
      </section>
    </article>
  );
}
