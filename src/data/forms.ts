/** Forms post to the separate `augur-forms` Worker (workers/forms/), so the site stays static.
 * Its address is build configuration: set PUBLIC_FORMS_URL to the deployed Worker's origin.
 * Without it a production build keeps the forms offline: they send nothing and say so.
 * The Worker imports this file too, so both sides agree on the honeypot field.
 *
 * `enabled` switched both forms off for the DevCon launch (jubalm, 2 November 2026). It now governs the contact
 * form alone: while it is false, /contact/ offers a mailto link instead of the message form and the /contact/
 * result pages are not built. Set it back to true to restore that form.
 */
const enabled = false;
/** The footer's newsletter field has its own switch (melo, 15 November 2026: the field is back in the footer,
 * with the sending side to be settled later). It shows the field while `enabled` keeps the contact form off, and
 * builds the /newsletter/ result pages. Without PUBLIC_FORMS_URL a production build keeps the field offline, as above.
 * Set it to false to drop the field: the footer then shows the logo alone in that column. */
const newsletter = true;
// `?.` because the Worker bundles this file without Vite's import.meta.env.
const configured = String(import.meta.env?.PUBLIC_FORMS_URL ?? '').replace(/\/+$/, '');
const address = configured || (import.meta.env?.DEV ? 'http://localhost:8788' : null);
export const forms = {
  enabled,
  newsletter,
  /** The Worker's address for the contact form; null while that form is off or the address is not set. */
  url: enabled ? address : null,
  /** The same, for the footer's newsletter field. */
  newsletterUrl: newsletter ? address : null,
  /** Visually hidden trap field; people leave it empty, form-filling bots don't. */
  honeypot: 'nickname',
} as const;
