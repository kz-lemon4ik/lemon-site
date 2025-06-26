import clsx from "clsx";
import React, { ElementType } from "react";

export type Props = {
  children: React.ReactNode;
  size?: "sm" | "lg" | "xl" | "h1" | "h2" | "h3" | "h4";
  className?: string;
  as?: ElementType;
};

const Heading: React.FC<Props> = ({ children, size = "lg", className, as }) => {
  const sizeClasses = {
    sm: "text-2xl sm:text-3xl",
    lg: "text-4xl sm:text-5xl",
    xl: "text-5xl sm:text-7xl font-bold",
    h1: "text-4xl sm:text-5xl font-semibold",
    h2: "text-3xl sm:text-4xl font-semibold",
    h3: "text-2xl sm:text-3xl font-semibold",
    h4: "text-xl sm:text-2xl font-semibold",
  };

  const selectedSizeClass = sizeClasses[size] || sizeClasses.lg;

  const Tag =
    as ||
    (size === "xl"
      ? "h1"
      : size === "lg"
        ? "h1"
        : size === "sm"
          ? "h2"
          : size === "h1"
            ? "h1"
            : size === "h2"
              ? "h2"
              : size === "h3"
                ? "h3"
                : size === "h4"
                  ? "h4"
                  : "h2");

  return (
    <Tag
      className={clsx(
        "font-semibold",
        selectedSizeClass,
        "text-slate-100",
        "theme-is-light:text-themeLight-headingText",
        `theme-is-light:drop-shadow-[0_0_8px_var(--color-heading-drop-shadow)]`,
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
