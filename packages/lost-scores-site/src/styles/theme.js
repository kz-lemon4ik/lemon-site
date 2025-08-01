export const buttonStyles = {
    base: "transition-all duration-200 ease-in-out focus:outline-none",
    iconOnly: "p-1.5 rounded-full focus-visible:ring-0",
    iconOnlyMobile: "p-2 rounded-md",
    colors: {
        primary: "text-lavender-200 hover:text-lemon-400 theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600",
        background: "hover:bg-slate-700/40 theme-is-light:hover:bg-slate-200/70",
        backgroundMobile: "hover:bg-slate-700/30 theme-is-light:hover:bg-slate-100/50",
    },
};
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
    linkWithUnderline: "font-semibold transition-colors duration-200 underline hover:no-underline text-lemon-400 hover:text-lavender-300 theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover",
};
export const cardStyles = {
    base: "rounded-lg border",
    background: "bg-slate-800/40 theme-is-light:bg-white/60",
    border: "border-slate-700 theme-is-light:border-themeLight-cardBorder",
    imageWrapper: "my-6 p-4 rounded-lg bg-slate-800/40 border border-slate-700 theme-is-light:bg-white/60 theme-is-light:backdrop-blur-md theme-is-light:border theme-is-light:border-themeLight-cardBorder",
};
export const installationStyles = {
    title: "text-3xl font-semibold font-losttitle mb-4 text-white theme-is-light:text-themeLight-headingText",
    subtitle: "text-2xl font-semibold font-losttitle mt-0 mb-3 text-white theme-is-light:text-themeLight-headingText",
    cardTitle: "text-xl font-semibold mb-4 font-lostheading flex items-center text-white theme-is-light:text-themeLight-headingText",
};
