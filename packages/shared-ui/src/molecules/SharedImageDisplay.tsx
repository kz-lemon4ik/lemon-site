import clsx from "clsx";
import React from "react";
import { useSettings } from "../contexts/SettingsContext";

export interface SharedImageDisplayProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
  enableHoverEffect?: boolean;
  loading?: "eager" | "lazy";
  placeholderText?: string;
}

const SharedImageDisplay: React.FC<SharedImageDisplayProps> = ({
  src,
  alt,
  aspectRatio,
  className,
  imageClassName,
  onClick,
  enableHoverEffect = false,
  loading = "lazy",
  placeholderText,
}) => {
  const { isMotionDisabled } = useSettings();

  let aspectClass = "";
  if (aspectRatio) {
    const [width, height] = aspectRatio.split("x");
    if (width && height) {
      aspectClass = `aspect-[${width}/${height}]`;
    }
  }

  return (
    <div
      className={clsx(
        "group w-full flex flex-col justify-center items-center text-center",
        onClick && src && "cursor-pointer",
        aspectClass,
        className
      )}
      onClick={onClick && src ? onClick : undefined}
      onKeyDown={
        onClick && src
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      role={onClick && src ? "button" : undefined}
      tabIndex={onClick && src ? 0 : undefined}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={clsx(
            "object-contain rounded-md shadow-md w-full h-auto",
            aspectClass ? "h-full" : "max-h-96",
            !isMotionDisabled &&
              enableHoverEffect &&
              "transition-transform duration-300 group-hover:scale-105 ease-in-out",
            imageClassName
          )}
        />
      ) : (
        <div
          className={clsx(
            "w-full h-48 flex items-center justify-center rounded-md",
            "bg-slate-800/40 border border-slate-700",
            "theme-is-light:bg-white/60 theme-is-light:border theme-is-light:border-themeLight-cardBorder"
          )}
        >
          <p
            className={clsx(
              "text-sm font-medium",
              "text-slate-400",
              "theme-is-light:text-themeLight-mutedText"
            )}
          >
            {placeholderText || alt}
          </p>
        </div>
      )}
    </div>
  );
};

export default SharedImageDisplay;
