import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowDownToLine, Info } from "lucide-react";
import { Button, Heading, Section, useSettings } from "@lemon-site/shared-ui";

interface HomeProps {
  enableAnimation: boolean;
}

export default function Home({ enableAnimation }: HomeProps) {
  const { isMotionDisabled } = useSettings();
  const programDescription =
    "Analyze your local replays. Discover ScoreV1'd scores. See your true gaming potential revealed!";
  const shouldAnimate = enableAnimation && !isMotionDisabled;

  const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Section
      id="lost-scores-home"
      className="h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden"
    >
      <motion.div
        variants={motionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: shouldAnimate ? 0.5 : 0, ease: "easeOut" }}
        className={clsx(
          "flex flex-col items-center gap-y-6 sm:gap-y-8 p-8 sm:p-10 rounded-xl max-w-2xl",
          "theme-is-light:md:bg-white/60 theme-is-light:md:backdrop-blur-md theme-is-light:md:shadow-lg theme-is-light:md:w-[120%]"
        )}
      >
        <Heading
          size="xl"
          className={clsx(
            "!text-5xl sm:!text-6xl md:!text-7xl font-losttitle select-none",
            "text-white",
            "theme-is-light:text-themeLight-headingText"
          )}
        >
          osu! Lost Scores
        </Heading>

        <p
          className={clsx(
            "font-lostdescription text-base sm:text-lg md:text-xl max-w-md md:max-w-lg select-none",
            "text-lavender-200",
            "theme-is-light:text-themeLight-subtleText"
          )}
        >
          {programDescription}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
          <Button
            to="/downloads"
            variant="transparentNeutral"
            size="lg"
            leftIcon={ArrowDownToLine}
            enableMotion
            className={clsx(
              "font-lostbody font-semibold",
              "border-transparent text-white hover:text-white",
              "theme-is-light:border-slate-400 theme-is-light:text-slate-700 theme-is-light:hover:text-slate-700"
            )}
          >
            Download
          </Button>
          <Button
            to="/about-program"
            variant="transparentNeutral"
            size="lg"
            leftIcon={Info}
            enableMotion
            className={clsx(
              "font-lostbody font-semibold",
              "border-transparent text-white hover:text-white",
              "theme-is-light:border-slate-400 theme-is-light:text-slate-700 theme-is-light:hover:text-slate-700"
            )}
          >
            Learn More
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
