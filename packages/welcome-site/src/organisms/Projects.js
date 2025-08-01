import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Section, useSettings } from "@lemon-site/shared-ui";
import ProjectCard from "@/molecules/ProjectCard";
const projects = [
    {
        title: "osu! Lost Scores Analyzer",
        description: "Desktop app for analyzing osu! replays to find lost scores and generate image reports.",
        tags: ["Python", "PySide6", "Pillow", "SQLite", "pandas", "osu! API"],
        link: "https://github.com/kz-lemon4ik/osu-lost-scores/",
    },
    {
        title: "Lemon Site",
        description: "Personal portfolio website.",
        tags: ["React", "TypeScript", "Tailwind", "Vite"],
        link: "https://github.com/kz-lemon4ik/lemon-site",
    },
];
export default function Projects() {
    const { isMotionDisabled } = useSettings();
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    const sectionTransition = {
        duration: isMotionDisabled ? 0 : 0.8,
        ease: "easeOut",
    };
    return (_jsx(Section, { id: "projects", className: "min-h-screen", children: _jsxs(motion.div, { initial: "hidden", animate: "visible", variants: sectionVariants, transition: sectionTransition, children: [_jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-white theme-is-light:text-themeLight-headingText drop-shadow-[0_0_1.8rem_rgba(246,224,94,0.5)] theme-is-light:drop-shadow-[0_0_1.44rem_var(--color-heading-drop-shadow)] select-none mb-8 font-title", children: "Projects" }), _jsx("div", { className: "grid gap-6 sm:grid-cols-2 font-body", children: projects.map((proj) => (_jsx(ProjectCard, { ...proj }, proj.title))) })] }) }));
}
