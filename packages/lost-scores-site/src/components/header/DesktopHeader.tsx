import clsx from "clsx";
import { useState } from "react";
import { useSettings, type LanguageOption, type NavigationItem } from "@lemon-site/shared-ui";
import DesktopNavigation from "./DesktopNavigation";
import LanguageSelector from "./LanguageSelector";
import Logo from "./Logo";
import MotionToggle from "./MotionToggle";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

interface DesktopHeaderProps {
  navigationItems: NavigationItem[];
  languageOptions: LanguageOption[];
  isScrolled: boolean;
}

export default function DesktopHeader({
  navigationItems,
  languageOptions,
  isScrolled,
}: DesktopHeaderProps) {
  const { isMotionDisabled } = useSettings();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(languageOptions[0]);

  const headerBg = isScrolled
    ? "bg-black/30 theme-is-light:bg-white/65 backdrop-blur-xl"
    : "bg-transparent";

  const headerBorder = isScrolled
    ? "border-b border-slate-700/30 theme-is-light:border-slate-300/50"
    : "border-b border-transparent";

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 w-full z-30",
        !isMotionDisabled && "transition-all duration-300 ease-in-out",
        "hidden lg:block lg:h-16 lg:shadow-none",
        !isScrolled && "lg:h-20 xl:h-24",
        headerBg,
        headerBorder
      )}
    >
      <div
        className={clsx(
          "max-w-6xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8 relative",
          !isScrolled && "top-[0.3125rem]"
        )}
      >
        <div className="flex items-center">
          <Logo isScrolled={isScrolled} />
          <DesktopNavigation items={navigationItems} />
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1.5">
          <LanguageSelector
            options={languageOptions}
            selectedLanguage={selectedLanguage}
            onLanguageSelect={setSelectedLanguage}
            isScrolled={isScrolled}
            className="hidden lg:block"
          />

          <ThemeToggle isScrolled={isScrolled} className="hidden lg:flex" />

          <MotionToggle isScrolled={isScrolled} className="hidden lg:flex" />

          <div className="ml-1 sm:ml-2 hidden lg:block">
            <UserAvatar isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </header>
  );
}
