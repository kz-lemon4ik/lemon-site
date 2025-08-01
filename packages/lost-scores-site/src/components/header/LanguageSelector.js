import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useDropdown } from "@lemon-site/shared-ui";
export default function LanguageSelector({ options, selectedLanguage, onLanguageSelect, isScrolled = false, isMobile = false, className, }) {
    const { isOpen, toggle, close, ref } = useDropdown();
    const handleSelect = (language) => {
        onLanguageSelect(language);
        close();
    };
    const buttonBaseStyles = isMobile
        ? "p-2 rounded-md transition-colors"
        : "p-1.5 transition-all duration-200 ease-in-out focus:outline-none rounded-full focus-visible:ring-0 flex items-center gap-1";
    const buttonThemeStyles = clsx("text-lavender-200 hover:text-lemon-400", "theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600", isMobile
        ? "hover:bg-slate-700/30 theme-is-light:hover:bg-slate-100/50"
        : "hover:bg-slate-700/40 theme-is-light:hover:bg-slate-200/70");
    return (_jsxs("div", { ref: ref, className: clsx("relative", isMobile ? "mobile-lang-selector" : "lang-selector-wrapper", className), children: [_jsxs("button", { onClick: (e) => {
                    if (isMobile)
                        e.stopPropagation();
                    toggle();
                }, className: clsx(buttonBaseStyles, buttonThemeStyles), "aria-label": "Select language", title: "Select language", children: [_jsx("img", { src: `/flags/${selectedLanguage.code.toLowerCase()}.svg`, alt: selectedLanguage.name, className: "w-5 h-5 object-contain" }), !isScrolled && !isMobile && (_jsx(ChevronDown, { size: 14, className: clsx(isOpen && "rotate-180", "transition-transform duration-200") }))] }), isOpen && (_jsx("div", { className: clsx("absolute top-full right-0 mt-2 w-44 rounded-md shadow-lg py-3 px-2", "bg-slate-700/95 backdrop-blur-sm border border-slate-600", "theme-is-light:bg-white/95 theme-is-light:border-slate-200", isMobile ? "z-[60]" : "z-50"), onClick: (e) => isMobile && e.stopPropagation(), children: options.map((language) => (_jsxs("button", { onClick: (e) => {
                        if (isMobile)
                            e.stopPropagation();
                        handleSelect(language);
                    }, className: clsx("flex w-full text-left py-2 text-xs items-center gap-2 transition-colors duration-150 rounded-md", "text-slate-100 hover:bg-slate-600/60", "theme-is-light:text-slate-700 theme-is-light:hover:bg-slate-100", selectedLanguage.code === language.code
                        ? "font-semibold border-l-4 border-lemon-400 theme-is-light:border-sky-600 pl-2 pr-3 bg-slate-600/50 theme-is-light:bg-sky-100/70"
                        : "border-l-4 border-transparent pl-2 pr-3"), children: [_jsx("img", { src: `/flags/${language.code.toLowerCase()}.svg`, alt: language.name, className: "w-5 h-5 object-contain" }), language.name] }, language.code))) }))] }));
}
