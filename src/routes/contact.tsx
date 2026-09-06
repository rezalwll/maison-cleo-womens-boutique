import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { usePreferences } from "@/context/PreferencesContext";
import { store } from "@/lib/store.config";
import type { TKey } from "@/i18n/en";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { topic?: string } =>
    typeof search["topic"] === "string" ? { topic: search["topic"] } : {},
  head: () => ({
    meta: [
      { title: "Contact | Maison Cleo Nashville" },
      {
        name: "description",
        content:
          "Questions about a piece, an order or a styling appointment? Get in touch with the Maison Cleo team in Nashville.",
      },
      { property: "og:title", content: "Contact | Maison Cleo" },
      { property: "og:description", content: "Come say hello to the Maison Cleo team." },
    ],
  }),
  component: ContactPage,
});

const topics: { id: string; key: TKey }[] = [
  { id: "product", key: "contact.topics.product" },
  { id: "order", key: "contact.topics.order" },
  { id: "styling", key: "contact.topics.styling" },
  { id: "visit", key: "contact.topics.visit" },
  { id: "press", key: "contact.topics.press" },
  { id: "other", key: "contact.topics.other" },
];

function ContactPage() {
  const { t } = usePreferences();
  const { topic } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState(topic ?? "product");

  const field =
    "mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground";

  return (
    <>
      <PageHeader eyebrow={t("nav.contact")} title={t("contact.title")} />
      <div className="pad-x mx-auto grid max-w-[1500px] gap-12 pb-28 md:grid-cols-[1fr_320px]">
        <form
          className="max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="block">
            <span className="label-xs text-muted-foreground">{t("contact.name")}</span>
            <input required className={field} />
          </label>
          <label className="mt-6 block">
            <span className="label-xs text-muted-foreground">{t("contact.email")}</span>
            <input type="email" required className={field} />
          </label>
          <label className="mt-6 block">
            <span className="label-xs text-muted-foreground">{t("contact.phone")}</span>
            <input type="tel" className={field} />
          </label>
          <label className="mt-6 block">
            <span className="label-xs text-muted-foreground">{t("contact.topic")}</span>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className={field}
            >
              {topics.map((o) => (
                <option key={o.id} value={o.id}>
                  {t(o.key)}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-6 block">
            <span className="label-xs text-muted-foreground">{t("contact.message")}</span>
            <textarea required rows={6} className={field} />
          </label>
          <button
            type="submit"
            className="mt-8 bg-primary px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
          >
            {t("contact.send")}
          </button>
          {sent && <p className="mt-4 text-sm text-terracotta">{t("contact.sent")}</p>}
        </form>

        <aside className="h-fit border border-border p-6 text-sm">
          <p className="label-xs text-muted-foreground">{t("footer.contact")}</p>
          <p className="mt-3">{store.email || t("config.pending")}</p>
          <p className="mt-1">{store.phone || t("config.pending")}</p>
          <p className="mt-4 text-muted-foreground">{store.descriptor}</p>
        </aside>
      </div>
    </>
  );
}
