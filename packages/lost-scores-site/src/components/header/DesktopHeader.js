import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useState } from "react";
import { useSettings } from "@lemon-site/shared-ui";
import DesktopNavigation from "./DesktopNavigation";
import LanguageSelector from "./LanguageSelector";
import Logo from "./Logo";
import MotionToggle from "./MotionToggle";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";
export default function DesktopHeader({ navigationItems, languageOptions, isScrolled, userAvatarUrl, }) {
    const { isMotionDisabled } = useSettings();
    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
    const headerBg = isScrolled
        ? "bg-slate-800/70 theme-is-light:bg-white/65 backdrop-blur-md"
        : "bg-transparent";
    const headerBorder = isScrolled
        ? "border-b border-slate-700/30 theme-is-light:border-slate-300/50"
        : "border-b border-transparent";
    return (_jsx("header", { className: clsx("fixed top-0 left-0 right-0 w-full z-30", !isMotionDisabled && "transition-all duration-300 ease-in-out", "hidden lg:block lg:h-16 lg:shadow-none", !isScrolled && "lg:h-20 xl:h-24", headerBg, headerBorder), children: _jsxs("div", { className: clsx("max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8 relative", !isScrolled && "top-[0.3125rem]"), children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Logo, { isScrolled: isScrolled }), _jsx(DesktopNavigation, { items: navigationItems })] }), _jsxs("div", { className: "flex items-center gap-0.5 sm:gap-1.5", children: [_jsx(LanguageSelector, { options: languageOptions, selectedLanguage: selectedLanguage, onLanguageSelect: setSelectedLanguage, isScrolled: isScrolled, className: "hidden lg:block" }), _jsx(ThemeToggle, { isScrolled: isScrolled, className: "hidden lg:flex" }), _jsx(MotionToggle, { isScrolled: isScrolled, className: "hidden lg:flex" }), _jsx("div", { className: "ml-1 sm:ml-2 hidden lg:block", children: _jsx(UserAvatar, { avatarUrl: userAvatarUrl, isScrolled: isScrolled }) })] })] }) }));
}
