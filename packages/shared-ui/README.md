# Shared UI

Reusable component library for the Lemon Site monorepo. Exports atoms, molecules, organisms, contexts, and hooks shared between the portfolio and the Lost Scores documentation site.

## What it provides

- Buttons, headings, cards, section wrappers
- Settings context with theme, motion, and contrast toggles
- Utility hooks (`useLocalStorage`, `usePrefersReducedMotion`, `useSettings`)
- Shared styles and fonts distributed via PostCSS

## Using the package

```tsx
import { SharedCard, Heading, Button, useSettings } from '@lemon-site/shared-ui';

export function Example() {
  const { theme, toggleTheme } = useSettings();

  return (
    <SharedCard>
      <Heading size="lg">Demo</Heading>
      <Button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </Button>
    </SharedCard>
  );
}
```

## Development

This package is built together with the monorepo. Run scripts from the root:

```bash
yarn build
yarn lint
yarn typecheck
```

## Layout

```
src/
  atoms/        # basic components
  molecules/    # small compositions
  organisms/    # larger building blocks
  components/   # utility pieces (Section, ParallaxBackground, etc.)
  contexts/     # React contexts
  hooks/        # custom hooks
  styles/       # fonts and global styles
  index.ts      # exports
```

When adding new components keep the atomic structure and export them through `index.ts`. If multiple packages need the logic, this is the place to put it.
