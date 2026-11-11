import { visit } from 'unist-util-visit';

/** Blog posts: marks text blocks the post page styles (src/pages/blog/[slug].astro), without changing words.
 * - A paragraph that is only italic text is a standfirst before the first section heading, and a sign-off
 *   after it.
 * - A ProseCard that opens with a bold label and a dash ("**MIGRATION CLOSED** — …") gets the label as its own
 *   element and loses the dash, so the label can sit above the note. */
const blank = (node) => node.type === 'text' && !node.value.trim();

export default function rehypePostText() {
	return (tree, file) => {
		const path = typeof file?.path === 'string' ? file.path.replaceAll('\\', '/') : '';
		if (!path.includes('/src/content/blog/')) return;
		let seenHeading = false;
		visit(tree, (node) => {
			if (node.type === 'element' && node.tagName === 'h2') seenHeading = true;
			if (node.type === 'element' && node.tagName === 'p') {
				const kids = node.children.filter((child) => !blank(child));
				if (kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === 'em') {
					node.properties = { ...node.properties, className: [seenHeading ? 'signoff' : 'standfirst'] };
				}
			}
			if (node.type === 'mdxJsxFlowElement' && node.name === 'ProseCard') {
				const first = node.children.find((child) => child.type === 'element' && child.tagName === 'p');
				const [label, rest] = first?.children ?? [];
				if (label?.type === 'element' && label.tagName === 'strong' && rest?.type === 'text' && /^\s*—\s*/.test(rest.value)) {
					label.properties = { ...label.properties, className: ['notice-label'] };
					rest.value = rest.value.replace(/^\s*—\s*/, '');
				}
			}
		});
	};
}
