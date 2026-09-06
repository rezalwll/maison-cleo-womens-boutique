import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import {
  NewArrivalsSection,
  CategoriesSection,
  BrandsSection,
  LookbookSection,
  BestsellersSection,
  StorySection,
  ReviewsSection,
  InstagramSection,
} from "@/components/site/HomeSections";
import { Newsletter } from "@/components/forms/Newsletter";

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
          "A curated Nashville boutique of contemporary women's clothing — new arrivals, lookbooks and personal styling.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <NewArrivalsSection />
      <CategoriesSection />
      <BrandsSection />
      <LookbookSection />
      <BestsellersSection />
      <StorySection />
      <ReviewsSection />
      <Newsletter />
      <InstagramSection />
    </>
  );
}
