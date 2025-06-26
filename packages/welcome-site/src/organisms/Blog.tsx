import { motion } from "framer-motion";
import { Heading, Section, useSettings } from "@lemon-site/shared-ui";

export default function Blog() {
  const { isMotionDisabled } = useSettings();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Section
      id="blog"
      className="h-screen overflow-hidden relative flex flex-col items-center justify-center text-center"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={isMotionDisabled ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <Heading
          size="xl"
          className="text-5xl sm:text-7xl font-bold text-white theme-is-light:text-themeLight-headingText drop-shadow-[0_0_10px_rgba(246,224,94,0.5)] theme-is-light:drop-shadow-[0_0_8px_var(--color-heading-drop-shadow)] select-none font-title"
        >
          Blog coming soon...
        </Heading>
      </motion.div>
    </Section>
  );
}
