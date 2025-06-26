import clsx from "clsx";
import { Lightbulb, Moon } from "lucide-react";
import { useSettings } from "@lemon-site/shared-ui";
import { createButtonClasses } from "../../styles/utils";

interface ThemeToggleProps {
  isScrolled?: boolean;
  isMobile?: boolean;
  className?: string;
}

export default function ThemeToggle({
  isScrolled = false,
  isMobile = false,
  className,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useSettings();
  const iconSize = isMobile ? 18 : isScrolled ? 18 : 20;

  return (
    <button
      onClick={toggleTheme}
      className={clsx(createButtonClasses(isMobile ? "iconOnlyMobile" : "iconOnly"), className)}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon size={iconSize} /> : <Lightbulb size={iconSize} />}
    </button>
  );
}
