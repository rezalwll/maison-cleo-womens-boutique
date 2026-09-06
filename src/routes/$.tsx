import { createFileRoute, Link } from "@tanstack/react-router";
import { usePreferences } from "@/context/PreferencesContext";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found | Maison Cleo" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  const { t } = usePreferences();
  return (
    <div className="pad-x mx-auto flex min-h-[70svh] max-w-[1500px] flex-col justify-center py-32">
      <p className="font-display text-[22vw] font-bold leading-none tracking-tight md:text-[12rem]">
        {t("notFound.title")}
      </p>
      <p className="mt-6 max-w-md text-lg">{t("notFound.body")}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/new-arrivals"
          className="bg-terracotta px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-white"
        >
          {t("home.cta")}
        </Link>
        <Link
          to="/"
          className="border border-border px-9 py-4 text-[11px] uppercase tracking-[0.2em]"
        >
          {t("common.backHome")}
        </Link>
      </div>
    </div>
  );
}
