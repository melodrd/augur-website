# Open decisions

Decisions and owner actions still outstanding, checked against the code on 31 October 2026. When one is settled, delete its entry here, add it to [decisions](decisions.md) and update the reference it affects. Until then, items here are not established.

## Content

- **Privacy rewrite.** Legal drafts it; the person is not named yet ([decisions](decisions.md#30-october-2026)). [privacy.astro](../../src/pages/privacy.astro) still carries the old augur.net wording, which says the site collects no personal data. That is now inaccurate: the site stores newsletter addresses (D1), sends contact messages through Proton and runs GA4 without a consent banner. The rewrite must cover all three.
- **"Last Updated" on the legal pages.** [privacy.astro](../../src/pages/privacy.astro) and [terms.astro](../../src/pages/terms.astro) refer to a "Last Updated" date at the top of the page, and neither shows one, as on the old site.
- **REP holders on `/rep/`.** Whether [rep.astro](../../src/pages/rep.astro) should point holders of the stranded REPv2 token to the ported fork guides under `/learn/fork/`; it links no fork guide now. Also open: whether the site links to exchanges at all, or only to Etherscan.

## Analytics and headers

- **GA4 Google signals and ad personalisation.** The `config` call in [PageLayout.astro](../../src/layouts/PageLayout.astro) sets `allow_google_signals` and `allow_ad_personalization_signals` to `true`, copied from the old site's snippet. Whether to keep them was not asked when GA4 was approved.
- **X embeds in blog posts.** A link to an X post on its own line in a blog post becomes X's embed, and the post page loads X's `widgets.js` from `platform.twitter.com` when one nears the screen, on the three posts that have one. That script lets X see who reads those pages, so it is a second third-party script beside GA4, which [AGENTS.md](../../AGENTS.md) names as the one approved tracking exception. The embeds set `data-dnt`. Needs owner approval; the privacy rewrite would also need to cover it.
- **Content Security Policy.** [\_headers](../../public/_headers) sends `Content-Security-Policy-Report-Only`. Before it is enforced: check the main pages and the forms for reports in the browser console, and replace `https://*.workers.dev` in `connect-src` and `form-action` with the `augur-forms` origin once `PUBLIC_FORMS_URL` is set ([deploy](../guides/deploy.md#cut-over-to-wwwaugurnet), step 7).
- **HSTS.** `Strict-Transport-Security` is `max-age=86400` with no preload. The launch proposal raised it after a week; [deploy](../guides/deploy.md#cut-over-to-wwwaugurnet) says raise it only by owner decision. Which applies, and to what value, is not decided.
- **Share image.** [og-image.png](../../public/og-image.png) was made by an agent on 30 October 2026 from the brand kit ([hosting](../reference/hosting.md#page-metadata)) and has had no owner or design review.

## Deployment

- **Forms Worker.** Both forms are offline on production: `augur-forms` is not deployed and `PUBLIC_FORMS_URL` is not set in the Workers Builds environment, so the footer form renders `data-newsletter="offline"` and the contact form `method="dialog"` (checked 31 October 2026). Left, by the owner ([deploy](../guides/deploy.md#forms-worker-augur-forms)):
  - create the D1 database and replace `REPLACE_WITH_ID_FROM_WRANGLER_D1_CREATE` in [workers/forms/wrangler.jsonc](../../workers/forms/wrangler.jsonc);
  - set `SITE_URL` and `ALLOWED_ORIGINS` there: they say `https://augur.net` and `https://augur.net,https://www.augur.net`, while the canonical host is www (the forms setup asks for `SITE_URL=https://www.augur.net` and the workers.dev host in `ALLOWED_ORIGINS`);
  - Proton: a paid plan with the augur.net domain, the address `contact-form@augur.net` and its SMTP token (`PROTON_SMTP_TOKEN`);
  - confirm that `contact@augur.net`, the contact form's `CONTACT_TO`, exists and is read; [links.ts](../../src/data/links.ts) still marks it unverified;
  - deploy, then set `PUBLIC_FORMS_URL` for the site and redeploy it.
- **Cutover.** www.augur.net still serves the old GitHub Pages site from `AugurProject/augur-reboot-website` (checked 2 November 2026). The switch moves its custom domain to this repository's Pages site and needs admin rights on both repositories; DNS doesn't change. Steps: [deploy](../guides/deploy.md#cut-over-to-wwwaugurnet).

## Design

- **`--color-muted` override.** It could be removed by changing the two `text-muted` uses in [global.css](../../src/styles/global.css) to `text-muted-foreground`; not done. See [design reference](../reference/design.md#design-system-alignment).
- **Design-system alignment.** The package is pinned to `0.3.0`; the brand foundation PDF reference stays at `f3c089a`. Alignment with later design-system changes is not established.
