import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { Zap, ZapOff } from "lucide-react";
import { useSettings } from "@lemon-site/shared-ui";
import { createButtonClasses } from "../../styles/utils";
export default function MotionToggle({ isScrolled = false, isMobile = false, className, }) {
    const { isMotionDisabled, setIsMotionDisabled } = useSettings();
    const iconSize = isMobile ? 18 : isScrolled ? 18 : 20;
    return (_jsx("button", { onClick: () => setIsMotionDisabled(!isMotionDisabled), className: clsx(createButtonClasses(isMobile ? "iconOnlyMobile" : "iconOnly"), className), "aria-label": isMotionDisabled ? "Enable motion" : "Disable motion", title: isMotionDisabled ? "Enable motion" : "Disable motion", children: isMotionDisabled ? _jsx(ZapOff, { size: iconSize }) : _jsx(Zap, { size: iconSize }) }));
}
