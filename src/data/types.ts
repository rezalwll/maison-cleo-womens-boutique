export type Bilingual = { en: string; fa: string };

export type ProductColor = {
  id: string;
  name: Bilingual;
  hex?: string;
};

export type ProductSize = {
  label: string;
  available: boolean;
};

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: Bilingual;
  description: Bilingual;
  price: number;
  compareAtPrice?: number;
  category: string;
  collectionIds: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  releasedAt: string;
  newArrival: boolean;
  bestseller: boolean;
  sale: boolean;
  exclusive?: boolean;
  inventory?: number;
};

export type Category = {
  slug: string;
  name: Bilingual;
  blurb: Bilingual;
  image: string;
  editorial?: boolean;
};

export type Collection = {
  slug: string;
  title: Bilingual;
  description: Bilingual;
  image: string;
};

export type Brand = {
  slug: string;
  name: string;
  intro: Bilingual;
  image: string;
  featured: boolean;
};

export type Look = {
  id: string;
  number: string;
  title: Bilingual;
  description: Bilingual;
  image: string;
  productIds: string[];
  orientation: "left" | "right";
};

export type Review = {
  id: string;
  quote: Bilingual;
  author: string;
  city: string;
  demo: true;
};

export type Article = {
  slug: string;
  category: Bilingual;
  categorySlug: string;
  date: string;
  title: Bilingual;
  intro: Bilingual;
  body: Bilingual[];
  pullQuote: Bilingual;
  image: string;
  productIds: string[];
};
