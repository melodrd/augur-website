/** Interest capture behind the footer form. Nothing is mailed: the augur-forms Worker stores the
 * address in D1 for a later import into a newsletter service. The Worker imports this file, so the
 * page and the server share one set of messages and one address check.
 */
export const newsletter = {
  path: '/subscribe',
  /** Stored with each address as `consent_version`. The field shows no consent wording; sign-ups rely on the
   * privacy policy and terms (melo, 18 November 2026). Set this to the privacy policy's revision when its
   * rewrite lands, so each row names the policy it was collected under. */
  consentVersion: '2026-10-31',
  messages: {
    subscribed: 'Thanks, we’ve noted your interest. We haven’t sent anything; before any newsletter starts we’ll ask you to confirm.',
    invalid: 'Enter a valid email address, like you@example.com.',
    error: 'We couldn’t save your address. Please try again later.',
  },
} as const;
/** Result pages under /newsletter/; the Worker redirects to one of these without JavaScript. */
export type NewsletterResult = keyof typeof newsletter.messages;
/** Shared by the browser check and the Worker, so both accept the same addresses. */
export const isEmail = (value: string) => value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
