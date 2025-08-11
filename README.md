# Lemon Site monorepo

This repository hosts the public-facing websites and shared component library for the Lost Scores project. Everything runs on React 19, TypeScript, Vite and Tailwind CSS inside a Yarn workspaces setup.

Packages:

- [`welcome-site`](./packages/welcome-site) - personal portfolio published at [lemon4ik.kz](https://lemon4ik.kz)
- [`lost-scores-site`](./packages/lost-scores-site) - Lost Scores documentation portal at [lost.lemon4ik.kz](https://lost.lemon4ik.kz)
- [`shared-ui`](./packages/shared-ui) - shared React components, contexts and hooks used by both sites

## Quick start

```bash
git clone https://github.com/kz-lemon4ik/lemon-site.git
cd lemon-site
yarn install
```

Development servers:

```bash
yarn dev:welcome   # lemon4ik.kz development
yarn dev:lost      # lost.lemon4ik.kz development
```

Build commands:

```bash
yarn build:welcome
yarn build:lost
```

Code quality:

```bash
yarn lint
yarn lint:fix
yarn format
```

## Structure

```
packages/
  welcome-site/      # portfolio pages and blog
  lost-scores-site/  # Lost Scores docs, FAQ, downloads
  shared-ui/         # shared components, contexts, hooks
```

All packages use Tailwind CSS, Framer Motion and React Router. Shared UI exports atomic components that are reused across both sites.

## Notes

- Welcome site (lemon4ik.kz) is deployed and updated whenever new projects or blog posts are published.
- Lost Scores site (lost.lemon4ik.kz) stays aligned with the live backend and desktop release notes.
- Shared UI is the source of truth for reusable components; update it first before tweaking the sites.

If you want to contribute, check the root `package.json` for available scripts and open an issue before starting work. Pull requests are welcome as long as they keep the shared API consistent.
