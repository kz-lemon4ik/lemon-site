import clsx from "clsx";
import {
  buttonStyles,
  cardStyles,
  headerStyles,
  installationStyles,
  navStyles,
  textStyles,
} from "./theme";

export function createButtonClasses(variant: "iconOnly" | "iconOnlyMobile" = "iconOnly") {
  return clsx(
    buttonStyles.base,
    variant === "iconOnly" ? buttonStyles.iconOnly : buttonStyles.iconOnlyMobile,
    buttonStyles.colors.primary,
    variant === "iconOnly" ? buttonStyles.colors.background : buttonStyles.colors.backgroundMobile
  );
}

export function createTextClasses(size: keyof typeof textStyles.sizes = "base") {
  return clsx(textStyles.base, textStyles.sizes[size]);
}

export function createHeadingClasses(size: keyof typeof textStyles.sizes = "xl") {
  return clsx(textStyles.heading, textStyles.sizes[size]);
}

export function createLinkClasses() {
  return textStyles.linkWithUnderline;
}

export function createNavLinkClasses(isActive: boolean) {
  return clsx(
    navStyles.link.base,
    textStyles.sizes.base,
    isActive ? navStyles.link.active : navStyles.link.inactive
  );
}

export function createHeaderClasses(isScrolled: boolean, isMobile: boolean = false) {
  return clsx(
    headerStyles.base,
    isMobile ? headerStyles.mobile : headerStyles.desktop,
    !isScrolled && !isMobile && "lg:h-20 xl:h-24",
    isScrolled
      ? isMobile
        ? headerStyles.background.scrolledMobile
        : headerStyles.background.scrolled
      : headerStyles.background.transparent,
    isScrolled ? headerStyles.border.scrolled : headerStyles.border.transparent
  );
}

export function createCardClasses() {
  return clsx(cardStyles.base, cardStyles.background, cardStyles.border);
}

export function createImageWrapperClasses() {
  return cardStyles.imageWrapper;
}

export function createTitleClasses() {
  return installationStyles.title;
}

export function createSubtitleClasses() {
  return installationStyles.subtitle;
}

export function createCardTitleClasses() {
  return installationStyles.cardTitle;
}
