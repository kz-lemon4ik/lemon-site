import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { ArrowDownToLine, Info, Sheet } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button, Heading, IconLink, Section, SharedCard, useSettings, } from "@lemon-site/shared-ui";
import { createCardTitleClasses, createLinkClasses } from "../styles/utils";
const programInfo = {
    name: "osu! Lost Scores Analyzer",
    version: "0.7.27",
    osTarget: "Download for Windows",
    releaseDate: "2025-06-06",
    fileSize: "12 MB",
    directDownloadUrl: "https://github.com/kz-lemon4ik/osu-lost-scores",
    changelogUrl: "https://github.com/kz-lemon4ik/osu-lost-scores",
    licenseType: "MIT License",
    licenseUrl: "https://github.com/kz-lemon4ik/osu-lost-scores/",
    githubRepoUrl: "https://github.com/kz-lemon4ik/osu-lost-scores",
    mirrors: [
        {
            name: "GitHub",
            url: "https://github.com/kz-lemon4ik/osu-lost-scores",
            platform: "github",
        },
        { name: "Google Drive", url: "#", platform: "googledrive" },
        { name: "Mega.nz", url: "#", platform: "mega" },
        { name: "MediaFire", url: "#", platform: "mediafire" },
    ],
};
export default function Downloads() {
    const { isMotionDisabled } = useSettings();
    return (_jsx(Section, { id: "downloads", className: "min-h-screen pt-24 pb-20", children: _jsxs("div", { className: "max-w-5xl mx-auto px-4", children: [_jsx(Heading, { size: "xl", className: clsx("mb-10 font-losttitle text-center sm:text-center", "text-white", "theme-is-light:text-themeLight-headingText"), children: "Downloads" }), _jsx(SharedCard, { motion: { enableEntry: !isMotionDisabled }, className: "mb-16", paddingVariant: "default", children: _jsxs("div", { className: "flex flex-col md:flex-row items-stretch md:items-center", children: [_jsxs("div", { className: clsx("w-full md:w-1/2 flex flex-col items-center justify-center text-center p-6 md:pr-8 md:border-r-2", "border-slate-700/50", "theme-is-light:border-themeLight-border"), children: [_jsxs("h2", { className: clsx("text-3xl font-semibold font-lostheading mb-5 text-center sm:text-center", "text-white", "theme-is-light:text-themeLight-headingText"), children: ["Download ", programInfo.name] }), _jsx(Button, { href: programInfo.directDownloadUrl, target: "_blank", rel: "noopener noreferrer", variant: "solidPurple", size: "lg", enableMotion: !isMotionDisabled, className: "w-full max-w-xs !py-4 font-lostbody font-semibold", leftIcon: ArrowDownToLine, children: _jsx("span", { className: "block text-xl", children: programInfo.osTarget }) }), _jsxs("p", { className: clsx("text-xs mt-2", "text-lavender-400", "theme-is-light:text-themeLight-mutedText"), children: ["Version ", programInfo.version] })] }), _jsxs("div", { className: "w-full md:w-1/2 flex flex-col items-center justify-center text-center p-6 md:pl-8 mt-6 md:mt-0", children: [_jsx("h3", { className: clsx("text-2xl font-semibold font-lostheading mb-6 text-center sm:text-center", "text-white", "theme-is-light:text-themeLight-headingText"), children: "Alternative Downloads" }), _jsx("div", { className: "flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6", children: programInfo.mirrors.map((mirror) => (_jsx(IconLink, { href: mirror.url, platform: mirror.platform, label: `Download from ${mirror.name}`, className: clsx("text-5xl", !isMotionDisabled && "transform hover:scale-125") }, mirror.name))) })] })] }) }), _jsxs("div", { className: clsx("grid grid-cols-1 md:grid-cols-2 gap-8 font-lostnav", "text-lavender-200", "theme-is-light:text-themeLight-text"), children: [_jsxs(SharedCard, { motion: { enableEntry: !isMotionDisabled }, paddingVariant: "default", textStyles: { base: "text-sm" }, children: [_jsxs("h3", { className: createCardTitleClasses(), children: [_jsx(Info, { size: 24, className: clsx("mr-3 shrink-0", "text-purple-400", "theme-is-light:text-themeLight-primary") }), "Release Information"] }), _jsxs("ul", { className: "space-y-2", children: [_jsxs("li", { children: [_jsx("strong", { children: "Version:" }), " ", programInfo.version] }), _jsxs("li", { children: [_jsx("strong", { children: "Released:" }), " ", programInfo.releaseDate] }), _jsxs("li", { children: [_jsx("strong", { children: "File Size:" }), " ", programInfo.fileSize] }), _jsxs("li", { children: [_jsx("strong", { children: "Changelog:" }), " ", _jsx("a", { href: programInfo.changelogUrl, target: "_blank", rel: "noopener noreferrer", className: createLinkClasses(), children: "View on GitHub" })] }), _jsxs("li", { children: [_jsx("strong", { children: "License:" }), " ", _jsx("a", { href: programInfo.licenseUrl, target: "_blank", rel: "noopener noreferrer", className: createLinkClasses(), children: programInfo.licenseType })] })] })] }), _jsxs(SharedCard, { motion: { enableEntry: !isMotionDisabled }, paddingVariant: "default", textStyles: { base: "text-sm" }, children: [_jsxs("h3", { className: createCardTitleClasses(), children: [_jsx(FaGithub, { size: 24, className: clsx("mr-3 shrink-0", "text-purple-400", "theme-is-light:text-themeLight-primary") }), "Source Code & Issues"] }), _jsxs("ul", { className: "space-y-3 list-disc list-outside pl-5", children: [_jsxs("li", { children: ["This program is open-source. You can view the code and contribute on", " ", _jsx("a", { href: programInfo.githubRepoUrl, target: "_blank", rel: "noopener noreferrer", className: createLinkClasses(), children: "GitHub" }), "."] }), _jsxs("li", { children: ["Encountered a bug or have a feature request?", " ", _jsx("a", { href: `${programInfo.githubRepoUrl}/issues`, target: "_blank", rel: "noopener noreferrer", className: createLinkClasses(), children: "Open an Issue" }), "."] }), _jsxs("li", { children: ["Downloads from GitHub Releases can be tracked", " ", _jsx("a", { href: programInfo.changelogUrl, target: "_blank", rel: "noopener noreferrer", title: "View download stats on GitHub", className: createLinkClasses(), children: "here" }), "."] })] })] })] }), _jsx("div", { className: "mt-16 text-center", children: _jsx(Button, { to: "/installation", variant: "outlinePurple", size: "lg", enableMotion: !isMotionDisabled, leftIcon: Sheet, className: "font-lostbody font-semibold px-6", children: "View Installation Guide" }) })] }) }));
}
