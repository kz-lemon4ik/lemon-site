# Lost Scores Site

Frontend for the Lost Scores project. This site hosts download links, installation guides, FAQ, troubleshooting steps, and the Hall of Fame. Production deployment lives at [lost.lemon4ik.kz](https://lost.lemon4ik.kz).

## Development

```bash
# from monorepo root
yarn install
yarn dev:lost      # development server
yarn build:lost    # production build
```

## Structure

```
src/
  routes/         # page-level routes
  sections/       # large content blocks (FAQ, HowItWorks, HallOfFame)
  components/     # reusable widgets
  content/        # markdown entries, copy, screenshots
```

Shared components are imported from `@lemon-site/shared-ui`. When updating layout or styles, start with that package to keep both sites in sync.

## Content maintenance

- Installation steps and FAQ are kept in sync with the current desktop build and backend API.
- Hall of Fame entries are curated manually; open an issue if you want to highlight a new find.
- Static assets (screenshots, diagrams) live under `public/images`.

If you spot outdated instructions or missing sections, please open an issue so I can refresh the content before the next release.
