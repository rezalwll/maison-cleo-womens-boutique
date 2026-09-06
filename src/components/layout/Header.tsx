import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { useCart } from "@/context/CartContext";
import { LanguageToggle, ThemeToggle } from "./PrefToggles";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

const navLinks = [
  { to: "/shop", key: "nav.shop" },
  { to: "/new-arrivals", key: "nav.newArrivals" },
  { to: "/brands", key: "nav.brands" },
  { to: "/sale", key: "nav.sale" },
] as const;

export function Header() {
  const { t } = usePreferences();
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlay = isHome && !scrolled;
  const shellClass = overlay
    ? "bg-transparent text-white"
    : "border-b border-border bg-background/95 text-foreground backdrop-blur";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-[400ms] ${shellClass}`}
      >
        <nav
          aria-label="Primary"
          className="pad-x mx-auto flex h-16 max-w-[1500px] items-center justify-between md:h-20"
        >
          <div className="flex flex-1 items-center gap-7">
            <button
              type="button"
              aria-label={t("nav.menu")}
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <ul className="hidden md:flex md:items-center md:gap-7">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[11px] uppercase tracking-[0.18em] opacity-85 transition-colors hover:text-terracotta hover:opacity-100"
                    activeProps={{ className: "text-terracotta opacity-100" }}
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/"
            className="font-display text-lg font-bold uppercase tracking-[0.3em] md:text-xl"
          >
            Maison Cleo
          </Link>

          <div className="flex flex-1 items-center justify-end gap-4 md:gap-5">
            <div className="hidden items-center gap-4 lg:flex">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <button
              type="button"
              aria-label={t("nav.search")}
              onClick={() => setSearchOpen(true)}
              className="transition-colors hover:text-terracotta"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </button>
            <Link
              to="/wishlist"
              aria-label={t("nav.wishlist")}
              className="hidden transition-colors hover:text-terracotta md:block"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </Link>
            <button
              type="button"
              aria-label={`${t("nav.cart")} (${cart.count})`}
              onClick={() => cart.setDrawerOpen(true)}
              className="relative transition-colors hover:text-terracotta"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
              {cart.count > 0 && (
                <span
                  aria-hidden="true"
                  className="price absolute -end-2 -top-2 min-w-[16px] rounded-full bg-terracotta px-1 text-center text-[10px] leading-4 text-white"
                >
                  {cart.count}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <p aria-live="polite" className="sr-only">
        {t("nav.cart")}: {cart.count}
      </p>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
