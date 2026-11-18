import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const TOKENS = [
  "bg",
  "field",
  "card",
  "row",
  "row-hi",
  "row-lost",
  "divider",
  "btn",
  "btn-hover",
  "lbl",
  "ink",
  "muted",
  "meta",
  "faint",
  "link",
  "acc",
  "acc2",
  "osu",
  "up",
  "down",
  "lost",
  "gold",
  "dark",
  "header",
  "hero",
  "hero-dim",
  "shade",
  "thumb",
  "by",
  "bid",
  "score",
  "hit100",
  "hit50",
  "hitmiss",
  "ppbox",
  "tog-on",
];

/** @type {import('tailwindcss').Config} */
export default {
  content: [join(__dirname, "index.html"), join(__dirname, "src/**/*.{ts,tsx}")],
  theme: {
    extend: {
      colors: Object.fromEntries(TOKENS.map((token) => [token, `rgb(var(--c-${token}) / <alpha-value>)`])),
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "75rem",
      },
    },
  },
  plugins: [],
};
