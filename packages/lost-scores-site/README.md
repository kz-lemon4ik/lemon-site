# Lost Scores Site

Documentation and download portal for the osu! Lost Scores Analyzer desktop application. Provides detailed installation guides with screenshots, comprehensive FAQ sections, troubleshooting resources, and a hall of fame showcasing user discoveries.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Image Handling**: Dynamic galleries with modal support
- **Linting**: ESLint with TypeScript support

## Development

```bash
# Install dependencies (from root)
yarn install

# Start development server
yarn dev:lost

# Build for production
yarn build:lost

# Lint code
yarn lint

# Format code
yarn format
```

## Project Structure

```
lost-scores-site/
├── src/
│   ├── components/         # Reusable components
│   ├── molecules/          # Molecular components
│   ├── organisms/          # Page sections
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/
│   └── images/            # Static assets and screenshots
├── package.json
└── README.md
```

## Content Sections

- **Home**: Introduction to the osu! Lost Scores Analyzer
- **How It Works**: Technical explanation of the analysis process
- **Installation**: Comprehensive setup guides for Windows
- **Downloads**: Version management and download links
- **FAQ**: Categorized frequently asked questions
- **Hall of Fame**: Showcase of top user discoveries
- **Feedback**: Contact information and support resources

## Environment

This project is designed to run in modern browsers with ES2020+ support.

## Dependencies

Shared UI components are imported from the `@lemon-site/shared-ui` package within the monorepo.

## License

MIT License - see the root [LICENSE](../../LICENSE) file for details.
