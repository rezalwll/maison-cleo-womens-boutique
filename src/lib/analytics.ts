export type AnalyticsEvent =
  | "product_view"
  | "product_clicked"
  | "add_to_cart"
  | "remove_from_cart"
  | "wishlist_add"
  | "search"
  | "filter_applied"
  | "checkout_started"
  | "newsletter_signup"
  | "lookbook_clicked";

type Handler = (event: AnalyticsEvent, payload?: Record<string, unknown>) => void;

let handler: Handler | null = null;

/** Wire a provider (GA, Plausible, Segment…) here. Unset by default. */
export function setAnalyticsHandler(fn: Handler | null) {
  handler = fn;
}

export function track(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  handler?.(event, payload);
}
