import { join } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 1. Путь к файлам самого этого пакета (lost-scores-site)
    join(__dirname, 'index.html'),
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),

    // 2. Явный и надежный путь к файлам пакета shared-ui
    join(__dirname, '../shared-ui/src/**/*.{js,ts,jsx,tsx}'),
  ],
  safelist: [
    'text-xxl-heading',
    'drop-shadow-heading-glow'
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["LemonTitle", "sans-serif"],
        body: ["LemonBody", "sans-serif"],
        nav: ["LemonNav", "sans-serif"],
        lostnav: ["LostNav", "sans-serif"],
        losttitle: ["LostTitle", "sans-serif"],
        lostdescription: ["LostDescription", "sans-serif"],
        lostbody: ["LostBody", "sans-serif"],
        lostheading: ["LostHeading", "sans-serif"],
        sans: ["Manrope", "sans-serif"],
      },
      fontSize: {
        'xxl-heading': '1.8rem',
      },
      height: {
        'nav-underline': '0.16875rem',
      },
      minWidth: {
        'faq-icon': '1.35rem',
        'nav-small': '3.6rem',
        'nav-large': '5.625rem',
        'subcard': '10.125rem',
        'table-player': '7.875rem',
        'table-full': '33.75rem',
      },
      maxWidth: {
        'settings-modal': 'calc(18rem*1.2)',
      },
      colors: {
        slate: colors.slate,
        sky: colors.sky,
        teal: colors.teal,
        purple: colors.purple,
        lavender: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        lemon: {
          300: "#FFF176",
          400: "#F6E05E",
        },
        themeLight: {
          background: colors.slate[50],
          text: colors.slate[700],
          headingText: colors.slate[800],
          subtleText: colors.slate[500],
          mutedText: colors.slate[400],

          card: "#ffffff",
          cardBorder: colors.slate[200],
          cardShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",

          border: colors.slate[300],

          primary: colors.sky[600],
          primaryHover: colors.sky[700],
          primaryText: "#ffffff",
          primaryLightBg: colors.sky[50],

          secondary: colors.teal[500],
          secondaryHover: colors.teal[600],
          secondaryButtonText: "#ffffff",

          navBarBackground: "rgba(241, 245, 249, 0.85)",
          navItemText: colors.slate[600],
          navItemTextHover: colors.sky[600],

          sidebarNavItemIcon: colors.slate[500],
          sidebarNavItemActiveBg: colors.sky[100],
          sidebarNavItemActiveText: colors.sky[700],
          sidebarNavItemActiveIcon: colors.sky[600],

          actionButtonBaseBg: "rgba(255, 255, 255, 0.9)",
          actionButtonHoverBg: "rgba(241, 245, 249, 0.95)",
          actionButtonBorder: colors.slate[300],
          actionButtonText: colors.sky[600],
          actionButtonHoverText: colors.sky[700],

          settingsButtonBaseBg: "rgba(255, 255, 255, 0.9)",
          settingsButtonHoverBg: "rgba(241, 245, 249, 0.95)",
          settingsButtonBorder: colors.slate[300],
          settingsButtonText: colors.sky[600],
          settingsButtonHoverText: colors.sky[700],

          burgerButtonBaseBg: "rgba(255, 255, 255, 0.9)",
          burgerButtonHoverBg: "rgba(241, 245, 249, 0.95)",
          burgerButtonBorder: colors.sky[600],
          burgerButtonText: colors.sky[600],
          burgerButtonHoverText: colors.sky[700],

          buttonDefaultBg: colors.slate[200],
          buttonDefaultText: colors.slate[700],
          buttonDefaultHoverBg: colors.slate[300],

          buttonTransparentNeutralBg: "rgba(248, 250, 252, 0.7)",
          buttonTransparentNeutralHoverBg: "rgba(241, 245, 249, 0.85)",
          buttonTransparentNeutralText: colors.slate[700],
          buttonTransparentNeutralBorder: colors.sky[600],

          cvButtonBorder: colors.sky[600],
          cvButtonText: colors.sky[600],
          cvButtonHoverBg: colors.sky[600],
          cvButtonHoverText: "#ffffff",

          socialIconText: colors.slate[500],
          socialGithubHover: colors.slate[900],
          socialTelegramHover: colors.sky[500],
          socialOsuHover: colors.pink[500],
          socialYoutubeHover: colors.red[500],
          socialTwitchHover: colors.purple[500],
          socialDiscordHover: colors.indigo[500],

          linkText: colors.sky[600],
          linkTextHover: colors.sky[700],

          codeText: colors.sky[700],
          codeBg: colors.sky[50],
          highlightTextColor: colors.sky[600],

          projectTitleText: colors.slate[800],
          projectDescriptionText: colors.slate[700],
          aboutDescriptionText: colors.slate[700],
          headingDropShadow: "transparent",
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("theme-is-light", ".theme-is-light &");
      addVariant("theme-is-dark", "html:not(.theme-is-light) &");
    },
  ],
};