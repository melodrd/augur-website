// @ts-check
import { defineConfig } from 'astro/config';
import { appendFileSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { site } from './src/data/site.ts';
import rehypeCallouts from './src/markdown/rehype-callouts.mjs';
import rehypeHeadingEmoji from './src/markdown/rehype-heading-emoji.mjs';
import rehypePortedContent from './src/markdown/rehype-ported-content.mjs';
import rehypePostImages from './src/markdown/rehype-post-images.mjs';
import rehypePostText from './src/markdown/rehype-post-text.mjs';
import rehypeTweets from './src/markdown/rehype-tweets.mjs';
import rehypeWhitepaperLinks from './src/markdown/rehype-whitepaper-links.mjs';

// The build folder (dist), set once the config is final.
let clientDir = '';

/** Workers static assets answer `/about` with a temporary 307 to `/about/`. This appends a permanent
 * `/about /about/ 301` rule to `_redirects` for every folder with an index.html (pages, and the supply
 * endpoints in public/api/supply), after the hand-written rules in public/_redirects, which win.
 * GitHub Pages ignores `_redirects` and already answers `/about` with a 301 to `/about/`.
 * @type {import('astro').AstroIntegration} */
const permanentTrailingSlash = {
  name: 'permanent-trailing-slash',
  hooks: {
    'astro:config:done': ({ config }) => { clientDir = fileURLToPath(config.outDir).replace(/[\\/]$/, ''); },
    'astro:build:done': () => {
      const file = join(clientDir, '_redirects');
      const existing = existsSync(file) ? readFileSync(file, 'utf8') : '';
      const sources = new Set(existing.split('\n').map(line => line.trim().split(/\s+/)[0]).filter(source => source && !source.startsWith('#')));
      const folders = readdirSync(clientDir, { recursive: true, withFileTypes: true })
        .filter(entry => entry.isFile() && entry.name === 'index.html' && entry.parentPath !== clientDir)
        .map(entry => `/${entry.parentPath.slice(clientDir.length).split(/[\\/]/).filter(Boolean).join('/')}`)
        .filter(path => !sources.has(path) && !sources.has(`${path}/`)).sort();
      // Workers static assets allow 2,000 static redirects; fail here rather than lose rules at deploy.
      if (sources.size + folders.length > 2000) throw new Error(`_redirects would hold ${sources.size + folders.length} rules; the limit is 2,000.`);
      appendFileSync(file, `${existing && !existing.endsWith('\n') ? '\n' : ''}# Permanent trailing-slash redirects, added at build (astro.config.mjs).\n${folders.map(path => `${path} ${path}/ 301\n`).join('')}`);
    },
  },
};

/** Pages that render `<meta name="robots" content="noindex">` (form results) stay out of the sitemap. */
const isIndexable = (/** @type {string} */ page) => {
  const html = join(clientDir, new URL(page).pathname, 'index.html');
  return !existsSync(html) || !/<meta name="robots" content="noindex"/.test(readFileSync(html, 'utf8'));
};

// https://astro.build/config
export default defineConfig({
  // Canonical origin (www stays canonical; the apex redirects to it). Used for canonical URLs, the sitemap and RSS.
  site: 'https://www.augur.net',
  // A plain static build with no adapter, so the same dist/ deploys to Cloudflare Workers static assets and to
  // GitHub Pages (docs/reference/hosting.md). Every page is prerendered.
  // Old pages folded into /about/ (owner, 30 October 2026). Cloudflare answers these with the 301s in
  // public/_redirects before reaching the files; GitHub Pages serves the meta-refresh page Astro writes here.
  redirects: { '/mission': '/about/', '/team': '/about/' },
  // Ported content from the old augur.net (docs/reference/ported-content.md). `.md` (Learn guides and the
  // whitepaper) gets KaTeX math and the whitepaper's cross-file links. `.mdx` (blog posts and fork guides)
  // gets no math, so prose like "You don't spend $2 to steal $1." stays text (the old site parsed it as
  // math); it keeps the old site's callouts and drops its decorative heading emoji. rehypePortedContent
  // only touches the ported collections; rehypeTweets (X post links to X's embed markup) , rehypePostText
  // (standfirsts, sign-offs, notice labels) and rehypePostImages (each image's display width) only touch blog posts.
  markdown: { processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex, rehypeWhitepaperLinks, rehypePortedContent] }) },
  integrations: [mdx({ processor: unified({ rehypePlugins: [rehypeHeadingEmoji, rehypeCallouts, rehypePortedContent, rehypeTweets, rehypePostText, rehypePostImages] }) }), sitemap({ filter: isIndexable }), permanentTrailingSlash],
  vite: { plugins: [tailwindcss()] }
});
