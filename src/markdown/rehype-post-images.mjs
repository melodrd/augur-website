import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { visit } from 'unist-util-visit';
import { imageMetadata } from 'astro/assets/utils';

/** Blog posts: gives each local image in the text the widest it should show, as `--image-max`: its own width, so it
 * is never enlarged, or less where that would make it taller than 760px. The post page's CSS
 * (src/pages/blog/[slug].astro) fills the column up to that width and centres the image, so its size is known
 * before it loads and nothing shifts. Runs before Astro turns the image into its Image component, which keeps
 * the `style` attribute. */
const MAX_HEIGHT = 760;

export default function rehypePostImages() {
	return async (tree, file) => {
		const path = typeof file?.path === 'string' ? file.path.replaceAll('\\', '/') : '';
		if (!path.includes('/src/content/blog/')) return;
		const images = [];
		visit(tree, 'element', (node) => {
			const src = node.tagName === 'img' ? node.properties?.src : undefined;
			if (typeof src === 'string' && src.startsWith('./')) images.push(node);
		});
		await Promise.all(images.map(async (node) => {
			const src = decodeURI(String(node.properties.src));
			try {
				const { width, height } = await imageMetadata(await readFile(resolve(dirname(path), src)), src);
				if (!width || !height) return;
				node.properties.style = `--image-max:${Math.min(width, Math.round((MAX_HEIGHT * width) / height))}px`;
			} catch {
				// Unreadable image: it keeps the column-width rule.
			}
		}));
	};
}
