import clsx from "clsx";
import React, { ElementType, ReactNode } from "react";
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";

export interface ButtonBaseProps {
  children: ReactNode;
  variant?:
    | "default"
    | "accent"
    | "outlineAccent"
    | "outlinePurple"
    | "solidPurple"
    | "solidSky"
    | "transparentNeutral";
  size?: "sm" | "md" | "lg";
  leftIcon?: ElementType;
  rightIcon?: ElementType;
  className?: string;
  disabled?: boolean;
  enableMotion?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  target?: string;
  rel?: string;
  to?: ReactRouterLinkProps["to"];
}

type AsProp<E extends ElementType> = {
  as?: E;
};

type PolymorphicButtonProps<E extends ElementType> = ButtonBaseProps &
  AsProp<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof (ButtonBaseProps & AsProp<E>)>;

const Button = <E extends ElementType = "button">({
  children,
  as,
  href,
  to,
  onClick,
  variant = "default",
  size = "md",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  disabled,
  type = "button",
  target,
  rel,
  enableMotion = false,
  ...rest
}: PolymorphicButtonProps<E>) => {
  const { isMotionDisabled } = useSettings();
  const actualEnableMotion = enableMotion && !isMotionDisabled;

  const baseClasses = clsx(
    "inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-300 backdrop-blur-md shadow-lg border",
    { "gap-x-2": LeftIcon || RightIcon },
    actualEnableMotion && "transform hover:scale-105 will-change-transform"
  );

  const sizeClasses = {
    sm: "px-6 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-7 py-3 text-lg rounded-xl",
  };

  const variantClasses = {
    default: clsx(
      "bg-white/10 hover:bg-white/20 border-white/20 text-white focus:ring-slate-400",
      "theme-is-light:bg-slate-100/50 theme-is-light:hover:bg-slate-200/70 theme-is-light:text-slate-700 theme-is-light:border-slate-400 theme-is-light:focus:ring-themeLight-primary"
    ),
    accent: clsx(
      "bg-lemon-400/20 hover:bg-lemon-400/30 border-lemon-400/40 text-lemon-400 hover:text-lemon-300 focus:ring-lemon-400",
      "theme-is-light:bg-themeLight-primary/20 theme-is-light:hover:bg-themeLight-primary/30 theme-is-light:border-themeLight-primary/40 theme-is-light:text-themeLight-primary theme-is-light:hover:text-themeLight-primaryHover theme-is-light:focus:ring-themeLight-primary"
    ),
    outlineAccent: clsx(
      "bg-transparent hover:bg-lemon-400/10 border-lemon-400/60 text-lemon-400 hover:text-lemon-300 focus:ring-lemon-400",
      "theme-is-light:bg-transparent theme-is-light:hover:bg-themeLight-primary/10 theme-is-light:border-themeLight-primary/60 theme-is-light:text-themeLight-primary theme-is-light:hover:text-themeLight-primaryHover theme-is-light:focus:ring-themeLight-primary"
    ),
    outlinePurple: clsx(
      "bg-transparent hover:bg-purple-500/10 border-purple-500/60 text-purple-400 hover:text-purple-300 focus:ring-purple-500",
      "theme-is-light:bg-transparent theme-is-light:hover:bg-themeLight-primary/10 theme-is-light:border-themeLight-primary/60 theme-is-light:text-themeLight-primary theme-is-light:hover:text-themeLight-primaryHover theme-is-light:focus:ring-themeLight-primary"
    ),
    solidPurple: clsx(
      "bg-purple-600/20 hover:bg-purple-600/30 border-purple-500/40 text-purple-400 hover:text-purple-300 focus:ring-purple-500",
      "theme-is-light:bg-themeLight-primary/20 theme-is-light:hover:bg-themeLight-primary/30 theme-is-light:border-themeLight-primary/40 theme-is-light:text-themeLight-primary theme-is-light:hover:text-themeLight-primaryHover theme-is-light:focus:ring-themeLight-primary"
    ),
    solidSky: clsx(
      "bg-sky-500/20 hover:bg-sky-500/30 border-sky-500/40 text-sky-400 hover:text-sky-300 focus:ring-sky-400",
      "theme-is-light:bg-themeLight-primary/20 theme-is-light:hover:bg-themeLight-primary/30 theme-is-light:border-themeLight-primary/40 theme-is-light:text-themeLight-primary theme-is-light:hover:text-themeLight-primaryHover theme-is-light:focus:ring-themeLight-primary"
    ),
    transparentNeutral: clsx(
      "bg-white/10 hover:bg-white/20 border-slate-600/40 text-white focus:ring-slate-400",
      "theme-is-light:bg-slate-100/50 theme-is-light:hover:bg-slate-200/70 theme-is-light:text-slate-700 theme-is-light:border-slate-400/40 theme-is-light:focus:ring-themeLight-primary"
    ),
  };

  const combinedClassName = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const iconSize = size === "sm" ? 18 : size === "md" ? 20 : 22;

  const content = (
    <>
      {LeftIcon && <LeftIcon size={iconSize} className="button-icon-left" />}
      {children}
      {RightIcon && <RightIcon size={iconSize} className="button-icon-right" />}
    </>
  );

  let Element: ElementType = as || "button";
  const elementProps: any = {
    className: combinedClassName,
    disabled,
    onClick,
    ...rest,
  };

  if (to) {
    Element = ReactRouterLink;
    elementProps.to = to;
  } else if (href) {
    Element = "a";
    elementProps.href = href;
    elementProps.target = target;
    elementProps.rel = rel;
  } else if (Element === "button") {
    elementProps.type = type;
  }

  return <Element {...elementProps}>{content}</Element>;
};

export default Button;
