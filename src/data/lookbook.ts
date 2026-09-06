import { media } from "./media";
import type { Look } from "./types";

export const looks: Look[] = [
  {
    id: "look-01",
    number: "01",
    title: { en: "Soft Structure", fa: "ساختار نرم" },
    description: {
      en: "A relaxed blazer, silk shell and tailored trouser — polished without feeling overdone.",
      fa: "کتی راحت، بلوز ابریشمی و شلوار دوخت‌دار — مرتب، بدون اینکه زیادی به نظر برسد.",
    },
    image: media.look1,
    productIds: ["p-011", "p-001", "p-005"],
    orientation: "left",
  },
  {
    id: "look-02",
    number: "02",
    title: { en: "Weekend, Elevated", fa: "آخر هفته، مرتب‌تر" },
    description: {
      en: "Denim, soft knitwear and a light jacket for an easy Nashville afternoon.",
      fa: "جین، بافت نرم و ژاکتی سبک برای بعدازظهری آرام در نشویل.",
    },
    image: media.look2,
    productIds: ["p-012", "p-007", "p-015"],
    orientation: "right",
  },
  {
    id: "look-03",
    number: "03",
    title: { en: "After Five", fa: "بعد از پنج" },
    description: {
      en: "A fluid dress, sculptural jewelry and a sharp layer for dinner downtown.",
      fa: "پیراهنی روان، جواهری حجم‌دار و لایه‌ای تیز برای شام در مرکز شهر.",
    },
    image: media.look3,
    productIds: ["p-010", "p-016", "p-004"],
    orientation: "left",
  },
  {
    id: "look-04",
    number: "04",
    title: { en: "The Long Coat", fa: "پالتوی بلند" },
    description: {
      en: "One long coat over everything else, worn until spring.",
      fa: "یک پالتوی بلند روی همه چیز، تا رسیدن بهار.",
    },
    image: media.cat3,
    productIds: ["p-009", "p-013", "p-012"],
    orientation: "right",
  },
  {
    id: "look-05",
    number: "05",
    title: { en: "Print, Quietly", fa: "طرح، به‌آرامی" },
    description: {
      en: "A printed midi kept simple with flat sandals and bare jewelry.",
      fa: "پیراهن میدی طرح‌دار، ساده‌شده با صندل تخت و جواهر مینیمال.",
    },
    image: media.cat2,
    productIds: ["p-002", "p-016"],
    orientation: "left",
  },
  {
    id: "look-06",
    number: "06",
    title: { en: "Linen Days", fa: "روزهای کتان" },
    description: {
      en: "Open linen shirting over a slip, with the sleeves pushed back.",
      fa: "پیراهن کتان باز روی پیراهن ساتن، با آستین‌های بالازده.",
    },
    image: media.cat1,
    productIds: ["p-003", "p-010", "p-014"],
    orientation: "right",
  },
];
