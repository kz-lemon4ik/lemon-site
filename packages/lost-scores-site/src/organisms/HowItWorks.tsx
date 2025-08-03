import clsx from "clsx";
import {
  Archive,
  Blend,
  Calculator,
  CloudDownload,
  DatabaseZap,
  FilePenLine,
  FileSpreadsheet,
  Flag,
  GalleryThumbnails,
  Image as ImageIconLucide,
  Library,
  Lightbulb,
  LucideIcon,
  ScanSearch,
  SearchCheck,
  Shuffle,
  Sigma,
  TrendingUp,
  Trophy,
} from "lucide-react";
import React, { useState } from "react";
import {
  AnchorLink,
  Heading,
  HighlightText,
  Section,
  SharedCard,
  SharedCardImageProps,
  useSettings,
} from "@lemon-site/shared-ui";
import ImageGalleryModal from "@/components/ImageGalleryModal";

interface SubStepColumnProps {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  className?: string;
}

const SubStepColumn: React.FC<SubStepColumnProps> = ({
  icon: Icon,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center text-center pb-4 px-2 md:px-4 flex-1 min-w-subcard md:min-w-0",
        className
      )}
    >
      <Icon
        size={36}
        className="mb-4 text-purple-400 theme-is-light:text-themeLight-primary"
        strokeWidth={1.5}
      />
      <h4 className="text-md sm:text-lg font-semibold font-lostheading mb-2 text-white theme-is-light:text-themeLight-headingText">
        {title}
      </h4>
      <div className="text-sm font-lostnav text-lavender-300 theme-is-light:text-themeLight-text leading-relaxed">
        {description}
      </div>
    </div>
  );
};

interface VerticalSubStepItemProps {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  isLast?: boolean;
}

const VerticalSubStepItem: React.FC<VerticalSubStepItemProps> = ({
  icon: Icon,
  title,
  description,
  isLast,
}) => {
  return (
    <div
      className={clsx(
        "py-5",
        !isLast && "border-b border-slate-700/40 theme-is-light:border-themeLight-border/50"
      )}
    >
      <div className="flex items-start gap-x-4 sm:gap-x-5">
        <Icon
          size={28}
          className="mt-1 shrink-0 text-purple-400 theme-is-light:text-themeLight-primary"
          strokeWidth={1.5}
        />
        <div>
          <h4 className="text-lg sm:text-xl font-semibold font-lostheading mb-1.5 text-white theme-is-light:text-themeLight-headingText">
            {title}
          </h4>
          <div className="text-sm sm:text-base font-lostnav text-lavender-200 theme-is-light:text-themeLight-text leading-relaxed space-y-3">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SubStepData {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
}

interface MainStepData {
  id: string;
  displayTitle: string;
  subSteps: SubStepData[];
  imageProps?: SharedCardImageProps;
  cardType: "with-image" | "no-image";
  titleAlignment?: "left" | "center" | "right";
}

const stepsData: MainStepData[] = [
  {
    id: "step1-setup",
    displayTitle: "Initial Setup & Data Input",
    cardType: "with-image",
    titleAlignment: "left",
    imageProps: {
      src: "/images/results/program_preview.webp",
      alt: "Program Setup Interface",
      aspectRatio: "964x1164",
      placement: "right",
    },
    subSteps: [
      {
        icon: FilePenLine,
        title: "Your Details",
        description: (
          <p>
            First, you'll need to tell the program where your osu! game is installed on your
            computer. Then you can choose a login method. If you need to log in using Custom keys,
            you'll also need to specify your username/id/profile link and client id, client secret,
            which you can find{" "}
            <a
              href="https://osu.ppy.sh/home/account/edit#oauth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lemon-400 hover:text-lavender-300 theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover underline hover:no-underline"
            >
              here
            </a>
            . This info helps the program find your saved game replays and look up your scores
            online.
          </p>
        ),
      },
      {
        icon: Library,
        title: "Beatmap Scanning",
        description: (
          <p>
            After getting your details, the program checks your osu! "Songs" folder. It makes a list
            of all your beatmaps. Each beatmap gets a unique ID (an MD5 hash). This is important
            because it helps match your replays to the correct songs later. This way, it can
            calculate your Performance Points (PP) correctly.
          </p>
        ),
      },
      {
        icon: CloudDownload,
        title: "Fetching Online Data",
        description: (
          <p>
            The program then uses the official osu! API (a way for programs to get information from
            osu!) to get your public profile information. It also downloads your list of best scores
            that are already online. This online data is used as a baseline to compare against the
            scores found on your computer.
          </p>
        ),
      },
    ],
  },
  {
    id: "step2-scanning",
    displayTitle: "Scanning & Analyzing Local Replays",
    cardType: "no-image",
    titleAlignment: "center",
    subSteps: [
      {
        icon: ScanSearch,
        title: "Checking Replays",
        description:
          "The program carefully goes through all your replay files. These files have an '.osr' extension and are usually found in your osu! game's 'Data/r/' folder. It gets these files ready for a closer look.",
      },
      {
        icon: DatabaseZap,
        title: "Extracting Information",
        description:
          "For every replay that belongs to you, the program pulls out important details. This includes the beatmap you played (identified by its MD5 hash), any game modifications (mods) you used, your score, accuracy, highest combo, and the date you achieved the score.",
      },
      {
        icon: Calculator,
        title: "Calculating Local PP",
        description:
          "Using the details from your replay and the matching beatmap file (the '.osu' file), the program calculates the Performance Points (PP) for that specific play. It uses the 'rosu-pp-py' library for this calculation. If a beatmap file is missing from your computer but is needed for a replay, the program will try to download its information from osu! servers.",
      },
    ],
  },
  {
    id: "step3-identifying",
    displayTitle: 'Identifying "Lost" Scores',
    cardType: "with-image",
    titleAlignment: "left",
    imageProps: {
      src: "/images/results/lost_scores_result.webp",
      alt: "Lost Scores Example",
      aspectRatio: "980x1068",
      placement: "right",
    },
    subSteps: [
      {
        icon: SearchCheck,
        title: "Finding Your Best Local Plays",
        description: (
          <p>
            The program looks at all the plays you've saved on your computer for every song and mod
            combination. Its main goal is to find your absolute best performance for each, based on
            the calculated PP. This happens even if another play on the same song had a higher point
            score but less PP.
          </p>
        ),
      },
      {
        icon: Shuffle,
        title: 'Understanding "Lost" Scores',
        description: (
          <>
            <p>
              A play is often called "lost" if it had more PP but was beaten in raw score by another
              play you made that had a higher raw score. This was common before osu! changed how it
              submitted scores (the "ScoreV1" issue).
            </p>
            <p>
              A score can also be "lost" if it was a really good PP play that, for some reason,
              never got properly sent to the osu! servers, or if it was replaced by a play that was
              actually worth less PP.
            </p>
          </>
        ),
      },
      {
        icon: Flag,
        title: "Flagging & Comparing",
        description: (
          <p>
            These better local plays are then checked against your official scores on your osu!
            profile. If a play saved on your computer is better than what’s shown online (or if it’s
            not there at all), the program flags it. This highlights it as a significant "lost"
            score, showing potential PP you might have missed out on.
          </p>
        ),
      },
    ],
  },
  {
    id: "step4-potential-top",
    displayTitle: 'Building Your "Potential Top"',
    cardType: "with-image",
    titleAlignment: "center",
    imageProps: {
      src: "/images/results/potential_top_result.webp",
      alt: "Potential Top Scores Example",
      aspectRatio: "980x1068",
      placement: "left",
    },
    subSteps: [
      {
        icon: Trophy,
        title: "Starting with Online Scores",
        description: (
          <p>
            The Analyzer first looks at your current top scores that are officially recorded on your
            osu! profile. This acts as the starting point, representing your publicly recognized
            best performances.
          </p>
        ),
      },
      {
        icon: Blend,
        title: "Merging with Lost Scores",
        description: (
          <p>
            Then, it smartly combines these online scores with the "lost" scores it discovered on
            your computer. If a "lost" score for a specific map and mod combination gives more PP
            than your existing online score for that same setup, the "lost" score replaces it. If a
            "lost" score is for a map not currently in your top plays but has enough PP, it gets
            added to this improved list.
          </p>
        ),
      },
      {
        icon: Sigma,
        title: "Recalculating Total PP",
        description: (
          <p>
            From this combined list, a new "potential top" list of your plays is made. The program
            then recalculates the total weighted PP for this enhanced list. This new total shows
            what your PP could realistically be if all your best efforts were recognized.
          </p>
        ),
      },
      {
        icon: TrendingUp,
        title: "Showing Your True Potential",
        description: (
          <p>
            Finally, the program clearly displays the difference between your current official total
            PP and this new "potential" total PP. This number effectively shows how much "hidden"
            performance you might have, giving you a clearer picture of your capabilities.
          </p>
        ),
      },
    ],
  },
  {
    id: "step5-visualizing",
    displayTitle: "Seeing & Sharing Your Results",
    cardType: "no-image",
    titleAlignment: "center",
    subSteps: [
      {
        icon: ImageIconLucide,
        title: "Potential Top Image",
        description:
          'The program creates an image that shows what your list of best scores (your top plays) would look like if all your found "lost" scores were actually submitted and counted. It clearly marks where these "lost" scores improve upon or replace your existing online ones.',
      },
      {
        icon: GalleryThumbnails,
        title: "Lost Scores Image",
        description:
          "You'll also get a separate image that specifically lists your most important \"lost\" scores, sorted by how much PP they are worth. This gives you an easy-to-see summary of those great plays that didn't make it to your official record.",
      },
      {
        icon: FileSpreadsheet,
        title: "Detailed CSV Reports",
        description:
          'The program saves detailed information in CSV files, which are like simple spreadsheets. These files typically include a full list of all your identified "lost" scores with their statistics, a copy of your current online top plays, and the combined "potential top" list. These are great for taking a deeper dive into your own data or for sharing your findings with others.',
      },
    ],
  },
  {
    id: "step6-caching",
    displayTitle: "Caching for Quicker Analysis",
    cardType: "no-image",
    titleAlignment: "center",
    subSteps: [
      {
        icon: Lightbulb,
        title: "Why Cache?",
        description:
          "To make future checks much faster and to avoid asking the osu! servers for the same information over and over, the Analyzer saves some data locally on your computer. This is called caching. It means when you run it again, it's quicker and smoother, especially if you haven't added a lot of new maps.",
      },
      {
        icon: Archive,
        title: "What's Cached?",
        description:
          "The program saves things like details about your beatmaps (their unique MD5 codes, official IDs, and difficulty information from the '.osu' song files) in a local database. User settings and API credentials are securely stored using the system keyring. Storing this locally means the program doesn't have to re-download or re-process this unchanging information every time. Instead, it can focus on any new or changed replay files, saving you time.",
      },
    ],
  },
];

export default function HowItWorks() {
  const { isMotionDisabled } = useSettings();

  const programPreviewImg = "/images/results/program_preview.webp";
  const lostScoresResultImg = "/images/results/lost_scores_result.webp";
  const potentialTopResultImg = "/images/results/potential_top_result.webp";
  const pageImages = [programPreviewImg, lostScoresResultImg, potentialTopResultImg].filter(
    Boolean
  );

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (imageSrc: string) => {
    const imgIndex = pageImages.indexOf(imageSrc);
    if (imgIndex !== -1) {
      setCurrentImageIndex(imgIndex);
      setIsGalleryOpen(true);
    }
  };
  const closeGallery = () => {
    setIsGalleryOpen(false);
  };
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % pageImages.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + pageImages.length) % pageImages.length);

  const headingMarginBottom = "mb-6";
  const pageHeadingMarginBottom = "mb-12 sm:mb-16";

  const quickNavItems = [
    { id: "step1-setup", title: "Setup", icon: FilePenLine },
    { id: "step2-scanning", title: "Scanning", icon: ScanSearch },
    { id: "step3-identifying", title: "Identifying", icon: SearchCheck },
    { id: "step4-potential-top", title: "Potential Top", icon: Trophy },
    { id: "step5-visualizing", title: "Results", icon: GalleryThumbnails },
    { id: "step6-caching", title: "Caching", icon: Archive },
  ];

  const mainTitleDividerColor = "bg-slate-700/30 theme-is-light:bg-themeLight-border/40";
  const columnDividerColor = "border-slate-700/30 theme-is-light:border-themeLight-border/40";
  const textStyleBase = "text-lavender-200 theme-is-light:text-themeLight-text";

  return (
    <Section id="how-it-works" className="pt-20 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <Heading
          size="xl"
          className={clsx(
            `text-center sm:text-center ${pageHeadingMarginBottom} font-losttitle`,
            "text-white",
            "theme-is-light:text-themeLight-headingText"
          )}
        >
          How It Works
        </Heading>

        <div className={clsx(`space-y-10 md:space-y-12`)}>
          <SharedCard
            id="intro-card"
            title={{
              content: "The Journey of Your Scores: A Deep Dive",
              size: "h2",
              level: "h2",
              className: clsx(headingMarginBottom, "!text-center !font-losttitle"),
              alignment: "center",
            }}
            motion={{ enableEntry: !isMotionDisabled }}
            textStyles={{ base: textStyleBase, alignment: "center" }}
          >
            <p className={`text-justify sm:text-center mb-6 text-lg sm:text-xl font-lostnav`}>
              <HighlightText>osu! Lost Scores Analyzer</HighlightText> uses a careful, step-by-step
              method to look through your game replays. It finds those top-notch plays you might
              have forgotten or that didn't get submitted properly, giving you a better idea of your
              real skill.
            </p>
            <div
              className={clsx(
                "mt-10 pt-6",
                "border-t border-slate-700/30",
                "theme-is-light:border-themeLight-border/50"
              )}
            >
              <h3
                className={clsx(
                  "text-xl font-semibold text-center sm:text-center mb-4 font-losttitle",
                  "text-white",
                  "theme-is-light:text-themeLight-headingText"
                )}
              >
                Quick Navigation
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center mt-6">
                {quickNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <AnchorLink
                      key={item.id}
                      to={`#${item.id}`}
                      className={clsx(
                        "block p-4 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 backdrop-blur-xl",
                        "bg-black/30 hover:bg-black/40 border border-transparent hover:border-purple-400/70 focus-visible:ring-purple-400",
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

          {stepsData.map((step) => (
            <SharedCard
              key={step.id}
              id={step.id}
              title={{
                content: step.displayTitle,
                size: "h2",
                level: "h2",
                alignment: step.titleAlignment,
                className: clsx(
                  headingMarginBottom,
                  step.cardType === "no-image" ? "!text-center" : "md:!text-left !text-center",
                  "!font-losttitle"
                ),
              }}
              image={
                step.imageProps
                  ? {
                      ...step.imageProps,
                      onClick: step.imageProps.src
                        ? () => openGallery(step.imageProps!.src!)
                        : undefined,
                    }
                  : undefined
              }
              motion={{ enableEntry: !isMotionDisabled }}
              className={clsx(
                step.cardType === "no-image" && "py-6 sm:py-8 px-6 sm:px-8 md:px-12 lg:px-16"
              )}
              paddingVariant={
                step.cardType === "with-image" || step.id === "intro-card" ? "default" : "none"
              }
            >
              {step.cardType === "with-image" ? (
                <>
                  <div className={clsx("mb-1 h-px", mainTitleDividerColor)} />
                  <div className="mt-2 space-y-0">
                    {step.subSteps.map((subStep, index) => (
                      <VerticalSubStepItem
                        key={subStep.title}
                        icon={subStep.icon}
                        title={subStep.title}
                        description={subStep.description}
                        isLast={index === step.subSteps.length - 1}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className={clsx("mb-1 h-px", mainTitleDividerColor)} />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mt-3 w-full gap-x-3 lg:gap-x-5">
                    {step.subSteps.map((subStep, index) => (
                      <React.Fragment key={subStep.title}>
                        <SubStepColumn
                          icon={subStep.icon}
                          title={subStep.title}
                          description={subStep.description}
                          className={clsx(
                            index > 0 &&
                              "mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-l md:border-t-0",
                            columnDividerColor
                          )}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </>
              )}
            </SharedCard>
          ))}
        </div>
      </div>
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        images={pageImages}
        currentIndex={currentImageIndex}
        onClose={closeGallery}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </Section>
  );
}
