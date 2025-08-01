import clsx from "clsx";
import { buttonStyles, cardStyles, installationStyles, textStyles, } from "./theme";
export function createButtonClasses(variant = "iconOnly") {
    return clsx(buttonStyles.base, variant === "iconOnly" ? buttonStyles.iconOnly : buttonStyles.iconOnlyMobile, buttonStyles.colors.primary, variant === "iconOnly" ? buttonStyles.colors.background : buttonStyles.colors.backgroundMobile);
}
export function createTextClasses(size = "base") {
    return clsx(textStyles.base, textStyles.sizes[size]);
}
export function createLinkClasses() {
    return textStyles.linkWithUnderline;
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
