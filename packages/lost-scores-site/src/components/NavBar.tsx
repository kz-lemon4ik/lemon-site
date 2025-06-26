import clsx from "clsx";
import {
  Download,
  HardDriveDownload,
  HelpCircle,
  Home,
  Info,
  MessageSquare,
  Settings2,
  Users,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSettings } from "@lemon-site/shared-ui";
import NavItem from "../molecules/NavItem";

interface LostScoresNavBarProps {
  isNavOpen: boolean;
  toggleNav: () => void;
}

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about-program", label: "About", icon: Info },
  { href: "/how-it-works", label: "How It Works", icon: Settings2 },
  { href: "/hall-of-fame", label: "Hall of Fame", icon: Users },
  { href: "/installation", label: "Installation", icon: HardDriveDownload },
  { href: "/downloads", label: "Downloads", icon: Download },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/feedback", label: "Feedback", icon: MessageSquare },
];

export default function LostScoresNavBar({ isNavOpen, toggleNav }: LostScoresNavBarProps) {
  const location = useLocation();
  const { isMotionDisabled } = useSettings();

  const closeMenuAfterNavigation = () => {
    if (isNavOpen) {
      toggleNav();
    }
  };

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 h-full shadow-lg z-20 flex flex-col pt-20",
          "bg-neutral-800/90 backdrop-blur-md border-r border-neutral-700",
          "theme-is-light:bg-themeLight-navBarBackground theme-is-light:border-r theme-is-light:border-themeLight-border",
          !isMotionDisabled && "transition-transform duration-300 ease-in-out",
          isNavOpen ? "translate-x-0 w-64 sm:w-72 p-4" : "-translate-x-full w-64 sm:w-72 p-4"
        )}
      >
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavItem
                key={item.label}
                href={item.href}
                icon={item.icon}
                isActive={isActive}
                onClick={closeMenuAfterNavigation}
              >
                {item.label}
              </NavItem>
            );
          })}
        </div>
      </nav>
      {isNavOpen && (
        <div
          onClick={toggleNav}
          className={clsx(
            "fixed inset-0 z-10 bg-black/50 md:hidden",
            !isMotionDisabled && "backdrop-blur-sm"
          )}
          aria-hidden="true"
        />
      )}
    </>
  );
}
