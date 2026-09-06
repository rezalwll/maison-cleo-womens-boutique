import { media } from "./media";
import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "tops",
    name: { en: "Tops & Blouses", fa: "تاپ و بلوز" },
    blurb: {
      en: "Silk, cotton and linen shapes that carry the rest of the wardrobe.",
      fa: "فرم‌هایی از ابریشم، نخ و کتان که بقیهٔ کمد را جمع می‌کنند.",
    },
    image: media.cat1,
    editorial: true,
  },
  {
    slug: "dresses",
    name: { en: "Dresses & Skirts", fa: "پیراهن و دامن" },
    blurb: {
      en: "Midi lengths, bias cuts and prints worth keeping.",
      fa: "قدهای میدی، برش‌های اریب و طرح‌هایی که ماندگارند.",
    },
    image: media.cat2,
    editorial: true,
  },
  {
    slug: "outerwear",
    name: { en: "Outerwear & Layers", fa: "پالتو و لایه‌ها" },
    blurb: {
      en: "Coats, blazers and jackets built for real weather.",
      fa: "پالتو، کت و ژاکت برای هوای واقعی.",
    },
    image: media.cat3,
    editorial: true,
  },
  {
    slug: "skirts",
    name: { en: "Skirts", fa: "دامن" },
    blurb: { en: "Bias satin and sharp pleats.", fa: "ساتن اریب و پلیسهٔ تیز." },
    image: media.p6,
  },
  {
    slug: "pants",
    name: { en: "Pants", fa: "شلوار" },
    blurb: { en: "Wide, high and quietly tailored.", fa: "گشاد، فاق‌بلند و آرام." },
    image: media.p5,
  },
  {
    slug: "denim",
    name: { en: "Denim", fa: "جین" },
    blurb: { en: "Straight legs and soft washes.", fa: "پاچهٔ راسته و شست‌وشوی نرم." },
    image: media.p4,
  },
  {
    slug: "knitwear",
    name: { en: "Knitwear", fa: "بافت" },
    blurb: { en: "Cashmere blends and fine ribs.", fa: "ترکیب کشمیر و بافت کبریتی نازک." },
    image: media.p1,
  },
  {
    slug: "jackets",
    name: { en: "Jackets", fa: "کت" },
    blurb: { en: "Structured shoulders, soft finish.", fa: "شانهٔ ساختارمند، پرداخت نرم." },
    image: media.p3,
  },
  {
    slug: "accessories",
    name: { en: "Accessories", fa: "اکسسوری" },
    blurb: { en: "The finishing pieces.", fa: "قطعه‌های پایانی." },
    image: media.look3,
  },
];

export const editorialCategories = categories.filter((c) => c.editorial);
