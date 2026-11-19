# Verification

Dated checks, newest first, with what each did and did not cover. A check is evidence for the revision it ran against, not for later changes. Use relevant checks for each change and state their limits; a build alone does not establish readiness. No test suite has been added or run.

## Not yet checked

- Phone layouts on a real phone, browsers other than a Chromium-based one (Safari, Firefox), and widths above 1024px.
- No-JavaScript behavior in a browser with JavaScript turned off, including the `<noscript>` navigation fallback.
- How each motion scene looks under reduced motion, and animation playback in other browsers.
- Print preview, page breaks and print colours.
- Full accessibility: text over images or gradients, hover and focus states, non-text contrast, screen readers, forced colors, 200% zoom and light scheme; the full keyboard tab order below the first section.
- Page performance.
- The newsletter form against a deployed `augur-forms` Worker and remote D1 database; it has been checked only locally (29 October 2026).
- `mailto:contact@augur.net`; its inbox is unconfirmed.
- The contact form against Proton's real SMTP server and a deployed `augur-forms` Worker; it has been checked only locally, with the `log` provider and a fake SMTP server (29 October 2026).
- Live inspection of the Figma file, and a visual-conformity audit against it. Hover, focus, error, reduced-motion and responsive states need browser checks before conformity with the design is claimed.

## 16 November 2026: the FAQ copy edits rebased onto main

The two commits of the FAQ copy session were rebased onto `main` at `921552e`, which had removed the Learn pages since the branch was cut. Three answers conflicted and were resolved by hand: "Is Augur back?" keeps "Moon Fork" as plain text; "How does Augur Lituus resolve an outcome?" keeps `main`'s ending without the worked example and adds "to the truthful universe"; and the token history keeps `main`'s link to `/learn/fork/moon-fork/` with the $REP and $AUGUR wording. After the resolution `npm run build` completes with 46 pages, and `dist/faq.md` lists 20 questions, no review flag and eight links outside the official channels list. In a Chromium-based browser against the dev server, at one width of about 800px, after the rebase: `/faq/` shows 20 questions with no bare REP in its text, `/faq/#fork` opens `who-decides`, whose answer ends "to the truthful universe.", the token history's "Moon Fork" is the only Moon Fork link on the page, and `/learn/fork/moon-fork/` loads. Other widths, no-JavaScript, reduced motion and print were not checked. The two entries below describe the checks made before the rebase, against the branch's old base.

## 16 November 2026: the security answer approved

After the owner approved "What secures Augur Lituus?", `npm run build` completes with 51 pages on `feat/new-faq-page`, with the changes uncommitted on top of `c9b854d`, and `dist/faq.md` lists 20 questions and no review flag. Not looked at in a browser again: only the entry's `needsReview` flag and its notes changed since the check below.

## 16 November 2026: the FAQ copy edits, 20 questions

`npm run build` completes with 51 pages on `feat/new-faq-page`, with the changes uncommitted on top of `c9b854d`. `dist/faq.md` lists 20 questions (Augur 6, Augur Lituus 9, $REP 5) and one review flag, on "What secures Augur Lituus?"; the seven sentences and links removed on 16 November are gone from it, and "Moon Fork" in "Is Augur back?" is plain text. A search of `dist/faq/index.html` for REP that is neither $REP nor part of a versioned symbol (REPv1, REPv2, REPv2_Yes_1, REPv2_No_1) finds none in the page's text, its header and footer or its structured data. In a Chromium-based browser against the dev server, at one width of about 800px: `/faq/` shows 20 questions and the lead "Short answers about Augur, $REP and Augur Lituus."; `/faq/#fork` opens `who-decides` and `/faq/#rep-action` opens `rep-holding`; and "What secures Augur Lituus?" opens with the new answer. Not checked: `lituus-rep-holders` and `lituus-token` in a browser, `/rep/`, whose two shared answers did not change, other widths, no-JavaScript, reduced motion and print.

## 15 November 2026: the blog's contact call and the Green square on closing sections

Checked on 15 November 2026 against the uncommitted working tree of `fix/blog-contact-call` (on `5c8d2e1`), in the desktop app's Chromium pane against the dev server, dark scheme. `npm run build` completes with 46 pages. `/blog/` at 1132px and one post (`/blog/augur-one-year-in/`) at 1440, 1132, 768 and 375px have no horizontal overflow and end with the blog's contact call, with no footer contact call under it. On `/blog/` at 1132px the heading starts 120px under the page links and the sentence ends 96px above the footer proper. At 1440 and 1132px the heading and sentence are on the left and the two buttons on the right; on `/blog/` they still share the row at 940px and the buttons sit below the sentence at 900px; at 768px the buttons sit under the sentence, and at 375px they stack at full width. On the post the heading shares its left edge with "Keep reading". Tab from the last "Keep reading" card reaches Ask on Discord, then Talk to us, each with the 2px Green outline, then the footer's logo. `/faq/` at 1132 and 375px: "Still have a question?" carries the square on the same left edge as the three sections' squares, with no horizontal overflow. `/rep/` at 1440, 1132, 768 and 375px and `/` at 1440px: "Talk to the Augur team." carries the square in the page margin, level with the middle of the title's first line (at 375px the title wraps to two lines), the title keeps its left edge (on `/`, the same as "Keep going."), and there is no horizontal overflow. In the dev server's HTML, `/`, `/rep/`, `/about/` and `/products/` carry the footer's contact call and not the blog's, `/blog/` and the post carry the blog's only, and `/faq/` neither. With the pane set to prefer a light scheme, `/blog/` stays Navy. Not checked: Firefox and Safari, a real phone, reduced motion, forced colours, print, a browser with JavaScript off, the other fifteen posts, `/faq/` at 1440 and 768px, and `/` below 1440px.

## 15 November 2026: footer rebuild

Checked on 15 November 2026 against the uncommitted working tree of `feat/new-footer` (on `07c7f2f`), in the desktop app's Chromium pane and in headless Chromium for one full-size capture of `/blog/` at 1440px. `npm run build` completes with 46 pages. On `/blog/` at 1440, 1024, 800 and 375px, and on `/` and `/faq/` at 1440px, the page has no horizontal overflow; the contact call and the footer proper sit on the page grid, with the first link column and the legal links on one edge; below 1280 the logo and the newsletter field share a row over the four link columns, and on a phone everything stacks. `/faq/` shows the footer proper without the contact call. The newsletter field and its button are one joined control of equal height at 1440, 800, 375 and 320px, where the placeholder still fits; the button turns Green when pointed at and on keyboard focus, with the ring around it, and the field's ring is drawn inside it. In the newsletter field an invalid address shows the red base line and the error under the field and returns focus to it; with `data-newsletter="offline"` set by hand, submitting shows the not-connected message. "Back to top" returns the page to the top, and Tab reaches it with the Green ring. In the built `dist/`, the homepage's field is offline (`method="dialog"`, no `action`, no honeypot) with its `<noscript>` line, and no page carries the consent line; `/contact/` still offers the mailto link and has no footer; the three `/newsletter/` result pages are built and absent from the sitemap. Not checked: Firefox and Safari, a real phone, reduced motion, forced colours, print, a browser with JavaScript off, the homepage and `/faq/` below 1440px, and the field against a running `augur-forms` Worker.

## 15 November 2026: the sentence under "Still have a question?"

After the owner chose the new sentence, `npm run build` completes with 51 pages on `feat/new-faq-page`, with the changes uncommitted on top of `4874179`, and `dist/faq/index.html` carries "Come ask us on Discord. The team is active there and happy to take any question about Augur. Building something? We'd love to hear about it." Not looked at in a browser.

## 15 November 2026: the FAQ ending with two buttons

`npm run build` completes with 51 pages on `feat/new-faq-page`, with the changes uncommitted on top of `4874179`, and `dist/faq/index.html` no longer contains "Browse Learn". In the Browser pane against the dev server at `http://localhost:4321`, dark scheme: at 1440px the two buttons under "Still have a question?" are 326px wide and 48px tall, their outer edges level with the question boxes above (670px and 1329px from the left), and the row is centred on the heading and its sentence; at 768px they sit side by side at 341px each; at 375px they stack at the full 327px, with no horizontal overflow. Not checked: hover, focus and pressed states of the buttons at their new width, and everything listed as not checked in the entry below.

## 15 November 2026: the FAQ page's new layout

`npm run build` completes with 51 pages on `feat/new-faq-page`, with the changes uncommitted on top of `4874179`. In `dist/faq/index.html` there are 21 questions sharing `name="faq-question"`, each marked `data-reveal="item"`, three Green square marks and no contact band; `dist/index.html`, `dist/learn/index.html` and `dist/rep/index.html` keep the contact band, and `dist/rep/index.html` has no `data-reveal`.

In the Browser pane against the dev server at `http://localhost:4321`, dark scheme, at 1440×900 and 375×812: `/faq/` has no horizontal overflow at either width. At 1440px a section's name is 48px with a 12px Green square (8px at 375px), its centre level with the centre of the first question's row, and it holds 32px from the top while its questions scroll; no section or question has a border; a closed question's box is `rgb(22, 22, 41)` and an open one's `rgb(29, 29, 48)`, with a Green minus. The first question starts 497px down at 1440px and 531px at 375px, and the three sections together are 1,876px tall collapsed at 1440px. A fresh visit armed 19 of the 26 reveal groups, those below the fold; an arrival at `/faq/#rep-role` armed none and opened that question; a `hashchange` settled all 19. Tab moved focus from one question to the next with a 2px Green outline, 2px off the box. The page ends with "Still have a question?" 96px above the footer's directory, and `/rep/` still shows "Talk to the Augur team." and its framed accordion (32px toggle, no `data-reveal`). One earlier check, made before the questions became boxes and not repeated: with `document.startViewTransition` replaced by a stub that runs its callback at once, clicking a question opened it, closed the one that was open and left no transition names behind.

Not checked: any animation as it plays, meaning a question opening or closing, the fill easing on hover and the reveal as the page scrolls. The Browser pane was hidden for the whole session, where view transitions, CSS transitions and `IntersectionObserver` callbacks did not advance; the homepage's reveal and the REP page's accordion stalled there in the same way. Also not checked: no JavaScript, reduced motion, forced colours and print; widths between 375px and 1440px; Safari and Firefox; a screen reader.

## 15 November 2026: the REP tokens answer approved

After the owner approved the corrected last sentence of "Why is there more than one REP token?", `npm run build` completes with 51 pages on `feat/new-faq-page`, with the changes uncommitted on top of `4874179`, and `dist/faq.md` lists 21 questions with no review flag on any answer. Nothing else was re-checked.

## 15 November 2026: the reviewed FAQ, 21 questions in three sections

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In `dist/faq/index.html` there are 21 questions under three headings (Augur 6, Augur Lituus 9, $REP 6) and FAQPage structured data with 21 questions, and the alias map sends `build-today` to `lituus-status`, `mica` and `mica-white-paper` to `buy-rep`, `old-markets` to `trading`, `finality-time` to `who-decides`, `invalid` to `integration-flow`, `guarantee` and `compare` to `lituus-security`, `fork` and `lituus-rep-holders` to `rep-action`, the old missed-migration anchor and `rep-scams` to `rep-missed-migration`, and `security-reports` and `builders` to the `product` section. `dist/faq.md` lists the same 21 questions and one review flag, on "Why is there more than one REP token?". Every local destination an answer links exists in `dist`: `/rep/` with its `fork` and `versions` sections, `/learn/fork/moon-fork/`, `/learn/how-augur-answers-a-question/`, `/contact/` and `/blog/`. `dist/rep/index.html` carries the two changed sentences of the shared questions, and `public/rep.md` was edited to match. In the Browser pane against the dev server at `http://localhost:4321`, 1024px wide, dark scheme: `/faq/` shows the 21 questions and a three-link topic rail with no horizontal overflow; `/faq/#mica` rewrites to `#buy-rep` and opens it; `#security-reports` rewrites to `#product`; `#i-didnt-migrate-in-time-is-there-anything-i-can-do` rewrites to `#rep-missed-migration` and opens it; the "official channels" link in "Do $REP holders need to take any action?" opens "What are Augur's official channels?"; ten off-site links carry the ↗. At 375 by 812 there is no horizontal overflow, no answer overflows its box, and the three topic links sit two and one in the two-column list. `/faq/`, `/rep/`, `/faq.md`, `/`, `/products/`, the two Learn destinations and `/contact/` return 200 from the dev server. Not checked: the Browser pane was hidden, so opening animations, the scroll position after a question closes, focus order and reduced motion were not observed; keyboard use, rendering without JavaScript and print; browsers other than the pane's; the off-site destinations, which were not requested again; `/rep/` in the browser beyond its built HTML. The dev server logged `FAQ id "build-today" is used twice` while the files were mid-edit; it did not recur once the edit was complete.

## 15 November 2026: the FAQ page's title and description

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In `dist/faq/index.html` the title, `og:title` and `twitter:title` read "Frequently asked questions | Augur", the wording the owner chose after a first rewrite, and the description, `og:description` and `twitter:description` read "Answers to common questions about Augur, Augur Lituus and $REP."; `dist/llms.txt` has the new FAQ line. In the Browser pane against the dev server at `http://localhost:4321`, `/faq/` shows the new title and description, 17 questions, and the two-sentence MiCA answer and the two-sentence buy answer as approved. Not checked: how the title and description appear in a search result or a link preview, and phone widths.

## 15 November 2026: the polished FAQ in a browser, and the MiCA question added

In the Browser pane against the dev server already running at `http://localhost:4321`, at a viewport 1009px wide, dark scheme, before the MiCA question was added: `/faq/` shows 16 questions under four headings (General 7, Product 4, The Token 4, Builders 1) with no review-flag text and no horizontal overflow; `/faq/#integration-flow` rewrites to `#build-today` and opens "Can developers build with Augur Lituus today?", whose two links read "GitHub ↗" and "blog"; the Builders section with one question and the topic rail, which marks Builders as current, look as the other sections do. `/rep/` shows the two shared questions and the current token's address, with no horizontal overflow. `npm run build` then completes with 51 pages with "Does $REP have a MiCA white paper?" added: `dist/faq.md` has 17 questions (The Token 5), the new one 44 words at first and 13 after the owner removed its second sentence, flagged for review until the owner approved it, after which no answer in `dist/faq.md` carries a review flag; answers then average about 67 words and thirteen of the 17 are under 100. Back in the browser at the same width, `/faq/` shows 17 questions (The Token 5), `/faq/#mica` rewrites to `#mica-white-paper` and opens the new answer, and there is still no horizontal overflow; that check ran on the 44-word version, and the 13-word version was checked in the build output only. Not checked: phone and tablet widths, keyboard and focus order, no-JavaScript, reduced motion, light scheme and print for these pages in this session, and the MiCA white paper's status since the Q2 2026 report (the answer rests on that report and the owner's request).

## 15 November 2026: Builders cut to one answer

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, "Can developers build with Augur Lituus today?" is one paragraph of 36 words with two links on words (GitHub, off-site with ↗, and the blog at `/blog/`), and was the last answer flagged for review until the owner approved it: no answer in `dist/faq.md` carries a review flag now. `dist/faq.md` and the structured data in `dist/faq/index.html` have 16 questions (General 7, Product 4, The Token 4, Builders 1), with five links on words outside the channels list; answers average about 70 words and twelve of the 16 are under 100. Neither deleted Builders title appears in `dist/faq.md`, `dist/faq/index.html` or `dist/rep/index.html`, and the alias map sends `integration-flow`, `costs`, `chains`, `failure-cases`, `choosing-an-oracle` and `security-reports` to `build-today`. No file in `src` or `public` links to those fragments. `parked.ts`, now fourteen entries, and `src/data/faq/building.ts` parse as TypeScript (esbuild). Not checked: the two link targets by opening them, the Lituus-CS repository again for this change (the answer relies on the read cited for "Is Augur Lituus live?"), and the page in a browser, including how the Builders section and the topic rail look with one question.

## 15 November 2026: the buy $REP answer shortened

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq.md` has 18 questions with three flagged for review, the three Builders answers. "Where can I buy $REP?" was first cut to two short paragraphs that kept the contract address, then, to the owner's model, to one sentence naming Kraken and Uniswap, with no link to either, which the owner approved; a second sentence, on the Foundation working toward more listings, was then added at the owner's request and approved, then reworded at the owner's request to say the Foundation is working to make the token more accessible, making 24 words; the owner approved that wording, and the answer carries no review flag. The contract address no longer appears in `dist/faq.md` or `dist/faq/index.html`; `dist/rep/index.html` and `dist/rep.md` still give it. Counted from `dist/faq.md`, answers average about 78 words and thirteen of the 18 are under 100. Read in a browser the same day: CoinGecko's markets for the contract address list Kraken (AUGUR/USD) and Uniswap V4 on Ethereum and no other exchange, and GeckoTerminal's pool list shows Uniswap v4 pools named REPv2_Yes_1 against USDC, USDS and ETH. Not checked: Kraken's own listing page, the pools on Uniswap or Etherscan directly, whether an exchange CoinGecko does not track lists the token, and the page in a browser.

## 15 November 2026: the REP tokens answer rewritten around REPv2_Yes_1

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, "Why is there more than one REP token?" was first rewritten with the contract address and approved, then rejected by the owner; the draft now in place, written to the owner's outline, is a three-item history and a closing paragraph, about 110 words, with no address and no link (the address remains in "Where can I buy $REP?"), the current symbol in bold. The owner then approved it: it carries no review flag in `dist/faq.md`, and four answers remain flagged ("Where can I buy $REP?" and the three Builders answers). Not checked: the page in a browser.

## 15 November 2026: the earn answer approved, and four Token questions deleted

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq.md` and the structured data in `dist/faq/index.html` have 18 questions (General 7, Product 4, The Token 4, Builders 3), with five flagged for review and four links on words in answers outside the channels list; "Does holding $REP earn rewards?" is the two-bullet answer, without a review flag; none of the four deleted titles appears on `/faq/` or `/rep/`; the alias map sends their ids and old anchors to `rep-lineage` or `rep-role`; `/rep/` shows the two remaining shared questions and still shows the current token's address; `dist/rep.md` lists the same two questions. `parked.ts`, now twelve entries, `src/data/faq/rep.ts` and `src/data/rep.ts` parse as TypeScript (esbuild). No page in `src` or `public` links to the deleted fragments. Not checked: either page in a browser, and the layout of the REP page's question section with two questions.

## 15 November 2026: "Does holding $REP earn rewards?" shortened

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq.md` has "Does holding $REP earn rewards?" with the new 37-word answer, flagged for review; `dist/rep/index.html` shows the same question and answer; `dist/rep.md` carries them; the alias map sends `governance` to `override`. Not checked: either page in a browser, and the rest of `public/rep.md`'s question list, which was already out of step with `/rep/`.

## 15 November 2026: the REP role question rewritten

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq.md` has the question, retitled "What is $REP's role in Augur?" later the same day, with the two-paragraph answer the owner chose from five versions, 89 words, approved and without a review flag; `dist/rep/index.html` shows the same question and answer first in its question list, without the old title; `dist/rep.md` carries the new text; and "$REP" renders as written on both pages. The whitepaper sections in its `sources` were taken from the parked entries, not re-read. Not checked: either page in a browser, and the rest of `public/rep.md`'s question list, which was already out of step with `/rep/`.

## 15 November 2026: the oracle comparison removed for now

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq.md` and the structured data in `dist/faq/index.html` have 22 questions (General 7, Product 4, The Token 8, Builders 3), the comparison's title appears in neither, the page's alias map sends `compare` to `augur-lituus` and the seven parked security ids to `override`, five links remain on words in answers outside the channels list, and 10 answers are flagged for review. `parked.ts`, now eight entries, and `product.ts` parse as TypeScript (esbuild). Not checked: opening the fragments in a browser, and everything listed as not checked below.

## 15 November 2026: the oracle comparison recreated, and "onchain" in the applications answer

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built `dist/faq.md`, the last Product question is "How is Augur Lituus different from other oracles?", with the new two-paragraph answer of 66 words, flagged for review; no answer names Chainlink, Pyth, UMA or Kleros; `/faq/#compare` is still its id; and "What applications can Augur Lituus power?" opens "Any onchain application". The two sentences the answer leans on were read in the Foundation's posts of 29 January and 21 July 2026 in this session. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: the override answer rewritten

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built `dist/faq.md`, "Can the Lituus Foundation or the developers override an outcome?" is the new 46-word answer, mentions neither Augur v2 nor the Moon Fork nor the Foundation's REP, and, once the owner approved it, carries no review flag. The claim that the design has no admin key rests on the Lituus-CS reading of 11 November 2026, which was not repeated. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: "What was the Moon Fork?" deleted

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq.md` and the structured data in `dist/faq/index.html` have 23 questions (General 7, Product 5, The Token 8, Builders 3), the title appears in neither, the page's alias map sends the ten Moon Fork ids to `rep-missed-migration` and the five "What is a fork?" ids to `rep-role`, five links remain on words in answers outside the channels list, and 12 answers are flagged for review. No page in `src` or `public` links to any of those fragments. Not checked: opening the fragments in a browser, and everything listed as not checked below.

## 15 November 2026: "What applications can Augur Lituus power?" rewritten

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built `dist/faq.md`, the answer is the one-paragraph text of 60 words written after the owner found the first versions too generic, names no kind of application, states no limits, and, once the owner approved it, carries no review flag. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: "Is Augur Lituus live?" simplified

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built `dist/faq.md`, the answer is the new 35-word text with two links, to the blog and to the Lituus-CS repository, with no mention of audits, testing or ChainSafe, and, once the owner approved it, carries no review flag; the alias map sends `lituus-builders` to `is-augur-back`; six links remain on words in answers outside the channels list. The second half of 2027 is the owner's date and was not checked against a published report; the homepage roadmap says 2027 only. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: "What is Augur Lituus?" rewritten

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built `dist/faq.md`, after the owner's cuts the answer is two paragraphs of 53 words, after the owner later cut the sentence on stakes, with no link, names no person or firm, and, once the owner approved it, carries no review flag; "$REP" renders as written on the page; the alias map sends `lituus-builders` and `rules-final` to `lituus-status`; five links remain on words in answers outside the channels list. The whitepaper sections in its `sources` were taken from the parked entries, not re-read. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: seven Product answers parked

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq.md` and the structured data in `dist/faq/index.html` have 24 questions (General 7, Product 6, The Token 8, Builders 3), none of the seven titles appears in either file, the page's alias map sends all 18 of their ids and aliases to `augur-lituus`, `moon-fork` or `compare`, six links remain on words in answers outside the channels list, and 16 answers are flagged for review. `parked.ts` and `product.ts` parse as TypeScript (esbuild); `parked.ts` is not imported, so the build does not exercise it. No page in `src` or `public` links to any of the 18 fragments. Not checked: opening the fragments in a browser, and everything listed as not checked below.

## 15 November 2026: "Can I trade on Augur today?" removed

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq.md` and the structured data in `dist/faq/index.html` have 31 questions, seven of them in General, the title appears in neither file, the page's alias map sends `trading`, `what-can-i-do-today`, `can-i-use-augur-today` and `old-markets` to `is-augur-back`, and nine links remain on words in answers outside the channels list. Not checked: opening those fragments in a browser, and everything listed as not checked below.

## 15 November 2026: "Does Augur Lituus compete with Polymarket and Kalshi?" rewritten

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built `dist/faq.md`, the answer is the new two-paragraph text, mentions neither UMA nor how Kalshi settles, ends "handles the resolution layer" after the owner's later edits, and, once the owner approved it, carries no review flag; the page's alias map sends `need-rep` to `rep-holding`; UMA appears in the FAQ only in Product's comparison of oracles. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: "How does Augur Lituus differ from Augur v1 and v2?" simplified

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built `dist/faq.md`, the answer is the new two-paragraph text, 72 words after the owner cut its last sentence, without the scope, fees and forks bullets, and, once the owner approved it, carries no review flag. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: "Who is behind Augur?" rewritten

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built `dist/faq.md`, after the owner's cut of two sentences, the answer is one paragraph on the Foundation's role, names no team, has no link and no mention of the crowdsale or fundraising, and, once the owner approved it, carries no review flag; the FAQ has ten links on words in answers outside the channels list, which has seven. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: "Who is behind Augur?" names only the Lituus Foundation

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, the answer in `dist/faq/index.html` and `dist/faq.md` names neither ChainSafe nor the whitepaper's authors and ends "Neither the Foundation nor the teams decide what the oracle answers"; `/faq.md` still flags it for review. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: "Why build a decentralized, permissionless and trustless oracle?" removed

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq.md` and the structured data in `dist/faq/index.html` have 32 questions, the title appears in neither file, and the page's alias map sends `why-decentralized` to `what-is-an-oracle`. Not checked: opening `/faq/#why-decentralized` in a browser, and everything listed as not checked below.

## 15 November 2026: "It can make mistakes" and Dark Florist in "Is Augur back?"

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq/index.html` and `dist/faq.md` carry "It can make mistakes" in "What is a blockchain oracle?", with no "It can err", and the Dark Florist sentence in "Is Augur back?" before the blog sentence. "Dark Florist" appears in no other FAQ answer and has no link, and neither answer carries a review flag in `/faq.md`. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: "What is Augur?" reworded

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. In the built output, `dist/faq/index.html` carries the new answer at `#what-is-augur` and in the structured data, with "$REP" as written and none of the old text, and `dist/faq.md` carries it as two paragraphs. Not checked: the page in a browser, and everything listed as not checked below.

## 15 November 2026: "Why is there more than one REP token?" added

`npm run build` completes with 51 pages, on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. On the dev server, the question is fifth in The Token, after "Which REP token is current?"; `/faq/#rep-lineage` and `#rep-versions` open it; `/faq/`, its structured data and `/faq.md` have 33 questions, with no duplicate ids; the page has no horizontal overflow at 375px and no console errors. Not checked: `/rep/`, which this change does not touch, and everything listed as not checked below.

## 15 November 2026: five FAQ questions added

Checked on `feat/new-faq-page` with the changes uncommitted on top of `4874179`. `npm run build` completes with 51 pages. On the dev server, in the built-in Chromium-based pane:

- `/faq/` has 32 questions: General 9, Product 13, The Token 7, Builders 3, with no duplicate ids; the FAQPage structured data and `/faq.md` have 32.
- `#who-is-behind`, `#lituus-status`, `#polymarket-kalshi`, `#lituus-rep-holders` and `#value-secured` open their questions; `#roadmap`, `#audits` and `#faq-lituus-status` open the status question, `#need-rep` the Polymarket and Kalshi question and `#lituus-token` the REP holders question.
- Eleven links sit in answers outside the channels list; `/about/` returns 200 and has the `who` section the new link targets.
- At 375px the page has no horizontal overflow with the Polymarket and Kalshi question open. `/rep/` still shows its five questions. No console errors.

Not checked: keyboard on the new entries (the component is unchanged since the check below), without JavaScript, reduced motion, print, other browsers and the external link destinations.

## 15 November 2026: FAQ editorial audit

Checked on `feat/new-faq-page` with the audit's changes uncommitted on top of `4874179`. `npm run build` completes with 51 pages. On the dev server, in the built-in Chromium-based pane:

- `/faq/` has 27 questions: General 7, Product 11, The Token 6, Builders 3, all closed on load, with no duplicate ids; the FAQPage structured data has 27 entries, and `/faq.md` lists the same 27.
- Fragments: `#moon-fork`, `#finality-time`, `#trading` open their questions; `#rep-augur-ticker` and `#faq-rep-augur-ticker` open "Which REP token is current?"; `#faq-trading` and `#can-i-use-augur-today` open the trading question; `#lituus-vs-v2` opens the v1 and v2 question; `#faq-invalid` and `#writing-questions` open the ambiguous-question entry; `#what-was-the-moon-fork` opens the Moon Fork question. One question was open after each.
- Links: the nine links in answers outside the channels list are present, and the local ones (`/blog/`, `/learn/how-augur-answers-a-question/`, `/learn/fork/what-to-do/`, `/learn/fork/moon-fork/`, `/contact/`) return 200.
- Keyboard: Enter on a focused question opens it; Tab moves through the link in the open answer to the next question; Space opens that one and closes the first.
- At 375px the page has no horizontal overflow with "Which REP token is current?" open; the contract addresses wrap.
- `/rep/` shows five questions, the first open, and "See all questions" goes to `/faq/#rep`.
- No console errors.

Not checked: without JavaScript, reduced motion, print, light scheme, other browsers, a real phone, and the external link destinations. `npm run check:launch` was not run. The answers' facts were checked against the sources in the [research record](faq-research.md#15-november-2026-audit), not by the owner.

## 15 November 2026: "Where can I buy $REP?"

`npm run build` completes. On the dev server, the question reads "Where can I buy $REP?", `/faq/#buy-rep`, `#buy-augur` and `#where-to-buy` open it, and the answer names AUGUR only as Kraken's ticker; `/faq.md` shows the same text.

## 15 November 2026: "Where can I buy AUGUR?" added

`npm run build` completes. On the dev server, the question is fourth in The Token, after "Is AUGUR the same token as REPv2_Yes_1?", `/faq/#buy-augur` opens it, and it carries no links; `/faq/` and `/faq.md` have 23 questions, `/faq.md` flags it for review, and `/rep/` still shows its six questions.

## 15 November 2026: "What applications can Augur Lituus power?" added

`npm run build` completes. On the dev server, the question is second in Product, `/faq/#lituus-applications` and `/faq/#lituus-uses` open it, "What is Augur Lituus?" no longer carries the use-case paragraph, and `/faq/` and `/faq.md` have 22 questions; `/faq.md` flags it for review.

## 15 November 2026: "Why a decentralized, permissionless, trustless oracle?" added

`npm run build` completes. On the dev server, the question is third in General, `/faq/#why-decentralized` opens it, and `/faq/` and `/faq.md` have 21 questions; `/faq.md` flags it for review.

## 15 November 2026: Augur Lituus questions named and moved

`npm run build` completes. On the dev server, General has 4 questions and Product 7, with "How does Augur Lituus resolve outcomes?" second in Product; `#who-decides`, `#invalid` and `#question-lifecycle` open it. The renamed questions show on `/faq/`, in `/faq.md`, and on `/rep/` for "How is REP used in Augur Lituus?".

## 13 November 2026: Product before The Token

`npm run build` completes. On the dev server, the topic rail and the sections run General, Product, The Token, Builders, and `/faq.md` follows the same order.

## 13 November 2026: FAQ in a professional register

`npm run build` completes. Every answer in `src/data/faq/` is free of contractions apart from possessives, every entry keeps its aliases (compared with the previous commit), `/faq/` and `/faq.md` show the renamed questions, and `/rep/` shows its six shared questions with the new wording. Not checked: a full read of every answer on a phone.

## 13 November 2026: official channels as a list

`npm run build` completes. On the dev server, "What are Augur's official channels?" is a list of seven links named Discord, Telegram, X, Blog, GitHub, Lituus Foundation and Contact page, each followed by what it's for, with no intro line or warning; the five off-site links carry ↗.

## 13 November 2026: official channels merged

`npm run build` completes. The built `/faq/` and `/faq.md` have 20 questions: General 5, The Token 6, Product 6, Builders 3. On the dev server, "What are Augur's official channels?" lists seven channels, each a link whose text is its address; the five off-site ones carry ↗ and the blog and contact links do not. `#follow-development`, `#contribute`, `#talk-to-team` and `#faq-follow-development` open it.

## 13 November 2026: FAQ at 21 questions

`npm run build` completes. The built `/faq/` and `/faq.md` have 21 questions: General 6, The Token 6, Product 6, Builders 3, and "What can I do with Augur today?" is gone. On the dev server, `#what-can-i-do-today`, `#faq-what-can-i-do-today`, `#trading`, `#can-i-use-augur-today` and `#old-markets` open "Is Augur back?", and `#need-rep` opens "What can I do with REP, and does holding it earn anything?" on `/faq/`.

## 13 November 2026: blog link in "Is Augur back?"

`npm run build` completes. On the dev server, the answer ends "The Foundation publishes quarterly progress reports on the blog.", with "blog" linking to `/blog/` and no ↗; `/faq.md` carries the same link.

## 13 November 2026: "Is Augur back?" rewritten

`npm run build` completes. On the dev server, `/faq/#is-augur-back` opens the question, renamed from "Is Augur back, and who's behind it?", with the two-paragraph answer; `#who-is-behind` and `#what-happened` open it too, and `/faq.md` carries the new text without a review flag.

## 13 November 2026: FAQ at 22 questions

`npm run build` completes. The built `/faq/` and `/faq.md` have 22 questions: General 7, The Token 6, Product 6, Builders 3, and "What happened to Augur after it launched?" is gone. On the dev server, `#what-happened` and `#faq-what-happened` open "Is Augur back, and who's behind it?", and `#old-markets` opens "What can I do with Augur today?".

## 13 November 2026: "How does Augur decide what happened?" rewritten

`npm run build` completes. On the dev server, `/faq/#who-decides` opens the question with the four-step answer, `/faq/#invalid` opens it too, and `/faq.md` carries the new text without a review flag.

## 13 November 2026: "What is an oracle?" rewritten

`npm run build` completes. On the dev server, `/faq/#what-is-an-oracle` opens the question with the new answer, `/faq/#prediction-market-or-oracle` opens "What is Augur?", and `/faq.md` carries the new text without a review flag.

## 13 November 2026: "What is Augur?" rewritten

`npm run build` completes. On the dev server, `/faq/#what-is-augur` opens the question with the new answer, and `/faq.md` carries the same text without a review flag.

## 11 November 2026: FAQ topic rail without counts

`npm run build` completes. The built `/faq/` topic rail lists General, The Token, Product and Builders with no question counts.

## 11 November 2026: FAQ at 23 questions

`npm run build` completes. The built `/faq/` and `/faq.md` have 23 questions: General 8, The Token 6, Product 6, Builders 3. All 99 earlier fragments resolve; the seven removed questions' ids open "What is Augur Lituus?", "How does Augur decide what happened?", "How would an app use Augur Lituus, and what would it cost?" or "Which REP token is current?". Five answers carry one inline link each.

## 11 November 2026: FAQ sections without intros

`npm run build` completes. The built `/faq/` and `/faq.md` show each section's name with no intro line under it.

## 11 November 2026: FAQ in four sections

`npm run build` completes. The built `/faq/` and `/faq.md` have the sections General (8), The Token (7), Product (11) and Builders (4). All 96 earlier fragments resolve, every old topic id through an alias, and the REP page's `/faq/#rep` link still opens The Token.

## 11 November 2026: FAQ without "As of" dates

`npm run build` completes. None of the built `/faq/`, `/rep/` or `/faq.md` contains the "As of 11 November 2026" line. Two answers still open a sentence with "As of" in their text ("As of the Q2 2026 report", "As of November 2026, CoinGecko…").

## 11 November 2026: FAQ regrouped into five topics

`npm run build` completes. The built `/faq/` has 30 questions in five topics (The basics 5; Augur, then and now 8; REP token 6; How answers are settled 7; Building with Augur 4), and `/faq.md` the same 30. All 96 fragments the FAQ answered before (question ids, aliases, the old site's anchors, `faq-` ids and topic ids, now including `security`) resolve on the built page. Six answers carry one link each, three internal and three off-site with ↗, in `/faq.md` as on the page; `www.augur.net` stays text. The REP page shows `rep-augur-ticker` in place of `honest-fork`. In the browser, `#which-rep` opened under the REP token topic with its Etherscan link.

## 11 November 2026: FAQ cut to 35 questions

`npm run build` completes. The built `/faq/` has 35 questions in six topics, and `/faq.md` the same 35. Every one of the 96 fragments the FAQ answered before the cut (question ids, aliases, the old site's anchors, `faq-` ids and topic ids) resolves to a question or topic on the built page. In the browser, `#moon-fork-proves` opened "What was the Moon Fork?". With smooth scrolling turned off, `#following` was rewritten to `#history` and scrolled to it, and `#rep-augur-ticker` opened "Which REP token is current" at the top; smooth scrolling didn't run while the browser pane was hidden. The REP page shows its six questions, `which-rep` in place of the merged ticker question, with no links in its answers.

## 11 November 2026: FAQ answers as text only

After the links were removed, `npm run build` completes. In the built `/faq/index.html` none of the 65 answers contains an `<a>`; nor do the six answers on `/rep/`; `/faq.md` has no Markdown links. `www.augur.net` in the channels answer renders as text, not as GFM's autolink. In the browser, `#official-channels` opened that question with the channel addresses as plain text.

## 11 November 2026: FAQ without search, Start here or Copy link

Checked after the controls were removed and the questions made exclusive, against the working tree on the dev server. `npm run build` completes. The page has no search field, Start here block, Open all or Copy link, and its 65 questions share `name="faq-question"`. With real clicks, opening a second question closed the first; following `#which-rep` opened that question and closed the open one. Firing `beforeprint` opened all 65 and `afterprint` restored the one that was open and the shared name. No script errors were logged. At 375px there was no horizontal overflow. Not checked: the items listed under the FAQ rewrite entry below.

## 11 November 2026: FAQ rewrite

Checked on `feat/new-faq-page` against the working tree, with `npm run build` and the dev server, in the Claude desktop app's built-in Chromium-based browser.

- **Build.** `npm run build` completes and writes `/faq/index.html` and `/faq.md`. Lightning CSS warns that `:target-current` is not a known pseudo-class and keeps the rule. The duplicate-fragment guard in [index.ts](../../src/data/faq/index.ts) failed a build once, on an alias that matched a topic id, before it was removed.
- **Deep links.** `/faq/#question-lifecycle` opened that question. The old fragment `#faq-rep-wallet` was rewritten to `#rep-wallet`, opened, and scrolled to 48px from the top, and the topic rail marked REP. A Start here link, followed with the keyboard, opened its question, and the next Tab moved into it.
- **Search.** "wallet" matched 5 questions, "fork window" 7 and "chainlink" 1, with the count announced in the status line and `?q=` in the address; "zzzz" showed the empty state; clearing restored all questions. The CSS Custom Highlight API marked the matches.
- **Open all.** It opened all 65 questions and then closed them, and its label and `aria-expanded` followed.
- **Print.** Firing `beforeprint` opened all 65 questions; `afterprint` restored the one that was open. Print preview itself was not checked.
- **Copy link.** In the browser pane the clipboard write was refused, even on a real click, so the fallback ran: the label and the live region said "Link is in the address bar", and the address held the question's fragment. Each link's accessible name includes its question. A successful copy was not observed.
- **Keyboard.** The Tab order ran search, Open all, the nine topic links, the Start here links, then the questions. Enter on a question opened it, and the next Tab reached its links and Copy link.
- **Widths.** At 375px with every answer open, and at 768px, there was no horizontal overflow. At 375px the topics sit in two columns.
- **No JavaScript.** Scripts were blocked with a `script-src 'none'` header on a static server over `dist/`. The page rendered with every question listed and closed, the search hidden, and "Link to this answer" as a plain anchor; `#which-rep` scrolled to its question, which stayed closed.
- **Contrast.** Computed against solid backgrounds at 768px, the page's text ranged from 7.03:1 (Start here labels) to 17.49:1.
- **REP page.** `/rep/#questions` still shows its six questions from the same entries, as an exclusive accordion with `faq-` ids; its links back to `/rep/` are dropped, and the wallet answer shows "As of".
- **Content.** Every answer was checked against the sources in its `sources` field. A second reviewer then read the whole FAQ against the whitepaper, the Lituus-CS code, the blog and the fork guides and reported 21 findings. The material ones were fixed: the supply-restoration amount, the token answer (the code has protocol tokens, and the Foundation sent holders a notification token), current REP's exposure to another Augur v2 fork, "Augur v2 still runs" without a warning that no trading app has relaunched, turnout against the whitepaper's 90% assumption, the Foundation's reported REP holdings, and the code's further differences from the paper. Overlap between answers was kept where a reader landing on one answer needs it ([FAQ research](faq-research.md)).

Not checked: reduced motion in a browser (the code skips the transitions and the CSS removes them under `prefers-reduced-motion`, but the setting wasn't emulated), Safari and Firefox (including Find in page opening closed answers), a real phone, screen readers, forced colors, print preview, a successful clipboard write, and the production host.

## 11 November 2026: blog index and post pages

Checked on `feat/new-blog-page` at `2fba518` with headless Chromium driven over the DevTools protocol, against `astro dev` and against `npm run build` served by `astro preview`. The desktop app's built-in browser ran hidden, which throttles scrolling, so it was used for a first look only. Pages: `/blog/`, the longest post (`augur-testing-past-building-future`, seven sections), a short one (`phase-1-the-escalation-game`, two) and the one with X embeds (`q2-2026-progress-report`).

- Widths 320, 360, 375, 390, 430, 768, 820, 1000, 1024, 1100, 1280 and 1440px: no horizontal overflow on those pages.
- Reading measure on the longest post: full lines ran to a median of 91 characters (78 to 98) in the 780px column and run to 78 (74 to 82) in the 680px one, at every width from 820 to 1440px.
- "On this page" rail at 1440px: each of the seven links brought its heading to 152px below the top of the window and marked it current. The Contents bar at 390 and 820px: before the change, choosing the fourth section left its heading 154px above the window; after it, the heading lands 152px down, under the 54px bar, and a press outside the open list closes it. Escape was not tried.
- A jump made in the first 3 seconds of a first visit, while the announcement bar waits to drop in: a real mouse click or Enter lands on the heading; a scripted `element.click()`, which sends no pointer or key event, is cut short about 40px down by the bar's settle scroll.
- `/blog/`: a topic filter, page 2 and the back button updated the grid, the address and the status text; the tab order ran from the skip link through the header, the RSS link, the four filters and the cards, and a focused card showed a 2px ring.
- No JavaScript (script execution turned off through the protocol, not a browser setting): the featured card and all 15 other posts show and the filters and page links stay hidden; on a post the Contents disclosure opens over the text and stays open after a jump until it is closed.
- Reduced motion (emulated): no running animations, every entrance element visible and smooth scrolling off, on `/blog/` and a post.
- X embeds: the frame's corner pixels were white (255, 255, 255) before and match the page after.

Not checked: Safari, Firefox, a real phone, screen readers, print, forced colors, 200% zoom and page performance.

## 31 October 2026: production after the deploy race

PR #1 (merge `e4939a0`) and PR #2 (merge `1cd2034`) were merged into `main` seconds apart, and Workers Builds built each merge. The two builds raced: PR #1's build, which did not contain PR #2, finished last and its deploy replaced production with the old site. Production was restored by deploying the already-built version `8824ad7a-d85a-4ef2-b6db-1562feeb4917` to 100% with `cf workers deployments create`; nothing was rebuilt. The recovery steps and the one-at-a-time merge rule are in [deploy](../guides/deploy.md#one-deploy-at-a-time).

After the fix, `node scripts/check-launch.mjs https://augur-website-next.bytebros.workers.dev`: 68 passed, 0 failed, 1 warning (the supply `meta.json` block is older than www.augur.net's; the supply is the same), 1 skipped (the apex redirect). Run again later the same day with the same result.

With curl against the production host, the same day:

- **404.** An unknown path returns status 404 with the 404 page (about 60 KB of HTML) and the `_headers` headers, both as a browser navigation (`sec-fetch-mode: navigate`, as in `check-launch.mjs`'s `navigate` helper) and as a plain curl. Production does not show the preview build's split, where a non-navigation request gets the Worker's plain 9-byte `Not found` ([hosting](../reference/hosting.md#serving)). The preview host still shows that split.
- **X-Robots-Tag.** Every response from the production host carries `X-Robots-Tag: noindex` together with the other `_headers` headers: pages, the supply files, the `/mission` redirect, the 404 page and a `POST` answered 405. No path escapes the `/*` rule, so there is no unmatched path to compare. Cloudflare's own `/cdn-cgi/trace` on the same host has no `X-Robots-Tag`, so Cloudflare does not add it to everything on this host. On the preview host, the Worker's 9-byte 404, which carries no `_headers` headers, does have `X-Robots-Tag: noindex`, so Cloudflare adds it to preview responses itself. Inference: on production the header comes from the `_headers` rule; it cannot be shown directly, because every production response passes through that rule.

Not checked: the forms (offline on production), a real browser on production, www.augur.net (still the old site), and everything listed under Not yet checked.

## 31 October 2026: Melo's homepage at lab `795ca0c`

Checked against `launch/melo-latest`: augur-web-lab `abfb3b5..795ca0c` merged into the `melo` design, the shared footer, PageHero, About, the announcement bar and the page field. Every ported file was compared with the lab at `795ca0c` after rewriting the lab's import paths, `.container` and `--web-hover-edge` to the site's; what remains is the site's own: the roadmap's and Learn more's `isExternal` checks and blog door, the footer's newsletter consent, Privacy and Terms links and `pages.contact`, the local Blog nav item, the tabs controller's phone scroll, and the section reveal rendering as an inline module instead of in the lab layout's "end" slot. `npm run build` (59 pages) and `npm run check:designs` (`current`, `melo`) pass. Served by `npx wrangler dev`, `node scripts/check-launch.mjs http://127.0.0.1:8813`: 67 passed, 0 failed, 1 warning (the supply snapshot is byte-identical to www.augur.net's), 2 skipped.

Headless Chromium (Playwright) at 1440×900 and 390×844, fresh context each, the built site against a built `git worktree` of the lab at `795ca0c` (its own fonts): on `/` every section (hero, Why Augur, Applications, How It Works with Holding REP, Roadmap, Learn more) has identical text and identical height; the footer differs only by the site's Privacy and Terms links and its "Statoblast" spelling, and neither shows contact@augur.net. `/about/`'s hero has identical text and height, with the stack at the same box (1112, 306, 232×162 at 1440; under the text, 180 wide, at 390). The announcement bar waits above the page, then bar and header land together between 3.0 and 3.6 s on both. The section reveal arms 21 groups below the fold on both and leaves none armed after a scroll through. All four How It Works steps and all three use cases select on click; the example button stays 290 px wide open and closed. Neither logged console errors or failed requests.

Not checked: pixel diffs (screenshots compared by eye); reduced motion, print and no-JavaScript for the reveal and the drop-in; a reload or `#section` arrival skipping them; the `current` design beyond its build; everything listed under Not yet checked.

## 31 October 2026: Melo's homepage at lab `abfb3b5`

Checked against `launch/melo-latest`: `melo`'s Applications and How It Works files merged from augur-web-lab `1b95a3a..abfb3b5`. Each of the seven files differs from the lab at `abfb3b5` only as it differed from `1b95a3a` (import paths, `.site-container`, `--brand-hover-edge`); the lab's dropped `rep` import is dropped here too, and every module the new code imports exists. `npm run build` (59 pages) and `npm run check:designs` (`current`, `melo`) pass. Served by `npx wrangler dev`, `node scripts/check-launch.mjs http://127.0.0.1:8812`: 67 passed, 0 failed, 1 warning (the supply snapshot's block is behind www.augur.net's), 2 skipped.

Headless Chromium (Playwright) at 1440×900 and 390×844, the built site against the lab's `/melo/` at `abfb3b5` under `astro dev`: Applications, How It Works and Holding REP have identical text and identical section sizes, and screenshots match. All four How It Works steps and all three use cases (DAOs & governance shows the switch card) select on click. The site logged no console errors.

Not checked: the lab rendered with fallback fonts (its dev server refused the font files from a copied checkout), so line wraps were compared by eye only; no pixel diff; the other sections, which this change does not touch; everything listed under Not yet checked.

## 30 October 2026: Workers Builds preview of the launch branch

`node scripts/check-launch.mjs https://launch-replace-augur-net-augur-website-next.bytebros.workers.dev` against the preview build (`npx wrangler preview`): 69 passed, 0 failed, 1 skipped (the apex redirect). The preview carries Astro's Worker script: a browser navigation to an unknown path gets the 404 page, while a non-navigation request gets the Worker's plain 9-byte `Not found` with status 404 and without the `_headers` headers ([hosting](../reference/hosting.md#serving)). `X-Robots-Tag: noindex` is present on the preview host, but it also appears on the Worker's own 404, so Cloudflare may add it to preview URLs itself; the `_headers` rule for the production workers.dev host was confirmed only under `wrangler dev` at this point (production: see [31 October](#31-october-2026-production-after-the-deploy-race)).

## 30 October 2026: merged launch branch under `wrangler dev`

Checked against `launch/replace-augur-net` after merging the content port and the launch plumbing, with the Blog navigation item made local. `npm run build` (59 pages) and `npm run check:designs` (`current`, `melo`) pass. The build was served by `npx wrangler dev` and checked with `node scripts/check-launch.mjs http://127.0.0.1:8811`: 67 passed, 0 failed, 2 skipped (the workers.dev `X-Robots-Tag` and the apex redirect, which need the real hosts). Every URL in the old sitemap answers 200, or 301 to `/about/` for `/mission/` and `/team/`; the supply endpoints are byte-identical to www.augur.net; the sitemap lists 51 pages and no form result pages; the header Blog link points to `/blog/` without ↗.

Not checked: everything listed as not checked in the two entries below, and a deploy to Cloudflare (production was checked on 31 October 2026; see [production after the deploy race](#31-october-2026-production-after-the-deploy-race)).

## 30 October 2026: launch plumbing under `wrangler dev`

Checked against the `launch/plumbing` branch (base `84d15a3`), before the blog, whitepaper, fork guides, privacy, terms and RSS were merged in. `npm run build` and `npm run check:designs` pass. The build was served by `npx wrangler dev` (Wrangler 4.151) and checked with `node scripts/check-launch.mjs http://127.0.0.1:8799`: 31 passed, 36 failed, 2 skipped. All 36 failures are routes that branch did not have yet (17 blog URLs, 6 fork guides, 10 whitepaper URLs, `/privacy/`, `/terms/`, `/rss.xml`).

- Supply endpoints byte-identical to www.augur.net, served as `text/html; charset=utf-8` and `application/json`; `/api/supply/total` 301s to `/api/supply/total/`.
- `/mission`, `/mission/`, `/team` and `/team/` 301 to `/about/`; `/about` 301s to `/about/`, keeping a query string, with no loop. `/data/fork-risk.json` and unknown paths return 404 with the 404 page.
- The `_headers` security headers arrive on pages, on the 404 response and on redirects. HTML is `public, max-age=0, must-revalidate`; `/brand/` stays revalidated while its files get one day.
- With `Host: augur-website-next.bytebros.workers.dev` or a preview-style host, `/` carries `X-Robots-Tag: noindex`; with `www.augur.net`, `augur.net` or `127.0.0.1`, it does not.
- In headless Chrome with `www.augur.net` mapped to the local server, the GA4 script is added; at `127.0.0.1` it is not. No hit was confirmed in GA.
- The 404 page and footer were looked at in headless Chrome at 1440 and 1024 px. Narrower widths were not: headless Chrome would not size the window below about 500 px.

Not checked: anything on Cloudflare itself (the deployed Worker, the host-scoped header on real workers.dev hosts, managed robots.txt, the custom domain and apex redirect), CSP reports in a browser, share-card rendering on social sites, and phone widths.

## 30 October 2026: content ported from the old augur.net

Checked against `launch/port-content` at `c0355d9` ([ported content](../reference/ported-content.md)), with the old site's source at `ba18725` and the live www.augur.net for comparison.

- `npm run build` and `npm run check:designs` (`current` and `melo`) pass; each commit on the branch builds on its own.
- Every blog, whitepaper, fork-guide, privacy and terms URL in the old sitemap (35) has `dist/client/<path>/index.html`.
- `dist/client/rss.xml` is byte-identical to the live `https://www.augur.net/rss.xml` (16 items).
- Text of the 16 posts, 6 fork guides and 9 whitepaper pages, tags removed, matches the live pages except for the listed differences: the monitor removals, the guide titles moved to the header, the "References" heading, and two posts where the old site had turned `$…$` into math. Privacy and terms match word for word apart from the case of the three community links.
- In the ported pages, 2,003 internal links and fragments resolve to built files and ids, and all 84 image URLs exist in `dist/client`. The appendices carry KaTeX markup, and the KaTeX stylesheet is linked from the whitepaper pages only.
- No `↗` or arrow icon on any `/blog/` link except the navigation's Blog entry, which was made local later the same day ([decisions](decisions.md#30-october-2026)). `fork-risk`, `/data/fork`, "fork monitor" and "gauge" appear nowhere in `src/` or `dist/client/`.
- `wrangler dev` on the build: the ported pages, `/rss.xml`, the whitepaper `.md` files and a figure answer 200 with HTML, XML, Markdown and JPEG types; `/blog` and `/learn/fork` 307 to the trailing slash.
- Headless Chrome screenshots at 1440 px (blog index and post, a fork guide, the migration record, whitepaper appendix and index, privacy) and at 390 px through an iframe (blog index, a fork guide, a whitepaper appendix): layout holds, wide tables scroll inside their box, and inline and display math render.

Not checked: Safari and Firefox, a real phone, JavaScript turned off, keyboard and screen-reader use, reduced motion, print, and a deployed Worker.

## 29 October 2026: contact form sending through a real SMTP server

Checked against the #35 branch after `36862df`, with the SMTP timeout raised to 25 seconds. The forms Worker ran under `wrangler dev` with `MAIL_PROVIDER=proton`, pointed by `PROTON_SMTP_HOST` and `PROTON_SMTP_PORT` at Ethereal (`smtp.ethereal.email:587`), a free test SMTP service that accepts and keeps mail without delivering it, using a throwaway account the owner created. This exercises the same path Proton will use: STARTTLS on 587, `AUTH PLAIN`, `MAIL FROM`, `RCPT TO`, `DATA`.

- Three JSON submits returned 200 `accepted` in 4.4 to 6.3 seconds; a form post 303'd to `/contact/sent/` in 8 seconds; a submit from the `/contact/` page in the browser showed "Message sent. We’ll reply to the email you gave." after 4 seconds and cleared the form.
- With the earlier 15-second limit, four of five submits returned 503 `unavailable` ("timed out"), and one of those was a form post that still reached `/contact/sent/` only because it happened to finish in 8 seconds. Ethereal pauses 2 to 4 seconds before some replies (a direct session took 8.5 seconds from greeting to `QUIT` without logging in), so the limit is now 25 seconds. A timeout reports "not sent" even if the server got the message, never the reverse.

Not checked: the messages' arrival in the Ethereal mailbox (the owner can see it there), Proton itself, and how long Proton takes.

## 29 October 2026: contact page and `POST /contact`

Checked against the #35 branch on top of `main` at `41e9317`. Local only: the forms Worker under `wrangler dev` (Wrangler 4.155) and the static build served by a plain static file server, in the desktop app's Chromium-based browser.

- `npm run build`, `npm run check:designs` (both designs) and the Worker's `npm run check` (`tsc`) pass. The build emits `/contact/` and the four result pages.
- Worker, `log` provider, with curl: valid submit 200 `accepted` (JSON) and 303 to `/contact/sent/` (form post); blank name, `a@b` and an `ftp://` website give 422 with one message per field; a name with a line break gives 422 "Keep this to one line."; an invalid form post 303s to `/contact/invalid/`; a filled honeypot 400 `rejected`; a JSON body 400; a 20 KB body 400; a foreign `Origin` 403; the fourth post in a minute from one IP 429, and as a form post 303 to `/contact/rate-limited/`; `OPTIONS` 204 with the allowed origin; `/subscribe` still routed.
- Delivery failure, `proton` provider pointed at a local fake SMTP server without TLS: the Worker's real socket sent EHLO and STARTTLS, the TLS upgrade failed, and the route answered 503 `unavailable` (JSON) and 303 to `/contact/error/` (form post). The log line was `contact unavailable connection failed: Error`, with no submitted values.
- SMTP dialogue against a scripted fake server, in Node with the same `smtp.ts`: STARTTLS before `AUTH`, then `MAIL FROM`, `RCPT TO`, `DATA` and `QUIT`; a 535 login, a 554 after `DATA`, a server that never greets (timeout) and a refused connection each throw. The built message decodes back to the original UTF-8 subject, names and body, and encoded words stay under 75 characters.
- Browser, with JavaScript: an empty submit shows three field errors, the summary "Please correct the 3 highlighted fields." and focuses Name; an `ftp://` website shows its error; a valid submit shows "Message sent. We’ll reply to the email you gave." and clears the form.
- Browser, native form post (the page script's handler bypassed with `HTMLFormElement.prototype.submit`, JavaScript still on): lands on `/contact/sent/`. With browser validation on, `pattern` rejects a blank name, `a@b` and an `ftp://` website, matching the server.
- Labels: each of the five fields has a visible label tied to its input. Keyboard: five Tabs from Name reach "Send message", skipping the honeypot; the focused button shows its outline.
- Phone width (375 px): one-column form, no horizontal overflow.
- Homepage: every “Talk to us” links to `/contact/`; clicking “Why Augur” (now `/#why-augur`) scrolls to the section without reloading.

Not checked: real Proton delivery (no token yet), a deployed Worker, JavaScript actually turned off, reduced motion (the page adds no motion of its own), screen readers, Safari and Firefox.

## 29 October 2026: homepage design structure

Checked against `main` at `8e929c2` (before) and the change that moves the homepage into `src/designs/current/`, adds `src/designs/melo/` as a copy, the `homeDesign` switch, `HOME_DESIGN` and `npm run check:designs`. Builds only; nothing was checked in a browser, because the rendered output is unchanged.

- Built output for `current`: `dist/` before and after have the same files except two renamed by the move: the page script is now `Home.astro_astro_type_script_index_0_lang.*.js` (was `index.astro_…`), and `index.*.css` has a new hash. Every other file, including `dist/server/`, is byte-identical. `index.html` and the CSS differ only in the 16 `data-astro-cid-*` scoped-style ids, which Astro derives from each component's file path; mapped one to one, both files are byte-identical. The page script has the same length (33,964 bytes) but a different module order. Built unminified, before and after have the same 2,351 lines once `//#region` path comments and chunk hashes are removed; the only move is the answer-ribbon block (now `src/motion/answer-ribbon.ts`, first in the bundle) and one import line.
- Only the live design ships: a dynamic `import()` per design was tried first and rejected, because the build then emitted both designs' chunks and `/` linked both designs' CSS. The build now resolves `virtual:home-design` to the live design's `Home.astro` in `astro.config.mjs`, so the other design never enters the build: `dist/` for `current` has the same file list as before.
- `HOME_DESIGN=melo` builds; its `index.html` carries `melo`'s own scoped ids, and is otherwise identical to `current`'s. `HOME_DESIGN=melo` in `astro dev` serves `src/designs/melo/Home.astro`. An unknown name stops the build with `Unknown HOME_DESIGN`.
- `npm run check:designs` builds `current` and `melo`. With a broken import in `melo` it reports `melo: build failed` and exits 1.
- With `src/designs/melo/` deleted and its entry removed from `src/designs/index.ts`, `npm run build` and `npm run check:designs` pass, and `current`'s output is as above.
- Preview command: `HOME_DESIGN=melo npm run build`, then `npx wrangler versions upload --dry-run` compiles the upload with no errors (Wrangler 4.151.2). `npx wrangler preview --name home-melo` itself was not run: it needs Cloudflare access to the account.

- Rebased onto `main` at `f740422` (the newsletter change): `npm run build` and `npm run check:designs` pass, and against that revision's build the result is the same as above. The three `/newsletter/` pages are byte-identical, and `dist/client/wrangler.json` differs only in the absolute path of the folder it was built in.

Not checked: a real Cloudflare preview deployment, `astro check` (not installed), and the rendered page in a browser.

## 29 October 2026: newsletter interest list

Run against the newsletter change on its task branch, with the forms Worker under `wrangler dev` on port 8790 (local D1, `SITE_URL` and `ALLOWED_ORIGINS` set to `http://localhost:4335`) and the site under `astro dev` on port 4335 with `PUBLIC_FORMS_URL=http://localhost:8790`, in the Claude desktop app's built-in browser and with `curl`. `npm run build` passed with and without `PUBLIC_FORMS_URL`; `tsc` passed for the Worker; `wrangler deploy --dry-run` bundled it. No remote database existed; nothing was sent to production.

- Worker, JSON (`Accept: application/json`, allowed Origin): a new address returned 200 `accepted` and was stored lowercased with `created_at`, `consent_version` `2026-10-29` and `source` `footer`; the same address again returned 200 `accepted` and no second row; `nope` and an empty address returned 422 `invalid` with an `email` field error; a filled `nickname` honeypot returned 400 `rejected` and stored nothing; a JSON body and a 20 KB body returned 400 `rejected`; responses carried `Access-Control-Allow-Origin` for the allowed origin and `Vary: Origin`, and `OPTIONS` answered 204 with the same origin.
- Worker, refusals: a foreign Origin and a missing Origin returned 403; `GET` returned 405; an unknown path returned 404.
- Worker, without JavaScript: valid and invalid addresses redirected 303 to `/newsletter/subscribed/` and `/newsletter/invalid/` on `SITE_URL`. With the table renamed to simulate a database failure, JSON returned 503 `unavailable`, the form POST redirected to `/newsletter/error/`, and the log line held only the D1 error text.
- Rate limit: the sixth request from one IP within a minute (invalid attempts count) was answered as rate-limited, redirecting to `/newsletter/error/`.
- Browser, with JavaScript: the form posted cross-origin from `localhost:4335` to `localhost:8790` as one `POST` with no preflight. Typing an address, Tab to Subscribe and Enter showed the thanks message in the `role="status"` element, cleared the field and left focus on the button. The field kept its visible label, `autocomplete="email"` and `aria-describedby` (error and consent); the honeypot had `tabindex="-1"`. Earlier the same day, against the first build, the invalid-address error kept focus in the field and the layout had no overflow at 375px; those parts are unchanged.
- Browser, no-JavaScript path: simulated by submitting with `HTMLFormElement.prototype.submit`, which bypasses the script; it landed on `localhost:4335/newsletter/subscribed/` with title "Interest noted | Augur", `noindex` and the message. JavaScript was not turned off in the browser.
- Offline build (no `PUBLIC_FORMS_URL`, `astro preview` on port 4336): the form had `method="dialog"`, no `action`, no consent line and no honeypot; submitting said "Email sign-up isn’t connected yet, so nothing was sent or saved." and stayed on the page.

Not checked: a browser with JavaScript turned off, a real screen reader, Safari and Firefox, a deployed Worker or remote D1 database, the rate limit across Cloudflare locations, and the JavaScript path's server-side error messages in the browser (checked only as JSON).

## 26 October 2026: homepage browser checks

Run against `main` at fd9018e (`npm run build`, then `astro preview`) in the Claude desktop app's built-in browser. Findings are filed as comments on Track task #7 and are not fixed here.

- Phone and tablet: at 390px and 768px the page had no horizontal overflow. The mobile menu dialog opened as a modal, kept Tab and Shift+Tab inside it, closed on Escape and returned focus to the menu button, and closed when an in-page link was chosen. Choosing a link left focus on the menu button instead of the target section. The FAQ reveal in [FaqItem.astro](../../src/components/content/FaqItem.astro) brought the opened question into view. The tab reveal in [tabs.ts](../../src/motion/tabs.ts) ran but overshot in the How taking part works tabs, leaving the panel top 40 to 88px above the viewport. Several small links (20px or 17px tall) fall under the 24px WCAG 2.2 target size.
- Keyboard: the tab order from the skip link through the header, hero and first tab was logical, every focused element had a 2px outline, tabs followed the manual-activation pattern (arrows and Home/End move focus, Enter selects), and the desktop navigation disclosure opened with Enter and closed with Escape. Not walked: the full page tab order below the first section.
- No JavaScript: scripts were blocked with a `script-src 'none'` response header. The page rendered without overflow, but only the first panel of the use cases, walkthrough and roadmap tabs was readable; the rest are hidden and unreachable. The `<noscript>` navigation fallback could not be exercised, because that method does not switch off scripting for `<noscript>`. A browser with JavaScript turned off is still needed.
- Reduced motion: simulated by rewriting the `prefers-reduced-motion` media queries and `matchMedia` through a local proxy, not by an operating-system setting. Infinite animations fell from 16 to 0, total running animations from 303 to 21 (the remainder were 0.01ms colour transitions), and smooth scrolling was off. Not checked: how each scene looks under the setting.
- Print: simulated by applying the `@media print` rules on screen. The header, announcement and footer were hidden and motion was removed. Print preview, page breaks and print colours are unchecked; the page may print light text on a white page.
- Accessibility: landmarks (banner, three named navigation regions, main, footer, a labelled complementary region), one `h1`, no duplicate ids, no unnamed links or buttons, a skip link whose target exists and a labelled newsletter field with an error association were present. Text contrast was computed for 483 text elements in the default dark state at 1024px: none fell below 4.5:1 (3:1 for large text) against solid backgrounds. Not checked: text over images or gradients, hover and focus states, non-text contrast, screen readers, forced colors, 200% zoom and light scheme.
- External links: all 22 `http` destinations in [links.ts](../../src/data/links.ts) returned HTTP 200 on 26 October 2026 with GET after redirects. `x.com` pages answer 200 from a login wall, so they show reachability only; `xShare` redirects to the X login page. `mailto:contact@augur.net` was not tested and its inbox is unconfirmed. Of these, the 12 `http` destinations rendered on `/` were compared with the page.

Not checked in this run: browsers other than the built-in Chromium-based pane, a real phone, widths above 1024px, Safari or Firefox behaviour, page performance, and the newsletter form (no form was submitted).

## 27 October 2026: design-system 0.3.0 square-cut icons

Checked on the #28 task branch against its base (`main` at `b20c1c1`) with the `0.3.0` tarball installed, using Chrome driven over the DevTools protocol against two dev servers (base and branch). `npm run build` completes. The six glyphs render square-cut at 320, 390 and 1280px in the dark scheme: the desktop header chevrons, the footer and hero arrows, the announcement close, the walkthrough details chevron (closed and rotated open), the walkthrough and outcome checks, the roadmap check and plus, and the answer-chip and gate checks. The page has no horizontal overflow at 320px, and the rendered icon boxes match each call site's size (10 to 22px). Both hand-drawn checks draw in under normal motion (dash offset 1.05 to 0, total length 15.56, matching the DS path) and end complete. With `prefers-reduced-motion: reduce` they render complete with no running animation. Under print media they render complete. In the built `dist/client/index.html` all six glyph paths are inlined and both checks are polylines with a static `stroke-dasharray:1 3`, so they show complete without JavaScript. Light does not apply: `PageLayout.astro` hardcodes `class="dark"` and there is no light scheme. Before and after screenshots of each affected section at the three widths were taken as viewport-clipped element captures, not full-page; they are not stored in the repository. Not checked: a real no-JavaScript browser session (checked from the built HTML only), other browsers, a real phone, and the print preview's page layout.

## 24 October 2026: design-system 0.2.0 alignment

Checked on 24 October 2026 against `main` with the `0.2.0` tarball installed from the release URL: `npm ci` and `npm run build` complete, and React is not installed; at 1280 and 390px, in light and dark OS schemes, with reduced motion, full motion and without JavaScript, computed element styles match except the font fallback lists after the first family and the reduced-motion durations. Full-page screenshots are identical at 1280px and without JavaScript. At 390px with reduced motion, after a viewport resize, `main` leaves a 28px gap under the walkthrough steps that this version does not; injecting the 0.01ms duration into `main` removes it. Link focus is 2px Green at 6px once the ring's transition settles, and filled-button hover and pressed, the tenet hover edge, `--card` and `--border` resolve to the same values as on `main`. Not checked: animation playback and other browsers.

## 19 October 2026: landing page and icon migration

`npm run build` passed for the landing page and after the icon package migration. Desktop review covered rendering, use-case selection and the combined walkthrough/REP display. The icon migration compared 25 previously copied SVGs with packaged shapes and matched all 82 rendered icon instances before and after replacement.
