import { motion } from "motion/react";
import cat1 from "@/assets/cat1.jpg";
import cat2 from "@/assets/cat2.jpg";
import cat3 from "@/assets/cat3.jpg";
import look1 from "@/assets/look1.jpg";
import look2 from "@/assets/look2.jpg";
import look3 from "@/assets/look3.jpg";

const categories = [
  { title: "Tops & Blouses", img: cat1, alt: "Woman in a silk blouse" },
  { title: "Dresses & Skirts", img: cat2, alt: "Woman in a flowing midi dress" },
  { title: "Outerwear & Layers", img: cat3, alt: "Woman in a long trench coat" },
];

const brands = ["Vince", "Velvet", "Ulla Johnson", "Free People", "Veronica Beard", "Rails"];

const looks = [
  {
    n: "Look 01",
    img: look1,
    alt: "Cream knit sweater with wide leg trousers on a Nashville street",
    title: "Sunday on 12South",
    copy: "A cream ribbed knit over ivory wide-leg trousers, finished with tobacco leather loafers. Quiet, warm, and made for slow mornings.",
  },
  {
    n: "Look 02",
    img: look2,
    alt: "Terracotta slip dress layered with a leather jacket at golden hour",
    title: "Golden Hour Downtown",
    copy: "Our terracotta bias slip layered under a broken-in moto jacket. Dress it up with a heel, or keep it easy with boots.",
  },
  {
    n: "Look 03",
    img: look3,
    alt: "Oversized sand blazer with a white tee against a brick wall",
    title: "The Everyday Tailored",
    copy: "An oversized sand blazer, a perfect white tee, and black straight-leg denim — the outfit our stylists reach for daily.",
  },
];

export function Categories() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {categories.map((c) => (
        <a
          key={c.title}
          href="#new-arrivals"
          className="group relative block h-[65vh] min-h-[420px] overflow-hidden md:h-[88vh]"
        >
          <img
            src={c.img}
            alt={c.alt}
            width={800}
            height={1200}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ink/25 transition-colors duration-500 group-hover:bg-ink/40" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-background">
            <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-tight md:text-4xl">
              {c.title}
            </h3>
            <span className="mt-4 inline-block border-b border-background/70 pb-1 text-[11px] uppercase tracking-[0.28em]">
              Shop
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}

export function Brands() {
  return (
    <section id="brands" className="border-y border-border py-14">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Curated Brands
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-y-7 md:grid-cols-6">
          {brands.map((b) => (
            <li
              key={b}
              className="text-center font-display text-lg uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-terracotta"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Lookbook() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-terracotta">Fall Lookbook</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Three Ways to Wear It
          </h2>
        </div>

        <div className="space-y-16 md:space-y-24">
          {looks.map((l, i) => (
            <motion.div
              key={l.n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <img
                  src={l.img}
                  alt={l.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-terracotta">{l.n}</p>
                <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
                  {l.title}
                </h3>
                <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                  {l.copy}
                </p>
                <a
                  href="#new-arrivals"
                  className="mt-7 inline-block border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.24em] transition-colors hover:border-terracotta hover:text-terracotta"
                >
                  Shop This Look
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
