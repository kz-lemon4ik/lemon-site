import clsx from "clsx";
import { ArrowDownToLine, Info, Sheet } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  Button,
  Heading,
  IconLink,
  Section,
  SharedCard,
  useSettings,
  type IconLinkPlatform,
} from "@lemon-site/shared-ui";
import { createCardTitleClasses, createLinkClasses } from "../styles/utils";

interface MirrorInfo {
  name: string;
  url: string;
  platform: IconLinkPlatform;
}

const programInfo = {
  name: "osu! Lost Scores Analyzer",
  version: "0.7.27",
  osTarget: "Download for Windows",
  releaseDate: "2025-06-06",
  fileSize: "12 MB",
  directDownloadUrl: "https://github.com/kz-lemon4ik/osu-lost-scores",
  changelogUrl: "https://github.com/kz-lemon4ik/osu-lost-scores",
  licenseType: "MIT License",
  licenseUrl: "https://github.com/kz-lemon4ik/osu-lost-scores/",
  githubRepoUrl: "https://github.com/kz-lemon4ik/osu-lost-scores",
  mirrors: [
    {
      name: "GitHub",
      url: "https://github.com/kz-lemon4ik/osu-lost-scores",
      platform: "github" as IconLinkPlatform,
    },
    { name: "Google Drive", url: "#", platform: "googledrive" as IconLinkPlatform },
    { name: "Mega.nz", url: "#", platform: "mega" as IconLinkPlatform },
    { name: "MediaFire", url: "#", platform: "mediafire" as IconLinkPlatform },
  ] as MirrorInfo[],
};

export default function Downloads() {
  const { isMotionDisabled } = useSettings();

  return (
    <Section id="downloads" className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Heading
          size="xl"
          className={clsx(
            "mb-10 font-losttitle text-center sm:text-center",
            "text-white",
            "theme-is-light:text-themeLight-headingText"
          )}
        >
          Downloads
        </Heading>

        <SharedCard
          motion={{ enableEntry: !isMotionDisabled }}
          className="mb-16"
          paddingVariant="default"
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center">
            <div
              className={clsx(
                "w-full md:w-1/2 flex flex-col items-center justify-center text-center p-6 md:pr-8 md:border-r-2",
                "border-slate-700/50",
                "theme-is-light:border-themeLight-border"
              )}
            >
              <h2
                className={clsx(
                  "text-3xl font-semibold font-lostheading mb-5 text-center sm:text-center",
                  "text-white",
                  "theme-is-light:text-themeLight-headingText"
                )}
              >
                Download {programInfo.name}
              </h2>
              <Button
                href={programInfo.directDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="solidPurple"
                size="lg"
                enableMotion={!isMotionDisabled}
                className="w-full max-w-xs !py-4 font-lostbody font-semibold"
                leftIcon={ArrowDownToLine}
              >
                <span className="block text-xl">{programInfo.osTarget}</span>
              </Button>
              <p
                className={clsx(
                  "text-xs mt-2",
                  "text-lavender-400",
                  "theme-is-light:text-themeLight-mutedText"
                )}
              >
                Version {programInfo.version}
              </p>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center p-6 md:pl-8 mt-6 md:mt-0">
              <h3
                className={clsx(
                  "text-2xl font-semibold font-lostheading mb-6 text-center sm:text-center",
                  "text-white",
                  "theme-is-light:text-themeLight-headingText"
                )}
              >
                Alternative Downloads
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {programInfo.mirrors.map((mirror) => (
                  <IconLink
                    key={mirror.name}
                    href={mirror.url}
                    platform={mirror.platform}
                    label={`Download from ${mirror.name}`}
                    className={clsx("text-5xl", !isMotionDisabled && "transform hover:scale-125")}
                  />
                ))}
              </div>
            </div>
          </div>
        </SharedCard>

        <div
          className={clsx(
            "grid grid-cols-1 md:grid-cols-2 gap-8 font-lostnav",
            "text-lavender-200",
            "theme-is-light:text-themeLight-text"
          )}
        >
          <SharedCard
            motion={{ enableEntry: !isMotionDisabled }}
            paddingVariant="default"
            textStyles={{ base: "text-sm" }}
          >
            <h3 className={createCardTitleClasses()}>
              <Info
                size={24}
                className={clsx(
                  "mr-3 shrink-0",
                  "text-purple-400",
                  "theme-is-light:text-themeLight-primary"
                )}
              />
              Release Information
            </h3>
            <ul className="space-y-2">
              <li>
                <strong>Version:</strong> {programInfo.version}
              </li>
              <li>
                <strong>Released:</strong> {programInfo.releaseDate}
              </li>
              <li>
                <strong>File Size:</strong> {programInfo.fileSize}
              </li>
              <li>
                <strong>Changelog:</strong>{" "}
                <a
                  href={programInfo.changelogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={createLinkClasses()}
                >
                  View on GitHub
                </a>
              </li>
              <li>
                <strong>License:</strong>{" "}
                <a
                  href={programInfo.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={createLinkClasses()}
                >
                  {programInfo.licenseType}
                </a>
              </li>
            </ul>
          </SharedCard>

          <SharedCard
            motion={{ enableEntry: !isMotionDisabled }}
            paddingVariant="default"
            textStyles={{ base: "text-sm" }}
          >
            <h3 className={createCardTitleClasses()}>
              <FaGithub
                size={24}
                className={clsx(
                  "mr-3 shrink-0",
                  "text-purple-400",
                  "theme-is-light:text-themeLight-primary"
                )}
              />
              Source Code & Issues
            </h3>
            <ul className="space-y-3 list-disc list-outside pl-5">
              <li>
                This program is open-source. You can view the code and contribute on{" "}
                <a
                  href={programInfo.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={createLinkClasses()}
                >
                  GitHub
                </a>
                .
              </li>
              <li>
                Encountered a bug or have a feature request?{" "}
                <a
                  href={`${programInfo.githubRepoUrl}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={createLinkClasses()}
                >
                  Open an Issue
                </a>
                .
              </li>
              <li>
                Downloads from GitHub Releases can be tracked{" "}
                <a
                  href={programInfo.changelogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View download stats on GitHub"
                  className={createLinkClasses()}
                >
                  here
                </a>
                .
              </li>
            </ul>
          </SharedCard>
        </div>

        <div className="mt-16 text-center">
          <Button
            to="/installation"
            variant="outlinePurple"
            size="lg"
            enableMotion={!isMotionDisabled}
            leftIcon={Sheet}
            className="font-lostbody font-semibold px-6"
          >
            View Installation Guide
          </Button>
        </div>
      </div>
    </Section>
  );
}
