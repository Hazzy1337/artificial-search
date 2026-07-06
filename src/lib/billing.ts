// Stripe integration point:
// Replace this placeholder with a server action or route handler that creates
// a Stripe Checkout Session after real products and prices exist.
export function createCheckoutSessionPlaceholder(planId: string) {
  return `/pricing?checkout=mock&plan=${encodeURIComponent(planId)}`
}

