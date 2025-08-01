import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSettings } from "@lemon-site/shared-ui";
export default function DesktopNavigation({ items, className }) {
    const { isMotionDisabled } = useSettings();
    const baseStyles = "py-2 px-2.5 rounded-md font-medium transition-all duration-150 ease-in-out transform relative font-lostnav text-base sm:text-lg";
    const inactiveStyles = "text-lavender-200 hover:text-lemon-400 theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600";
    const activeStyles = "text-white hover:text-white theme-is-light:text-slate-800 theme-is-light:hover:text-slate-800";
    return (_jsx("nav", { className: clsx("items-center space-x-0.5 sm:space-x-1.5 hidden lg:flex", !isMotionDisabled && "transition-opacity duration-300 ease-in-out", className), children: items.map((item) => (_jsx(NavLink, { to: item.href, className: ({ isActive }) => clsx(baseStyles, isActive ? activeStyles : inactiveStyles), children: ({ isActive }) => (_jsxs(_Fragment, { children: [_jsx("span", { children: item.label }), isActive && (_jsx(motion.div, { className: clsx("absolute bottom-0 left-0 w-full h-nav-underline", "bg-lemon-400 theme-is-light:bg-sky-600"), layoutId: "underline", transition: isMotionDisabled
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 30 } }))] })) }, item.label))) }));
}
