import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animation/Reveal";
import { usePreferences } from "@/context/PreferencesContext";
import { media } from "@/data/media";
import { brands } from "@/data/brands";
import type { TKey } from "@/i18n/en";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Maison Cleo | Nashville Women's Boutique" },
      {
        name: "description",
        content:
          "Getting dressed should feel instinctive. The point of view, the edit and the people behind Maison Cleo in Nashville, TN.",
      },
      { property: "og:title", content: "About Maison Cleo | Nashville Boutique" },
      {
        property: "og:description",
        content: "Our point of view, our edit and our Nashville store.",
      },
    ],
  }),
  component: AboutPage,
});

const sections: { title: TKey; body: TKey; image?: string }[] = [
  { title: "about.povTitle", body: "about.povBody", image: media.look1 },
  { title: "about.editTitle", body: "about.editBody" },
  { title: "about.nashvilleTitle", body: "about.nashvilleBody", image: media.cat2 },
  { title: "about.storeTitle", body: "about.storeBody", image: media.store },
  { title: "about.designersTitle", body: "about.designersBody" },
  { title: "about.stylingTitle", body: "about.stylingBody", image: media.look3 },
];

function AboutPage() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader eyebrow={t("nav.about")} title={t("about.title")} />
      <div className="pad-x mx-auto max-w-[1500px] space-y-20 pb-24 md:space-y-28">
        {sections.map((s, i) => (
          <Reveal key={s.title}>
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className={i % 2 ? "md:order-2" : ""}>
                <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
                  {t(s.title)}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {t(s.body)}
                </p>
              </div>
              {s.image && (
                <div className={`aspect-[4/5] overflow-hidden bg-muted ${i % 2 ? "md:order-1" : ""}`}>
                  <img src={s.image} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </Reveal>
        ))}

        <Reveal>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-8">
            {brands.map((b) => (
              <li key={b.slug}>
                <Link
                  to="/brands/$slug"
                  params={{ slug: b.slug }}
                  className="font-display text-xl uppercase tracking-tight hover:text-terracotta md:text-3xl"
                >
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <div>
          <Link
            to="/store"
            className="inline-block bg-primary px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
          >
            {t("about.visitCta")}
          </Link>
        </div>
      </div>
    </>
  );
}
