import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "@lemon-site/shared-ui";

interface LogoProps {
  isScrolled?: boolean;
  isMobile?: boolean;
  onMobileInteraction?: (isActive: boolean) => void;
  className?: string;
}

export default function Logo({
  isScrolled = false,
  isMobile = false,
  onMobileInteraction,
  className,
}: LogoProps) {
  const { isMotionDisabled } = useSettings();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.src.includes("logo-active")) {
      target.src = "/images/logos/logo-default.webp";
    } else {
      target.style.display = "none";
      const textFallback = document.createElement("span");
      textFallback.textContent = "Lost Scores";
      textFallback.className = "text-white font-bold text-xl";
      target.parentNode?.appendChild(textFallback);
    }
  };

  const handleMobileTouch = (active: boolean) => {
    setIsMobileActive(active);
    onMobileInteraction?.(active);
    if (active) {
      setTimeout(() => {
        setIsMobileActive(false);
        onMobileInteraction?.(false);
      }, 150);
    }
  };

  const logoSrc = isMobile
    ? isMobileActive
      ? "/images/logos/logo-active.webp"
      : "/images/logos/logo-default.webp"
    : isHovered
      ? "/images/logos/logo-active.webp"
      : "/images/logos/logo-default.webp";

  const sizeClasses = isMobile ? "h-9" : clsx("h-11 lg:h-11", !isScrolled && "lg:h-16 xl:h-20");

  const linkProps = isMobile
    ? {
        onTouchStart: () => handleMobileTouch(true),
        onTouchEnd: () => handleMobileTouch(false),
        onMouseDown: () => handleMobileTouch(true),
        onMouseUp: () => handleMobileTouch(false),
        onMouseLeave: () => handleMobileTouch(false),
      }
    : {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      };

  return (
    <Link
      to="/"
      className={clsx(
        "flex items-center",
        !isMobile && "mr-2 sm:mr-4 hover:scale-110",
        !isMobile && !isMotionDisabled && "transition-transform duration-200 ease-in-out",
        className
      )}
      aria-label="Go to homepage"
      {...linkProps}
    >
      <img
        src={logoSrc}
        onError={handleError}
        alt="Lost Scores Site Logo"
        className={clsx(
          "w-auto",
          !isMotionDisabled && !isMobile && "transition-all duration-300 ease-in-out",
          sizeClasses
        )}
      />
    </Link>
  );
}
