import { getCollection, type CollectionEntry } from 'astro:content';
import { leadingEmojiLength } from '../markdown/emoji.mjs';

/** The blog ported from the old augur.net (docs/reference/ported-content.md). Shared by /blog/,
 * the post pages and /rss.xml so all three agree on order and paths. */
export type Post = CollectionEntry<'blog'>;
export type Topic = Post['data']['topic'];

/** Newest first, as on the old blog index and feed. */
export async function getPosts(): Promise<Post[]> {
  return (await getCollection('blog')).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export const postPath = (post: Post) => `/blog/${post.id}/`;

/** What each `topic` frontmatter value is called. `label` names one post's topic; `heading` names the group. */
export const topics: Record<Topic, { label: string; heading: string }> = {
  'progress-report': { label: 'Progress report', heading: 'Progress reports' },
  'moon-fork': { label: 'The Moon Fork', heading: 'The Moon Fork' },
  research: { label: 'Research & roadmap', heading: 'Research & roadmap' },
};

/** Frontmatter dates are calendar days (UTC midnight); format them in UTC so no time zone shifts the day. */
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const formatPostDate = (date: Date) => dateFormat.format(date);
const shortDateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
/** "1 Oct 2026", for cards. */
export const formatShortDate = (date: Date) => shortDateFormat.format(date);
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** Minutes to read at 230 words a minute, counted from the MDX source without imports, components,
 * link targets or Markdown punctuation. */
export function readingMinutes(post: Post): number {
  const text = (post.body ?? '')
    .replace(/^import .*$/gm, ' ')
    .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/[#>*_`|[\]-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/** Up to `count` posts to read next, each with why it's suggested: the next and the earlier post in the same
 * topic, then the rest of that topic nearest in time, then the newest posts from other topics. */
export function readingQueue(post: Post, posts: Post[], count = 3): { post: Post; label: string }[] {
  const heading = topics[post.data.topic].heading;
  const time = (other: Post) => other.data.publishDate.valueOf();
  const sameTopic = posts.filter(other => other.data.topic === post.data.topic && other.id !== post.id);
  const newer = sameTopic.filter(other => time(other) > time(post)).sort((a, b) => time(a) - time(b))[0];
  const older = sameTopic.filter(other => time(other) < time(post)).sort((a, b) => time(b) - time(a))[0];
  const queue: { post: Post; label: string }[] = [];
  if (newer) queue.push({ post: newer, label: `Next in ${heading}` });
  if (older) queue.push({ post: older, label: `Earlier in ${heading}` });
  const nearest = sameTopic.filter(other => other !== newer && other !== older)
    .sort((a, b) => Math.abs(time(a) - time(post)) - Math.abs(time(b) - time(post)));
  queue.push(...nearest.map(other => ({ post: other, label: `More from ${heading}` })));
  const others = posts.filter(other => other.data.topic !== post.data.topic);
  queue.push(...others.map(other => ({ post: other, label: topics[other.data.topic].label })));
  return queue.slice(0, count);
}

/** The post as Markdown for "Copy for AI": title, description, byline and source link, then the body without
 * MDX imports or components, with heading and callout emoji dropped, site links made absolute and local images
 * reduced to their alt text. */
export function postMarkdown(post: Post, site: URL): string {
  const url = new URL(postPath(post), site).href;
  const { title, description, author, publishDate } = post.data;
  const body = (post.body ?? '')
    .replace(/^import .*$/gm, '')
    .replace(/<\/?[A-Z][^>]*>/g, '')
    .replace(/!\[([^\]]*)\]\(\.\/[^)]*\)/g, (_, alt: string) => alt ? `[Image: ${alt}]` : '')
    .replace(/\]\((\/[^)]*)\)/g, (_, path: string) => `](${new URL(path, site).href})`)
    .split('\n').map(line => {
      const [, marks = '', rest = line] = line.match(/^(#{1,6}\s+)?(.*)$/) ?? [];
      return marks + rest.slice(leadingEmojiLength(rest));
    }).join('\n')
    .replace(/\n{3,}/g, '\n\n').trim();
  return `# ${title}\n\n${description}\n\nBy ${author} · ${formatPostDate(publishDate)} · ${url}\n\n---\n\n${body}\n`;
}
