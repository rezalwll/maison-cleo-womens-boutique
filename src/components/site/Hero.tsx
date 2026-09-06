import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { usePreferences } from "@/context/PreferencesContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const { t } = usePreferences();
  const reduced = useReducedMotion();

  return (
    <section className="relative h-[86svh] min-h-[560px] w-full overflow-hidden md:h-[100svh]">
      <img
        src={hero}
        alt="Maison Cleo autumn campaign: woman in ivory silk blouse and camel trousers"
        width={1920}
        height={1088}
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover object-center ${
          reduced ? "" : "animate-kenburns"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/40 to-ink/5" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/45 to-transparent" />

      <div className="pad-x relative mx-auto flex h-full max-w-[1500px] items-end pb-20 md:items-center md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="max-w-2xl text-white"
        >
          <p className="label-xs text-white/80">{t("home.eyebrow")}</p>
          <h1 className="hero-type mt-5 uppercase">
            {t("home.heroLine1")}
            <br />
            {t("home.heroLine2")}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/85">
            {t("home.newArrivalsSub")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/new-arrivals"
              className="bg-terracotta px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-terracotta/85"
            >
              {t("home.cta")}
            </Link>
            <Link
              to="/lookbook"
              className="border border-white/60 px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
            >
              {t("home.ctaSecondary")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
