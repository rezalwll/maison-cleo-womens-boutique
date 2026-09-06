import type { Review } from "./types";

/** Demo copy for layout purposes — not verified customer reviews. */
export const reviews: Review[] = [
  {
    id: "r1",
    quote: {
      en: "Every piece feels considered. I always leave with something I didn't know I needed.",
      fa: "هر قطعه سنجیده انتخاب شده. همیشه با چیزی بیرون می‌آیم که نمی‌دانستم لازمش دارم.",
    },
    author: "Claire R.",
    city: "Nashville",
    demo: true,
  },
  {
    id: "r2",
    quote: {
      en: "The styling help is incredible — thoughtful, honest and never pushy.",
      fa: "کمکشان در استایل فوق‌العاده است — دقیق، صادقانه و بدون اصرار.",
    },
    author: "Morgan T.",
    city: "Franklin",
    demo: true,
  },
  {
    id: "r3",
    quote: {
      en: "My favorite place in Nashville when I need something that feels special but still like me.",
      fa: "جای محبوبم در نشویل وقتی چیزی می‌خواهم که خاص باشد اما هنوز شبیه خودم.",
    },
    author: "Anna L.",
    city: "Nashville",
    demo: true,
  },
];
