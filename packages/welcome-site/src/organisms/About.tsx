import clsx from "clsx";
import { motion } from "framer-motion";
import { Button, IconLink, useSettings, type IconLinkPlatform } from "@lemon-site/shared-ui";

interface AboutSocialLink {
  href: string;
  platform: IconLinkPlatform;
  label: string;
}

const aboutSocialLinks: AboutSocialLink[] = [
  { href: "https://github.com/kz-lemon4ik/", platform: "github", label: "GitHub" },
  { href: "https://t.me/kz_lemon4ik", platform: "telegram", label: "Telegram" },
  { href: "https://osu.ppy.sh/users/8674298", platform: "osu", label: "osu!" },
  {
    href: "https://www.youtube.com/",
    platform: "youtube",
    label: "YouTube",
  },
  { href: "https://twitch.tv/", platform: "twitch", label: "Twitch" },
  { href: "https://discord.com/users/271684591951937536", platform: "discord", label: "Discord" },
];

export default function About() {
  const { isMotionDisabled } = useSettings();

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pageTransition = {
    duration: isMotionDisabled ? 0 : 0.8,
    ease: "easeOut" as const,
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-8 text-center overflow-hidden"
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-white theme-is-light:text-themeLight-headingText drop-shadow-[0_0_1.8rem_rgba(246,224,94,0.5)] theme-is-light:drop-shadow-[0_0_1.44rem_var(--color-heading-drop-shadow)] select-none font-title">
        About
      </h1>

      <img
        src="/images/avatars/avatar.webp"
        alt="Lemon"
        className="w-48 h-48 rounded-full object-cover shadow"
        draggable={false}
      />

      <div
        className={clsx(
          "bg-white/5 backdrop-blur-md rounded-xl px-6 py-4 shadow border border-white/10 max-w-md font-body transition-all duration-300 transform will-change-transform",
          "theme-is-light:bg-white/70 theme-is-light:border-slate-200/60",
          !isMotionDisabled && "hover:scale-[1.02]"
        )}
      >
        <p className="text-sm text-lavender-200 theme-is-light:text-themeLight-aboutDescriptionText">
          I don't know what to put here 🍋
        </p>
      </div>

      <Button
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        variant="outlineAccent"
        size="sm"
        enableMotion={!isMotionDisabled}
        className="rounded-2xl"
      >
        Download CV
      </Button>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 mt-4">
        {aboutSocialLinks.map(({ href, platform, label }) => (
          <IconLink
            key={platform}
            href={href}
            platform={platform}
            label={label}
            className={clsx(
              "text-4xl sm:text-6xl origin-center",
              !isMotionDisabled && "transform hover:scale-110"
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}
