import { media } from "./media";
import type { Article } from "./types";

export const journal: Article[] = [
  {
    slug: "how-we-build-the-edit",
    categorySlug: "the-edit",
    category: { en: "The Edit", fa: "ادیت" },
    date: "2026-08-24",
    title: {
      en: "How We Build the Edit",
      fa: "چطور ادیت را می‌سازیم",
    },
    intro: {
      en: "Buying for a small boutique means saying no far more often than yes. Here is how a season takes shape on the rack.",
      fa: "خرید برای یک بوتیک کوچک یعنی خیلی بیشتر «نه» گفتن تا «بله». این‌طور یک فصل روی رگال شکل می‌گیرد.",
    },
    body: [
      {
        en: "We start with the pieces our customers already wear out of the store — the silk blouse, the wide trouser, the coat that survives three winters. Those anchors decide the palette before a single new label is considered.",
        fa: "از قطعه‌هایی شروع می‌کنیم که مشتری‌ها همان‌جا از فروشگاه با خودشان می‌برند — بلوز ابریشمی، شلوار گشاد، پالتویی که سه زمستان دوام می‌آورد. همین‌ها پالت فصل را پیش از هر برند تازه‌ای تعیین می‌کنند.",
      },
      {
        en: "From there, we add tension: one printed dress, one unexpected color, a jacket with a sharper shoulder. A rack that agrees with itself entirely is a boring rack.",
        fa: "بعد کمی تضاد اضافه می‌کنیم: یک پیراهن طرح‌دار، یک رنگ غیرمنتظره، کتی با شانهٔ تیزتر. رگالی که کاملاً با خودش هماهنگ باشد، رگال کسل‌کننده‌ای است.",
      },
      {
        en: "Finally we check the practical things — does it wash, does it travel, does it work with what someone already owns. If the answer is no on all three, it does not come in.",
        fa: "در پایان، نکته‌های عملی را بررسی می‌کنیم — شسته می‌شود؟ برای سفر مناسب است؟ با چیزی که مشتری دارد ست می‌شود؟ اگر هر سه پاسخ منفی بود، وارد نمی‌شود.",
      },
    ],
    pullQuote: {
      en: "A rack that agrees with itself entirely is a boring rack.",
      fa: "رگالی که کاملاً با خودش هماهنگ باشد، رگال کسل‌کننده‌ای است.",
    },
    image: media.cat1,
    productIds: ["p-001", "p-005", "p-009"],
  },
  {
    slug: "three-ways-to-wear-a-slip-dress",
    categorySlug: "styling",
    category: { en: "Styling", fa: "استایل" },
    date: "2026-08-10",
    title: {
      en: "Three Ways to Wear a Slip Dress",
      fa: "سه راه پوشیدن پیراهن ساتن",
    },
    intro: {
      en: "The most useful dress in the store is also the one people find hardest to style. Three approaches that work year-round.",
      fa: "کاربردی‌ترین پیراهن فروشگاه، همانی است که ست کردنش سخت‌تر به نظر می‌رسد. سه راه که در همهٔ فصل‌ها جواب می‌دهد.",
    },
    body: [
      {
        en: "Layer it. A fine-gauge knit over the top turns a slip into a skirt, and the straps disappear entirely.",
        fa: "لایه‌بندی کن. یک بافت نازک روی آن، پیراهن ساتن را به دامن تبدیل می‌کند و بندها کاملاً پنهان می‌شوند.",
      },
      {
        en: "Cover it. An open linen shirt or an unlined blazer keeps the shape but changes the register from evening to afternoon.",
        fa: "بپوشانش. پیراهن کتان باز یا کتی بدون آستر، فرم را نگه می‌دارد اما حال‌وهوا را از شب به بعدازظهر می‌برد.",
      },
      {
        en: "Ground it. Flat sandals in summer, a boot in autumn — the shoe does most of the work.",
        fa: "پایین را جمع کن. صندل تخت در تابستان، بوت در پاییز — کفش بیشتر کار را انجام می‌دهد.",
      },
    ],
    pullQuote: {
      en: "The shoe does most of the work.",
      fa: "کفش بیشتر کار را انجام می‌دهد.",
    },
    image: media.look3,
    productIds: ["p-010", "p-007", "p-003"],
  },
  {
    slug: "in-conversation-soft-tailoring",
    categorySlug: "designers",
    category: { en: "Designers", fa: "طراحان" },
    date: "2026-07-22",
    title: {
      en: "In Conversation: Soft Tailoring",
      fa: "گفت‌وگو: دوخت نرم",
    },
    intro: {
      en: "Why the unlined jacket has quietly replaced the suit in most of our customers' wardrobes.",
      fa: "چرا کت بدون آستر بی‌سروصدا جای کت‌وشلوار را در کمد بیشتر مشتری‌های ما گرفته است.",
    },
    body: [
      {
        en: "Structure used to mean padding. Now it means cut — a shoulder seam placed correctly does more than any interlining.",
        fa: "ساختار قبلاً یعنی لایی و پد. حالا یعنی برش — درز شانه‌ای که درست نشسته باشد از هر لایی مؤثرتر است.",
      },
      {
        en: "The result is a jacket you can wear over a dress on Saturday and to a meeting on Monday without changing anything else.",
        fa: "نتیجه کتی است که شنبه روی پیراهن می‌پوشی و دوشنبه سر جلسه، بدون تغییر چیز دیگری.",
      },
    ],
    pullQuote: {
      en: "Structure used to mean padding. Now it means cut.",
      fa: "ساختار قبلاً یعنی پد. حالا یعنی برش.",
    },
    image: media.look1,
    productIds: ["p-004", "p-011", "p-008"],
  },
  {
    slug: "a-nashville-dressing-guide",
    categorySlug: "nashville",
    category: { en: "Nashville", fa: "نشویل" },
    date: "2026-07-04",
    title: {
      en: "A Nashville Dressing Guide",
      fa: "راهنمای پوشش در نشویل",
    },
    intro: {
      en: "Humid mornings, cool evenings and a lot of walking. Dressing for this city is an exercise in layers.",
      fa: "صبح‌های شرجی، شب‌های خنک و پیاده‌روی زیاد. لباس پوشیدن در این شهر یعنی تمرین لایه‌بندی.",
    },
    body: [
      {
        en: "Natural fibers first — linen and cotton in the warm months, wool blends once the evenings turn.",
        fa: "اول الیاف طبیعی — کتان و نخ در ماه‌های گرم، ترکیب پشم وقتی شب‌ها خنک می‌شود.",
      },
      {
        en: "Then one layer you can carry: a light jacket, a scarf, something that folds into a bag without complaint.",
        fa: "بعد یک لایه که بتوانی همراهت ببری: ژاکتی سبک، یک روسری، چیزی که بی‌دردسر در کیف جا شود.",
      },
    ],
    pullQuote: {
      en: "Dressing for this city is an exercise in layers.",
      fa: "لباس پوشیدن در این شهر یعنی تمرین لایه‌بندی.",
    },
    image: media.cat3,
    productIds: ["p-015", "p-016", "p-003"],
  },
  {
    slug: "behind-the-boutique",
    categorySlug: "behind-the-boutique",
    category: { en: "Behind the Boutique", fa: "پشت صحنهٔ بوتیک" },
    date: "2026-06-16",
    title: {
      en: "Behind the Boutique",
      fa: "پشت صحنهٔ بوتیک",
    },
    intro: {
      en: "What actually happens on a delivery morning, from steam to rack.",
      fa: "صبح روز تحویل کالا واقعاً چه می‌گذرد؛ از اتوی بخار تا رگال.",
    },
    body: [
      {
        en: "Everything is steamed before it is seen. A beautiful garment folded in a box looks like nothing at all.",
        fa: "همه‌چیز پیش از دیده‌شدن بخار می‌خورد. یک لباس زیبا که تاشده در جعبه باشد، هیچ به نظر می‌رسد.",
      },
      {
        en: "Then we hang the season together and edit backwards — pulling out anything that does not earn its place on the floor.",
        fa: "بعد کل فصل را کنار هم آویزان می‌کنیم و از آخر به اول حذف می‌کنیم — هر چیزی که جایش را روی سالن حق ندارد کنار می‌رود.",
      },
    ],
    pullQuote: {
      en: "Everything is steamed before it is seen.",
      fa: "همه‌چیز پیش از دیده‌شدن بخار می‌خورد.",
    },
    image: media.store,
    productIds: ["p-001", "p-014"],
  },
];

export const articleBySlug = (slug: string) => journal.find((a) => a.slug === slug);
