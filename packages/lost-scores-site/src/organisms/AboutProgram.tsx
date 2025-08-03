import clsx from "clsx";
import {
  Award,
  Code,
  History,
  Image,
  Info,
  LucideIcon,
  Network,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Heading,
  HighlightText,
  Section,
  SharedCard,
  SharedCardImageProps,
  useSettings,
} from "@lemon-site/shared-ui";
import ImageGalleryModal from "@/components/ImageGalleryModal";

const accentLinkStyles = clsx(
  "underline hover:no-underline font-semibold transition-colors duration-200",
  "text-lemon-400 hover:text-lavender-300",
  "theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover"
);

interface KeyValueItemProps {
  icon: LucideIcon;
  children: React.ReactNode;
}

const KeyValueItem: React.FC<KeyValueItemProps> = ({ icon: Icon, children }) => (
  <div className="flex items-start text-left gap-4">
    <Icon
      className="shrink-0 w-8 h-8 mt-1 text-purple-400 theme-is-light:text-themeLight-primary"
      strokeWidth={1.5}
    />
    <div>{children}</div>
  </div>
);

export default function AboutProgram() {
  const { isMotionDisabled } = useSettings();

  const storyImg = "/images/examples/scorev1.webp";
  const problemImg = "/images/examples/calculations.webp";
  const keyValueImg = "/images/examples/btmc.webp";

  const pageImages = [storyImg, problemImg, keyValueImg];

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pageImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + pageImages.length) % pageImages.length);
  };

  const paragraphBaseStyles = "text-justify";
  const paragraphMargin = "mb-6";
  const headingMarginBottom = "mb-8";
  const pageHeadingMarginBottom = "mb-20";

  const textStyleBase =
    "font-lostnav text-base sm:text-lg leading-relaxed text-lavender-200 theme-is-light:text-themeLight-text";

  const cardData = [
    {
      title: 'The Story of "ScoreV1\'d" Plays',
      textAlignment: "left",
      image: {
        src: storyImg,
        alt: "Illustration for ScoreV1'd Plays Story",
        aspectRatio: "1920x1440",
        onClick: () => openGallery(pageImages.indexOf(storyImg)),
        placement: "right",
        className: "max-w-full mx-auto",
      } as SharedCardImageProps,
      content: (
        <div className="space-y-6">
          <p className={paragraphBaseStyles}>
            Every seasoned osu! player has likely encountered a situation where their best
            Performance Points (PP) score on a map was overwritten by a play with more score points
            but less PP. This was common before the game's score submission system was updated.
          </p>
          <div
            className={clsx(
              "p-4 rounded-r-md text-sm backdrop-blur-xl",
              "bg-black/30 border-l-4 border-lemon-400",
              "theme-is-light:bg-themeLight-primaryLightBg theme-is-light:border-l-4 theme-is-light:border-themeLight-primary"
            )}
          >
            <div className="flex items-center gap-x-3">
              <Info
                className="shrink-0 text-lemon-400 theme-is-light:text-themeLight-primary"
                strokeWidth={2.5}
              />
              <span>
                This phenomenon is known in the community as getting{" "}
                <HighlightText>«ScoreV1'd»</HighlightText>.
              </span>
            </div>
          </div>
          <p className={paragraphBaseStyles}>
            <HighlightText>osu! Lost Scores Analyzer</HighlightText> is a tool created to:
          </p>
          <div className="space-y-5">
            <KeyValueItem icon={Trophy}>
              <strong>Reclaim your lost PP</strong>, at least hypothetically, by showing what your
              rank could have been.
            </KeyValueItem>
            <KeyValueItem icon={Search}>
              <strong>Find your true best plays</strong> that are hiding in your local replay
              collection, unnoticed for years.
            </KeyValueItem>
            <KeyValueItem icon={History}>
              <strong>Better understand your own gameplay journey</strong> and see how much you've
              improved.
            </KeyValueItem>
          </div>
        </div>
      ),
    },
    {
      title: "What is the program's main goal?",
      titleAlignment: "center",
      textAlignment: "right",
      image: {
        src: problemImg,
        alt: "Illustration of PP Calculations",
        aspectRatio: "1280x720",
        onClick: () => openGallery(pageImages.indexOf(problemImg)),
        placement: "left",
        className: "max-w-full mx-auto",
      } as SharedCardImageProps,
      content: (
        <div className="space-y-6">
          <p className={`${paragraphBaseStyles}`}>
            The main goal is to identify and showcase your locally saved replays that are
            objectively better (in terms of PP) than your official online records, but were "lost"
            due to the old scoring system.
          </p>
          <div className="text-center my-4 p-5 rounded-lg bg-slate-900/30 theme-is-light:bg-slate-500/5">
            <h4 className="font-lostheading text-2xl font-semibold text-center sm:text-center text-white theme-is-light:text-themeLight-headingText">
              The program answers the question:
            </h4>
            <p className="mt-2 text-lg text-lavender-200 theme-is-light:text-themeLight-text italic">
              "What if my best attempts had been submitted correctly?"
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Key Value For You",
      textAlignment: "left",
      image: {
        src: keyValueImg,
        alt: "BTMC using the program or a similar concept",
        aspectRatio: "1722x870",
        onClick: () => openGallery(pageImages.indexOf(keyValueImg)),
        placement: "right",
        className: "max-w-full mx-auto",
      } as SharedCardImageProps,
      content: (
        <div className="space-y-6">
          <KeyValueItem icon={Sparkles}>
            <strong>Discover your true potential:</strong> See how much PP you might have "lost".
            This could range from a few dozen to several hundred!
          </KeyValueItem>
          <KeyValueItem icon={Award}>
            <strong>Rediscover your best plays:</strong> Remember those amazing scores that you
            thought were gone forever after being "ScoreV1'd".
          </KeyValueItem>
          <KeyValueItem icon={ShieldCheck}>
            <strong>Completely safe and legitimate:</strong> The program only analyzes your local
            data and official info via the osu! API. It does not modify game files or violate any
            rules.
          </KeyValueItem>
        </div>
      ),
    },
  ];

  const bottomCardsData = [
    {
      title: "A Glimpse of What It Does",
      titleAlignment: "center",
      textAlignment: "left",
      content: (
        <>
          <p className={`${paragraphBaseStyles} ${paragraphMargin}`}>
            <HighlightText>osu! Lost Scores Analyzer</HighlightText> meticulously scans your local
            replays, compares them against your online records, and highlights plays that could have
            significantly boosted your PP. It then visualizes what your top performance list might
            look like with these "lost" scores.
          </p>
          <p
            className={`${paragraphBaseStyles.replace("text-justify", "text-left")} ${paragraphMargin}`}
          >
            For a detailed breakdown of the analysis process, please visit the{" "}
            <RouterLink to="/how-it-works" className={accentLinkStyles}>
              How it Works
            </RouterLink>{" "}
            page.
          </p>
        </>
      ),
    },
    {
      title: "Technologies & Ethos",
      titleAlignment: "center",
      textAlignment: "left",
      content: (
        <div className="space-y-4">
          <p className={paragraphBaseStyles}>
            The tool was created with the idea of helping players rediscover their achievements.
            Here are the core technologies used:
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm text-center">
            <div className="p-3 bg-black/30 backdrop-blur-xl theme-is-light:bg-slate-200/80 rounded-lg">
              <KeyValueItem icon={Code}>Python</KeyValueItem>
            </div>
            <div className="p-3 bg-black/30 backdrop-blur-xl theme-is-light:bg-slate-200/80 rounded-lg">
              <KeyValueItem icon={Palette}>PySide6 (GUI)</KeyValueItem>
            </div>
            <div className="p-3 bg-black/30 backdrop-blur-xl theme-is-light:bg-slate-200/80 rounded-lg">
              <KeyValueItem icon={Image}>Pillow (Images)</KeyValueItem>
            </div>
            <div className="p-3 bg-black/30 backdrop-blur-xl theme-is-light:bg-slate-200/80 rounded-lg">
              <KeyValueItem icon={Network}>osu! API</KeyValueItem>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Section id="about-program" className="pt-20 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <Heading
          size="xl"
          className={clsx(
            `text-center sm:text-center ${pageHeadingMarginBottom} font-losttitle`,
            "text-white",
            "theme-is-light:text-themeLight-headingText"
          )}
        >
          About Program
        </Heading>

        <div className="space-y-10 md:space-y-12">
          {cardData.map((card, index) => (
            <SharedCard
              key={index}
              title={{
                content: card.title,
                size: "h2",
                level: "h2",
                className: clsx(headingMarginBottom, "!font-losttitle"),
                alignment: card.titleAlignment as "left" | "center" | "right",
              }}
              image={card.image}
              textStyles={{
                base: textStyleBase,
                alignment: card.textAlignment as "left" | "center" | "right" | "justify",
              }}
              motion={{ enableEntry: !isMotionDisabled }}
              paddingVariant="default"
            >
              {card.content}
            </SharedCard>
          ))}

          <div className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12">
            {bottomCardsData.map((card, index) => (
              <SharedCard
                key={index}
                title={{
                  content: card.title,
                  size: "h2",
                  level: "h2",
                  className: clsx(headingMarginBottom, "!font-losttitle"),
                  alignment: card.titleAlignment as "left" | "center" | "right",
                }}
                textStyles={{
                  base: textStyleBase,
                  alignment: card.textAlignment as "left" | "center" | "right" | "justify",
                }}
                motion={{ enableEntry: !isMotionDisabled }}
                paddingVariant="default"
              >
                {card.content}
              </SharedCard>
            ))}
          </div>
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
