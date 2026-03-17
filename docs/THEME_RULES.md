# Theme Rules

## Goal
Use one shared design language across web and mobile, based on the Design 9 direction:
- bright light theme
- high outdoor contrast
- clear hierarchy
- clean, friendly surfaces

## Token Source
- Canonical tokens live in `@acme/design-tokens`.
- Web CSS variables are mapped in `tooling/tailwind/theme.css`.
- Programmatic React Native styles must import from `@acme/design-tokens`.

## Color Rules
- Use semantic tokens, not hardcoded colors.
- Primary action and active states: `primary`.
- Attention and highlight states: `accent`.
- Destructive actions only: `destructive`.
- Content layers:
  - page background: `background`
  - card/surface: `card`
  - separators/inputs: `border`, `input`
- Text contrast:
  - main copy: `foreground`
  - secondary copy: `muted-foreground`

## Spacing Rules
- Use spacing scale from `spacingTokens`.
- Screen padding: `4` to `6`.
- Section spacing: `6` to `10`.
- Card internal spacing: `3` to `4`.
- Dense metrics rows: `2` to `3`.

## Radius + Shadow Rules
- Base rounded corners: `radiusTokens.lg`.
- Large cards and map blocks: `radiusTokens.xl`.
- Pills/chips/avatars: `radiusTokens.full`.
- Shadow usage:
  - default cards: `shadowTokens.sm`
  - emphasized cards and sticky nav: `shadowTokens.md`
- Avoid heavy shadows in dense data screens.

## Typography Rules
- Use `typographyTokens.fontFamily.sans` for UI text.
- Use `typographyTokens.fontFamily.mono` for metrics and labels.
- Hierarchy:
  - screen title: `2xl` or `3xl`, semibold
  - section heading: `lg` or `xl`, semibold
  - body: `base`, regular/medium
  - helper/meta: `xs` or `sm`, regular

## Platform Usage Rules
- Web:
  - Prefer Tailwind semantic utilities (`bg-background`, `text-foreground`, `border-border`, `bg-primary`).
  - Avoid inline color literals in new screens.
- Expo/Native:
  - For NativeWind class usage, rely on semantic theme classes.
  - For JS style objects (navigation headers, overlays), import from `@acme/design-tokens`.

## Accessibility + Outdoor Readability
- Default to light theme for product screens unless feature-specific exceptions are approved.
- Keep text/background contrast high.
- Avoid low-opacity text for critical data.
- Minimum tap target should stay large enough for mobile interaction.

## Do / Don't
- Do: add or adjust token values in `@acme/design-tokens` first.
- Do: keep naming semantic and reusable.
- Don't: introduce one-off hardcoded colors for individual screens.
- Don't: duplicate token values in app-local files.
