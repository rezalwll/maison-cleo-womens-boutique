import { useState } from "react";
import { usePreferences } from "@/context/PreferencesContext";
import { getProductsByIds } from "@/lib/commerce";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/animation/Reveal";
import { track } from "@/lib/analytics";
import type { Look } from "@/data/types";

export function LookBlock({ look }: { look: Look }) {
  const { t, tr } = usePreferences();
  const [open, setOpen] = useState(false);
  const items = getProductsByIds(look.productIds);
  const imageFirst = look.orientation === "left";

  return (
    <article className="pad-x mx-auto max-w-[1500px]">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <Reveal className={imageFirst ? "md:order-1" : "md:order-2"}>
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={look.image}
              alt={tr(look.title)}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
            />
          </div>
        </Reveal>

        <Reveal className={imageFirst ? "md:order-2" : "md:order-1"} delay={0.05}>
          <p className="label-xs text-terracotta">
            {t("lookbook.look")} {look.number}
          </p>
          <h3 className="section-type mt-3 uppercase">{tr(look.title)}</h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {tr(look.description)}
          </p>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => {
              setOpen((v) => !v);
              if (!open) track("lookbook_clicked", { look: look.id });
            }}
            className="mt-7 border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.2em]"
          >
            {open ? t("lookbook.hideLook") : t("lookbook.shopLook")}
          </button>

          {open && (
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </article>
  );
}
