# Welcome Site

Personal portfolio and blog for [lemon4ik.kz](https://lemon4ik.kz). Built with React 19, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Development

```bash
# from the monorepo root
yarn install
yarn dev:welcome     # development server
yarn build:welcome   # production build
```

## Sections

- Hero and introduction with links to social profiles
- Projects showcase with cards pulled from a JSON source
- Blog section (Markdown + dynamic imports)
- Theme and motion preferences (dark/light, reduced motion)

## Structure

```
src/
  pages/         # layout and routing
  sections/      # large blocks (Hero, Projects, Blog)
  components/    # local widgets
  content/       # project data and blog posts
```

Shared components such as buttons, cards, and settings modal come from `@lemon-site/shared-ui`. Update that package first if you want to change design tokens or common behaviours.
