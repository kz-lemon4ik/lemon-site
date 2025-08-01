import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSettings } from "@lemon-site/shared-ui";
import LanguageSelector from "./LanguageSelector";
import Logo from "./Logo";
import MotionToggle from "./MotionToggle";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";
export default function MobileHeader({ navigationItems, languageOptions, isScrolled, userAvatarUrl, }) {
    const { isMotionDisabled } = useSettings();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);
    const headerBg = isScrolled
        ? "bg-slate-800/90 theme-is-light:bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-700/30 theme-is-light:border-slate-300/50"
        : "bg-transparent";
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: clsx("fixed top-0 left-0 right-0 w-full z-30 lg:hidden", !isMotionDisabled && "transition-all duration-300 ease-in-out", "h-16", headerBg), children: _jsxs("div", { className: "h-full flex items-center justify-between px-4", children: [_jsx(Logo, { isMobile: true }), _jsx("button", { onClick: () => setIsMobileMenuOpen(true), className: clsx("p-2 transition-all duration-200 ease-in-out focus:outline-none bg-transparent", "text-lavender-200 hover:text-lemon-400", "theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600"), "aria-label": "Open mobile menu", children: _jsx(ChevronDown, { size: 20 }) })] }) }), isMobileMenuOpen && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: isMotionDisabled ? 0 : 0.2 }, className: "fixed inset-0 z-50 lg:hidden", children: [_jsx("div", { className: "absolute inset-0 bg-slate-900/80 theme-is-light:bg-slate-900/60", onClick: () => setIsMobileMenuOpen(false) }), _jsxs(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, transition: { duration: isMotionDisabled ? 0 : 0.3, ease: "easeInOut" }, className: "relative bg-slate-800/90 theme-is-light:bg-white/80 backdrop-blur-md border-b border-slate-700/30 theme-is-light:border-slate-300/50 overflow-hidden", style: { maxHeight: "70vh" }, children: [_jsxs("div", { className: "h-16 flex items-center justify-between px-4 border-b border-slate-700/30 theme-is-light:border-slate-300/50", children: [_jsx(Link, { to: "/", onClick: () => setIsMobileMenuOpen(false), className: "flex items-center", children: _jsx("img", { src: "/images/logos/logo-default.webp", alt: "Lost Scores", className: "h-9 w-auto" }) }), _jsx("button", { onClick: () => setIsMobileMenuOpen(false), className: clsx("p-2 transition-all duration-200 ease-in-out focus:outline-none bg-transparent", "text-lavender-200 hover:text-lemon-400", "theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600"), "aria-label": "Close menu", children: _jsx(ChevronUp, { size: 20 }) })] }), _jsx("div", { className: "px-4 py-4 bg-slate-900/40 theme-is-light:bg-slate-100/60 border-b border-slate-700/30 theme-is-light:border-slate-300/50", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(UserAvatar, { avatarUrl: userAvatarUrl, isMobile: true }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-lavender-200 theme-is-light:text-slate-700", children: "KZ_Lemon4ik" }), _jsx("div", { className: "text-xs text-slate-400 theme-is-light:text-slate-500", children: "Guest User" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(LanguageSelector, { options: languageOptions, selectedLanguage: selectedLanguage, onLanguageSelect: setSelectedLanguage, isMobile: true }), _jsx(ThemeToggle, { isMobile: true }), _jsx(MotionToggle, { isMobile: true })] })] }) }), _jsx("nav", { className: "px-4 py-4", children: _jsx("div", { className: "space-y-1", children: navigationItems.map((item) => (_jsx(NavLink, { to: item.href, onClick: () => setIsMobileMenuOpen(false), className: ({ isActive }) => clsx("flex items-center px-4 py-3 text-base font-medium transition-colors font-lostnav rounded-md", isActive
                                            ? "text-lemon-400 theme-is-light:text-sky-600 bg-slate-700/30 theme-is-light:bg-sky-100/70"
                                            : "text-lavender-200 hover:text-lemon-400 theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600 hover:bg-slate-700/20 theme-is-light:hover:bg-slate-100/50"), children: _jsx("span", { children: item.label }) }, item.label))) }) })] })] }))] }));
}
