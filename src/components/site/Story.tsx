import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import store from "@/assets/store.jpg";
import look1 from "@/assets/look1.jpg";
import look2 from "@/assets/look2.jpg";
import look3 from "@/assets/look3.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p5 from "@/assets/p5.jpg";

const reviews = [
  {
    quote:
      "I walked in for one blouse and left with an entire fall wardrobe. The styling help is genuinely the best in Nashville.",
    name: "Hannah R.",
    city: "East Nashville",
  },
  {
    quote:
      "Every piece feels considered. Nothing trendy for the sake of it — just beautiful clothes I actually wear.",
    name: "Marisol T.",
    city: "Green Hills",
  },
  {
    quote:
      "They remembered my size and texted me when the camel coat came in. That's the kind of shop this is.",
    name: "Cate W.",
    city: "12South",
  },
];

const gram = [look1, p1, look2, p2, look3, p5];

export function About() {
  return (
    <section className="bg-muted/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 md:grid-cols-2 md:gap-20 md:px-10">
        <img
          src={store}
          alt="Inside the Maison Cleo boutique with wooden racks and a terracotta bench"
          width={1200}
          height={1000}
          loading="lazy"
          className="aspect-[6/5] w-full object-cover"
        />
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-terracotta">Our Story</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
            A Small Shop with
            <br />a Long Memory
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
            Maison Cleo began in 2016 as a single rack in a shared Nashville storefront. Today we
            curate a tight edit of contemporary labels — chosen for cut, cloth, and how they feel on
            the tenth wear rather than the first.
          </p>
          <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
            Come in for a fitting, a second opinion, or just a coffee. We keep notes on what you
            love and call you when the right piece arrives.
          </p>
          <div className="mt-8 border-t border-border pt-6 text-sm">
            <p className="font-display text-base uppercase tracking-[0.18em]">Visit the Boutique</p>
            <p className="mt-2 text-muted-foreground">
              2312 12th Avenue South
              <br />
              Nashville, TN 37204
            </p>
            <p className="price mt-2 text-muted-foreground">
              Mon–Sat 10:00–18:00 · Sun 12:00–17:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-terracotta">
          Kind Words
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-14">
          {reviews.map((r) => (
            <motion.blockquote
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="border-t border-border pt-6"
            >
              <p className="font-display text-lg font-medium uppercase leading-snug tracking-tight">
                “{r.quote}”
              </p>
              <footer className="mt-5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {r.name} — {r.city}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="bg-sand py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl">
          Be the First to Know
        </h2>
        <p className="mt-4 text-sm font-light text-ink/70">
          New arrivals, private sale invitations, and styling nights — straight to your inbox.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Email address"
            className="w-full border border-ink/25 bg-transparent px-4 py-3.5 text-sm text-ink placeholder:text-ink/45 focus:border-terracotta focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 bg-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.28em] text-background transition-colors hover:bg-terracotta"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}

export function InstagramRow() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <Instagram className="h-4 w-4" strokeWidth={1.4} /> @maisoncleonashville
        </p>
        <div className="mt-8 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {gram.map((src, i) => (
            <a key={i} href="#" className="group block overflow-hidden">
              <img
                src={src}
                alt={`Maison Cleo Instagram post ${i + 1}`}
                width={800}
                height={800}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink py-16 text-background/70">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:grid-cols-4 md:px-10">
        <div>
          <p className="font-display text-xl font-bold uppercase tracking-[0.3em] text-background">
            Maison Cleo
          </p>
          <p className="mt-4 text-sm font-light">
            2312 12th Avenue South
            <br />
            Nashville, TN 37204
            <br />
            (615) 555-0142
          </p>
        </div>
        {[
          { title: "Shop", items: ["New Arrivals", "Dresses", "Outerwear", "Sale"] },
          { title: "Boutique", items: ["Our Story", "Personal Styling", "Events", "Careers"] },
          { title: "Help", items: ["Shipping", "Returns", "Size Guide", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <p className="text-[11px] uppercase tracking-[0.24em] text-background">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm font-light">
              {col.items.map((i) => (
                <li key={i}>
                  <a href="#" className="transition-colors hover:text-terracotta">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 max-w-[1400px] border-t border-background/15 px-5 pt-6 text-[11px] uppercase tracking-[0.2em] md:px-10">
        © 2026 Maison Cleo — Nashville, Tennessee
      </div>
    </footer>
  );
}
