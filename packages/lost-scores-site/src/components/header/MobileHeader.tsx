import clsx from "clsx";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSettings, type LanguageOption } from "@lemon-site/shared-ui";
import LanguageSelector from "./LanguageSelector";
import Logo from "./Logo";
import MotionToggle from "./MotionToggle";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

interface NavigationItem {
  href: string;
  label: string;
}

interface MobileHeaderProps {
  navigationItems: NavigationItem[];
  languageOptions: LanguageOption[];
  isScrolled: boolean;
  userAvatarUrl?: string | null;
}

export default function MobileHeader({
  navigationItems,
  languageOptions,
  isScrolled,
  userAvatarUrl,
}: MobileHeaderProps) {
  const { isMotionDisabled } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(languageOptions[0]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const headerBg = isScrolled
    ? "bg-slate-800/90 theme-is-light:bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-700/30 theme-is-light:border-slate-300/50"
    : "bg-transparent";

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 w-full z-30 lg:hidden",
          !isMotionDisabled && "transition-all duration-300 ease-in-out",
          "h-16",
          headerBg
        )}
      >
        <div className="h-full flex items-center justify-between px-4">
          <Logo isMobile />

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={clsx(
              "p-2 transition-all duration-200 ease-in-out focus:outline-none bg-transparent",
              "text-lavender-200 hover:text-lemon-400",
              "theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600"
            )}
            aria-label="Open mobile menu"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isMotionDisabled ? 0 : 0.2 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div
            className="absolute inset-0 bg-slate-900/80 theme-is-light:bg-slate-900/60"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: isMotionDisabled ? 0 : 0.3, ease: "easeInOut" }}
            className="relative bg-slate-800/90 theme-is-light:bg-white/80 backdrop-blur-md border-b border-slate-700/30 theme-is-light:border-slate-300/50 overflow-hidden"
            style={{ maxHeight: "70vh" }}
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/30 theme-is-light:border-slate-300/50">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
                <img
                  src="/images/logos/logo-default.png"
                  alt="Lost Scores"
                  className="h-9 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  "p-2 transition-all duration-200 ease-in-out focus:outline-none bg-transparent",
                  "text-lavender-200 hover:text-lemon-400",
                  "theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600"
                )}
                aria-label="Close menu"
              >
                <ChevronUp size={20} />
              </button>
            </div>

            <div className="px-4 py-4 bg-slate-900/40 theme-is-light:bg-slate-100/60 border-b border-slate-700/30 theme-is-light:border-slate-300/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserAvatar avatarUrl={userAvatarUrl} isMobile />
                  <div>
                    <div className="text-sm font-medium text-lavender-200 theme-is-light:text-slate-700">
                      KZ_Lemon4ik
                    </div>
                    <div className="text-xs text-slate-400 theme-is-light:text-slate-500">
                      Guest User
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <LanguageSelector
                    options={languageOptions}
                    selectedLanguage={selectedLanguage}
                    onLanguageSelect={setSelectedLanguage}
                    isMobile
                  />

                  <ThemeToggle isMobile />
                  <MotionToggle isMobile />
                </div>
              </div>
            </div>

            <nav className="px-4 py-4">
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center px-4 py-3 text-base font-medium transition-colors font-lostnav rounded-md",
                        isActive
                          ? "text-lemon-400 theme-is-light:text-sky-600 bg-slate-700/30 theme-is-light:bg-sky-100/70"
                          : "text-lavender-200 hover:text-lemon-400 theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600 hover:bg-slate-700/20 theme-is-light:hover:bg-slate-100/50"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
