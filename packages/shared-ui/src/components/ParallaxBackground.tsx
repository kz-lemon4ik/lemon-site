import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSettings } from "../contexts";
import { useDebounce } from "../hooks/useDebounce";
import { useImagePreloader } from "../hooks/useImagePreloader";

export interface ParallaxImagePaths {
  desktopDark: string;
  desktopLight: string;
  mobileDark: string;
  mobileLight: string;
}

type Props = {
  imagePaths: ParallaxImagePaths;
};

export default function ParallaxBackground({ imagePaths }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { isMotionDisabled, theme } = useSettings();

  const allImagePaths = useMemo(
    () => [
      imagePaths.desktopDark,
      imagePaths.desktopLight,
      imagePaths.mobileDark,
      imagePaths.mobileLight,
    ],
    [imagePaths]
  );

  const { isLoading, isImageLoaded } = useImagePreloader(allImagePaths);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });

  const [currentBg, setCurrentBg] = useState<string>("");

  const debouncedCheckMobile = useDebounce(() => {
    setIsMobile(typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);
  }, 150);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);
    };
    checkIsMobile();
    window.addEventListener("resize", debouncedCheckMobile);
    return () => window.removeEventListener("resize", debouncedCheckMobile);
  }, [debouncedCheckMobile]);

  useEffect(() => {
    const newBg = isMobile
      ? theme === "light"
        ? imagePaths.mobileLight
        : imagePaths.mobileDark
      : theme === "light"
        ? imagePaths.desktopLight
        : imagePaths.desktopDark;

    setCurrentBg(newBg);
  }, [
    theme,
    isMobile,
    imagePaths.desktopDark,
    imagePaths.desktopLight,
    imagePaths.mobileDark,
    imagePaths.mobileLight,
  ]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (ref.current) {
      const x = (0.5 - e.clientX / window.innerWidth) * 20;
      const y = (0.5 - e.clientY / window.innerHeight) * 20;
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (ref.current) {
        ref.current.style.transform = "translate(0px, 0px)";
      }
      return;
    }

    if (isMotionDisabled) {
      if (ref.current) {
        ref.current.style.transform = `translate(0px, 0px)`;
      }
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMotionDisabled, isMobile, handleMouseMove]);

  if (!currentBg || isLoading || !isImageLoaded(currentBg)) {
    return (
      <div
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundColor: theme === "light" ? "#f8fafc" : "#0f172a",
        }}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={`
        fixed 
        top-[-5%] left-[-5%] 
        w-[120vw] h-[120vh] 
        -z-10 pointer-events-none 
        transition-transform ease-out
        ${isMotionDisabled || isMobile ? "duration-0" : "duration-200"} 
      `}
      style={{
        backgroundImage: `url("${currentBg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: theme === "light" ? "#f8fafc" : "#0f172a",
        filter:
          theme === "light"
            ? `brightness(0.95) ${isMobile ? "" : "blur(5px)"}`
            : `brightness(0.3) ${isMobile ? "" : "blur(5px)"}`,
        willChange: "transform, background-image",
        transitionProperty: "transform, background-image",
        transitionDuration: isMotionDisabled || isMobile ? "500ms" : "200ms, 500ms",
      }}
      data-bg={currentBg}
    />
  );
}
