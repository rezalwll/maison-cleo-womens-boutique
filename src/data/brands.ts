import { media } from "./media";
import type { Brand } from "./types";

export const brands: Brand[] = [
  {
    slug: "vince",
    name: "Vince",
    intro: {
      en: "Quiet, fluid pieces in silk and fine knit — a Maison Cleo mainstay.",
      fa: "قطعه‌های آرام و روان از ابریشم و بافت نازک — از پایه‌های همیشگی میزون کلئو.",
    },
    image: media.p1,
    featured: true,
  },
  {
    slug: "velvet",
    name: "Velvet",
    intro: {
      en: "Soft cotton and easy tailoring for everyday dressing.",
      fa: "نخ نرم و دوخت راحت برای پوشش روزمره.",
    },
    image: media.p4,
    featured: true,
  },
  {
    slug: "ulla-johnson",
    name: "Ulla Johnson",
    intro: {
      en: "Print, volume and texture — the statement side of the edit.",
      fa: "طرح، حجم و بافت — بخش شاخص این ادیت.",
    },
    image: media.p2,
    featured: true,
  },
  {
    slug: "free-people",
    name: "Free People",
    intro: {
      en: "Relaxed shapes that suit an unhurried weekend.",
      fa: "فرم‌های راحت، مناسب آخر هفته‌ای بی‌عجله.",
    },
    image: media.p6,
    featured: true,
  },
  {
    slug: "veronica-beard",
    name: "Veronica Beard",
    intro: {
      en: "Structured jackets and coats we return to every season.",
      fa: "کت و پالتوهای ساختارمند که هر فصل به آن‌ها برمی‌گردیم.",
    },
    image: media.p5,
    featured: true,
  },
  {
    slug: "rails",
    name: "Rails",
    intro: {
      en: "Linen shirting and denim with an easy hand.",
      fa: "پیراهن کتان و جین با حسی راحت.",
    },
    image: media.p3,
    featured: true,
  },
];

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug);
export const brandSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
