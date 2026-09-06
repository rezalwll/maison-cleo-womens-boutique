import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { usePreferences } from "@/context/PreferencesContext";
import { shippingPolicy } from "@/lib/store.config";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Maison Cleo Nashville" },
      {
        name: "description",
        content:
          "Answers about sizing, shipping, returns and styling appointments at Maison Cleo boutique in Nashville.",
      },
      { property: "og:title", content: "FAQ | Maison Cleo" },
      { property: "og:description", content: "Sizing, shipping, appointments and more." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t, lang } = usePreferences();
  const pending = t("config.pending");
  const fa = lang === "fa";

  const groups = [
    {
      title: fa ? "سایز و تناسب" : "Sizing & Fit",
      items: [
        {
          q: fa ? "چطور سایز درست را انتخاب کنم؟" : "How do I choose the right size?",
          a: fa
            ? "راهنمای سایز ما یک راهنمای کلی است؛ هر طراح متفاوت است. برای جدول یک برند مشخص با ما تماس بگیرید."
            : "Our size guide is general guidance — each designer cuts differently. Message us for a specific label's chart.",
        },
        {
          q: fa ? "آیا سایزهای بین‌ سایز موجود است؟" : "Do you carry extended sizes?",
          a: pending,
        },
      ],
    },
    {
      title: fa ? "سفارش و ارسال" : "Orders & Shipping",
      items: [
        {
          q: fa ? "ارسال چقدر طول می‌کشد؟" : "How long does shipping take?",
          a: shippingPolicy.processingTime || pending,
        },
        { q: fa ? "آیا ارسال رایگان دارید؟" : "Is shipping free?", a: pending },
      ],
    },
    {
      title: fa ? "مرجوعی" : "Returns",
      items: [
        {
          q: fa ? "مهلت مرجوع کردن چقدر است؟" : "What is the return window?",
          a: shippingPolicy.returnWindow || pending,
        },
        {
          q: fa ? "کالاهای حراج قابل مرجوع هستند؟" : "Are sale items returnable?",
          a: shippingPolicy.saleItemsReturnable === null ? pending : "Yes.",
        },
      ],
    },
    {
      title: fa ? "فروشگاه" : "In Store",
      items: [
        {
          q: fa ? "می‌توانم قرار استایل بگذارم؟" : "Can I book a styling appointment?",
          a: fa
            ? "بله — از صفحهٔ تماس با ما درخواست بدهید و تیم ما زمان را هماهنگ می‌کند."
            : "Yes — request a time on our contact page and the team will confirm.",
        },
        { q: fa ? "ساعات کاری چیست؟" : "What are your hours?", a: pending },
      ],
    },
  ];

  return (
    <>
      <PageHeader eyebrow={t("nav.contact")} title={t("faq.title")} sub={t("faq.sub")} />
      <div className="pad-x mx-auto max-w-3xl pb-28">
        {groups.map((g) => (
          <section key={g.title} className="mb-14">
            <h2 className="label-xs text-terracotta">{g.title}</h2>
            <dl className="mt-4 divide-y divide-border border-y border-border">
              {g.items.map((i) => (
                <div key={i.q} className="py-5">
                  <dt className="text-sm font-medium">{i.q}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{i.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
        <Link to="/contact" className="border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.2em]">
          {t("contact.title")}
        </Link>
      </div>
    </>
  );
}
