import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useSettings } from "@lemon-site/shared-ui";
import { useScrollDetection } from "@/hooks/useHeaderState";
import DesktopHeader from "./header/DesktopHeader";
import MobileHeader from "./header/MobileHeader";
const languageOptions = [
    { code: "GB", name: "English" },
    { code: "RU", name: "Русский" },
    { code: "KZ", name: "Қазақша" },
    { code: "IT", name: "Italiano" },
];
const navItems = [
    { href: "/about-program", label: "About" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/hall-of-fame", label: "Hall of Fame" },
    { href: "/installation", label: "Installation" },
    { href: "/downloads", label: "Downloads" },
    { href: "/faq", label: "FAQ" },
];
export default function Header() {
    const { isHeaderHidden } = useSettings();
    const { isScrolled } = useScrollDetection();
    const userAvatarUrl = null;
    if (isHeaderHidden)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx(DesktopHeader, { navigationItems: navItems, languageOptions: languageOptions, isScrolled: isScrolled, userAvatarUrl: userAvatarUrl }), _jsx(MobileHeader, { navigationItems: navItems, languageOptions: languageOptions, isScrolled: isScrolled, userAvatarUrl: userAvatarUrl })] }));
}
