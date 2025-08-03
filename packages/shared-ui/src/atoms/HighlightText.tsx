import clsx from "clsx";
import React from "react";

type HighlightTextProps = {
  children: React.ReactNode;
  className?: string;
};

const HighlightText: React.FC<HighlightTextProps> = ({ children, className }) => {
  return (
    <strong
      className={clsx(
        "font-semibold",
        "text-lemon-400",
        "theme-is-light:text-themeLight-highlightTextColor",
        className
      )}
    >
      {children}
    </strong>
  );
};

export default HighlightText;
