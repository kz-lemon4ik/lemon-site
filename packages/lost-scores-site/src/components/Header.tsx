import { useSettings, type LanguageOption } from "@lemon-site/shared-ui";
import { useScrollDetection } from "@/hooks/useHeaderState";
import DesktopHeader from "./header/DesktopHeader";
import MobileHeader from "./header/MobileHeader";

const languageOptions: LanguageOption[] = [
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

  if (isHeaderHidden) return null;

  return (
    <>
      <DesktopHeader
        navigationItems={navItems}
        languageOptions={languageOptions}
        isScrolled={isScrolled}
      />
      <MobileHeader
        navigationItems={navItems}
        languageOptions={languageOptions}
        isScrolled={isScrolled}
      />
    </>
  );
}
