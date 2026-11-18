# osu! Lost Scores site

The site of [osu! Lost Scores](https://github.com/kz-lemon4ik/osu-lost-scores) at [lost.lemon4ik.kz](https://lost.lemon4ik.kz): what the program does, downloads, the Hall of Copium and player profiles.

## Pages

| Address | Page |
|---|---|
| `/` | Home: what it is, download for your system, how it works |
| `/download` | Files for Windows, macOS and Linux from the latest GitHub release, first launch, checking a download |
| `/rankings` | Hall of Copium: the latest published scan of each player |
| `/u/:id` | A player's profile by osu! id or name; after logging in, the owner also sees their private scans |
| `/faq`, `/privacy` | Short answers; what is kept and who sees it |
| `/oauth/success` | Where logging in with osu! ends, on the site or from the program |

Old addresses (`/hall-of-fame`, `/downloads`, `/installation`, `/about-program`, `/how-it-works`, `/feedback`, `/profile/:name`) redirect to these. Any other address shows the 404 page.

## Development

```bash
# from the monorepo root
yarn dev:lost      # http://localhost:5174
yarn build:lost    # production build in packages/lost-scores-site/dist
```

The site calls the API on its own origin (`/api/...`), as in production. The dev server forwards `/api` to `http://127.0.0.1:8000`, where `wrangler dev` runs the backend; set `LOST_SCORES_API` to forward it elsewhere.

The site is read-only: publishing, unpublishing and deleting scans happen in the program.

## Look and assets

- Colours come from the program's theme (`crates/lost-scores-gui/ui/theme.slint`), the font is Fredoka, the brand is the Twemoji lemon.
- `public/art/` holds the background art already blurred and darkened, so the page does not blur it while scrolling.
- `public/_headers` sets the security headers and long caching for Cloudflare Pages.

## Credits

Lemon emoji by Twemoji (CC BY 4.0). Fredoka (SIL OFL 1.1, `public/fonts/OFL.txt`). Grade badges from osu-web (AGPL-3.0).
