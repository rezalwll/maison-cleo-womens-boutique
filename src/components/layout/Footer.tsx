import { Link } from "@tanstack/react-router";
import { usePreferences } from "@/context/PreferencesContext";
import { LanguageToggle } from "./PrefToggles";
import { store } from "@/lib/store.config";

const shopLinks = [
  { to: "/new-arrivals", key: "nav.newArrivals" },
  { to: "/shop", key: "nav.shop" },
  { to: "/brands", key: "nav.brands" },
  { to: "/sale", key: "nav.sale" },
  { to: "/lookbook", key: "nav.lookbook" },
] as const;

const infoLinks = [
  { to: "/about", key: "nav.about" },
  { to: "/store", key: "nav.store" },
  { to: "/journal", key: "nav.journal" },
  { to: "/faq", key: "faq.title" },
  { to: "/shipping-returns", key: "shipping.title" },
  { to: "/size-guide", key: "size.title" },
] as const;

export function Footer() {
  const { t } = usePreferences();

  return (
    <footer className="bg-ink text-[#F8F4EC]">
      <div className="pad-x mx-auto max-w-[1500px] py-16 md:py-24">
        <p className="font-display text-[16vw] font-bold uppercase leading-[0.85] tracking-tight md:text-[10rem]">
          Maison Cleo
        </p>

        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          <nav aria-label={t("footer.shop")}>
            <h2 className="label-xs opacity-60">{t("footer.shop")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {shopLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="opacity-85 hover:text-terracotta hover:opacity-100">
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.info")}>
            <h2 className="label-xs opacity-60">{t("footer.info")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {infoLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="opacity-85 hover:text-terracotta hover:opacity-100">
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label-xs opacity-60">{t("footer.follow")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={store.social.instagram} className="opacity-85 hover:text-terracotta">
                  Instagram
                </a>
              </li>
              <li>
                <a href={store.social.pinterest} className="opacity-85 hover:text-terracotta">
                  Pinterest
                </a>
              </li>
              <li>
                <a href={store.social.tiktok} className="opacity-85 hover:text-terracotta">
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="label-xs opacity-60">{t("footer.contact")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm opacity-85">
              <li>
                {store.city}, {store.state}
              </li>
              <li>{store.phone || t("common.tbc")}</li>
              <li>{store.email || t("common.tbc")}</li>
              <li>
                <Link to="/contact" className="hover:text-terracotta">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-[11px] uppercase tracking-[0.15em] opacity-75">
          <span>{t("footer.rights")}</span>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-terracotta">
              {t("privacy.title")}
            </Link>
            <Link to="/terms" className="hover:text-terracotta">
              {t("terms.title")}
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
