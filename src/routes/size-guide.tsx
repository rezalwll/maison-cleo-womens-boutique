import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { usePreferences } from "@/context/PreferencesContext";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide | Maison Cleo" },
      {
        name: "description",
        content:
          "General size guidance for the designers stocked at Maison Cleo, plus how to measure at home.",
      },
      { property: "og:title", content: "Size Guide | Maison Cleo" },
      { property: "og:description", content: "General sizing guidance — designers vary." },
    ],
  }),
  component: SizeGuidePage,
});

const rows = [
  { size: "XS", us: "0–2", bust: "31–32", waist: "24–25", hip: "34–35" },
  { size: "S", us: "4–6", bust: "33–34", waist: "26–27", hip: "36–37" },
  { size: "M", us: "8–10", bust: "35–36", waist: "28–29", hip: "38–39" },
  { size: "L", us: "12–14", bust: "37–39", waist: "30–32", hip: "40–42" },
  { size: "XL", us: "16", bust: "40–42", waist: "33–35", hip: "43–45" },
];

function SizeGuidePage() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader title={t("size.title")} sub={t("size.sub")} />
      <div className="pad-x mx-auto max-w-3xl pb-28">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-y border-border text-start">
                {["Size", "US", "Bust (in)", "Waist (in)", "Hip (in)"].map((h) => (
                  <th key={h} className="label-xs py-4 text-start text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.size} className="border-b border-border">
                  <td className="py-4 font-medium">{r.size}</td>
                  <td className="price py-4">{r.us}</td>
                  <td className="price py-4">{r.bust}</td>
                  <td className="price py-4">{r.waist}</td>
                  <td className="price py-4">{r.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">{t("size.note")}</p>
      </div>
    </>
  );
}
