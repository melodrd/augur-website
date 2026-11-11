// A run of leading emoji (including compound ones such as 👨‍💻) and the space after it.
// Shared by the MDX plugins ported from the old augur.net (src/lib/rehype-*.mjs at ba18725).
// Each emoji may continue with zero-width-joiner parts; the old pattern stopped at the joiner and left "‍💻".
const LEADING_EMOJI = /^(?:(?:\p{Emoji_Presentation}|\p{Emoji}️)(?:‍(?:\p{Emoji_Presentation}|\p{Emoji}️?))*\s*)+/u;

/** Length of the leading emoji run in `text`, or 0 when it doesn't start with one. */
export function leadingEmojiLength(text) {
	return text.match(LEADING_EMOJI)?.[0].length ?? 0;
}
