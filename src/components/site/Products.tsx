import { motion } from "motion/react";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

type Product = {
  name: string;
  brand: string;
  price: string;
  front: string;
  back: string;
};

const newArrivals: Product[] = [
  { name: "Ilana Silk Blouse", brand: "Vince", price: "$248.00", front: p1, back: p3 },
  { name: "Margot Midi Dress", brand: "Ulla Johnson", price: "$395.00", front: p2, back: p6 },
  { name: "Linen Boyfriend Blazer", brand: "Velvet", price: "$328.00", front: p3, back: p1 },
  { name: "Wool Crewneck Sweater", brand: "Rails", price: "$186.00", front: p4, back: p5 },
  { name: "Longline Camel Coat", brand: "Veronica Beard", price: "$685.00", front: p5, back: p4 },
];

const bestsellers: Product[] = [
  { name: "Poplin Shirt Dress", brand: "Free People", price: "$164.00", front: p6, back: p2 },
  { name: "Terracotta Midi Dress", brand: "Vince", price: "$298.00", front: p2, back: p6 },
  { name: "Cashmere Blend Knit", brand: "Velvet", price: "$212.00", front: p4, back: p1 },
  { name: "Sand Linen Suiting", brand: "Veronica Beard", price: "$412.00", front: p3, back: p5 },
];

function Card({ product, badge }: { product: Product; badge?: string }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5.5] overflow-hidden bg-muted">
        <img
          src={product.front}
          alt={`${product.name} by ${product.brand}`}
          width={800}
          height={1100}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.back}
          alt=""
          aria-hidden="true"
          width={800}
          height={1100}
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:opacity-100"
        />
        {badge && (
          <span className="absolute left-3 top-3 bg-terracotta px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-background">
            {badge}
          </span>
        )}
      </div>
      <div className="pt-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {product.brand}
        </p>
        <h3 className="mt-1 font-body text-sm font-medium tracking-wide">{product.name}</h3>
        <p className="price mt-1 text-sm text-foreground/70">{product.price}</p>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-terracotta">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
          {title}
        </h2>
      </div>
      <a
        href="#"
        className="hidden shrink-0 border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.22em] md:block"
      >
        View all
      </a>
    </div>
  );
}

export function NewArrivals() {
  return (
    <section id="new-arrivals" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="Just In" title="New Arrivals" />
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:gap-6 md:px-10">
        {newArrivals.map((p) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-[calc((1400px-4*1.5rem-5rem)/5)]"
          >
            <Card product={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Bestsellers() {
  return (
    <section id="bestsellers" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="Loved in Store" title="Bestsellers" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {bestsellers.map((p) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card product={p} badge="Bestseller" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
