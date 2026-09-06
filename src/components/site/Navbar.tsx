import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { label: "Shop", href: "#new-arrivals" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Brands", href: "#brands" },
  { label: "Sale", href: "#bestsellers" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
        <div className="flex flex-1 items-center gap-7">
          <button
            aria-label="Open menu"
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" strokeWidth={1.4} />
          </button>
          <ul className="hidden md:flex md:items-center md:gap-7">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-[11px] uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-terracotta"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#top"
          className="font-display text-xl font-bold uppercase tracking-[0.3em] md:text-2xl"
        >
          Maison Cleo
        </a>

        <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
          <button aria-label="Search" className="transition-colors hover:text-terracotta">
            <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
          </button>
          <button aria-label="Wishlist" className="transition-colors hover:text-terracotta">
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.4} />
          </button>
          <button
            aria-label="Cart"
            className="hidden transition-colors hover:text-terracotta md:block"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold uppercase tracking-[0.3em]">
                Menu
              </span>
              <button aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
            <ul className="mt-12 space-y-7">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-bold uppercase tracking-tight"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky mobile cart */}
      <button
        aria-label="Cart"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-background shadow-lg md:hidden"
      >
        <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
      </button>
    </header>
  );
}
