import clsx from "clsx";
import React, { ElementType } from "react";
import {
  FaDiscord,
  FaGithub,
  FaGoogleDrive,
  FaTelegram,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SiMediafire, SiMega, SiOsu } from "react-icons/si";

export type IconLinkPlatform =
  | "github"
  | "twitter"
  | "youtube"
  | "twitch"
  | "discord"
  | "telegram"
  | "osu"
  | "googledrive"
  | "mega"
  | "mediafire";

interface PlatformDetail {
  defaultIcon: ElementType;
  defaultAriaLabel: string;
  darkHoverColorClass: string;
  lightHoverColorClass: string;
  baseColorClass: string;
}

const platformDetails: Record<IconLinkPlatform, PlatformDetail> = {
  github: {
    defaultIcon: FaGithub,
    defaultAriaLabel: "GitHub",
    baseColorClass: "text-white/60 theme-is-light:text-themeLight-socialIconText",
    darkHoverColorClass: "hover:text-white",
    lightHoverColorClass: "theme-is-light:hover:text-themeLight-socialGithubHover",
  },
  telegram: {
    defaultIcon: FaTelegram,
    defaultAriaLabel: "Telegram",
    baseColorClass: "text-white/60 theme-is-light:text-themeLight-socialIconText",
    darkHoverColorClass: "hover:text-[#a0d8ef]",
    lightHoverColorClass: "theme-is-light:hover:text-themeLight-socialTelegramHover",
  },
  osu: {
    defaultIcon: SiOsu,
    defaultAriaLabel: "osu!",
    baseColorClass: "text-white/60 theme-is-light:text-themeLight-socialIconText",
    darkHoverColorClass: "hover:text-[#ffb6ff]",
    lightHoverColorClass: "theme-is-light:hover:text-themeLight-socialOsuHover",
  },
  youtube: {
    defaultIcon: FaYoutube,
    defaultAriaLabel: "YouTube",
    baseColorClass: "text-white/60 theme-is-light:text-themeLight-socialIconText",
    darkHoverColorClass: "hover:text-[#ff6c6c]",
    lightHoverColorClass: "theme-is-light:hover:text-themeLight-socialYoutubeHover",
  },
  twitch: {
    defaultIcon: FaTwitch,
    defaultAriaLabel: "Twitch",
    baseColorClass: "text-white/60 theme-is-light:text-themeLight-socialIconText",
    darkHoverColorClass: "hover:text-[#d2b4ff]",
    lightHoverColorClass: "theme-is-light:hover:text-themeLight-socialTwitchHover",
  },
  discord: {
    defaultIcon: FaDiscord,
    defaultAriaLabel: "Discord",
    baseColorClass: "text-white/60 theme-is-light:text-themeLight-socialIconText",
    darkHoverColorClass: "hover:text-[#b3bafc]",
    lightHoverColorClass: "theme-is-light:hover:text-themeLight-socialDiscordHover",
  },
  twitter: {
    defaultIcon: FaTwitter,
    defaultAriaLabel: "Twitter",
    baseColorClass: "text-white/60 theme-is-light:text-themeLight-socialIconText",
    darkHoverColorClass: "hover:text-[#1DA1F2]",
    lightHoverColorClass: "theme-is-light:hover:text-sky-500",
  },
  googledrive: {
    defaultIcon: FaGoogleDrive,
    defaultAriaLabel: "Google Drive",
    baseColorClass: "text-white/60 theme-is-light:text-themeLight-socialIconText",
    darkHoverColorClass: "hover:text-[#4285F4]",
    lightHoverColorClass: "theme-is-light:hover:text-[#4285F4]",
  },
  mega: {
    defaultIcon: SiMega,
    defaultAriaLabel: "Mega.nz",
    baseColorClass: "text-white/60 theme-is-light:text-themeLight-socialIconText",
    darkHoverColorClass: "hover:text-[#D9272E]",
    lightHoverColorClass: "theme-is-light:hover:text-[#D9272E]",
  },
  mediafire: {
    defaultIcon: SiMediafire,
    defaultAriaLabel: "MediaFire",
    baseColorClass: "text-white/60 theme-is-light:text-themeLight-socialIconText",
    darkHoverColorClass: "hover:text-[#1CB0F6]",
    lightHoverColorClass: "theme-is-light:hover:text-[#1CB0F6]",
  },
};

export interface IconLinkProps {
  href: string;
  platform?: IconLinkPlatform;
  label?: string;
  icon?: ElementType;
  iconSize?: number;
  className?: string;
  target?: string;
  rel?: string;
}

const IconLink: React.FC<IconLinkProps> = ({
  href,
  platform,
  label,
  icon: CustomIcon,
  iconSize,
  className,
  target = "_blank",
  rel = "noopener noreferrer",
}) => {
  let IconComponentToRender: ElementType | undefined = CustomIcon;
  let ariaLabelToRender: string | undefined = label;
  let baseColorClassApplied: string | undefined;
  let darkHoverColorClassApplied: string | undefined;
  let lightHoverColorClassApplied: string | undefined;

  if (platform) {
    const details = platformDetails[platform];
    if (details) {
      if (!CustomIcon) IconComponentToRender = details.defaultIcon;
      if (!label) ariaLabelToRender = details.defaultAriaLabel;
      baseColorClassApplied = details.baseColorClass;
      darkHoverColorClassApplied = details.darkHoverColorClass;
      lightHoverColorClassApplied = details.lightHoverColorClass;
    } else if (!CustomIcon) {
      return null;
    }
  }

  if (!IconComponentToRender) {
    return null;
  }
  if (!ariaLabelToRender && href) {
    ariaLabelToRender = `Link to ${platform || href.substring(0, 20)}`;
  }

  const iconProps = iconSize !== undefined ? { size: iconSize } : {};

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabelToRender}
      className={clsx(
        "inline-block transition-all duration-300",
        baseColorClassApplied,
        darkHoverColorClassApplied,
        lightHoverColorClassApplied,
        className
      )}
    >
      <IconComponentToRender {...iconProps} />
    </a>
  );
};

export default IconLink;
