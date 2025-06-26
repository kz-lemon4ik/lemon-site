import clsx from "clsx";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Heading, Section, SharedCard, useSettings } from "@lemon-site/shared-ui";
import ImageGalleryModal from "@/components/ImageGalleryModal";
import { createTextClasses } from "../styles/utils";

const placeholderGalleryImages = [
  "/images/hall-of-fame/result-placeholder-1.png",
  "/images/hall-of-fame/result-placeholder-2.png",
];

const featuredPlayersData = [
  {
    id: 2,
    avatarUrl: null,
    username: "Player001",
    osuProfileUrl: "#",
    description: "Description for Player001",
    galleryImages: placeholderGalleryImages,
  },
  {
    id: 1,
    avatarUrl: "/images/avatars/avatar.jpg",
    username: "KZ_Lemon4ik",
    osuProfileUrl: "https://osu.ppy.sh/users/8674298",
    description: "The creator of Lost Scores Analyzer",
    galleryImages: placeholderGalleryImages,
  },
  {
    id: 3,
    avatarUrl: null,
    username: "Player002",
    osuProfileUrl: "#",
    description: "Description for Player002",
    galleryImages: placeholderGalleryImages,
  },
];

const topLostPPData = [
  {
    id: 1,
    rank: 1,
    username: "User001",
    osuProfileUrl: "#",
    lostPP: 1000,
    date: "2023-01-01",
    galleryImages: placeholderGalleryImages,
  },
  {
    id: 2,
    rank: 2,
    username: "User002",
    osuProfileUrl: "#",
    lostPP: 900,
    date: "2023-01-02",
    galleryImages: placeholderGalleryImages,
  },
  {
    id: 3,
    rank: 3,
    username: "User003",
    osuProfileUrl: "#",
    lostPP: 800,
    date: "2023-01-03",
    galleryImages: placeholderGalleryImages,
  },
  {
    id: 4,
    rank: 4,
    username: "User004",
    osuProfileUrl: "#",
    lostPP: 700,
    date: "2023-01-04",
    galleryImages: placeholderGalleryImages,
  },
];

export default function HallOfFame() {
  const { isMotionDisabled, theme } = useSettings();

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (images: string[], index: number = 0) => {
    setCurrentGalleryImages(images.filter((img) => !!img));
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => setIsGalleryOpen(false);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % currentGalleryImages.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + currentGalleryImages.length) % currentGalleryImages.length
    );

  const sectionMotionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const, staggerChildren: 0.1 },
    },
  };
  const currentSectionMotionVariants = isMotionDisabled
    ? { hidden: {}, visible: {} }
    : sectionMotionVariants;

  const buttonClasses = clsx(
    "p-2 border rounded-lg transition-all duration-200 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75",
    "bg-white/10 hover:bg-white/20 border-white/10 text-lavender-200 focus-visible:ring-purple-400",
    "theme-is-light:bg-themeLight-actionButtonBaseBg theme-is-light:hover:bg-themeLight-actionButtonHoverBg theme-is-light:border-themeLight-actionButtonBorder theme-is-light:text-themeLight-actionButtonText theme-is-light:hover:text-themeLight-actionButtonHoverText theme-is-light:focus-visible:ring-themeLight-primary"
  );

  return (
    <Section id="hall-of-fame" className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          size="xl"
          className={clsx(
            "mb-12 font-losttitle text-center sm:text-center",
            "text-white",
            "theme-is-light:text-themeLight-headingText"
          )}
        >
          Hall of Fame
        </Heading>

        <motion.div
          variants={currentSectionMotionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2
            className={clsx(
              "text-3xl font-semibold font-lostheading mb-8 text-center sm:text-center",
              "text-white",
              "theme-is-light:text-themeLight-headingText"
            )}
          >
            Featured Players
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {featuredPlayersData.map((player) => (
              <SharedCard
                key={player.id}
                motion={{ enableEntry: !isMotionDisabled }}
                className="text-center flex flex-col"
                paddingVariant="default"
                textStyles={{ base: createTextClasses(), alignment: "center" }}
              >
                <div
                  className={clsx(
                    "group w-24 h-24 rounded-full mx-auto mb-4 border-2 flex items-center justify-center shrink-0 cursor-pointer",
                    "border-purple-400 hover:border-lemon-400",
                    "theme-is-light:border-themeLight-primary",
                    !isMotionDisabled && "transform transition-transform hover:scale-110"
                  )}
                  onClick={() => player.galleryImages && openGallery(player.galleryImages)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && player.galleryImages)
                      openGallery(player.galleryImages);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View results for ${player.username}`}
                >
                  {player.avatarUrl ? (
                    <img
                      src={player.avatarUrl}
                      alt={player.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className={clsx(
                        "text-4xl font-bold transition-colors",
                        "text-purple-400",
                        theme === "dark" && "group-hover:text-lemon-400",
                        "theme-is-light:text-themeLight-primary"
                      )}
                    >
                      {player.username.substring(0, 1).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3
                  className={clsx(
                    "text-xl font-semibold mb-2 font-lostheading",
                    "text-lavender-200",
                    "theme-is-light:text-themeLight-projectTitleText"
                  )}
                >
                  <a
                    href={player.osuProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors text-lavender-200 hover:text-lemon-400 theme-is-light:text-slate-500 theme-is-light:hover:text-themeLight-primary"
                  >
                    {player.username}
                  </a>
                </h3>
                <p className="text-sm flex-grow">{player.description}</p>
              </SharedCard>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={currentSectionMotionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2
            className={clsx(
              "text-3xl font-semibold font-lostheading mb-8 text-center sm:text-center",
              "text-white",
              "theme-is-light:text-themeLight-headingText"
            )}
          >
            Top Lost PP Discoveries
          </h2>
          <SharedCard
            motion={{ enableEntry: !isMotionDisabled }}
            paddingVariant="default"
            textStyles={{ base: createTextClasses() }}
          >
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[600px]">
                <colgroup>
                  <col className="w-12" />
                  <col className="min-w-[140px]" />
                  <col className="w-20" />
                  <col className="w-16" />
                  <col className="w-20" />
                </colgroup>
                <thead
                  className={clsx(
                    "border-b",
                    "border-slate-600",
                    "theme-is-light:border-themeLight-border"
                  )}
                >
                  <tr>
                    <th
                      className={clsx(
                        "p-3 text-left font-lostheading text-sm",
                        "text-lavender-200",
                        "theme-is-light:text-themeLight-mutedText"
                      )}
                    >
                      #
                    </th>
                    <th
                      className={clsx(
                        "p-3 text-left font-lostheading text-sm",
                        "text-lavender-200",
                        "theme-is-light:text-themeLight-mutedText"
                      )}
                    >
                      Player
                    </th>
                    <th
                      className={clsx(
                        "p-3 text-right font-lostheading text-sm",
                        "text-lavender-200",
                        "theme-is-light:text-themeLight-mutedText"
                      )}
                    >
                      Lost PP
                    </th>
                    <th
                      className={clsx(
                        "p-3 text-center font-lostheading text-sm",
                        "text-lavender-200",
                        "theme-is-light:text-themeLight-mutedText"
                      )}
                    >
                      Results
                    </th>
                    <th
                      className={clsx(
                        "p-3 text-left font-lostheading text-sm",
                        "text-lavender-200",
                        "theme-is-light:text-themeLight-mutedText"
                      )}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topLostPPData.map((entry) => (
                    <tr
                      key={entry.id}
                      className={clsx(
                        "border-b transition-colors",
                        "border-slate-700/50 hover:bg-slate-700/30",
                        "theme-is-light:border-themeLight-border theme-is-light:hover:bg-slate-100/80"
                      )}
                    >
                      <td
                        className={clsx(
                          "p-3 font-semibold truncate",
                          "text-lavender-200",
                          "theme-is-light:text-themeLight-mutedText"
                        )}
                      >
                        {entry.rank}
                      </td>
                      <td className={clsx("p-3 truncate")}>
                        <a
                          href={entry.osuProfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors text-lavender-200 hover:text-lemon-400 theme-is-light:text-slate-500 theme-is-light:hover:text-themeLight-primary"
                        >
                          {entry.username}
                        </a>
                      </td>
                      <td
                        className={clsx(
                          "p-3 text-right font-semibold truncate",
                          "text-lemon-400",
                          "theme-is-light:text-themeLight-highlightTextColor"
                        )}
                      >
                        {entry.lostPP.toLocaleString()} PP
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => entry.galleryImages && openGallery(entry.galleryImages)}
                          className={buttonClasses}
                          aria-label={`View results for ${entry.username}`}
                          title="View Results"
                        >
                          <Eye size={18} strokeWidth={2.5} />
                        </button>
                      </td>
                      <td
                        className={clsx(
                          "p-3 text-sm truncate",
                          "text-lavender-300",
                          "theme-is-light:text-themeLight-mutedText"
                        )}
                      >
                        {entry.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p
              className={clsx(
                "text-xs text-center mt-4",
                "text-slate-400",
                "theme-is-light:text-themeLight-mutedText"
              )}
            >
              No data available. Results will be displayed here when submitted.
            </p>
          </SharedCard>
        </motion.div>
      </div>
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        images={currentGalleryImages}
        currentIndex={currentImageIndex}
        onClose={closeGallery}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </Section>
  );
}
