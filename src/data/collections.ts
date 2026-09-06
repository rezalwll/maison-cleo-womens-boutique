import { media } from "./media";
import type { Collection } from "./types";

export const collections: Collection[] = [
  {
    slug: "autumn-edit",
    title: { en: "The Autumn Edit", fa: "ادیت پاییز" },
    description: {
      en: "Warm neutrals, soft wool and the first layers of the season.",
      fa: "خنثی‌های گرم، پشم نرم و نخستین لایه‌های فصل.",
    },
    image: media.cat3,
  },
  {
    slug: "everyday-essentials",
    title: { en: "Everyday Essentials", fa: "ضروری‌های هر روز" },
    description: {
      en: "The pieces that quietly do the most work.",
      fa: "قطعه‌هایی که بی‌سروصدا بیشترین کار را می‌کنند.",
    },
    image: media.cat1,
  },
  {
    slug: "dinner-plans",
    title: { en: "Dinner Plans", fa: "برنامهٔ شام" },
    description: {
      en: "Fluid dresses and sharp layers for downtown evenings.",
      fa: "پیراهن‌های روان و لایه‌های تیز برای شب‌های مرکز شهر.",
    },
    image: media.look3,
  },
  {
    slug: "soft-tailoring",
    title: { en: "Soft Tailoring", fa: "دوخت نرم" },
    description: {
      en: "Jackets and trousers with structure, never stiffness.",
      fa: "کت و شلوارهایی با ساختار، بدون خشکی.",
    },
    image: media.look1,
  },
  {
    slug: "weekend-away",
    title: { en: "Weekend Away", fa: "آخر هفته" },
    description: {
      en: "Denim, knitwear and one very good jacket.",
      fa: "جین، بافت و یک ژاکت خیلی خوب.",
    },
    image: media.look2,
  },
  {
    slug: "under-250",
    title: { en: "Under $250", fa: "زیر ۲۵۰ دلار" },
    description: {
      en: "Considered pieces at an easier price.",
      fa: "قطعه‌های سنجیده با قیمتی راحت‌تر.",
    },
    image: media.p6,
  },
];
