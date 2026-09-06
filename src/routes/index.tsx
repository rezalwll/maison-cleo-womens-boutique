import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { NewArrivals, Bestsellers } from "@/components/site/Products";
import { Categories, Brands, Lookbook } from "@/components/site/Editorial";
import {
  About,
  Reviews,
  Newsletter,
  InstagramRow,
  Footer,
} from "@/components/site/Story";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Cleo | Women's Clothing Boutique in Nashville, TN" },
      {
        name: "description",
        content:
          "Curated style, effortlessly yours. Shop new arrivals from Vince, Ulla Johnson, Rails and more at Maison Cleo in Nashville.",
      },
      { property: "og:title", content: "Maison Cleo | Nashville Women's Boutique" },
      {
        property: "og:description",
        content:
          "A curated Nashville boutique of contemporary women's clothing — new arrivals, lookbooks, and personal styling.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <NewArrivals />
        <Categories />
        <Brands />
        <Lookbook />
        <Bestsellers />
        <About />
        <Reviews />
        <Newsletter />
        <InstagramRow />
      </main>
      <Footer />
    </div>
  );
}
