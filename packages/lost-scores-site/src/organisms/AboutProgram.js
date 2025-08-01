import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from "clsx";
import { Award, Code, History, Image, Info, Network, Palette, Search, ShieldCheck, Sparkles, Trophy, } from "lucide-react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Heading, HighlightText, Section, SharedCard, useSettings, } from "@lemon-site/shared-ui";
import ImageGalleryModal from "@/components/ImageGalleryModal";
const accentLinkStyles = clsx("underline hover:no-underline font-semibold transition-colors duration-200", "text-lemon-400 hover:text-lavender-300", "theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover");
const KeyValueItem = ({ icon: Icon, children }) => (_jsxs("div", { className: "flex items-start text-left gap-4", children: [_jsx(Icon, { className: "shrink-0 w-8 h-8 mt-1 text-purple-400 theme-is-light:text-themeLight-primary", strokeWidth: 1.5 }), _jsx("div", { children: children })] }));
export default function AboutProgram() {
    const { isMotionDisabled } = useSettings();
    const storyImg = "/images/examples/scorev1.webp";
    const problemImg = "/images/examples/calculations.webp";
    const keyValueImg = "/images/examples/btmc.webp";
    const pageImages = [storyImg, problemImg, keyValueImg];
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const openGallery = (index) => {
        setCurrentImageIndex(index);
        setIsGalleryOpen(true);
    };
    const closeGallery = () => {
        setIsGalleryOpen(false);
    };
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pageImages.length);
    };
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + pageImages.length) % pageImages.length);
    };
    const paragraphBaseStyles = "text-justify";
    const paragraphMargin = "mb-6";
    const headingMarginBottom = "mb-8";
    const pageHeadingMarginBottom = "mb-20";
    const textStyleBase = "font-lostnav text-base sm:text-lg leading-relaxed text-lavender-200 theme-is-light:text-themeLight-text";
    const cardData = [
        {
            title: 'The Story of "ScoreV1\'d" Plays',
            textAlignment: "left",
            image: {
                src: storyImg,
                alt: "Illustration for ScoreV1'd Plays Story",
                aspectRatio: "1920x1440",
                onClick: () => openGallery(pageImages.indexOf(storyImg)),
                placement: "right",
                className: "max-w-full mx-auto",
            },
            content: (_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: paragraphBaseStyles, children: "Every seasoned osu! player has likely encountered a situation where their best Performance Points (PP) score on a map was overwritten by a play with more score points but less PP. This was common before the game's score submission system was updated." }), _jsx("div", { className: clsx("p-4 rounded-r-md text-sm", "bg-slate-800/60 border-l-4 border-lemon-400", "theme-is-light:bg-themeLight-primaryLightBg theme-is-light:border-l-4 theme-is-light:border-themeLight-primary"), children: _jsxs("div", { className: "flex items-center gap-x-3", children: [_jsx(Info, { className: "shrink-0 text-lemon-400 theme-is-light:text-themeLight-primary", strokeWidth: 2.5 }), _jsxs("span", { children: ["This phenomenon is known in the community as getting", " ", _jsx(HighlightText, { children: "\u00ABScoreV1'd\u00BB" }), "."] })] }) }), _jsxs("p", { className: paragraphBaseStyles, children: [_jsx(HighlightText, { children: "osu! Lost Scores Analyzer" }), " is a tool created to:"] }), _jsxs("div", { className: "space-y-5", children: [_jsxs(KeyValueItem, { icon: Trophy, children: [_jsx("strong", { children: "Reclaim your lost PP" }), ", at least hypothetically, by showing what your rank could have been."] }), _jsxs(KeyValueItem, { icon: Search, children: [_jsx("strong", { children: "Find your true best plays" }), " that are hiding in your local replay collection, unnoticed for years."] }), _jsxs(KeyValueItem, { icon: History, children: [_jsx("strong", { children: "Better understand your own gameplay journey" }), " and see how much you've improved."] })] })] })),
        },
        {
            title: "What is the program's main goal?",
            titleAlignment: "center",
            textAlignment: "right",
            image: {
                src: problemImg,
                alt: "Illustration of PP Calculations",
                aspectRatio: "1280x720",
                onClick: () => openGallery(pageImages.indexOf(problemImg)),
                placement: "left",
                className: "max-w-full mx-auto",
            },
            content: (_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: `${paragraphBaseStyles}`, children: "The main goal is to identify and showcase your locally saved replays that are objectively better (in terms of PP) than your official online records, but were \"lost\" due to the old scoring system." }), _jsxs("div", { className: "text-center my-4 p-5 rounded-lg bg-slate-900/30 theme-is-light:bg-slate-500/5", children: [_jsx("h4", { className: "font-lostheading text-2xl font-semibold text-center sm:text-center text-white theme-is-light:text-themeLight-headingText", children: "The program answers the question:" }), _jsx("p", { className: "mt-2 text-lg text-lavender-200 theme-is-light:text-themeLight-text italic", children: "\"What if my best attempts had been submitted correctly?\"" })] })] })),
        },
        {
            title: "Key Value For You",
            textAlignment: "left",
            image: {
                src: keyValueImg,
                alt: "BTMC using the program or a similar concept",
                aspectRatio: "1722x870",
                onClick: () => openGallery(pageImages.indexOf(keyValueImg)),
                placement: "right",
                className: "max-w-full mx-auto",
            },
            content: (_jsxs("div", { className: "space-y-6", children: [_jsxs(KeyValueItem, { icon: Sparkles, children: [_jsx("strong", { children: "Discover your true potential:" }), " See how much PP you might have \"lost\". This could range from a few dozen to several hundred!"] }), _jsxs(KeyValueItem, { icon: Award, children: [_jsx("strong", { children: "Rediscover your best plays:" }), " Remember those amazing scores that you thought were gone forever after being \"ScoreV1'd\"."] }), _jsxs(KeyValueItem, { icon: ShieldCheck, children: [_jsx("strong", { children: "Completely safe and legitimate:" }), " The program only analyzes your local data and official info via the osu! API. It does not modify game files or violate any rules."] })] })),
        },
    ];
    const bottomCardsData = [
        {
            title: "A Glimpse of What It Does",
            titleAlignment: "center",
            textAlignment: "left",
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { className: `${paragraphBaseStyles} ${paragraphMargin}`, children: [_jsx(HighlightText, { children: "osu! Lost Scores Analyzer" }), " meticulously scans your local replays, compares them against your online records, and highlights plays that could have significantly boosted your PP. It then visualizes what your top performance list might look like with these \"lost\" scores."] }), _jsxs("p", { className: `${paragraphBaseStyles.replace("text-justify", "text-left")} ${paragraphMargin}`, children: ["For a detailed breakdown of the analysis process, please visit the", " ", _jsx(RouterLink, { to: "/how-it-works", className: accentLinkStyles, children: "How it Works" }), " ", "page."] })] })),
        },
        {
            title: "Technologies & Ethos",
            titleAlignment: "center",
            textAlignment: "left",
            content: (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: paragraphBaseStyles, children: "The tool was created with the idea of helping players rediscover their achievements. Here are the core technologies used:" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm text-center", children: [_jsx("div", { className: "p-3 bg-slate-800/50 theme-is-light:bg-slate-200/80 rounded-lg", children: _jsx(KeyValueItem, { icon: Code, children: "Python" }) }), _jsx("div", { className: "p-3 bg-slate-800/50 theme-is-light:bg-slate-200/80 rounded-lg", children: _jsx(KeyValueItem, { icon: Palette, children: "PySide6 (GUI)" }) }), _jsx("div", { className: "p-3 bg-slate-800/50 theme-is-light:bg-slate-200/80 rounded-lg", children: _jsx(KeyValueItem, { icon: Image, children: "Pillow (Images)" }) }), _jsx("div", { className: "p-3 bg-slate-800/50 theme-is-light:bg-slate-200/80 rounded-lg", children: _jsx(KeyValueItem, { icon: Network, children: "osu! API" }) })] })] })),
        },
    ];
    return (_jsxs(Section, { id: "about-program", className: "pt-20 pb-20 min-h-screen", children: [_jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsx(Heading, { size: "xl", className: clsx(`text-center sm:text-center ${pageHeadingMarginBottom} font-losttitle`, "text-white", "theme-is-light:text-themeLight-headingText"), children: "About Program" }), _jsxs("div", { className: "space-y-10 md:space-y-12", children: [cardData.map((card, index) => (_jsx(SharedCard, { title: {
                                    content: card.title,
                                    size: "h2",
                                    level: "h2",
                                    className: clsx(headingMarginBottom, "!font-losttitle"),
                                    alignment: card.titleAlignment,
                                }, image: card.image, textStyles: {
                                    base: textStyleBase,
                                    alignment: card.textAlignment,
                                }, motion: { enableEntry: !isMotionDisabled }, paddingVariant: "default", children: card.content }, index))), _jsx("div", { className: "grid md:grid-cols-2 gap-x-8 lg:gap-x-12", children: bottomCardsData.map((card, index) => (_jsx(SharedCard, { title: {
                                        content: card.title,
                                        size: "h2",
                                        level: "h2",
                                        className: clsx(headingMarginBottom, "!font-losttitle"),
                                        alignment: card.titleAlignment,
                                    }, textStyles: {
                                        base: textStyleBase,
                                        alignment: card.textAlignment,
                                    }, motion: { enableEntry: !isMotionDisabled }, paddingVariant: "default", children: card.content }, index))) })] })] }), _jsx(ImageGalleryModal, { isOpen: isGalleryOpen, images: pageImages, currentIndex: currentImageIndex, onClose: closeGallery, onNext: nextImage, onPrev: prevImage })] }));
}
