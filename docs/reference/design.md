# Design reference

Read this before changing identity tokens, shared controls or homepage geometry. To upgrade the package or change a shared token, follow [update the design system](../guides/update-design-system.md). Why the site and the design system have separate owners is in [design ownership](../explanation/design-ownership.md). Repository rules are in [AGENTS.md](../../AGENTS.md); build inputs and motion tools are in [homepage reference](homepage.md).

## Design references

- **Homepage (Figma).** Canonical frame `28:7`: https://www.figma.com/design/3RgHvLRqEZDsAmcBQ7tvVa/Augur.net?node-id=28-7
- **Homepage components (Figma).** Components at `214:1205`: https://www.figma.com/design/3RgHvLRqEZDsAmcBQ7tvVa/Augur.net?node-id=214-1205
- **Brand foundation (PDF).** [resources/brand/augur-brand-foundation.pdf](https://github.com/AugurProject/augur-design-system/blob/f3c089a7785270ecef97e9316194272262d49c73/resources/brand/augur-brand-foundation.pdf) in the design-system repository at commit `f3c089a`. Version 1.0, revised 31 August 2026, SHA-256 `65acce8b247ddda10834d0c068e84bc315f7afc118f5570d1d90386de8ed9c0c`.
- **Design-system package.** `@augurproject/design-system` `0.3.0` ([jubalm/augur-design-system](https://github.com/AugurProject/augur-design-system)), installed from the tarball attached to the design system's `v0.3.0` GitHub Release (see [package.json](../../package.json)). [global.css](../../src/styles/global.css) imports its `theme.css` and `tokens.tailwind.css` after Tailwind, and loads fonts itself rather than through the package's `fonts.css`. All design-system rules sit in `@layer augur`, which follows Tailwind's layers, so the site's unlayered rules override them.

The live Figma file has not been inspected for these docs. The website may have diverged from it, so treat these frames as intent, not as the current implementation.

## Adaptations

Each adaptation is a source-level fact, not a claim of rendered conformity. "Approval not found" means no owner decision was located; it does not mean the choice was never made. An inherited difference without a recorded approval is not, by itself, a defect. The owner decided on 29 October 2026 that adaptations marked "Approval not found" need no approval record ([decisions](../records/decisions.md#29-october-2026)).

- **Colour roles.** The card role is Dark 2 (`#1d1d30`) and the dark border is Mist (`#71728a`). Adopted upstream in `0.2.0` (jubalm/augur-design-system#9), so the site no longer declares them.
- **Hover edge on clickable outline controls.** Owner decision, 19 October 2026: "a subtle green border when the user hovers … where it makes sense." Green at 50% opacity, now the design system's `--brand-hover-edge` (adopted in `0.2.0`). Controls upstream keep the neutral `--input-hover`.
- **Filled-button hover and pressed states.** Green hover `#27d19b`, pressed `#24bc8d`: the design system's dark `--primary-hover` and `--primary-active` since `0.2.0`.
- **Control sizing and type.** Controls are at least 48px tall with 16/24 labels; fields are at least 48px, filled, with a bottom border. Upstream `0.2.0` adds a matching `xl` size; the site's own `.button` and `.field` styles do not use the package's component CSS.
- **Error state.** Invalid fields use `border-bottom: 2px solid #cf294e` through `[aria-invalid=true]` (`global.css`). Error text is Paper (`.field-error`), so the text carries the message and the colour only marks it. Approval not found.
- **Focus.** The design system paints a 2px `--ring` (Green in the dark scheme) for `:focus-visible`, with a 6px offset on links and 2px elsewhere, unless a scoped component rule overrides it. Owner decision, confirmed 24 October 2026: links keep the 6px offset; adopted upstream in `0.2.0` (jubalm/augur-design-system#8).
- **Type and composition.** Display text scales to 72px with a 78px line height (`.display`). Sora 400/600 and Schibsted Grotesk 400 (upright and italic, so `<em>` is a real italic) load through Fontsource. `font-sans` (Schibsted Grotesk) and `font-heading` (Sora) come from the package's Tailwind bridge. Content width, gutters, section grids and artwork are owned by shared CSS and the [home components](../../src/designs/current/sections/). Approval not found.
- **Integration.** The site uses native Astro controls and local CSS, not a React runtime. [AGENTS.md](../../AGENTS.md) requires a scoped request before adding one.

## Design-system alignment

The site declares a design-system role only where its value differs from the package's. With `0.3.0` none differ: the site no longer redeclares `--card`, `--border`, `--font-sans`, `--font-heading`, the link focus rule, or its own hover-edge and filled-button colours. Site-only roles (`--web-*`, `--mark-*`) stay in [global.css](../../src/styles/global.css).

- **`--color-muted`.** The site's `@theme` keeps its own `--color-muted`, because the package's mapping differs. The package's bridge maps `--color-muted` to `var(--muted)`, the quiet surface role (`--augur-color-surface-dark-1`, `#161629`, in dark). The site uses `text-muted` for placeholder and disabled-button text and needs the text colour (`--augur-color-secondary-dark`, `#a1a1b8`), which the package exposes as `--muted-foreground`. Without the override, the placeholder and disabled-button text compute to `#161629`, the same colour as their `bg-quiet` background, so they become invisible. Why the names collide is in [design ownership](../explanation/design-ownership.md#why-the-muted-colour-is-overridden).
- **Icons.** Six glyphs come from the design system's square-cut set (`@augurproject/design-system/icons/<name>.svg`, added in `0.3.0`): `arrow-right`, `arrow-up-right`, `check`, `chevron-down`, `plus` and `x`. They are 1.75 strokes in `currentColor` on a 20×20 grid, where the other 22 icons are Phosphor Bold fills. The answer chips in [Applications.astro](../../src/designs/current/sections/Applications.astro) and the gate in [CaseGraphic.astro](../../src/designs/current/art/CaseGraphic.astro) draw the same `check` path as a polyline so it can draw in. Owner-approved, 27 October 2026 (#28 comment 1): "the two animated checks in Applications and CaseGraphic use the square-cut DS check shape."
- **Reduced motion.** The package's reduced-motion rule wins over the site's: transitions and animations collapse to 0.01ms rather than the site's 0.001ms.

Open design questions are in [open decisions](../records/open-decisions.md#design), closed ones in [decisions](../records/decisions.md), and the 24 October alignment check in [verification](../records/verification.md).
