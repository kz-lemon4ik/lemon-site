import clsx from "clsx";
import type { ElementType, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  href: string;
  children: ReactNode;
  icon?: ElementType;
  isActive?: boolean;
  onClick?: () => void;
};

export default function NavItem({ href, children, icon: IconComponent, isActive, onClick }: Props) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={clsx(
        "flex items-center space-x-3 px-3 py-2.5 rounded-md text-base font-medium transition-all duration-200 group",
        "focus:outline-none focus:ring-2 focus:ring-purple-400",
        "theme-is-light:focus:ring-themeLight-primary",
        isActive
          ? clsx(
              "shadow-md",
              "bg-purple-600 text-white",
              "theme-is-light:bg-themeLight-sidebarNavItemActiveBg theme-is-light:text-themeLight-sidebarNavItemActiveText"
            )
          : clsx(
              "text-lavender-200 hover:bg-purple-500/40 hover:text-white",
              "theme-is-light:text-themeLight-navItemText theme-is-light:hover:bg-themeLight-sidebarNavItemActiveBg/70 theme-is-light:hover:text-themeLight-sidebarNavItemActiveText"
            )
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {IconComponent && (
        <IconComponent
          size={20}
          className={clsx(
            "transition-colors",
            isActive
              ? clsx("text-white", "theme-is-light:text-themeLight-sidebarNavItemActiveIcon")
              : clsx(
                  "text-lavender-300 group-hover:text-white",
                  "theme-is-light:text-themeLight-sidebarNavItemIcon theme-is-light:group-hover:text-themeLight-sidebarNavItemActiveIcon"
                )
          )}
        />
      )}
      <span className="font-lostnav">{children}</span>
    </Link>
  );
}
