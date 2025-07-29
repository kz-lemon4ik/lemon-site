import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ParallaxBackground, ParallaxImagePaths, SettingsProvider } from "@lemon-site/shared-ui";
import FloatingSettings from "@/components/FloatingSettings";
import NavBar from "@/components/NavBar";
import About from "@/organisms/About";
import Blog from "@/organisms/Blog";
import Home from "@/organisms/Home";
import Projects from "@/organisms/Projects";

function MainApp() {
  const welcomeSiteImagePaths: ParallaxImagePaths = {
    desktopDark: "/images/backgrounds/welcome-desktop-dark.webp",
    desktopLight: "/images/backgrounds/welcome-desktop-light.webp",
    mobileDark: "/images/backgrounds/welcome-mobile-dark.webp",
    mobileLight: "/images/backgrounds/welcome-mobile-light.webp",
  };

  useEffect(() => {
    document.getElementById("root")?.classList.add("loaded");
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-transparent">
      <ParallaxBackground imagePaths={welcomeSiteImagePaths} />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <FloatingSettings />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <MainApp />
    </SettingsProvider>
  );
}
