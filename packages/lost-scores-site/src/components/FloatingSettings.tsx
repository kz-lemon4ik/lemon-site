import clsx from "clsx";
import { Lightbulb, Moon, Settings, Zap, ZapOff } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@lemon-site/shared-ui";

export default function FloatingSettings() {
  const { isMotionDisabled, setIsMotionDisabled, theme, toggleTheme } = useSettings();
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonBaseStyles = clsx(
    "w-12 h-12 rounded-full backdrop-blur-md shadow-lg border transition-all duration-200 flex items-center justify-center",
    "bg-white/10 border-white/20 text-white hover:bg-white/20",
    "theme-is-light:bg-white/80 theme-is-light:border-slate-200 theme-is-light:text-slate-700 theme-is-light:hover:bg-white"
  );

  const expandedButtonStyles = clsx(
    "w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center",
    "bg-white/10 border border-white/20 text-white hover:bg-white/20",
    "theme-is-light:bg-white/60 theme-is-light:border-slate-200 theme-is-light:text-slate-700 theme-is-light:hover:bg-white"
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      {isExpanded && (
        <div className="flex flex-col gap-3 mb-3">
          <button
            onClick={toggleTheme}
            className={expandedButtonStyles}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={20} /> : <Lightbulb size={20} />}
          </button>

          <button
            onClick={() => setIsMotionDisabled((prev) => !prev)}
            className={expandedButtonStyles}
            aria-label={isMotionDisabled ? "Enable motion" : "Disable motion"}
            title={isMotionDisabled ? "Enable motion" : "Disable motion"}
          >
            {isMotionDisabled ? <ZapOff size={20} /> : <Zap size={20} />}
          </button>
        </div>
      )}

      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className={buttonBaseStyles}
        aria-label="Settings"
        title="Settings"
      >
        <Settings
          size={22}
          className={clsx("transition-transform duration-200", isExpanded && "rotate-90")}
        />
      </button>
    </div>
  );
}
