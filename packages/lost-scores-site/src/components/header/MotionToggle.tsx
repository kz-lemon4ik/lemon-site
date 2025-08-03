import clsx from "clsx";
import { Zap, ZapOff } from "lucide-react";
import { useSettings } from "@lemon-site/shared-ui";
import { createButtonClasses } from "../../styles/utils";

interface MotionToggleProps {
  isScrolled?: boolean;
  isMobile?: boolean;
  className?: string;
}

export default function MotionToggle({
  isScrolled = false,
  isMobile = false,
  className,
}: MotionToggleProps) {
  const { isMotionDisabled, setIsMotionDisabled } = useSettings();
  const iconSize = isMobile ? 18 : isScrolled ? 18 : 20;

  return (
    <button
      onClick={() => setIsMotionDisabled(!isMotionDisabled)}
      className={clsx(createButtonClasses(isMobile ? "iconOnlyMobile" : "iconOnly"), className)}
      aria-label={isMotionDisabled ? "Enable motion" : "Disable motion"}
      title={isMotionDisabled ? "Enable motion" : "Disable motion"}
    >
      {isMotionDisabled ? <ZapOff size={iconSize} /> : <Zap size={iconSize} />}
    </button>
  );
}
