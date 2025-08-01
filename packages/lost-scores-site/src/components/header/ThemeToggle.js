import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { Lightbulb, Moon } from "lucide-react";
import { useSettings } from "@lemon-site/shared-ui";
import { createButtonClasses } from "../../styles/utils";
export default function ThemeToggle({ isScrolled = false, isMobile = false, className, }) {
    const { theme, toggleTheme } = useSettings();
    const iconSize = isMobile ? 18 : isScrolled ? 18 : 20;
    return (_jsx("button", { onClick: toggleTheme, className: clsx(createButtonClasses(isMobile ? "iconOnlyMobile" : "iconOnly"), className), "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`, title: `Switch to ${theme === "light" ? "dark" : "light"} mode`, children: theme === "light" ? _jsx(Moon, { size: iconSize }) : _jsx(Lightbulb, { size: iconSize }) }));
}
