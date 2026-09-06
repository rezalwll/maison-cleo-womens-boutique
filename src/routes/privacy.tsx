import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { usePreferences } from "@/context/PreferencesContext";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | Maison Cleo" },
      {
        name: "description",
        content: "How Maison Cleo handles personal information collected through this site.",
      },
      { property: "og:title", content: "Privacy | Maison Cleo" },
      { property: "og:description", content: "Our approach to personal information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader title={t("privacy.title")} />
      <div className="pad-x mx-auto max-w-2xl space-y-5 pb-28 text-sm leading-relaxed text-muted-foreground">
        <p className="border border-dashed border-border p-4 text-foreground">
          {t("policy.review")}
        </p>
        <p>
          This site stores your language, theme, bag and wishlist choices in your browser only.
          Nothing is sent to a server unless you submit a form.
        </p>
        <p>
          If you join the mailing list, your email address is kept for sending news about new
          arrivals and events, and you can ask to be removed at any time.
        </p>
        <p>
          Payment processing is not connected on this site, so no card details are collected or
          stored here.
        </p>
        <p>Contact us with any privacy question and we will respond directly.</p>
      </div>
    </>
  );
}
