import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ParallaxBackground, SettingsProvider } from "@lemon-site/shared-ui";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AboutProgram from "@/organisms/AboutProgram";
import Downloads from "@/organisms/Downloads";
import Faq from "@/organisms/Faq";
import Feedback from "@/organisms/Feedback";
import HallOfFame from "@/organisms/HallOfFame";
import Home from "@/organisms/Home";
import HowItWorks from "@/organisms/HowItWorks";
import InstallationGuide from "@/organisms/InstallationGuide";
import OAuthSuccess from "@/organisms/OAuthSuccess";
import ScrollToTop from "@/utils/ScrollToTop";
const lostScoresSiteImagePaths = {
    desktopDark: "/images/backgrounds/lost-desktop-dark.webp",
    desktopLight: "/images/backgrounds/lost-desktop-light.webp",
    mobileDark: "/images/backgrounds/lost-mobile-dark.webp",
    mobileLight: "/images/backgrounds/lost-mobile-light.webp",
};
function AppRoutes({ isInitialLoad }) {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, { enableAnimation: !isInitialLoad }) }), _jsx(Route, { path: "/about-program", element: _jsx(AboutProgram, {}) }), _jsx(Route, { path: "/how-it-works", element: _jsx(HowItWorks, {}) }), _jsx(Route, { path: "/hall-of-fame", element: _jsx(HallOfFame, {}) }), _jsx(Route, { path: "/installation", element: _jsx(InstallationGuide, {}) }), _jsx(Route, { path: "/downloads", element: _jsx(Downloads, {}) }), _jsx(Route, { path: "/faq", element: _jsx(Faq, {}) }), _jsx(Route, { path: "/feedback", element: _jsx(Feedback, {}) }), _jsx(Route, { path: "/oauth/success", element: _jsx(OAuthSuccess, {}) })] }));
}
function AppLayout({ children, isHomePage }) {
    const headerInitialHeightClasses = "pt-20 sm:pt-24";
    return (_jsxs("div", { className: "relative min-h-screen bg-transparent flex flex-col", children: [_jsx(ScrollToTop, {}), _jsx(ParallaxBackground, { imagePaths: lostScoresSiteImagePaths }), _jsx(Header, {}), _jsx("main", { className: clsx("relative z-10 w-full", isHomePage && "flex-grow", !isHomePage && headerInitialHeightClasses), children: children }), _jsx(Footer, { isHomePage: isHomePage })] }));
}
function useAppInitialization() {
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
        }
        document.getElementById("root")?.classList.add("loaded");
    }, [isInitialLoad]);
    return { isInitialLoad };
}
function MainAppLayout() {
    const location = useLocation();
    const isHomePage = location.pathname === "/" || location.pathname === "/oauth/success";
    const { isInitialLoad } = useAppInitialization();
    return (_jsx(AppLayout, { isHomePage: isHomePage, children: _jsx(AppRoutes, { isInitialLoad: isInitialLoad }) }));
}
export default function App() {
    return (_jsx(SettingsProvider, { children: _jsx(MainAppLayout, {}) }));
}
