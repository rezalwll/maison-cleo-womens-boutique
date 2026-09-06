import { motion } from "motion/react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <img
        src={hero}
        alt="Maison Cleo autumn campaign: woman in ivory silk blouse and camel trousers"
        width={1920}
        height={1088}
        className="animate-kenburns absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/10" />

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/45 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-5 pb-20 md:items-center md:px-10 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-xl text-background"
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-background/80">
            The Autumn Edit — Fall 2026
          </p>
          <h1 className="mt-5 font-display text-[13vw] font-bold uppercase leading-[0.88] tracking-tight md:text-[5.2rem]">
            Curated Style,
            <br />
            Effortlessly Yours
          </h1>
          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-background/85">
            A Nashville boutique of quietly beautiful pieces — chosen by hand, worn every day.
          </p>
          <a
            href="#new-arrivals"
            className="mt-9 inline-block bg-terracotta px-9 py-4 text-[11px] uppercase tracking-[0.28em] text-background transition-colors hover:bg-terracotta/85"
          >
            Shop New Arrivals
          </a>
        </motion.div>
      </div>
    </section>
  );
}
