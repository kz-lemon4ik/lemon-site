import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { Mail } from "lucide-react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { Button, Heading, Section, SharedCard, useSettings } from "@lemon-site/shared-ui";
const textBaseStyles = clsx("text-left font-lostnav text-base sm:text-lg leading-relaxed", "text-lavender-200", "theme-is-light:text-themeLight-text", "selection:bg-lemon-400/30 selection:text-slate-900", "theme-is-light:selection:bg-themeLight-primary/20");
const accentLinkStyles = clsx("font-semibold transition-colors duration-200 underline hover:no-underline", "text-lemon-400 hover:text-lavender-300", "theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover");
export default function Feedback() {
    const { isMotionDisabled } = useSettings();
    const feedbackChannels = [
        {
            title: "Report Bugs & Suggest Features via GitHub",
            icon: FaGithub,
            description: "The best way to report a bug or suggest a new feature is by creating an issue on our GitHub repository. This helps us track all feedback systematically. Please check for existing issues before creating a new one.",
            buttonText: "Go to GitHub Issues",
            buttonHref: "https://github.com/kz-lemon4ik/osu-lost-scores/issues",
        },
        {
            title: "Join our Discord Community",
            icon: FaDiscord,
            description: "For general discussions, quick questions, or sharing your experience, join our Discord server. It's a great place for community interaction.",
            buttonText: "Join Discord Server",
            buttonHref: "#",
        },
        {
            title: "Direct Email",
            icon: Mail,
            description: "For private inquiries, you can reach out via email. Response times might be slower compared to GitHub.",
            email: "feedback@lost.lemon4ik.kz",
        },
    ];
    const cardTitleWithIconClassName = clsx("text-2xl font-semibold font-lostheading mb-4 flex items-center", "text-white", "theme-is-light:text-themeLight-headingText");
    return (_jsx(Section, { id: "feedback", className: "min-h-screen pt-20 pb-20", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4", children: [_jsx(Heading, { size: "xl", className: clsx("mb-12 font-losttitle text-center sm:text-center", "text-white", "theme-is-light:text-themeLight-headingText"), children: "Feedback & Suggestions" }), _jsx(SharedCard, { motion: { enableEntry: !isMotionDisabled }, className: "mb-10 md:mb-12 text-center", paddingVariant: "default", textStyles: { base: textBaseStyles }, children: _jsxs("p", { className: "text-lg", children: ["Your feedback is invaluable in helping us improve", " ", _jsx("strong", { className: clsx("text-lemon-400", "theme-is-light:text-themeLight-highlightTextColor"), children: "osu! Lost Scores Analyzer" }), ". Whether you've found a bug, have a suggestion, or just want to share your thoughts, we'd love to hear from you!"] }) }), _jsxs("div", { className: "space-y-8", children: [feedbackChannels.map((channel, index) => {
                            const IconComponent = channel.icon;
                            return (_jsxs(SharedCard, { motion: { enableEntry: !isMotionDisabled }, paddingVariant: "default", textStyles: { base: textBaseStyles }, children: [_jsxs("h2", { className: cardTitleWithIconClassName, children: [_jsx(IconComponent, { size: 24, className: clsx("mr-3 shrink-0", "text-purple-400", "theme-is-light:text-themeLight-primary") }), channel.title] }), _jsx("p", { className: "mb-6", children: channel.description }), channel.buttonText && channel.buttonHref && (_jsx(Button, { href: channel.buttonHref, variant: "solidPurple", size: "md", leftIcon: IconComponent, enableMotion: !isMotionDisabled, className: "font-lostbody font-semibold", target: "_blank", rel: "noopener noreferrer", children: channel.buttonText })), channel.email && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(IconComponent, { size: 20, className: clsx("shrink-0", "text-purple-400", "theme-is-light:text-themeLight-primary") }), _jsx("a", { href: `mailto:${channel.email}`, className: accentLinkStyles, children: channel.email })] }))] }, index));
                        }), _jsxs(SharedCard, { motion: { enableEntry: !isMotionDisabled }, paddingVariant: "default", textStyles: { base: textBaseStyles }, children: [_jsx("h2", { className: clsx("text-2xl font-semibold font-lostheading mb-4 text-center sm:text-left", "text-white", "theme-is-light:text-themeLight-headingText"), children: "What to Include in Bug Reports" }), _jsxs("ul", { className: "list-disc list-outside pl-5 space-y-2", children: [_jsx("li", { children: "Steps to reproduce the error." }), _jsx("li", { children: "Expected behavior vs. actual behavior." }), _jsx("li", { children: "Screenshots or videos of the issue." }), _jsxs("li", { children: ["The version of", " ", _jsx("strong", { className: clsx("text-lemon-400", "theme-is-light:text-themeLight-highlightTextColor"), children: "osu! Lost Scores Analyzer" }), " ", "you are using."] }), _jsx("li", { children: "Your operating system version." })] })] })] })] }) }));
}
