import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { LookBlock } from "@/components/editorial/LookBlock";
import { usePreferences } from "@/context/PreferencesContext";
import { looks } from "@/data/lookbook";
import { media } from "@/data/media";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "The Cleo Edit — Lookbook | Maison Cleo" },
      {
        name: "description",
        content:
          "Six looks styled in store at Maison Cleo Nashville, with the pieces behind each one.",
      },
      { property: "og:title", content: "The Cleo Edit — Lookbook | Maison Cleo" },
      { property: "og:description", content: "Six seasonal looks, styled in our Nashville boutique." },
    ],
  }),
  component: LookbookPage,
});

function LookbookPage() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader eyebrow={t("nav.lookbook")} title={t("lookbook.title")} sub={t("lookbook.sub")} />
      <div className="mb-20 h-[70svh] min-h-[420px] w-full overflow-hidden md:h-[85svh]">
        <img
          src={media.look2}
          alt="Maison Cleo seasonal lookbook cover"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-24 pb-28 md:space-y-36">
        {looks.map((l) => (
          <LookBlock key={l.id} look={l} />
        ))}
      </div>
    </>
  );
}
