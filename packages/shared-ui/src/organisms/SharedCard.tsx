import clsx from "clsx";
import { motion as framerMotion, MotionProps, useInView } from "framer-motion";
import React, { ElementType, useRef } from "react";
import Heading, { Props as HeadingProps } from "../atoms/Heading";
import { useSettings } from "../contexts/SettingsContext";
import SharedImageDisplay, { SharedImageDisplayProps } from "../molecules/SharedImageDisplay";

interface CardImageConfig extends SharedImageDisplayProps {
  placement?: "top" | "bottom" | "left" | "right" | "background" | "none";
  containerClassName?: string;
}

interface CardTitleConfig {
  content?: React.ReactNode;
  size?: HeadingProps["size"];
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  alignment?: "left" | "center" | "right";
}

interface CardMotionConfig {
  enableEntry?: boolean;
  enableHover?: boolean;
  customProps?: MotionProps;
}

interface CardTextConfig {
  base?: string;
  baseStyles?: string;
  alignment?: "left" | "center" | "right" | "justify";
}

interface CardLinkConfig {
  href?: string;
  target?: string;
  rel?: string;
}

export interface SharedCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  children?: React.ReactNode;
  title?: CardTitleConfig;
  image?: CardImageConfig;
  motion?: CardMotionConfig;
  textStyles?: CardTextConfig;
  link?: CardLinkConfig;
  as?: ElementType;
  paddingVariant?: "none" | "small" | "default" | "large";
}

export interface SharedCardImageProps extends CardImageConfig {}
export interface SharedCardTextStyles extends CardTextConfig {}

const SharedCard: React.FC<SharedCardProps> = ({
  children,
  title,
  image,
  motion,
  textStyles,
  link,
  className,
  as = "div",
  paddingVariant = "default",
  ...rest
}) => {
  const { isMotionDisabled } = useSettings();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.05 });

  const enableEntryMotion = motion?.enableEntry ?? true;
  const enableHoverMotion = motion?.enableHover ?? false;
  const customMotionProps = motion?.customProps;

  let MotionComponent: ElementType;
  if (link?.href) {
    MotionComponent = framerMotion.a;
  } else if (typeof as === "string") {
    MotionComponent = framerMotion[as as keyof typeof framerMotion] || framerMotion.div;
  } else {
    MotionComponent = framerMotion(as);
  }

  const baseCardStyles = clsx(
    "backdrop-blur-xl rounded-xl shadow-xl overflow-hidden",
    "bg-black/40 border border-lavender-500/30",
    "theme-is-light:bg-white/60 theme-is-light:backdrop-blur-md theme-is-light:border theme-is-light:border-themeLight-cardBorder theme-is-light:shadow-themeLight-cardShadow"
  );

  const paddingClasses = clsx({
    "p-0": paddingVariant === "none",
    "p-4 sm:p-6": paddingVariant === "small",
    "p-6 sm:p-8": paddingVariant === "default",
    "p-8 sm:p-10": paddingVariant === "large",
  });

  // Handle image placement layouts
  const isImagePlacement = (placement: string) => image?.placement === placement;
  const isTopImage = !image?.placement || isImagePlacement("top");
  const isBottomImage = isImagePlacement("bottom");
  const isLeftImage = isImagePlacement("left");
  const isRightImage = isImagePlacement("right");
  const isBackgroundImage = isImagePlacement("background");

  const imageElement = image && (
    <div
      className={clsx(image.containerClassName, (isLeftImage || isRightImage) && "w-full h-auto")}
    >
      <SharedImageDisplay
        {...image}
        className={clsx(
          image.className,
          (isLeftImage || isRightImage) && "w-full h-auto object-contain rounded-lg shadow-md"
        )}
      />
    </div>
  );

  const titleElement = title && (
    <Heading
      as={title.level}
      size={title.size || "h3"}
      className={clsx(
        title.alignment === "center" && "text-center",
        title.alignment === "right" && "text-right",
        title.className
      )}
    >
      {title.content}
    </Heading>
  );

  const contentElement = (
    <div
      className={clsx(
        textStyles?.base || textStyles?.baseStyles,
        textStyles?.alignment === "center" && "text-center",
        textStyles?.alignment === "right" && "text-right",
        textStyles?.alignment === "justify" && "text-justify"
      )}
    >
      {children}
    </div>
  );

  const cardContent = (
    <>
      {isBackgroundImage && imageElement}

      {isTopImage && imageElement}

      {isLeftImage || isRightImage ? (
        <div
          className={clsx(
            "flex flex-col gap-6",
            isLeftImage && "md:flex-row-reverse",
            isRightImage && "md:flex-row"
          )}
        >
          <div className="md:flex-[1.2]">
            {titleElement}
            {contentElement}
          </div>
          <div className="md:flex-[1.3] flex items-center justify-center min-h-0">
            <div
              className={clsx(
                "w-full max-w-lg mx-auto",
                !isMotionDisabled && "transition-transform duration-300 hover:scale-105"
              )}
            >
              {imageElement}
            </div>
          </div>
        </div>
      ) : (
        <>
          {titleElement}
          {contentElement}
        </>
      )}

      {isBottomImage && imageElement}
    </>
  );

  const Component = as;

  if (isMotionDisabled || !enableEntryMotion) {
    return (
      <Component
        ref={cardRef}
        className={clsx(baseCardStyles, paddingClasses, className)}
        href={link?.href}
        target={link?.target}
        rel={link?.rel}
        {...rest}
      >
        {cardContent}
      </Component>
    );
  }

  return (
    <MotionComponent
      ref={cardRef}
      className={clsx(baseCardStyles, paddingClasses, className)}
      href={link?.href}
      target={link?.target}
      rel={link?.rel}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={enableHoverMotion ? { scale: 1.02 } : undefined}
      {...customMotionProps}
      {...rest}
    >
      {cardContent}
    </MotionComponent>
  );
};

export default SharedCard;
