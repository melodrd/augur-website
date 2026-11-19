# FAQ

The FAQ at `/faq/`, its data, and the other places its answers appear. Why it is organised this way: [content strategy](../explanation/faq-content-strategy.md). How to change it: [update the FAQ](../guides/update-faq.md).

## Files

- [src/data/faq/index.ts](../../src/data/faq/index.ts): the entry type, the three sections in page order, the aliases for merged questions and topics, and the build-time checks.
- One file per section in [src/data/faq/](../../src/data/faq/): `general.ts` (Augur), `product.ts` (Augur Lituus) and `rep.ts` ($REP). Sections appear in the order `index.ts` lists them, entries in file order.
- [parked.ts](../../src/data/faq/parked.ts): fifteen answers taken off the page and kept with their sources. Fourteen left on 15 November 2026: two Builders answers the owner deleted (integration and security reporting), seven Product answers for the product page, the comparison with other oracles, removed for now, and four Token answers the owner deleted. "Do $REP holders need to take any action?" followed on 16 November 2026. Nothing imports it, so it is not built. Three of its ids (`who-decides`, `integration-flow` and `rep-missed-migration`) are live questions again with shorter answers; the parked entries under those ids are the longer versions.
- [faq.astro](../../src/pages/faq.astro): the page.
- [FaqItem.astro](../../src/components/content/FaqItem.astro): one question, shared with the REP page. Its `quiet` variant is the FAQ page's look and its `reveal` flag marks the question for the page's scroll reveal; the REP page uses neither.
- [faq.ts](../../src/markdown/faq.ts) and [rehype-faq.mjs](../../src/markdown/rehype-faq.mjs): render an answer's Markdown to HTML.
- [faq.md.ts](../../src/pages/faq.md.ts): generates `/faq.md`.

## Entries

| Field | Meaning |
|---|---|
| `id` | The question's fragment, `/faq/#<id>`. Lower-case words joined by hyphens, unique across questions, aliases and topic ids. Never renamed. |
| `question` | As shown. |
| `answer` | Markdown: lists, emphasis, `>` panels, tables and the occasional link on a word in the text. [rehype-faq.mjs](../../src/markdown/rehype-faq.mjs) gives an off-site link the ↗ and leaves a bare `www.` address, which GFM would make a link, as text. There are no buttons under answers. Shared facts are interpolated from `rep.ts`, `links.ts` and `products.ts`, not copied. |
| `sources` | Where each consequential claim comes from. Never shown. |
| `reviewed` | The date the answer was last checked against its sources. |
| `timeSensitive` | The answer describes a current state, so it's reviewed with each quarterly report. Not shown to readers. |
| `needsReview` | Draft copy awaiting the owner's review. Shown only in `/faq.md`. |
| `aliases` | Old fragments that open this entry. |
| `when` | Builds the entry only while true, for a `products.ts` switch. |

As of 16 November 2026 there are 20 entries in three sections: Augur 6, Augur Lituus 9 and $REP 5. All 20 keep owner-approved wording, with the cuts, the $REP spelling and the rewritten "What secures Augur Lituus?" of 16 November 2026, and none is flagged for review ([decisions](../records/decisions.md#16-november-2026)).

| Section | Ids, in page order |
|---|---|
| Augur (`general`) | `what-is-augur`, `what-is-an-oracle`, `is-augur-back`, `who-is-behind`, `trading`, `official-channels` |
| Augur Lituus (`product`) | `augur-lituus`, `lituus-status`, `who-decides`, `lituus-security`, `override`, `lituus-applications`, `integration-flow`, `augur-versions`, `polymarket-kalshi` |
| $REP (`rep`) | `rep-role`, `rep-holding`, `rep-lineage`, `rep-missed-migration`, `buy-rep` |

A retired id opens the answer that covers its subject:

| Retired ids | Open |
|---|---|
| `build-today`, `developer-tools` | `lituus-status` |
| `mica-white-paper`, `mica` | `buy-rep` |
| `question-lifecycle`, `finality-time`, `fork` and the other fork ids | `who-decides` |
| `costs`, `chains`, `failure-cases`, `choosing-an-oracle`, `invalid`, `no-report`, `writing-questions` | `integration-flow` |
| `false-answers`, `bonds`, `whale-attack`, `token-vote`, `value-secured`, `guarantee`, `low-participation`, `compare` | `lituus-security` |
| `governance` | `override` |
| `rep-action` | `rep-holding` |
| `lituus-rep-holders` | `rep-role` |
| The old anchors about missed migration, exchanges and recovery offers | `rep-missed-migration` |
| `which-rep`, `rep-wallet`, their aliases, the old Moon Fork anchors and `lituus-token` | `rep-lineage` |
| `what-can-i-do-today`, `can-i-use-augur-today`, `old-markets` | `trading` |

Every earlier topic id is an alias of the section that holds its questions: `getting-started`, `history` and `following` open `general`; `lituus`, `how-it-works`, `security`, `builders` and `building-with-augur` open `product`. `security-reports`, a retired question that no answer covers, opens `product` as well.

Building fails if an id or alias is not a lower-case slug, if a fragment is used twice, or if an entry lacks a `reviewed` date.

## The page

- **Layout.** From 1024px each section is a row on the site's 500/668 section grid: its name in the left column, sticky 32px from the top while its questions scroll, and its questions in the right column. Below 1024px the name sits above its questions. There is no topic rail and no rule between sections; 96px of space separates them, 64px below 768px.
- **Sections.** Each section has a short `h2` (Augur, Augur Lituus, $REP) and no intro line. The name is 48px from 1440px wide, scales down to 34px at narrower widths and is 30px below 768px. Augur's Green square sits before it, a quarter of the type size. The section ids are still `general`, `product` and `rep`, from the earlier names.
- **Questions.** Native `<details>` sharing `name="faq-question"`, so opening one closes the one that was open, with or without JavaScript. Closed on load. The id is the entry's `id`. Each is `FaqItem`'s `quiet` variant: a borderless box on the quiet surface, 8px from the next, with the question in regular weight and a bare plus. Hovering eases the box to the tile surface and brightens the plus, with no underline; the open question keeps the tile surface and shows a Green minus. Opening animates through the shared FAQ motion in `FaqItem.astro` (a same-document view transition scoped to `[data-faq-scope]`, naming only the questions and topic headers near the screen), and not under reduced motion.
- **Scroll reveal.** The section names, the questions and the ending settle in as the reader reaches them. `faq.astro` renders the homepage's [reveal.js](../../src/components/home/scripts/reveal.js) as an inline module and marks those elements `data-reveal`, so the rules are the homepage's: once per tab session, never on a reload or an arrival at a fragment, and nothing is hidden without JavaScript, under reduced motion, in forced colours or in print.
- **Deep links.** A link to `/faq/#<id>` opens that question. An old fragment, `#faq-<id>` from the previous page or an alias, is rewritten to the current id, opened and scrolled to.
- **Print.** Every question is opened before printing and restored after; the shared `name` is lifted meanwhile, or each question opened would close the last. The ending's buttons are hidden in print.
- **Ending.** "Still have a question?" on the same grid as the sections: the heading, with Augur's Green square before it on the sections' left edge, and its sentence in the left column, and two buttons, Ask on Discord and Talk to us (the contact page), as equal halves of the right column. Where a half would be narrower than 240px the buttons stack. It is the page's only contact block: the page passes `contactBand={false}` to [PageLayout.astro](../../src/layouts/PageLayout.astro), so the footer renders without its contact call; the footer proper, newsletter field included, stays.

## Metadata

- Title "Frequently asked questions | Augur" and its own description, "Answers to common questions about Augur, Augur Lituus and $REP.", both chosen by the owner on 15 November 2026.
- FAQPage structured data with every visible question and its rendered answer, through the `head` slot [PageLayout.astro](../../src/layouts/PageLayout.astro) provides. Google shows FAQ rich results only for a few authoritative government and health sites, so none is expected.
- `/faq.md` is generated from the entries at build time ([markdown pages](markdown-pages.md)); PageLayout adds its alternate link because `src/pages/faq.md.ts` exists.

## Other places the answers appear

- [rep.astro](../../src/pages/rep.astro) shows two entries by id (`repFaq` in [rep.ts](../../src/data/rep.ts): `rep-role` and `rep-holding`) as an exclusive accordion with `faq-` ids.
- The homepage shows no FAQ entries; its Learn more door links to `/faq/`.
