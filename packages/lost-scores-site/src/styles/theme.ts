export const buttonStyles = {
  base: "transition-all duration-200 ease-in-out focus:outline-none",
  iconOnly: "p-1.5 rounded-full focus-visible:ring-0",
  iconOnlyMobile: "p-2 rounded-md",

  colors: {
    primary:
      "text-lavender-200 hover:text-lemon-400 theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600",
    background: "hover:bg-slate-700/40 theme-is-light:hover:bg-slate-200/70",
    backgroundMobile: "hover:bg-slate-700/30 theme-is-light:hover:bg-slate-100/50",
  },
} as const;

export const textStyles = {
  base: "font-lostnav leading-relaxed text-lavender-200 theme-is-light:text-themeLight-text",
  sizes: {
    sm: "text-sm",
    base: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  },

  heading: "font-losttitle text-white theme-is-light:text-themeLight-headingText",
  link: "font-semibold transition-colors duration-200 text-lemon-400 hover:text-lavender-300 theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover",
  linkWithUnderline:
    "font-semibold transition-colors duration-200 underline hover:no-underline text-lemon-400 hover:text-lavender-300 theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover",
} as const;

export const navStyles = {
  link: {
    base: "py-2 px-2.5 rounded-md font-medium transition-all duration-150 font-lostnav relative",
    inactive:
      "text-lavender-200 hover:text-lemon-400 theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600",
    active: "text-white theme-is-light:text-slate-800",
  },

  underline: "absolute bottom-0 left-0 w-full h-[3px] bg-lemon-400 theme-is-light:bg-sky-600",
} as const;

export const headerStyles = {
  base: "fixed top-0 left-0 right-0 w-full z-30 transition-all duration-300",
  desktop: "hidden lg:block lg:h-16 lg:shadow-none",
  mobile: "lg:hidden h-16",

  background: {
    scrolled: "bg-slate-800/70 theme-is-light:bg-white/65 backdrop-blur-md",
    scrolledMobile: "bg-slate-800/90 theme-is-light:bg-white/90 backdrop-blur-md shadow-lg",
    transparent: "bg-transparent",
  },

  border: {
    scrolled: "border-b border-slate-700/30 theme-is-light:border-slate-300/50",
    transparent: "border-b border-transparent",
  },
} as const;

export const cardStyles = {
  base: "rounded-lg border",
  background: "bg-slate-800/40 theme-is-light:bg-white/60",
  border: "border-slate-700 theme-is-light:border-themeLight-cardBorder",
  imageWrapper:
    "my-6 p-4 rounded-lg bg-slate-800/40 border border-slate-700 theme-is-light:bg-white/60 theme-is-light:backdrop-blur-md theme-is-light:border theme-is-light:border-themeLight-cardBorder",
} as const;

export const installationStyles = {
  title:
    "text-3xl font-semibold font-losttitle mb-4 text-white theme-is-light:text-themeLight-headingText",
  subtitle:
    "text-2xl font-semibold font-losttitle mt-0 mb-3 text-white theme-is-light:text-themeLight-headingText",
  cardTitle:
    "text-xl font-semibold mb-4 font-lostheading flex items-center text-white theme-is-light:text-themeLight-headingText",
} as const;
