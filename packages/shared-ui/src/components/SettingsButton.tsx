import clsx from "clsx";
import { Settings as SettingsIcon } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function SettingsButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "fixed bottom-6 right-6 z-30 p-3 backdrop-blur-md border rounded-full transition-all duration-200 shadow-lg",
        "bg-white/10 hover:bg-white/20 border-white/10 text-lavender-200 hover:text-lemon-400",
        "theme-is-light:bg-themeLight-actionButtonBaseBg theme-is-light:hover:bg-themeLight-actionButtonHoverBg theme-is-light:border-themeLight-actionButtonBorder theme-is-light:text-themeLight-actionButtonText theme-is-light:hover:text-themeLight-actionButtonHoverText"
      )}
      aria-label="Open settings"
    >
      <SettingsIcon size={24} strokeWidth={2} />
    </button>
  );
}
