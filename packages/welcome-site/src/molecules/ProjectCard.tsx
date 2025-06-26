import clsx from "clsx";
import { useSettings } from "@lemon-site/shared-ui";

type Props = {
  title: string;
  description: string;
  tags: string[];
  link: string;
};

export default function ProjectCard({ title, description, tags, link }: Props) {
  const { isMotionDisabled } = useSettings();

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 transition-all duration-300 ease-out",
        "hover:border-lemon-400 theme-is-light:bg-themeLight-card theme-is-light:border-themeLight-cardBorder theme-is-light:hover:border-themeLight-primary",
        !isMotionDisabled && "hover:scale-[1.02]"
      )}
    >
      <h3 className="text-lg font-semibold text-lavender-100 mb-1 theme-is-light:text-themeLight-projectTitleText">
        {title}
      </h3>
      <p className="text-sm text-lavender-300 mb-3 theme-is-light:text-themeLight-projectDescriptionText">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full bg-white/10 text-lavender-200 theme-is-light:bg-themeLight-primaryLightBg theme-is-light:text-themeLight-primary"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
