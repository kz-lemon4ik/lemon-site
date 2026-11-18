# Translating the site

Every text of the site lives in this folder, one file per language. English (`en.json`) is the reference: any text missing from another language falls back to English, so a translation can be finished bit by bit.

## Adding a language

1. Copy `en.json` to a file named after the language code, for example `de.json` for German or `pl.json` for Polish.
2. Translate the values. Keep the keys (the words before the colons) as they are.
3. Add a line to `languages.json`:
   ```json
   { "id": "de", "name": "Deutsch", "flag": "de", "locale": "de-DE" }
   ```
   `name` is how the language calls itself, `locale` sets the number and date format, `flag` is the name of a flag picture in `public/flags/` (add `de.svg` there if it is missing).

That is all: the language appears in the language menu.

## Rules inside the texts

- `{{name}}` is filled in by the site, for example `"Welcome, {{name}}!"`. Keep it, but move it wherever your language needs it.
- `<link>text</link>` turns `text` into a link or styled text; `<mail/>` is replaced by the contact address. Translate the text between the tags, keep the tags.
- Plurals use suffixes after the key, as in i18next: `_one`, `_few`, `_many`, `_other` (`_zero` and `_two` also exist). Use the forms your language has, following the Unicode CLDR plural rules. English needs `_one` and `_other`; Russian needs `_one`, `_few`, `_many` and `_other`.
- `format.months` holds the 12 short month names used in dates, `format.mb` the unit for megabytes.
- Names stay in English: osu!, Lost Scores, Hall of Copium, pp, Share, Potential Top labels of the program.

## Checking

Run `yarn dev:lost` in `lemon-site` and pick the language in the menu (the flag in the header). A key shown instead of a text means the key is misspelled or missing in `en.json`.
