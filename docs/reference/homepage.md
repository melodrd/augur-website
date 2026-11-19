# Homepage reference

The homepage's structure, build inputs, content sources and interactions as currently implemented. Decisions about this content are in [decisions](../records/decisions.md), and questions still open in [open decisions](../records/open-decisions.md); what has been checked is in [verification](../records/verification.md).

This repository is the canonical site. The homepage was ported from the former Web Lab prototype, which was a disposable design reference: matching it is not an ongoing requirement, and no prototype checkout is needed.

## Structure

[index.astro](../../src/pages/index.astro) serves `/` with [Home.astro](../../src/components/home/Home.astro), the homepage Melo designed, which the owner chose on 29 October 2026. The earlier homepage (`current`) and the design switch (`homeDesign`, `HOME_DESIGN`, `check:designs`) were removed on 10 November 2026; git history holds them. The homepage owns its sections, art, data and controllers in [src/components/home](../../src/components/home/); layout, chrome, primitives, shared data and the controllers in [src/motion](../../src/motion/) stay shared. It has six sections: Hero, Tenets (Why Augur), Applications, How It Works, Roadmap and Learn More.

`melo` matches augur-web-lab `795ca0c`, where Melo's version had become the lab's homepage at "/"; Melo's copy, motion and layout are adopted as they are (jubalm, 31 October 2026). It was ported from the lab's `/melo/` page at `1b95a3a`, then brought up to `abfb3b5` and `795ca0c`. The lab's other review versions, its version switch and the earlier homepage's branches, art and controllers are not part of the design. Its sheets ([home-page.css](../../src/components/home/styles/home-page.css), [home-extra.css](../../src/components/home/styles/home-extra.css)) and scripts ([scripts](../../src/components/home/scripts/)) render inline before the sections ([inline.ts](../../src/components/home/scripts/inline.ts)), scoped to `.home-page`, because placed after them the hero painted unstyled until the parser reached the sheets (10 November 2026); the section reveal ([reveal.js](../../src/components/home/scripts/reveal.js)) renders as an inline module, so it runs once the footer is parsed, and the footer carries `data-reveal` on `/` only. Its copy is in [homepage.ts](../../src/components/home/data/homepage.ts).

The other pages are [About](../../src/pages/about.astro), [Contact](contact.md) with its result pages, [FAQ](../../src/pages/faq.astro) (rebuilt in November 2026: see [FAQ](faq.md)), [REP](../../src/pages/rep.astro), [Products](../../src/pages/products.astro), [Brand](../../src/pages/brand.astro), and the newsletter form's result pages: see [Newsletter interest list](#newsletter-interest-list). They were ported from web lab `1b95a3a`; the About hero's stack ([AboutScene.astro](../../src/components/pages/AboutScene.astro), [about-scene.ts](../../src/data/about-scene.ts), drawn with the melo design's iso kit), the announcement bar's drop-in three seconds into a fresh visit, the footer without contact@augur.net and the "REP token" menu label follow lab `795ca0c`. The blog, the Augur v2 whitepaper, the fork guides, privacy and terms come from the old augur.net instead: see [ported content](ported-content.md).

[PageLayout.astro](../../src/layouts/PageLayout.astro) supplies the announcement, header, footer, skip link and decorative page field. It sets the page title, description, theme color, font preload and REP favicon, the canonical link, Open Graph and Twitter tags, and the host-gated GA4 snippet ([hosting reference](hosting.md#page-metadata)). Optional props set a different `title` or `description`, add `noindex`, drop the canonical link (`canonical={false}`, for the 404 page), drop the footer (`footer={false}`), set `<main>`'s `class`, or drop the announcement, header and footer (`bare`). It renders the shared chrome sheet, [chrome.css](../../src/styles/chrome.css), before the announcement bar. It emits no structured data and uses no CSP script hashes.

[astro.config.mjs](../../astro.config.mjs) configures a static build with no adapter, the `/mission` and `/team` redirect pages, the Tailwind Vite plugin, MDX, the sitemap and the Markdown processors for the ported content. [global.css](../../src/styles/global.css) defines Tailwind v4 shared tokens, controls and utilities; specialized artwork and section styles remain scoped. Fonts are Sora and Schibsted Grotesk from Fontsource packages. Controls are native Astro components, such as [Button.astro](../../src/components/primitives/Button.astro), not framework button primitives.

## Build inputs

[package.json](../../package.json) and [package-lock.json](../../package-lock.json) define the npm build. There is no separate asset or design-system generation step. Shared CSS is authored in [global.css](../../src/styles/global.css) and [disclosures.css](../../src/styles/disclosures.css); Tailwind runs through Vite. Tokens, typography, semantic roles and the focus and reduced-motion rules come from the `@augurproject/design-system` package (`theme.css` and `tokens.tailwind.css`); its version is in [design reference](design.md) and the update steps in [update the design system](../guides/update-design-system.md).

The site's own dark roles are scoped to `:root.dark`, which relies on the `dark` class that [PageLayout.astro](../../src/layouts/PageLayout.astro) sets on `<html>`; the package also selects its dark roles from that class. Fontsource supplies Sora 400/600 and Schibsted Grotesk 400. The layout preloads the packaged Sora Latin 600 WOFF2; keep that preload aligned with the headline font when changing typography. Brand files, artwork geometry and packaged icons are local inputs; building requires no design-tool connection or external prototype checkout.

The page renders through Astro components; browser scripts enhance the rendered HTML without framework hydration. Keep browser-only APIs inside browser scripts and motion controllers rather than component frontmatter. Current application code requires no API keys or provider credentials. There is no build-time indexing switch; indexing depends on the host ([hosting reference](hosting.md#page-metadata)).

## Content and destinations

[navigation.ts](../../src/data/navigation.ts) links to the local pages (About, Contact through `pages.contact`, which every “Talk to us” uses, Brand assets, Products, FAQ, Learn through `pages.learn`, which the 404 page also uses, and REP), to the blog (`links.archive`, now the local `/blog/`) and to published resources (Whitepaper, community). `navigation.legal` puts Privacy (`/privacy/`) and Terms (`/terms/`) in the footer only, on its base line beside the funding sentence. Products lists Augur Lituus, Zoltar and Augur Statoblast from [products.ts](../../src/data/products.ts), each marked `needsReview`. External destinations are centralized in [links.ts](../../src/data/links.ts).

[home-resources.ts](../../src/components/home/data/home-resources.ts) selects “Augur: Q2 2026 report” and “The Moon Fork report” for Learn More. The owner approved this selection for launch (jubalm, 30 October 2026). The earlier draft article choices were “Why disagreement makes an oracle stronger” and “Writing questions an oracle can answer”; neither has a local article route. Learn More currently links to the whitepaper and the blog (`/blog/`), whose two posts are now pages of this site.

Review flags in the FAQ entries ([src/data/faq/](../../src/data/faq/)), [products.ts](../../src/data/products.ts) and in [walkthrough.ts](../../src/data/walkthrough.ts) (`walkthroughReview`) are content markers. The owner approved shipping the flagged content and reviewing the FAQ and walkthrough after launch (jubalm, 30 October 2026), so the flags stay in the code until that review.

## Footer

[SiteFooter.astro](../../src/components/layout/SiteFooter.astro) renders two parts, with no rule between them.

- **Contact call.** "Talk to the Augur team.", its sentence and "Talk to us" (`pages.contact`), laid out as a section heading on the page's Navy. `band={false}` on the footer (`contactBand={false}` on [PageLayout.astro](../../src/layouts/PageLayout.astro)) leaves it out; `/faq/` does.
- **Footer proper.** A full-width band a step lighter than the page. On the 500 / 668 grid it holds the logo and the newsletter field (the email input and "Subscribe" joined as one control) on the left and the four `navigationGroups` columns on the right; under both, a base line with the funding sentence, `navigation.legal` and "Back to top" (`#top`). Each destination is listed once.
- With `forms.newsletter` off, the logo stands alone in its column.
- `/contact/` renders no footer ([contact](contact.md)).

## Newsletter interest list

The footer form collects addresses for a later newsletter; the site sends no email and uses no newsletter service. The site stays static: the form posts to the separate `augur-forms` Worker in [workers/forms](../../workers/forms/). Wording, the consent version and the shared address check are in [newsletter.ts](../../src/data/newsletter.ts); the Worker's address and the honeypot field name are in [forms.ts](../../src/data/forms.ts). The Worker imports both files. The field has its own switch there, `newsletter` (on), apart from `enabled`, which governs the contact form; `forms.newsletterUrl` is the address it posts to.

- [SiteFooter.astro](../../src/components/layout/SiteFooter.astro) posts `email`, plus an off-screen honeypot field `nickname`, to `PUBLIC_FORMS_URL` + `/subscribe`. With JavaScript, its script validates first, posts form-urlencoded with `Accept: application/json` (a simple cross-origin request, no preflight) and shows the returned message in the status or error element.
- Without `PUBLIC_FORMS_URL` in a production build, the form is offline: `method="dialog"`, and the script says nothing was sent or saved; without JavaScript a `<noscript>` line says the same. Development defaults to `http://localhost:8788`.
- The Worker checks the `Origin` against `ALLOWED_ORIGINS` (403 otherwise), accepts only form bodies up to 16 KB, rejects a filled honeypot with the generic failure (never the thanks message), rate-limits, validates, then inserts into the `signups` table, ignoring duplicates. New and duplicate addresses get the same answer. Responses: JSON `{ ok, status, message, fieldErrors? }` with 200, 422 invalid, 400 rejected, 429 rate-limited or 503 unavailable; or, without JavaScript, a 303 to `SITE_URL` + `/newsletter/subscribed/`, `/newsletter/invalid/` or `/newsletter/error/`.
- Those result pages are prerendered by [[result].astro](../../src/pages/newsletter/[result].astro) as `bare`, `noindex` pages, while `forms.newsletter` is on.
- A row holds `email`, `created_at`, `consent_version` and `source` only; the table is defined in [0001_signups.sql](../../workers/forms/migrations/0001_signups.sql). No IP or user agent is stored, and logs carry only the error text, never the address.
- The footer shows no consent line under the field; sign-ups rely on the privacy policy and terms (melo, 18 November 2026). The Worker still stores `consentVersion` with each row, to be set to the privacy policy's revision when its rewrite lands ([open decisions](../records/open-decisions.md#content)).
- Nobody is mailed or confirmed. A later newsletter service's double opt-in is the confirmation step.

Deploy, database, export and removal commands are in [deploy](../guides/deploy.md#forms-worker-augur-forms).

## Interactions and assets


[timelines.ts](../../src/motion/timelines.ts) holds shared timing; the homepage's [motion](../../src/components/home/motion/) folder defines its timelines. Reuse [play-once.ts](../../src/motion/play-once.ts) to preserve session and visibility behavior. In development, [debug.ts](../../src/motion/debug.ts) supports `?motion=slow` for five-times-longer timings and `?motion=replay` for replay comparisons. Production ignores both controls.

[tabs.ts](../../src/motion/tabs.ts) reveals a selected panel after explicit interaction at widths up to 767px. [FaqItem.astro](../../src/components/content/FaqItem.astro) similarly reveals an opened question. Scrolling respects reduced-motion preferences.

Brand assets are in [public/brand](../../public/brand/) and article illustrations in [public/images/blog](../../public/images/blog/). The hero renders component/data geometry; it does not use `public/brand/oracle-field.svg`.

[Icon.astro](../../src/components/primitives/Icon.astro) renders 28 explicitly imported SVGs with no browser icon runtime: six square-cut glyphs from `@augurproject/design-system/icons/` (`arrow-right`, `arrow-up-right`, `check`, `chevron-down`, `plus`, `x`) and 22 bold SVGs from `@phosphor-icons/core` (locked to 2.1.1). Unknown names throw. Preserve the nested spans, `web-icon`, `data-fixed-weight="bold"`, `data-glyph="bold"` and `aria-hidden="true"` hooks when changing the registry. Retain the [Phosphor MIT notice](../../public/licenses/phosphor.txt).
