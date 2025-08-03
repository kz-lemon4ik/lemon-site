import clsx from "clsx";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSettings } from "@lemon-site/shared-ui";

interface NavigationItem {
  href: string;
  label: string;
}

interface DesktopNavigationProps {
  items: NavigationItem[];
  className?: string;
}

export default function DesktopNavigation({ items, className }: DesktopNavigationProps) {
  const { isMotionDisabled } = useSettings();

  const baseStyles =
    "py-2 px-2.5 rounded-md font-medium transition-all duration-150 ease-in-out transform relative font-lostnav text-base sm:text-lg";
  const inactiveStyles =
    "text-lavender-200 hover:text-lemon-400 theme-is-light:text-slate-600 theme-is-light:hover:text-sky-600";
  const activeStyles =
    "text-white hover:text-white theme-is-light:text-slate-800 theme-is-light:hover:text-slate-800";

  return (
    <nav
      className={clsx(
        "items-center space-x-0.5 sm:space-x-1.5 hidden lg:flex",
        !isMotionDisabled && "transition-opacity duration-300 ease-in-out",
        className
      )}
    >
      {items.map((item) => (
        <NavLink
          key={item.label}
          to={item.href}
          className={({ isActive }) => clsx(baseStyles, isActive ? activeStyles : inactiveStyles)}
        >
          {({ isActive }) => (
            <>
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  className={clsx(
                    "absolute bottom-0 left-0 w-full h-nav-underline",
                    "bg-lemon-400 theme-is-light:bg-sky-600"
                  )}
                  layoutId="underline"
                  transition={
                    isMotionDisabled
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 30 }
                  }
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
