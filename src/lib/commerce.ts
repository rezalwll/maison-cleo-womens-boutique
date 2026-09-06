import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { categories } from "@/data/categories";
import { brands, brandSlug } from "@/data/brands";
import type { Product } from "@/data/types";

/**
 * Commerce service layer.
 *
 * Everything below reads from local demo data. Swap these implementations for
 * Shopify / Stripe / a custom API without touching the UI.
 */

export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByIds(ids: string[]) {
  return ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}

export function getNewArrivals() {
  return [...products].sort(
    (a, b) => +new Date(b.releasedAt) - +new Date(a.releasedAt),
  );
}

export function getBestsellers() {
  return products.filter((p) => p.bestseller);
}

export function getSaleProducts() {
  return products.filter((p) => p.sale);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProducts(slug: string) {
  return products.filter((p) => p.collectionIds.includes(slug));
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryProducts(slug: string) {
  if (slug === "dresses") {
    return products.filter((p) => p.category === "dresses" || p.category === "skirts");
  }
  if (slug === "outerwear") {
    return products.filter((p) => p.category === "outerwear" || p.category === "jackets");
  }
  return products.filter((p) => p.category === slug);
}

export function getBrandProducts(slug: string) {
  return products.filter((p) => brandSlug(p.brand) === slug);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const hay = [
      p.name.en,
      p.name.fa,
      p.brand,
      p.category,
      ...p.collectionIds,
      ...p.colors.map((c) => c.name.en),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function getRelatedProducts(product: Product, limit = 4) {
  const scored = products
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (p.category === product.category) score += 3;
      if (p.brand === product.brand) score += 2;
      score += p.collectionIds.filter((c) => product.collectionIds.includes(c)).length;
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.p.id.localeCompare(b.p.id));
  return scored.slice(0, limit).map((s) => s.p);
}

export { brands, collections, categories };

/* ── Checkout adapter ───────────────────────────────────── */

export type CheckoutResult =
  | { status: "redirect"; url: string }
  | { status: "not-configured"; reason: string };

/** No commerce backend is connected — never claim an order was placed. */
export async function createCheckoutSession(): Promise<CheckoutResult> {
  return {
    status: "not-configured",
    reason: "No commerce backend is connected to this storefront yet.",
  };
}

/* ── Newsletter adapter ─────────────────────────────────── */

export type SubscribeResult =
  | { status: "ok" }
  | { status: "invalid" }
  | { status: "not-configured" };

const LIST_KEY = "mc.newsletter";

export async function subscribeNewsletter(email: string): Promise<SubscribeResult> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { status: "invalid" };
  // Integration point: POST to Klaviyo / Mailchimp / Resend here.
  try {
    const existing = JSON.parse(localStorage.getItem(LIST_KEY) ?? "[]") as string[];
    if (!existing.includes(email)) existing.push(email);
    localStorage.setItem(LIST_KEY, JSON.stringify(existing));
  } catch {
    /* storage unavailable */
  }
  return { status: "ok" };
}
