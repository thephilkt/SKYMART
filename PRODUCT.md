# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Supabase planned for authentication, database, and storage; the current phase is UI-only and uses local mock data

## Users

- Primary: shoppers in Thailand using mobile and desktop browsers to discover, compare, and purchase general consumer products
- Secondary: users who can also become sellers through the same account
- Internal: marketplace administrators managing users, products, orders, payments, promotions, and content

The confirmed priority for the first product experience is the buyer shopping flow.

## Product Purpose

SKYMART is a multi-vendor general marketplace that makes discovering, evaluating, and purchasing products straightforward and trustworthy. Success means a shopper can move from discovery to a confident cart and checkout decision without needing assistance, while always understanding price, seller, delivery, stock, and order state.

## Positioning

SKYMART combines the breadth and utility of a general marketplace with a calmer, product-led shopping experience: fewer competing distractions, stronger product presentation, clearer costs, and deliberate decision support.

## Operating Context

- Shoppers browse categories, search, filter, inspect product variants and reviews, add products from multiple shops to a persistent cart, and proceed through checkout.
- A single checkout may contain products from multiple sellers and is separated into seller sub-orders behind the scenes.
- The initial market is Thailand, with Thai as the primary language and THB as the currency.
- Products in the initial scope are physical goods that require delivery.

## Capabilities and Constraints

- Roles are User and Admin. A User account may act as both buyer and seller after seller onboarding.
- The current implementation phase must establish the complete UI foundation without connecting to Supabase.
- Mock data must be clearly synthetic and replaceable by Supabase-backed data later.
- The buyer MVP includes discovery, search/filter, product detail, wishlist, cart, checkout, payment-result states, order history, and reviews.
- Responsive web is required, with mobile as the primary Storefront experience.
- Payment and shipping providers, commission, settlement, refund rules, and exact production SLAs remain open business decisions.
- Do not fabricate real customers, transaction volume, performance benchmarks, certifications, or commercial claims.

## Brand Commitments

- Product name: SKYMART
- The experience should provide marketplace breadth comparable to large regional commerce platforms while using a clean, premium, detail-oriented product design sensibility inspired by Apple.
- Inspiration must remain at the level of principles; do not copy Apple or Shopee layouts, assets, trademarks, or recognizable visual trade dress.
- Voice should be concise, clear, calm, and friendly in Thai.

## Evidence on Hand

- `PRD.md` is the authoritative requirements document.
- No approved logo, production photography, customer testimonials, pricing evidence, or finalized brand identity assets are currently present.
- Product names, sellers, prices, ratings, delivery estimates, and imagery used in the UI phase are synthetic demonstration content and must not be represented as production facts.

## Product Principles

1. Make the product and its decision-critical facts the center of every shopping surface.
2. Show total cost, stock, seller, and delivery information before commitment.
3. Keep marketplace breadth navigable without turning the interface into visual noise.
4. Build trust through explicit state, ownership boundaries, and transparent feedback.
5. Use one coherent responsive system across discovery, product evaluation, cart, and checkout.

## Accessibility & Inclusion

- Target WCAG 2.2 Level AA.
- Support keyboard navigation, visible focus, screen readers, reduced motion, 200% zoom, and touch targets near or above 44 × 44 px.
- Do not communicate status by color alone.
- Thai typography must remain legible at mobile sizes and tolerate longer localized text.

