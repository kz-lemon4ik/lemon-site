import clsx from "clsx";
import React from "react";
import { FaDiscord, FaGithub, FaTelegram, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiOsu } from "react-icons/si";

export type SocialPlatform =
  | "github"
  | "twitter"
  | "youtube"
  | "twitch"
  | "discord"
  | "telegram"
  | "osu";

interface PlatformConfig {
  IconComponent: React.ElementType;
  ariaLabel: string;
  darkHoverClass: string;
  lightHoverClass: string;
}

const platformData: Record<SocialPlatform, PlatformConfig> = {
  github: {
    IconComponent: FaGithub,
    ariaLabel: "GitHub",
    darkHoverClass: "hover:text-white",
    lightHoverClass: "theme-is-light:hover:text-themeLight-socialGithubHover",
  },
  telegram: {
    IconComponent: FaTelegram,
    ariaLabel: "Telegram",
    darkHoverClass: "hover:text-[#a0d8ef]",
    lightHoverClass: "theme-is-light:hover:text-themeLight-socialTelegramHover",
  },
  osu: {
    IconComponent: SiOsu,
    ariaLabel: "osu!",
    darkHoverClass: "hover:text-[#ffb6ff]",
    lightHoverClass: "theme-is-light:hover:text-themeLight-socialOsuHover",
  },
  youtube: {
    IconComponent: FaYoutube,
    ariaLabel: "YouTube",
    darkHoverClass: "hover:text-[#ff6c6c]",
    lightHoverClass: "theme-is-light:hover:text-themeLight-socialYoutubeHover",
  },
  twitch: {
    IconComponent: FaTwitch,
    ariaLabel: "Twitch",
    darkHoverClass: "hover:text-[#d2b4ff]",
    lightHoverClass: "theme-is-light:hover:text-themeLight-socialTwitchHover",
  },
  discord: {
    IconComponent: FaDiscord,
    ariaLabel: "Discord",
    darkHoverClass: "hover:text-[#b3bafc]",
    lightHoverClass: "theme-is-light:hover:text-themeLight-socialDiscordHover",
  },
  twitter: {
    IconComponent: FaTwitter,
    ariaLabel: "Twitter",
    darkHoverClass: "hover:text-[#1DA1F2]",
    lightHoverClass: "theme-is-light:hover:text-sky-500",
  },
};

type Props = {
  href: string;
  platform: SocialPlatform;
  className?: string;
};

export default function SocialLink({ href, platform, className }: Props) {
  const config = platformData[platform];
  if (!config) {
    console.warn(`SocialLink: Unknown platform "${platform}"`);
    return null;
  }
  const { IconComponent, ariaLabel, darkHoverClass, lightHoverClass } = config;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={clsx(
        "text-white/60 theme-is-light:text-themeLight-socialIconText",
        "text-4xl sm:text-6xl",
        "transition-all duration-300 origin-center",
        darkHoverClass,
        lightHoverClass,
        className
      )}
    >
      <IconComponent />
    </a>
  );
}
