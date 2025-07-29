import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  href: string;
  children: ReactNode;
};

export default function NavItem({ href, children }: Props) {
  return (
    <Link
      to={href}
      className="h-full px-3 sm:px-6 min-w-nav-small sm:min-w-nav-large text-xs sm:text-sm flex items-center justify-center uppercase tracking-wide text-lavender-300 hover:text-lemon-400 theme-is-light:text-themeLight-navItemText theme-is-light:hover:text-themeLight-navItemTextHover transition-colors font-nav"
    >
      {children}
    </Link>
  );
}
