import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animation/Reveal";
import { usePreferences } from "@/context/PreferencesContext";
import { journal } from "@/data/journal";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal | Maison Cleo Nashville" },
      {
        name: "description",
        content:
          "Notes on dressing, buying and Nashville from the team at Maison Cleo boutique.",
      },
      { property: "og:title", content: "Journal | Maison Cleo" },
      { property: "og:description", content: "Stories from our Nashville boutique." },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const { t, tr, lang } = usePreferences();
  const locale = lang === "fa" ? "fa-IR" : "en-US";
  return (
    <>
      <PageHeader eyebrow={t("nav.journal")} title={t("journal.title")} sub={t("journal.sub")} />
      <div className="pad-x mx-auto max-w-[1500px] pb-28">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {journal.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.05}>
              <article>
                <Link to="/journal/$slug" params={{ slug: a.slug }} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={a.image}
                      alt={tr(a.title)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.035]"
                    />
                  </div>
                  <p className="label-xs mt-4 text-terracotta">{tr(a.category)}</p>
                  <h2 className="mt-2 font-display text-2xl uppercase leading-tight tracking-tight">
                    {tr(a.title)}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{tr(a.intro)}</p>
                  <p className="price mt-3 text-xs text-muted-foreground">
                    {formatDate(a.date, locale)}
                  </p>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
