import clsx from "clsx";
import { createImageWrapperClasses, createTitleClasses, createSubtitleClasses } from "../styles/utils";
import {
  ArrowUpCircle,
  DownloadCloud,
  LifeBuoy,
  LucideIcon,
  Rocket,
  Server,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import {
  AnchorLink,
  Heading,
  HighlightText,
  Section,
  SharedCard,
  SharedImageDisplay,
  useSettings,
} from "@lemon-site/shared-ui";
import ImageGalleryModal from "@/components/ImageGalleryModal";

export default function InstallationGuide() {
  const { isMotionDisabled } = useSettings();
  const imagePathBase = "/images/install-guide/";
  const pageImages = [
    `${imagePathBase}01.png`,
    `${imagePathBase}02.png`,
    `${imagePathBase}03.png`,
    `${imagePathBase}04.png`,
    `${imagePathBase}05.png`,
    `${imagePathBase}06.png`,
    `${imagePathBase}07.png`,
    `${imagePathBase}08.png`,
    `${imagePathBase}09.png`,
  ];
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (index: number) => {
    if (pageImages[index]) {
      setCurrentImageIndex(index);
      setIsGalleryOpen(true);
    }
  };
  const closeGallery = () => setIsGalleryOpen(false);
  const nextImage = () =>
    setCurrentImageIndex((prev) => {
      let next = prev + 1;
      while (next < pageImages.length && !pageImages[next]) next++;
      return next < pageImages.length ? next : prev;
    });
  const prevImage = () =>
    setCurrentImageIndex((prev) => {
      let p = prev - 1;
      while (p >= 0 && !pageImages[p]) p--;
      return p >= 0 ? p : prev;
    });

  const textBaseStyles =
    "font-lostnav text-base sm:text-lg leading-relaxed text-lavender-200 theme-is-light:text-themeLight-text text-justify";

  const accentLinkStyles = clsx(
    "font-semibold transition-colors duration-200 underline hover:no-underline",
    "text-lemon-400 hover:text-lavender-300",
    "theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover"
  );

  const codeStyles = clsx(
    "font-mono text-sm px-1.5 py-0.5 rounded break-all",
    "text-lemon-300 bg-slate-700/60",
    "theme-is-light:text-themeLight-codeText theme-is-light:bg-themeLight-codeBg"
  );

  const tocItems = [
    { id: "introduction-section", title: "1. Introduction" },
    { id: "system-requirements-section", title: "2. System Requirements" },
    { id: "download-section", title: "3. Where to Download" },
    { id: "installation-steps-intro-section", title: "4. Installation Steps" },
    { id: "first-run-section", title: "5. First Run & Initial Setup" },
    { id: "updating-app-section", title: "6. Updating the Application" },
    { id: "troubleshooting-section", title: "7. Troubleshooting" },
  ];

  const quickNavItems: { id: string; title: string; icon: LucideIcon }[] = [
    { id: "system-requirements-section", title: "Requirements", icon: Server },
    { id: "download-section", title: "Download", icon: DownloadCloud },
    { id: "installation-steps-intro-section", title: "Installation", icon: Wand2 },
    { id: "first-run-section", title: "First Run", icon: Rocket },
    { id: "updating-app-section", title: "Updating", icon: ArrowUpCircle },
    { id: "troubleshooting-section", title: "Troubleshoot", icon: LifeBuoy },
  ];

  const method1CardId = "installation-method-exe";
  const method2CardId = "installation-method-source";


  return (
    <Section id="installation-guide" className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          size="xl"
          className={clsx(
            "mb-12 font-losttitle text-center sm:text-center",
            "text-white",
            "theme-is-light:text-themeLight-headingText"
          )}
        >
          {" "}
          Installation Guide{" "}
        </Heading>

        <SharedCard
          id={tocItems[0].id}
          motion={{ enableEntry: !isMotionDisabled }}
          className="mb-10 md:mb-12"
          title={{
            content: tocItems[0].title.substring(tocItems[0].title.indexOf(" ") + 1),
            level: "h2",
            className: createTitleClasses()
          }}
          textStyles={{ base: textBaseStyles, alignment: "justify" }}
        >
          <p className="mb-4">
            {" "}
            Welcome to the installation guide for{" "}
            <HighlightText>osu! Lost Scores Analyzer</HighlightText>! This application is designed
            for osu! (Stable) players to help you find previously unnoticed or "lost" scores that
            might surpass your current personal bests, and to analyze your performance.{" "}
          </p>
          <p className="mb-4">
            {" "}
            On this page, you will find instructions on how to download, install, and perform the
            first run of the application.{" "}
          </p>
          <div
            className={clsx(
              "p-4 my-4 rounded-r-md",
              "bg-slate-800/60 border-l-4 border-lemon-400",
              "theme-is-light:bg-themeLight-primaryLightBg theme-is-light:border-l-4 theme-is-light:border-themeLight-primary"
            )}
          >
            <p className={clsx("text-lavender-100", "theme-is-light:text-themeLight-text")}>
              {" "}
              <strong>Important:</strong> The application is intended only for osu!stable and does
              not support osu!lazer and unofficial servers.{" "}
            </p>
          </div>
          <div
            className={clsx(
              "mt-8 pt-6",
              "border-t border-slate-700/50",
              "theme-is-light:border-themeLight-border/50"
            )}
          >
            <h3
              className={clsx(
                "text-2xl font-semibold font-losttitle text-center sm:text-center mb-6",
                "text-white",
                "theme-is-light:text-themeLight-headingText"
              )}
            >
              {" "}
              Quick Navigation{" "}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              {quickNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <AnchorLink
                    key={item.id}
                    to={`#${item.id}`}
                    className={clsx(
                      "block p-4 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75",
                      "bg-slate-800/50 hover:bg-slate-700/70 border border-transparent hover:border-purple-400/70 focus-visible:ring-purple-400",
                      "theme-is-light:bg-themeLight-card/70 theme-is-light:hover:bg-white theme-is-light:hover:border-themeLight-primary theme-is-light:focus-visible:ring-themeLight-primary"
                    )}
                  >
                    <Icon
                      size={32}
                      className="mx-auto mb-3 text-purple-400 theme-is-light:text-themeLight-primary"
                      strokeWidth={1.5}
                    />
                    <span className="font-semibold font-lostnav text-sm text-white theme-is-light:text-themeLight-headingText">
                      {item.title}
                    </span>
                  </AnchorLink>
                );
              })}
            </div>
          </div>
        </SharedCard>

        <div className="space-y-10 md:space-y-12">
          <SharedCard
            id={tocItems[1].id}
            motion={{ enableEntry: !isMotionDisabled }}
            title={{
              content: tocItems[1].title.substring(tocItems[1].title.indexOf(" ") + 1),
              level: "h2",
              className: createTitleClasses()
            }}
            textStyles={{ base: textBaseStyles, alignment: "justify" }}
          >
            <ul className="list-disc list-outside pl-5 mb-4 space-y-3">
              <li>
                {" "}
                <strong>Operating System:</strong> Windows 10 / Windows 11. Currently, there is no
                official support for macOS and Linux. Users of these systems can try installing from
                source code, but stable operation is not guaranteed.{" "}
              </li>
              <li>
                {" "}
                <strong>osu! Client:</strong> Installed osu! (Stable).{" "}
              </li>
              <li>
                {" "}
                <strong>Internet Connection:</strong> Required for downloading the application, its
                dependencies (on the first run of the .exe), and for fetching data from the osu!
                API.{" "}
              </li>
              <li>
                {" "}
                <strong>For installation from source code:</strong>
                <ul className="list-circle list-outside pl-5 mt-2 space-y-2">
                  <li>
                    Python (version 3.9 or newer recommended). Download from the official Python
                    website:{" "}
                    <a
                      href="https://www.python.org/downloads/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(accentLinkStyles, "break-all")}
                    >
                      https://www.python.org/downloads/
                    </a>
                  </li>
                  <li>Pip (usually installed with Python).</li>
                  <li>Git (recommended for convenient updates).</li>
                  <li>
                    Key dependencies: PySide6, pandas, requests, Pillow, rosu-pp-py, and others from
                    requirements.txt
                  </li>
                </ul>
              </li>
            </ul>
          </SharedCard>

          <SharedCard
            id={tocItems[2].id}
            motion={{ enableEntry: !isMotionDisabled }}
            title={{
              content: tocItems[2].title.substring(tocItems[2].title.indexOf(" ") + 1),
              level: "h2",
              className: createTitleClasses()
            }}
            textStyles={{ base: textBaseStyles, alignment: "justify" }}
          >
            <p className="mb-4">
              {" "}
              You can download the latest version of{" "}
              <HighlightText>osu! Lost Scores Analyzer</HighlightText> from the project's GitHub
              Releases page: <br />{" "}
              <a
                href="https://github.com/kz-lemon4ik/osu-lost-scores/releases"
                target="_blank"
                rel="noopener noreferrer"
                className={`${accentLinkStyles} break-all`}
              >
                https://github.com/kz-lemon4ik/osu-lost-scores/releases
              </a>{" "}
            </p>
            <p className="mb-4">
              {" "}
              It is recommended to always download the most recent release, marked as "Latest".{" "}
            </p>
            <SharedImageDisplay
              src={pageImages[0]}
              alt="GitHub Releases page"
              onClick={() => openGallery(0)}
              placeholderText="[SCREENSHOT: GitHub Releases page with .exe highlighted.]"
              className={createImageWrapperClasses()}
              enableHoverEffect={false}
            />
          </SharedCard>

          <SharedCard
            id={tocItems[3].id}
            motion={{ enableEntry: !isMotionDisabled }}
            title={{
              content: tocItems[3].title.substring(tocItems[3].title.indexOf(" ") + 1),
              level: "h2",
              className: createTitleClasses()
            }}
            textStyles={{ base: textBaseStyles, alignment: "justify" }}
          >
            <p className="mb-4">There are two ways to install the application:</p>
          </SharedCard>

          <SharedCard
            id={method1CardId}
            motion={{ enableEntry: !isMotionDisabled }}
            title={{
              content: "1. Using the Executable File (.exe) - Recommended Method",
              level: "h3",
              className: createSubtitleClasses()
            }}
            textStyles={{ base: textBaseStyles, alignment: "justify" }}
          >
            <p className="mb-4">This method is the simplest and suitable for most Windows users.</p>
            <ol className="list-decimal list-outside pl-5 mb-4 space-y-3">
              <li>
                Navigate to the GitHub Releases page (link above) and download the{" "}
                <code className={codeStyles}>osu-Lost-Scores-Analyzer-Launcher.exe</code> file.
              </li>
              <li>Save the downloaded .exe file to any convenient location.</li>
              <li>Run the downloaded .exe file.</li>
              <li>
                {" "}
                On the first launch, a launcher window will open and automatically install
                dependencies. This may take some time.{" "}
                <SharedImageDisplay
                  src={pageImages[1]}
                  alt="Launcher installing dependencies"
                  onClick={() => openGallery(1)}
                  placeholderText="[SCREENSHOT: Launcher window during dependency installation.]"
                  className={createImageWrapperClasses()}
                  enableHoverEffect={false}
                />{" "}
              </li>
              <li>After successful installation, the main application will automatically start.</li>
              <li>
                {" "}
                On subsequent launches, the launcher quickly checks for updates before starting the
                main application.{" "}
                <SharedImageDisplay
                  src={pageImages[2]}
                  alt="Launcher on subsequent launches"
                  onClick={() => openGallery(2)}
                  placeholderText="[SCREENSHOT: Launcher window (subsequent launches).]"
                  className={createImageWrapperClasses()}
                  enableHoverEffect={false}
                />{" "}
              </li>
              <li>Proceed to "First Run and Initial Setup".</li>
            </ol>
          </SharedCard>

          <SharedCard
            id={method2CardId}
            motion={{ enableEntry: !isMotionDisabled }}
            title={{
              content: "2. Installation from Source Code - For Advanced Users",
              level: "h3",
              className: createSubtitleClasses()
            }}
            textStyles={{ base: textBaseStyles, alignment: "justify" }}
          >
            <p className="mb-4">This method requires Python and Git.</p>
            <ol className="list-decimal list-outside pl-5 mb-4 space-y-3">
              <li>Ensure Python (3.9+) and Git are installed.</li>
              <li>
                {" "}
                Clone the repository: <br />{" "}
                <code className={`${codeStyles} inline-block whitespace-pre-wrap my-2`}>
                  git clone https://github.com/kz-lemon4ik/osu-lost-scores.git
                </code>{" "}
                <SharedImageDisplay
                  src={pageImages[3]}
                  alt="Git clone example"
                  onClick={() => openGallery(3)}
                  placeholderText="[SCREENSHOT: Git clone command or downloading ZIP.]"
                  className={createImageWrapperClasses()}
                  enableHoverEffect={false}
                />{" "}
                Or download and extract ZIP.{" "}
              </li>
              <li>
                {" "}
                Navigate to the folder:{" "}
                <code className={`${codeStyles} inline-block whitespace-pre-wrap my-2`}>
                  cd osu-lost-scores
                </code>{" "}
              </li>
              <li>
                {" "}
                Create and activate a virtual environment (recommended): <br />{" "}
                <code className={`${codeStyles} inline-block whitespace-pre-wrap my-2`}>
                  python -m venv .venv
                </code>{" "}
                <br /> Activate: (Windows cmd:{" "}
                <code className={codeStyles}>.venv\Scripts\activate.bat</code>, PowerShell:{" "}
                <code className={codeStyles}>.venv\Scripts\Activate.ps1</code>, Linux/macOS:{" "}
                <code className={codeStyles}>source .venv/bin/activate</code>){" "}
              </li>
              <li>
                {" "}
                Install dependencies: <br />{" "}
                <code className={`${codeStyles} inline-block whitespace-pre-wrap my-2`}>
                  pip install -r requirements.txt
                </code>{" "}
                <SharedImageDisplay
                  src={pageImages[4]}
                  alt="Pip install dependencies"
                  onClick={() => openGallery(4)}
                  placeholderText="[SCREENSHOT: Terminal showing pip install.]"
                  className={createImageWrapperClasses()}
                  enableHoverEffect={false}
                />{" "}
              </li>
              <li>
                {" "}
                Run the application: <br />{" "}
                <code className={`${codeStyles} inline-block whitespace-pre-wrap my-2`}>
                  python src/main.py
                </code>{" "}
                <SharedImageDisplay
                  src={pageImages[5]}
                  alt="Running from source"
                  onClick={() => openGallery(5)}
                  placeholderText="[SCREENSHOT: Terminal showing python src/main.py.]"
                  className={createImageWrapperClasses()}
                  enableHoverEffect={false}
                />{" "}
              </li>
            </ol>
          </SharedCard>

          <SharedCard
            id={tocItems[4].id}
            motion={{ enableEntry: !isMotionDisabled }}
            title={{
              content: tocItems[4].title.substring(tocItems[4].title.indexOf(" ") + 1),
              level: "h2",
              className: createTitleClasses()
            }}
            textStyles={{ base: textBaseStyles, alignment: "justify" }}
          >
            <p className="mb-4">
              {" "}
              When you first run <HighlightText>osu! Lost Scores Analyzer</HighlightText>, you will
              need to perform a few simple setup steps:{" "}
            </p>
            <SharedImageDisplay
              src={pageImages[6]}
              alt="Main application window"
              onClick={() => openGallery(6)}
              placeholderText="[SCREENSHOT: Main application window (initial state).]"
              className={createImageWrapperClasses()}
              enableHoverEffect={false}
            />
            <ul className="list-disc list-outside pl-5 mb-4 space-y-3">
              <li>
                {" "}
                <strong>Specifying the path to the osu! folder:</strong> The application will try to
                auto-detect the path. If it fails, manually specify the path to your root osu! game
                folder (containing <code className={codeStyles}>osu!.exe</code>).{" "}
              </li>
              <li>
                {" "}
                <strong>Your osu! nickname or User ID:</strong> Enter your exact osu! nickname or
                User ID.{" "}
              </li>
              <li>
                {" "}
                <strong>osu! API Key (v1):</strong> Required to retrieve online data.
                <ul className="list-circle list-outside pl-5 mt-2 space-y-2">
                  <li>
                    Obtain from:{" "}
                    <a
                      href="https://osu.ppy.sh/home/account/edit#oauth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(accentLinkStyles, "break-all")}
                    >
                      https://osu.ppy.sh/home/account/edit#oauth
                    </a>{" "}
                    (login required).{" "}
                    <SharedImageDisplay
                      src={pageImages[7]}
                      alt="osu! API page"
                      onClick={() => openGallery(7)}
                      placeholderText="[SCREENSHOT: osu! API page for key.]"
                      className={createImageWrapperClasses()}
                      enableHoverEffect={false}
                    />{" "}
                  </li>
                  <li>Fill out the form (purpose: "personal use for score analysis").</li>
                  <li>
                    Copy the key and paste it into the application settings.{" "}
                    <SharedImageDisplay
                      src={pageImages[8]}
                      alt="Application API key setup"
                      onClick={() => openGallery(8)}
                      placeholderText="[SCREENSHOT: Application API key setup window.]"
                      className={createImageWrapperClasses()}
                      enableHoverEffect={false}
                    />{" "}
                  </li>
                </ul>
                <div
                  className={clsx(
                    "p-4 my-4 rounded-r-md",
                    "bg-slate-800/60 border-l-4 border-lemon-400",
                    "theme-is-light:bg-themeLight-primaryLightBg theme-is-light:border-l-4 theme-is-light:border-themeLight-primary"
                  )}
                >
                  <p className={clsx("text-lavender-100", "theme-is-light:text-themeLight-text")}>
                    {" "}
                    <strong>Important:</strong> Do not share your API key!{" "}
                  </p>
                </div>
              </li>
            </ul>
            <p className="mb-4">
              {" "}
              These settings are usually made in a configuration window. After saving, the
              application is ready.{" "}
            </p>
          </SharedCard>

          <SharedCard
            id={tocItems[5].id}
            motion={{ enableEntry: !isMotionDisabled }}
            title={{
              content: tocItems[5].title.substring(tocItems[5].title.indexOf(" ") + 1),
              level: "h2",
              className: createTitleClasses()
            }}
            textStyles={{ base: textBaseStyles, alignment: "justify" }}
          >
            <ul className="list-disc list-outside pl-5 mb-4 space-y-3">
              <li>
                {" "}
                <strong>For the .exe version:</strong>{" "}
                <ol className="list-decimal list-outside pl-5 mt-2 space-y-2">
                  {" "}
                  <li>Download the new launcher .exe from GitHub Releases.</li>{" "}
                  <li>Replace the old launcher file.</li>{" "}
                  <li>The new launcher may update components if needed.</li>{" "}
                </ol>{" "}
              </li>
              <li>
                {" "}
                <strong>For the source code version:</strong>{" "}
                <ol className="list-decimal list-outside pl-5 mt-2 space-y-2">
                  {" "}
                  <li>Open a terminal in the project folder.</li>{" "}
                  <li>
                    If using Git: <code className={codeStyles}>git pull</code>
                  </li>{" "}
                  <li>
                    Update dependencies:{" "}
                    <code className={codeStyles}>pip install -r requirements.txt --upgrade</code>
                  </li>{" "}
                  <li>
                    If using ZIP, download the new archive and repeat source installation.
                  </li>{" "}
                </ol>{" "}
              </li>
            </ul>
          </SharedCard>

          <SharedCard
            id={tocItems[6].id}
            motion={{ enableEntry: !isMotionDisabled }}
            title={{
              content: tocItems[6].title.substring(tocItems[6].title.indexOf(" ") + 1),
              level: "h2",
              className: createTitleClasses()
            }}
            textStyles={{ base: textBaseStyles, alignment: "justify" }}
          >
            <ul className="list-disc list-outside pl-5 mb-4 space-y-3">
              <li>
                {" "}
                <strong>Antivirus blocks:</strong> Add application files to antivirus exclusions
                (false positive).{" "}
              </li>
              <li>
                {" "}
                <strong>Launcher cannot download dependencies:</strong> Check internet connection
                and firewall/antivirus.{" "}
              </li>
              <li>
                {" "}
                <strong>API key problems:</strong> Ensure correct key and its activity.{" "}
              </li>
              <li>
                {" "}
                <strong>Cannot find osu! folder:</strong> Verify path correctness (must contain{" "}
                <code className={codeStyles}>osu!.exe</code>).{" "}
              </li>
            </ul>
            <p className="mb-4"> If problems persist: </p>
            <ul className="list-disc list-outside pl-5 mb-4 space-y-3">
              <li>
                {" "}
                Check GitHub Issues:{" "}
                <a
                  href="https://github.com/kz-lemon4ik/osu-lost-scores/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${accentLinkStyles} break-all`}
                >
                  https://github.com/kz-lemon4ik/osu-lost-scores/issues
                </a>{" "}
              </li>
              <li> Create a new Issue with details if not found. </li>
            </ul>
          </SharedCard>
        </div>
      </div>
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        images={pageImages.filter((img) => !!img)}
        currentIndex={currentImageIndex}
        onClose={closeGallery}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </Section>
  );
}
