# Lemon Site

This is a monorepo containing portfolio websites built with React 19, TypeScript, Vite, Tailwind CSS, and Framer Motion. Both sites feature theme switching, accessibility controls, and optimized performance.

## Projects

This repository contains three packages:

- **[welcome-site](./packages/welcome-site)** - Personal portfolio website ([lemon4ik.kz](https://lemon4ik.kz))
- **[lost-scores-site](./packages/lost-scores-site)** - osu! Lost Scores analyzer website ([lost.lemon4ik.kz](https://lost.lemon4ik.kz))
- **[shared-ui](./packages/shared-ui)** - Shared UI components library

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Package Manager**: Yarn Workspaces
- **Linting**: ESLint, Prettier

## Installation

```bash
# Clone the repository
git clone https://github.com/kz-lemon4ik/lemon-site.git
cd lemon-site

# Install dependencies
yarn install
```

## Development

```bash
# Start welcome site development server
yarn dev:welcome

# Start lost scores site development server
yarn dev:lost

# Start both sites simultaneously
yarn dev:welcome & yarn dev:lost
```

## Building

```bash
# Build welcome site
yarn build:welcome

# Build lost scores site
yarn build:lost

# Build both sites
yarn build:welcome && yarn build:lost
```

## Code Quality

```bash
# Lint all packages
yarn lint

# Lint with auto-fix
yarn lint:fix

# Format code with Prettier
yarn format

# Run all quality checks
yarn polish
```

## Project Structure

```
lemon-site/
├── packages/
│   ├── welcome-site/          # Personal portfolio
│   ├── lost-scores-site/      # osu! analyzer website
│   └── shared-ui/             # Shared components
├── package.json               # Root package.json
└── yarn.lock                  # Lockfile
```

## Features

### Welcome Site

- Responsive design with dark/light theme
- Portfolio showcase
- Social media integration
- About section and blog

### Lost Scores Site

- osu! integration and analysis
- Installation guides
- Hall of fame
- Download management
- FAQ section

### Shared UI

- Atomic design components
- Theme management
- Motion controls

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**KZ_Lemon4ik**

- Website: [lemon4ik.kz](https://lemon4ik.kz)
- GitHub: [@kz-lemon4ik](https://github.com/kz-lemon4ik)
- osu!: [KZ_Lemon4ik](https://osu.ppy.sh/users/8674298)

## Acknowledgments

- React and the amazing React ecosystem
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- The open-source community
