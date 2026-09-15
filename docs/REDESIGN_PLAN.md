# Orion sales website rebuild

## Authorized scope
Rebuild all seven sales pages, retain the official One Solution logo and existing support/intake/legal destinations, replace the old orbital decoration with a product-focused scroll story, and remove the setup fee. New standard offer: $50/month, no setup fee, month-to-month.

## Design
- Near-black introductory and product sections; white explanatory sections.
- Homepage: concise offer, request-to-review example, practical use cases, setup, final CTA.
- Scroll sequence: request, extracted details, callback card. Desktop uses a sticky demonstration; mobile uses native stage controls. No scroll hijacking or automatic customer activity claims.
- Shared responsive navigation, typography, footer, keyboard states, and reduced-motion behavior.
- Rebuilt how-it-works, solutions, playbooks, pricing, trust, and request pages.
- Retain the existing before/after walkthrough videos in playbooks.

## Content and billing
- Remove old setup fees from visible copy, structured data, and legacy files.
- Preserve support response targets as targets, not guarantees.
- Preserve separate scoping for larger projects; do not promise third-party costs are included.
- Old setup checkout must not appear as a $50 subscription. Use the working intake form until the Stripe subscription checkout is verified.
- Stripe work: inspect existing product, recurring price, payment link and one-time item; remove setup fee from the new-customer offer. Do not refund historical payments or change unrelated products or customer subscriptions.

## Delivery
Generate static pages with scripts/build-pages.py. Verify links, assets, semantic structure, JavaScript, pricing, and responsive interaction behavior. Commit to the repository, review the Vercel preview, then publish the authorized release and synchronize the Sites review copy.
