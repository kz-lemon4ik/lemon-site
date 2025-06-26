import clsx from "clsx";
import React from "react";
import { useSettings } from "../contexts/SettingsContext";

type AnchorLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  offsetY?: number;
};

const AnchorLink: React.FC<AnchorLinkProps> = ({ to, children, className, offsetY = -90 }) => {
  const { isMotionDisabled } = useSettings();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const elementId = to.startsWith("#") ? to.substring(1) : to;
    const element = document.getElementById(elementId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + offsetY;

      window.scrollTo({ top: y, behavior: isMotionDisabled ? "auto" : "smooth" });
    }
  };

  const defaultStyles = clsx(
    "font-semibold transition-colors duration-200",
    "text-lemon-400 hover:text-lavender-300",
    "theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover"
  );

  return (
    <a href={to} onClick={handleClick} className={clsx(defaultStyles, className)}>
      {children}
    </a>
  );
};

export default AnchorLink;
