import { useEffect, useState } from "react";
import type { LanguageOption } from "@lemon-site/shared-ui";

export function useMobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    openMobileMenu: () => setIsMobileMenuOpen(true),
    closeMobileMenu: () => setIsMobileMenuOpen(false),
  };
}

export function useLanguageSelector(initialLanguage: LanguageOption) {
  const [selectedLang, setSelectedLang] = useState<LanguageOption>(initialLanguage);

  const selectLanguage = (lang: LanguageOption) => {
    setSelectedLang(lang);
  };

  return {
    selectedLang,
    selectLanguage,
  };
}

export function useScrollDetection() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderOnScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderOnScroll);
  }, []);

  return { isScrolled };
}

export function useLogoInteraction() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMobileLogoActive, setIsMobileLogoActive] = useState(false);

  return {
    isLogoHovered,
    setIsLogoHovered,
    isMobileLogoActive,
    setIsMobileLogoActive,
  };
}
