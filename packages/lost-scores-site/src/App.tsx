import clsx from "clsx";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ParallaxBackground, ParallaxImagePaths, SettingsProvider } from "@lemon-site/shared-ui";
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
import ScrollToTop from "@/utils/ScrollToTop";

const lostScoresSiteImagePaths: ParallaxImagePaths = {
  desktopDark: "/images/backgrounds/lost-desktop-dark.png",
  desktopLight: "/images/backgrounds/lost-desktop-light.png",
  mobileDark: "/images/backgrounds/lost-mobile-dark.png",
  mobileLight: "/images/backgrounds/lost-mobile-light.png",
};

interface AppRoutesProps {
  isInitialLoad: boolean;
}

function AppRoutes({ isInitialLoad }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Home enableAnimation={!isInitialLoad} />} />
      <Route path="/about-program" element={<AboutProgram />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/hall-of-fame" element={<HallOfFame />} />
      <Route path="/installation" element={<InstallationGuide />} />
      <Route path="/downloads" element={<Downloads />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  );
}

interface AppLayoutProps {
  children: React.ReactNode;
  isHomePage: boolean;
}

function AppLayout({ children, isHomePage }: AppLayoutProps) {
  const headerInitialHeightClasses = "pt-20 sm:pt-24";

  return (
    <div className="relative min-h-screen font-sans bg-transparent flex flex-col">
      <ScrollToTop />
      <ParallaxBackground imagePaths={lostScoresSiteImagePaths} />
      <Header />

      <main
        className={clsx(
          "relative z-10 w-full",
          isHomePage && "flex-grow",
          !isHomePage && headerInitialHeightClasses
        )}
      >
        {children}
      </main>

      <Footer isHomePage={isHomePage} />
    </div>
  );
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
  const isHomePage = location.pathname === "/";
  const { isInitialLoad } = useAppInitialization();

  return (
    <AppLayout isHomePage={isHomePage}>
      <AppRoutes isInitialLoad={isInitialLoad} />
    </AppLayout>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <MainAppLayout />
    </SettingsProvider>
  );
}
