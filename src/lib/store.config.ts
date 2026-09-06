/**
 * Maison Cleo business configuration.
 *
 * EDIT ME: values left empty are intentionally blank — the UI renders a
 * "to be confirmed" state instead of publishing invented business claims.
 */
export const store = {
  name: "Maison Cleo",
  descriptor: "Women's Boutique · Nashville, TN",
  city: "Nashville",
  state: "TN",
  address: "", // e.g. "123 Example Ave, Nashville, TN 37203"
  phone: "",
  email: "",
  /** e.g. [{ days: "Mon – Sat", hours: "10:00 – 18:00" }] */
  hours: [] as { days: string; hours: string }[],
  social: {
    instagram: "https://instagram.com/",
    pinterest: "https://pinterest.com/",
    tiktok: "https://tiktok.com/",
  },
  instagramHandle: "@maisoncleo",
  currency: "USD",
  locale: "en-US",
};

/** EDIT ME: policy values are unset until confirmed by the boutique. */
export const shippingPolicy = {
  domesticShipping: "",
  freeShippingThreshold: null as number | null,
  processingTime: "",
  returnWindow: "",
  saleItemsReturnable: null as boolean | null,
};

export const TBC = "To be confirmed";
