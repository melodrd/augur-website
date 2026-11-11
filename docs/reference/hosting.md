# Hosting reference

How the two hosts serve the build, the metadata every page carries, and the REP supply endpoints. Deploy, cutover and refresh steps are in [deploy](../guides/deploy.md).

## Serving

The site is a plain static build in `dist/` with no adapter: every page is prerendered and there is no server code. One build deploys to two hosts from `main`:

- **GitHub Pages**, from [pages.yml](../../.github/workflows/pages.yml), serves www.augur.net once the [cutover](../guides/deploy.md#cut-over-to-wwwaugurnet) is done (owner, 2 November 2026).
- **Cloudflare Workers static assets**, the Worker `augur-website-next` built by Workers Builds, serves its workers.dev URL, pull request previews and a standby copy. [wrangler.jsonc](../../wrangler.jsonc) has no Worker script, so static assets answer every request, previews included.

| | Cloudflare | GitHub Pages |
|---|---|---|
| Unknown path | [404.astro](../../src/pages/404.astro), built to `dist/404.html`, with status 404 (`assets.not_found_handling: "404-page"`) | the same `404.html`, with status 404 |
| `/mission`, `/team` (with or without the slash) | 301 to `/about/` ([\_redirects](../../public/_redirects)) | `/mission` 301 to `/mission/`, which is a meta-refresh page to `/about/` with `noindex` and a canonical to `/about/` (`redirects` in [astro.config.mjs](../../astro.config.mjs)) |
| `/about` without the slash | 301 to `/about/` (rule added at build, below) | 301 to `/about/` (Pages' own behaviour) |
| Response headers | [\_headers](../../public/_headers), below | none of `_headers`; the workflow deletes `_headers` and `_redirects` from the upload, because Pages would serve them as files |
| Caching | below | `max-age=600` on every file, not configurable |

- Trailing slashes on Cloudflare: Workers static assets answer `/about` with a temporary 307. At build, [astro.config.mjs](../../astro.config.mjs) appends a `/about /about/ 301` rule to `dist/_redirects` for every folder that holds an `index.html`, pages and supply endpoints alike, after the hand-written rules, which win. Workers allows 2,000 static redirects; the build fails above that. `/about/index.html` still gets the 307 to `/about/`.
- The meta-refresh pages for `/mission/` and `/team/` are in the Cloudflare upload too, but `_redirects` answers those paths first. They stay out of the sitemap because of their `noindex`.
- The site assumes it is served from the root of its host. Before the cutover the Pages deploy sits at `https://augurproject.github.io/augur-website/`, where root-relative assets and links break; it isn't linked from anywhere.

## Response headers

These come from `_headers`, so only the Cloudflare host sends them. The one that matters for visitors is also set in the page: `<meta name="referrer" content="strict-origin-when-cross-origin">` in [PageLayout.astro](../../src/layouts/PageLayout.astro), on both hosts. The old augur.net on GitHub Pages sent none of them either (checked 2 November 2026).

- Every path: `Strict-Transport-Security: max-age=86400` (no preload), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` and a `Content-Security-Policy-Report-Only`.
- The CSP allows `'self'`, inline scripts and styles (the pages use inline `<script>`, `<style>` and `style` attributes), the GA4 hosts (`www.googletagmanager.com`, `*.google-analytics.com`, `*.analytics.google.com`) and `https://*.workers.dev` for the forms Worker in `connect-src` and `form-action`, because `PUBLIC_FORMS_URL` is not set yet. It also allows X's embed host, `https://platform.twitter.com`, in `script-src` and `frame-src`, for the X posts embedded in blog posts; from the page, the embed contacts only that host (checked 11 November 2026). It names no report endpoint, so violations show only in the browser console.
- `X-Robots-Tag: noindex` on `https://:worker.:account.workers.dev/*`, which matches the Worker's workers.dev host and its preview hosts, so only the canonical host is indexed. On the production workers.dev host every response carries it alongside the other `_headers` headers, and Cloudflare's own `/cdn-cgi/trace` there does not, so it comes from this rule. Cloudflare adds `X-Robots-Tag: noindex` to preview hosts by itself, including the preview Worker's plain 404.
- Caching: HTML keeps the Workers default, `public, max-age=0, must-revalidate`. `/_astro/*` is `public, max-age=31536000, immutable`, because Astro names those files by content hash. `/images/*`, the files directly in `/brand/` (`/brand/:file`, so not the `/brand/` page) and `/brand/kit/*` are `public, max-age=86400`.
- A header set by two matching rules is joined with a comma, so two rules must not set the same header for one path.

## Page metadata

- [PageLayout.astro](../../src/layouts/PageLayout.astro) emits `<link rel="canonical">` and `og:url` from `site` in `astro.config.mjs` (`https://www.augur.net`) and the page path, on every host. The 404 page passes `canonical={false}`, because it answers every unknown path. `noindex` pages keep their robots meta and also get a canonical.
- Open Graph and Twitter (`summary_large_image`) tags carry the page title, description and `shareImage` from [site.ts](../../src/data/site.ts); `twitter:site` comes from the X link in [links.ts](../../src/data/links.ts). Blog posts pass their own share image (their cover, rendered as a 1200 × 630 JPEG), `og:type` `article` with `article:published_time` (and `article:modified_time` when the post has an update date). `/blog/` and the posts add an RSS discovery link to `/rss.xml`.
- [og-image.png](../../public/og-image.png) is 1200 × 630, the URL the old site used. It was made on 30 October 2026 from the brand kit: the reversed horizontal logo and `oracle-field.svg` from `public/brand/`, the Brand Foundation palette in [brand.ts](../../src/data/brand.ts), and Sora 600/400 and Schibsted Grotesk 400 from Fontsource, with the homepage headline and site description. It was rendered in headless Chrome and recompressed with sharp; no source file is kept.
- The sitemap ([@astrojs/sitemap](../../astro.config.mjs)) leaves out every page whose HTML has `<meta name="robots" content="noindex">` (the newsletter and contact result pages) and the 404 page. [robots.txt](../../public/robots.txt) allows everything and names `https://www.augur.net/sitemap-index.xml`.
- Indexing depends on the host, not the build: the same build serves www.augur.net and workers.dev, so there is no build-time indexing switch (`PUBLIC_SITE_INDEXABLE` was removed).

## Analytics

Google Analytics 4, property `G-4VLMY3QMC9` (`analyticsId` in [site.ts](../../src/data/site.ts)), the old augur.net's property. An inline script in `PageLayout.astro` loads gtag.js only when `location.hostname` is the host of `site` (`www.augur.net`), so workers.dev, previews and local builds are not counted. Its `config` call matches the old site's snippet, including `allow_google_signals` and `allow_ad_personalization_signals`; the old snippet's `astro:page-load` listener is left out because this site has no client-side router. There is no consent banner (jubalm, 30 October 2026).

## REP supply endpoints

CoinMarketCap reads these. [generate-supply.mjs](../../scripts/generate-supply.mjs) (`npm run supply`) writes them, in the old site's format, byte for byte.

| URL | File | Body | Served as |
|---|---|---|---|
| `/api/supply/total/` | [public/api/supply/total/index.html](../../public/api/supply/total/index.html) | whole REP as a bare decimal with no trailing newline, such as `6546319.740033638376287306` | `text/html; charset=utf-8` |
| `/api/supply/circulating/` | [public/api/supply/circulating/index.html](../../public/api/supply/circulating/index.html) | the same value: no locked, reserved or treasury allocations | `text/html; charset=utf-8` |
| `/api/supply/meta.json` | [public/api/supply/meta.json](../../public/api/supply/meta.json) | provenance: block number, generation time, and the wei value as a string; tab-indented with a trailing newline | `application/json` |

- The value is ERC-20 `totalSupply()` of REPv2_Yes_1, `0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D`, read five blocks behind the tip. It still grows slowly: forkAndRedeem on unredeemed forking-market bonds mints REP (6,546,099.87 on 30 October 2026, 6,546,319.74 on 2 November 2026).
- **GitHub Pages** (www.augur.net) regenerates the files in every workflow run, hourly and on each push to `main`, so they are at most about an hour old (owner, 2 November 2026). The script is fail-closed: unless the on-chain symbol is `REPv2_Yes_1`, decimals are 18 and the supply is within (0, 11,000,000] REP, it writes nothing and the run stops before deploying.
- **Cloudflare** serves the committed files, which change only when someone runs `npm run supply` and commits ([deploy](../guides/deploy.md#refresh-the-rep-supply-snapshot)).
- This replaces the old site's hourly pipeline (`scripts/generate-supply-endpoints.ts` in `AugurProject/augur-reboot-website`), which uses `ethers`; the port uses plain JSON-RPC calls and the same public endpoints, with `ETH_RPC_URL` tried first when set.
- `/api/supply/total` and `/api/supply/circulating` redirect 301 to the trailing-slash URL, as on the old site.
- The old site's other data feeds, `/data/fork-risk.json` and `/data/dispute-markets-seed.json`, are dropped on purpose and return 404.
