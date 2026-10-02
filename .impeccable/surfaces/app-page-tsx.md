---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/product/[slug]/page.tsx","app/cart/page.tsx","app/checkout/page.tsx"]
---

# SKYMART Buyer Storefront

- Scope: buyer discovery and shopping flow, beginning at the home storefront and extending through product detail, cart, checkout, and order confirmation
- Visitor mode: Persuade on discovery surfaces; Operate through cart and checkout
- Audience: Thai mobile-first shoppers comparing general consumer products
- Primary job: find a relevant product, understand its price, seller, stock, and delivery, then add it to cart confidently
- Primary action: add a selected product to cart and proceed toward checkout
- Content: synthetic catalog data only; no fabricated commercial proof or production claims
- Constraints: Next.js 16 App Router, TypeScript, Tailwind CSS, UI-only mock data, responsive WCAG 2.2 AA target

## Direction contract

THESIS: Shopping is a calm sequence of useful arrivals. The storefront refuses the category-default promotional banner followed by an undifferentiated grid; products move through a clear route and dock where their decision-critical facts become actionable.

OWN-WORLD: Cool white space, graphite type, brushed-aluminum rails, frosted route markers, precise blue actions, and one restrained warm signal. Corners are controlled rather than universally rounded. Product photography provides the saturated color while interface chrome remains quiet and exact.

STORY: The shopper first understands that SKYMART organizes marketplace breadth without noise, searches or enters a category, inspects one arriving product with price, rating, seller and delivery visible, adds it to cart, and continues through a transparent purchase flow.

FIRST VIEWPORT: A slim navigation anchors the top. A large horizontal product runway crosses the viewport and changes scale around the active product. Search and category gates sit on the route, while the active product docks into a buying rail containing its Thai name, THB price, delivery, variant cue and primary add-to-cart action. The next category index begins within the first scroll.

FORM: Aerial Carousel was candidate 3 in the grounded list and was assigned by direction seed `61952f2f`. This session is code-led: the signature interaction is a horizontal product route whose active stop expands, updates the semantic buying rail, and converts into a vertical stepper on mobile.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
