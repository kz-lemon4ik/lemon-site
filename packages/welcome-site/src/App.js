import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ParallaxBackground, SettingsProvider } from "@lemon-site/shared-ui";
import FloatingSettings from "@/components/FloatingSettings";
import NavBar from "@/components/NavBar";
import About from "@/organisms/About";
import Blog from "@/organisms/Blog";
import Home from "@/organisms/Home";
import Projects from "@/organisms/Projects";
function MainApp() {
    const welcomeSiteImagePaths = {
        desktopDark: "/images/backgrounds/welcome-desktop-dark.webp",
        desktopLight: "/images/backgrounds/welcome-desktop-light.webp",
        mobileDark: "/images/backgrounds/welcome-mobile-dark.webp",
        mobileLight: "/images/backgrounds/welcome-mobile-light.webp",
    };
    useEffect(() => {
        document.getElementById("root")?.classList.add("loaded");
    }, []);
    return (_jsxs("div", { className: "relative min-h-screen font-sans bg-transparent", children: [_jsx(ParallaxBackground, { imagePaths: welcomeSiteImagePaths }), _jsx(NavBar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/projects", element: _jsx(Projects, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/blog", element: _jsx(Blog, {}) })] }), _jsx(FloatingSettings, {})] }));
}
export default function App() {
    return (_jsx(SettingsProvider, { children: _jsx(MainApp, {}) }));
}
