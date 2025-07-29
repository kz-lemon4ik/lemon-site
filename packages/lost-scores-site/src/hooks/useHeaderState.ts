import { useEffect, useState } from "react";

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
