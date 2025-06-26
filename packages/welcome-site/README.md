# Welcome Site

Portfolio website showcasing development projects and technical articles.

## Features

- Responsive design optimized for all devices
- Dark and light theme switching
- Motion animations with accessibility controls
- Portfolio project showcase
- About section with personal information
- Blog section for articles and updates
- Social media integration
- SEO optimized

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Routing**: React Router DOM
- **Linting**: ESLint with TypeScript support

## Development

```bash
# Install dependencies (from root)
yarn install

# Start development server
yarn dev:welcome

# Build for production
yarn build:welcome

# Lint code
yarn lint

# Format code
yarn format
```

## Project Structure

```
welcome-site/
├── src/
│   ├── components/         # Reusable components
│   ├── molecules/          # Molecular components
│   ├── organisms/          # Page sections
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── package.json
└── README.md
```

## Environment

This project is designed to run in modern browsers with ES2020+ support.

## Dependencies

Shared UI components are imported from the `@lemon-site/shared-ui` package within the monorepo.

## License

MIT License - see the root [LICENSE](../../LICENSE) file for details.
