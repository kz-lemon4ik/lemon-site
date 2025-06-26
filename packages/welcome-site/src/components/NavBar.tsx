import clsx from "clsx";
import { Lightbulb, Moon, Zap, ZapOff } from "lucide-react";
import { useSettings } from "@lemon-site/shared-ui";
import NavItem from "@/molecules/NavItem";

export default function NavBar() {
  const { isMotionDisabled, setIsMotionDisabled, theme, toggleTheme } = useSettings();

  const iconOnlyButtonBaseStyles =
    "p-1.5 transition-all duration-200 ease-in-out focus:outline-none rounded-full focus-visible:ring-0 bg-transparent";
  const sharedButtonDarkThemeStyles = "text-lavender-200 hover:bg-slate-700/40";
  const sharedButtonLightThemeStyles =
    "theme-is-light:text-slate-500 theme-is-light:hover:text-sky-600 theme-is-light:hover:bg-slate-200/70";

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 h-12 backdrop-blur bg-white/5 theme-is-light:bg-themeLight-navBarBackground border-b border-white/10 theme-is-light:border-themeLight-border">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center">
        <div className="flex items-center gap-0.5 sm:gap-1.5 w-20"></div>

        <div className="flex justify-center gap-6 sm:gap-12 flex-1">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/about">About</NavItem>
          <NavItem href="/blog">Blog</NavItem>
        </div>

        <div className="hidden md:flex items-center gap-0.5 sm:gap-1.5 w-20 justify-end">
          <button
            onClick={toggleTheme}
            className={clsx(
              iconOnlyButtonBaseStyles,
              sharedButtonDarkThemeStyles,
              sharedButtonLightThemeStyles
            )}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={18} /> : <Lightbulb size={18} />}
          </button>

          <button
            onClick={() => setIsMotionDisabled((prev) => !prev)}
            className={clsx(
              iconOnlyButtonBaseStyles,
              sharedButtonDarkThemeStyles,
              sharedButtonLightThemeStyles
            )}
            aria-label={isMotionDisabled ? "Enable motion" : "Disable motion"}
            title={isMotionDisabled ? "Enable motion" : "Disable motion"}
          >
            {isMotionDisabled ? <ZapOff size={18} /> : <Zap size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
