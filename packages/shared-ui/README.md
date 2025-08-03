# Shared UI

Reusable UI components library for the Lemon Site monorepo, following atomic design principles.

## Overview

This package contains shared React components, hooks, contexts, and utilities used across the welcome-site and lost-scores-site applications. It implements atomic design methodology with atoms, molecules, and organisms.

## Architecture

The library follows atomic design principles:

- **Atoms**: Basic building blocks (Button, Heading, Icon)
- **Molecules**: Simple combinations of atoms (IconLink, SharedImageDisplay)
- **Organisms**: Complex components (SharedCard)
- **Contexts**: Application state management (SettingsContext)
- **Hooks**: Reusable logic (useLocalStorage, usePrefersReducedMotion)

## Features

- Theme management (dark/light mode)
- Motion control with accessibility support
- Responsive design components
- Framer Motion integration
- TypeScript support with strict typing
- Atomic design component structure
- Accessibility features built-in

## Components

### Atoms

- `Button` - Versatile button component with multiple variants
- `Heading` - Typography component with size variants
- `HighlightText` - Text highlighting utility
- `AnchorLink` - Accessible link component
- `Icon` - Icon wrapper component

### Molecules

- `IconLink` - Icon with link functionality
- `SharedImageDisplay` - Image component with modal support

### Organisms

- `SharedCard` - Main card layout component with motion support

### Components

- `Section` - Page section wrapper
- `ParallaxBackground` - Background with parallax effects
- `SettingsButton` - Settings toggle button
- `SettingsModal` - Settings configuration modal

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **State Management**: React Context API
- **Build**: TypeScript compiler

## Usage

```typescript
import {
  Button,
  Heading,
  SharedCard,
  useSettings
} from '@lemon-site/shared-ui';

function MyComponent() {
  const { theme, toggleTheme } = useSettings();

  return (
    <SharedCard>
      <Heading size="lg">Hello World</Heading>
      <Button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </Button>
    </SharedCard>
  );
}
```

## Development

This package is built as part of the monorepo and does not have standalone development scripts.

```bash
# Build from root
yarn build

# Lint from root
yarn lint

# Type check
yarn typecheck
```

## Project Structure

```
shared-ui/
├── src/
│   ├── atoms/             # Basic components
│   ├── molecules/         # Simple combinations
│   ├── organisms/         # Complex components
│   ├── components/        # Utility components
│   ├── contexts/          # React contexts
│   ├── hooks/            # Custom hooks
│   ├── styles/           # Global styles and fonts
│   └── index.ts          # Main exports
├── public/
│   ├── assets/           # Shared assets
│   └── flags/            # Country flag icons
├── package.json
└── README.md
```

## Theming

The package includes comprehensive theming support:

- Dark and light theme variants
- CSS custom properties for easy customization
- Tailwind CSS integration
- Responsive design utilities
- Motion preference respect

## Accessibility

All components are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Motion preference detection
- Focus management

## License

MIT License - see the root [LICENSE](../../LICENSE) file for details.
