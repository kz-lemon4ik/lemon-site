import clsx from "clsx";
import { Mail } from "lucide-react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { Button, Heading, Section, SharedCard, useSettings } from "@lemon-site/shared-ui";

const textBaseStyles = clsx(
  "text-left font-lostnav text-base sm:text-lg leading-relaxed",
  "text-lavender-200",
  "theme-is-light:text-themeLight-text",
  "selection:bg-lemon-400/30 selection:text-slate-900",
  "theme-is-light:selection:bg-themeLight-primary/20"
);
const accentLinkStyles = clsx(
  "font-semibold transition-colors duration-200 underline hover:no-underline",
  "text-lemon-400 hover:text-lavender-300",
  "theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover"
);

export default function Feedback() {
  const { isMotionDisabled } = useSettings();

  const feedbackChannels = [
    {
      title: "Report Bugs & Suggest Features via GitHub",
      icon: FaGithub,
      description:
        "The best way to report a bug or suggest a new feature is by creating an issue on our GitHub repository. This helps us track all feedback systematically. Please check for existing issues before creating a new one.",
      buttonText: "Go to GitHub Issues",
      buttonHref: "https://github.com/kz-lemon4ik/osu-lost-scores/issues",
    },
    {
      title: "Join our Discord Community",
      icon: FaDiscord,
      description:
        "For general discussions, quick questions, or sharing your experience, join our Discord server. It's a great place for community interaction.",
      buttonText: "Join Discord Server",
      buttonHref: "#",
    },
    {
      title: "Direct Email",
      icon: Mail,
      description:
        "For private inquiries, you can reach out via email. Response times might be slower compared to GitHub.",
      email: "feedback@lost.lemon4ik.kz",
    },
  ];

  const cardTitleWithIconClassName = clsx(
    "text-2xl font-semibold font-lostheading mb-4 flex items-center",
    "text-white",
    "theme-is-light:text-themeLight-headingText"
  );

  return (
    <Section id="feedback" className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <Heading
          size="xl"
          className={clsx(
            "mb-12 font-losttitle text-center sm:text-center",
            "text-white",
            "theme-is-light:text-themeLight-headingText"
          )}
        >
          Feedback & Suggestions
        </Heading>

        <SharedCard
          motion={{ enableEntry: !isMotionDisabled }}
          className="mb-10 md:mb-12 text-center"
          paddingVariant="default"
          textStyles={{ base: textBaseStyles }}
        >
          <p className="text-lg">
            Your feedback is invaluable in helping us improve{" "}
            <strong
              className={clsx(
                "text-lemon-400",
                "theme-is-light:text-themeLight-highlightTextColor"
              )}
            >
              osu! Lost Scores Analyzer
            </strong>
            . Whether you've found a bug, have a suggestion, or just want to share your thoughts,
            we'd love to hear from you!
          </p>
        </SharedCard>

        <div className="space-y-8">
          {feedbackChannels.map((channel, index) => {
            const IconComponent = channel.icon;
            return (
              <SharedCard
                key={index}
                motion={{ enableEntry: !isMotionDisabled }}
                paddingVariant="default"
                textStyles={{ base: textBaseStyles }}
              >
                <h2 className={cardTitleWithIconClassName}>
                  <IconComponent
                    size={24}
                    className={clsx(
                      "mr-3 shrink-0",
                      "text-purple-400",
                      "theme-is-light:text-themeLight-primary"
                    )}
                  />
                  {channel.title}
                </h2>
                <p className="mb-6">{channel.description}</p>
                {channel.buttonText && channel.buttonHref && (
                  <Button
                    href={channel.buttonHref}
                    variant="solidPurple"
                    size="md"
                    leftIcon={IconComponent}
                    enableMotion={!isMotionDisabled}
                    className="font-lostbody font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {channel.buttonText}
                  </Button>
                )}
                {channel.email && (
                  <div className="flex items-center gap-2">
                    <IconComponent
                      size={20}
                      className={clsx(
                        "shrink-0",
                        "text-purple-400",
                        "theme-is-light:text-themeLight-primary"
                      )}
                    />
                    <a href={`mailto:${channel.email}`} className={accentLinkStyles}>
                      {channel.email}
                    </a>
                  </div>
                )}
              </SharedCard>
            );
          })}

          <SharedCard
            motion={{ enableEntry: !isMotionDisabled }}
            paddingVariant="default"
            textStyles={{ base: textBaseStyles }}
          >
            <h2
              className={clsx(
                "text-2xl font-semibold font-lostheading mb-4 text-center sm:text-left",
                "text-white",
                "theme-is-light:text-themeLight-headingText"
              )}
            >
              What to Include in Bug Reports
            </h2>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>Steps to reproduce the error.</li>
              <li>Expected behavior vs. actual behavior.</li>
              <li>Screenshots or videos of the issue.</li>
              <li>
                The version of{" "}
                <strong
                  className={clsx(
                    "text-lemon-400",
                    "theme-is-light:text-themeLight-highlightTextColor"
                  )}
                >
                  osu! Lost Scores Analyzer
                </strong>{" "}
                you are using.
              </li>
              <li>Your operating system version.</li>
            </ul>
          </SharedCard>
        </div>
      </div>
    </Section>
  );
}
