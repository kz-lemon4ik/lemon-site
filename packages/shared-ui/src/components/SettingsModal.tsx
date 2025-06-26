import clsx from "clsx";
import { Moon, Sun, X, Zap, ZapOff } from "lucide-react";
import { Heading } from "../atoms";
import { useSettings } from "../contexts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsModal({ isOpen, onClose }: Props) {
  const { isMotionDisabled, setIsMotionDisabled, theme, toggleTheme } = useSettings();

  if (!isOpen) {
    return null;
  }

  const handleToggleMotion = () => {
    setIsMotionDisabled((prev) => !prev);
  };

  const toggleButtonBaseStyle =
    "p-2 rounded-lg transition-all duration-200 transform active:scale-95 shadow-sm w-12 h-12 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75";

  const darkThemeInactiveToggleStyle =
    "bg-lavender-200 text-slate-700 hover:bg-lavender-300 focus-visible:ring-lavender-400";
  const darkThemeActiveToggleStyle =
    "bg-lemon-400 text-slate-800 hover:bg-lemon-300 focus-visible:ring-lemon-500";

  const lightThemeMotionActiveToggleStyle =
    "bg-slate-200 text-slate-700 hover:bg-slate-300 focus-visible:ring-slate-400";
  const lightThemeMotionInactiveToggleStyle =
    "bg-themeLight-primary text-themeLight-primaryText hover:bg-themeLight-primaryHover focus-visible:ring-themeLight-primary";

  const lightThemeActiveToggleStyle =
    "bg-themeLight-primary text-themeLight-primaryText hover:bg-themeLight-primaryHover focus-visible:ring-themeLight-primary";

  return (
    <div
      className={clsx(
        "fixed inset-0 z-40 flex items-center justify-center p-4 transition-opacity duration-300 ease-out",
        "bg-slate-900/70 backdrop-blur-md",
        "theme-is-light:bg-slate-900/20 theme-is-light:backdrop-blur-sm"
      )}
      style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-[calc(320px*1.2)] sm:max-w-xs sm:w-full relative transform transition-all duration-300 ease-out flex flex-col gap-6",
          "bg-slate-800/85 backdrop-blur-md border border-slate-700",
          "theme-is-light:bg-white/85 theme-is-light:backdrop-blur-md theme-is-light:border theme-is-light:border-themeLight-cardBorder theme-is-light:shadow-lg"
        )}
        style={{ transform: isOpen ? "scale(1)" : "scale(0.95)", opacity: isOpen ? 1 : 0 }}
      >
        <button
          onClick={onClose}
          className={clsx(
            "absolute top-4 right-4 p-1.5 rounded-lg transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75",
            "bg-slate-700 text-lavender-300 hover:bg-slate-600 hover:text-lemon-400 focus-visible:ring-lemon-500",
            "theme-is-light:bg-slate-200 theme-is-light:text-themeLight-primary theme-is-light:hover:bg-slate-300 theme-is-light:hover:text-themeLight-primaryHover theme-is-light:focus-visible:ring-themeLight-primaryHover"
          )}
          aria-label="Close settings"
        >
          <X size={20} strokeWidth={3} />
        </button>

        <Heading
          size="sm"
          className={clsx(
            "!text-3xl sm:!text-4xl text-center tracking-normal font-lostheading",
            "text-slate-100",
            "theme-is-light:text-themeLight-headingText"
          )}
        >
          Settings
        </Heading>

        <div
          className={clsx(
            "space-y-5 p-4 rounded-2xl",
            "theme-is-light:bg-slate-50 theme-is-light:border theme-is-light:border-slate-200"
          )}
        >
          <div className="flex items-center justify-between">
            <label
              htmlFor="motionToggle"
              className={clsx(
                "text-base sm:text-lg font-medium select-none font-lostnav",
                "text-slate-300",
                "theme-is-light:text-themeLight-subtleText"
              )}
            >
              Disable Motion
            </label>
            <button
              id="motionToggle"
              onClick={handleToggleMotion}
              className={clsx(
                toggleButtonBaseStyle,
                theme === "light"
                  ? isMotionDisabled
                    ? lightThemeMotionActiveToggleStyle
                    : lightThemeMotionInactiveToggleStyle
                  : isMotionDisabled
                    ? darkThemeActiveToggleStyle
                    : darkThemeInactiveToggleStyle
              )}
              aria-label={isMotionDisabled ? "Enable motion" : "Disable motion"}
            >
              {isMotionDisabled ? <ZapOff size={20} /> : <Zap size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="themeToggle"
              className={clsx(
                "text-base sm:text-lg font-medium select-none font-lostnav",
                "text-slate-300",
                "theme-is-light:text-themeLight-subtleText"
              )}
            >
              Theme
            </label>
            <button
              id="themeToggle"
              onClick={toggleTheme}
              className={clsx(
                toggleButtonBaseStyle,
                theme === "light" ? lightThemeActiveToggleStyle : darkThemeInactiveToggleStyle
              )}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
