import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useSettings } from "@lemon-site/shared-ui";
export default function ProjectCard({ title, description, tags, link }) {
    const { isMotionDisabled } = useSettings();
    return (_jsxs("a", { href: link, target: "_blank", rel: "noopener noreferrer", className: clsx("rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 transition-all duration-300 ease-out", "hover:border-lemon-400 theme-is-light:bg-themeLight-card theme-is-light:border-themeLight-cardBorder theme-is-light:hover:border-themeLight-primary", !isMotionDisabled && "hover:scale-[1.02]"), children: [_jsx("h3", { className: "text-lg font-semibold text-lavender-100 mb-1 theme-is-light:text-themeLight-projectTitleText", children: title }), _jsx("p", { className: "text-sm text-lavender-300 mb-3 theme-is-light:text-themeLight-projectDescriptionText", children: description }), _jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag) => (_jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-white/10 text-lavender-200 theme-is-light:bg-themeLight-primaryLightBg theme-is-light:text-themeLight-primary", children: tag }, tag))) })] }));
}
