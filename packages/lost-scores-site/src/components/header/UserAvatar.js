import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { useSettings } from "@lemon-site/shared-ui";
export default function UserAvatar({ avatarUrl, isScrolled = false, isMobile = false, className, }) {
    const { isMotionDisabled } = useSettings();
    const handleError = (e) => {
        const target = e.currentTarget;
        if (target.src !== window.location.origin + "/images/avatars/avatar-default.webp") {
            target.src = "/images/avatars/avatar-default.webp";
        }
    };
    const sizeClasses = isMobile
        ? "w-12 h-12"
        : isScrolled
            ? "w-10 h-10"
            : "w-16 h-16 sm:w-20 sm:h-20";
    return (_jsx("img", { src: avatarUrl || "/images/avatars/avatar-default.webp", onError: handleError, alt: "User Avatar", className: clsx("rounded-full object-cover bg-slate-500 theme-is-light:bg-slate-300", !isMotionDisabled && !isMobile && "transition-[width,height] duration-300 ease-in-out", sizeClasses, className) }));
}
