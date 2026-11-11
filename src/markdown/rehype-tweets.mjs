import { visit } from 'unist-util-visit';

/** Blog posts: a link to an X post that stands alone (a paragraph of its own, or the last line of a paragraph,
 * as in "you can read it here:" then the link) becomes X's standard embed markup, a `blockquote.twitter-tweet`.
 * The post page loads X's widgets.js, which swaps each one for the embedded post; without it the blockquote
 * stays as a link to the post. `data-dnt` asks X not to use the embed for personalisation; `data-cards="hidden"`
 * leaves out the post's photo or link preview, which made the embed taller than the text around it; `data-align`
 * centres it in the text column.
 * Runs after rehypePortedContent, so it ignores the ↗ mark that plugin adds to the link. */
const STATUS = /^https:\/\/(?:x|twitter)\.com\/([^/]+)\/status\/\d+/;
const el = (tagName, properties, children = []) => ({ type: 'element', tagName, properties, children });
const text = (value) => ({ type: 'text', value });
const blank = (node) => node.type === 'text' && !node.value.trim();

function embed(url, handle) {
	return el('blockquote', { className: ['twitter-tweet'], dataDnt: 'true', dataTheme: 'dark', dataCards: 'hidden', dataAlign: 'center' }, [
		el('p', {}, [text(`A post by @${handle} on X.`)]),
		el('a', { href: url }, [text('View the post on X'), el('span', { className: ['offsite-mark'], ariaHidden: 'true' }, [text('↗')])]),
	]);
}

export default function rehypeTweets() {
	return (tree, file) => {
		const path = typeof file?.path === 'string' ? file.path.replaceAll('\\', '/') : '';
		if (!path.includes('/src/content/blog/')) return;
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'p' || !parent || index === undefined) return;
			const kids = node.children.filter((child) => !blank(child));
			const last = kids.at(-1);
			const href = last?.type === 'element' && last.tagName === 'a' ? last.properties?.href : undefined;
			const match = typeof href === 'string' ? href.match(STATUS) : null;
			if (!match) return;
			if (kids.length === 1) { parent.children[index] = embed(href, match[1]); return; }
			// A link on the paragraph's last line: the text before it ends with a line break.
			const before = kids.at(-2);
			if (before?.type !== 'text' || !/\n\s*$/.test(before.value)) return;
			node.children = node.children.slice(0, node.children.indexOf(last));
			before.value = before.value.replace(/\s+$/, '');
			parent.children.splice(index + 1, 0, embed(href, match[1]));
		});
	};
}
