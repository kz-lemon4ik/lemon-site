import clsx from "clsx";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useMemo, useRef } from "react";
import { SharedCard, useSettings } from "@lemon-site/shared-ui";
import { createAnswerPartStrategies } from "./FaqAnswerPartStrategies";

export type AnswerPart =
  | string
  | { type: "strong"; content: string }
  | { type: "code"; content: string }
  | { type: "link"; href: string; text: string }
  | { type: "list"; items: AnswerPart[][] };

export interface FaqDataItem {
  question: string;
  answer: AnswerPart[];
}

interface FaqItemProps {
  item: FaqDataItem;
  isOpen: boolean;
  onClick: () => void;
}

export default function FaqItem({ item, isOpen, onClick }: FaqItemProps) {
  const { isMotionDisabled } = useSettings();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });

  React.useEffect(() => {
    console.log(
      `FaqItem "${item.question.slice(0, 20)}...": motion=${!isMotionDisabled}, inView=${isInView}, open=${isOpen}`
    );
  }, [isMotionDisabled, isInView, item.question, isOpen]);

  const accentLinkStyles = clsx(
    "underline font-semibold transition-colors duration-200 break-words",
    "text-lemon-400 hover:text-lavender-300",
    "theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover"
  );
  const codeStyles = clsx(
    "font-mono text-sm px-1.5 py-0.5 rounded",
    "text-lemon-300 bg-slate-700/60",
    "theme-is-light:text-themeLight-codeText theme-is-light:bg-themeLight-codeBg"
  );

  const AnswerPartComponents = useMemo(
    () => createAnswerPartStrategies({ accentLinkStyles, codeStyles }),
    [accentLinkStyles, codeStyles]
  );

  const renderAnswerPartContent = (part: AnswerPart, partKey: React.Key): React.ReactNode => {
    if (typeof part === "string") {
      return (
        <p key={partKey} className="my-3 first:mt-0 last:mb-0">
          {part}
        </p>
      );
    }

    const Component = AnswerPartComponents[part.type];
    if (!Component) {
      return null;
    }

    if (part.type === "list") {
      const ListComponent = Component as React.ComponentType<{
        items: AnswerPart[][];
        partKey: React.Key;
        renderContent: (part: AnswerPart, key: React.Key) => React.ReactNode;
      }>;
      return (
        <ListComponent
          items={part.items}
          partKey={partKey}
          renderContent={renderAnswerPartContent}
        />
      );
    }

    const GenericComponent = Component as React.ComponentType<typeof part & { partKey: React.Key }>;
    return <GenericComponent {...part} partKey={partKey} />;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      boxShadow: "0 10px 25px rgba(0,0,0,0)",
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
    hover: {
      scale: 1.02,
      y: -2,
      boxShadow: "0 10px 25px rgba(0,0,0,0.07)",
      transition: { duration: 0.2, ease: "circOut" as const },
    },
  };

  if (isMotionDisabled) {
    return (
      <div ref={cardRef}>
        <SharedCard paddingVariant="none">
          <button
            onClick={onClick}
            className={clsx(
              "flex justify-between items-center w-full p-6 text-left bg-transparent focus:outline-none",
              "focus-visible:ring-2 focus-visible:ring-opacity-75",
              "focus-visible:ring-purple-500",
              "theme-is-light:focus-visible:ring-themeLight-primary"
            )}
            aria-expanded={isOpen}
          >
            <h3
              className={clsx(
                "text-lg sm:text-xl font-semibold font-lostnav",
                "text-white",
                "theme-is-light:text-themeLight-headingText"
              )}
            >
              {item.question}
            </h3>
            <div className="min-w-[24px]">
              {isOpen ? (
                <ChevronUp
                  size={24}
                  className={clsx("text-lavender-400", "theme-is-light:text-themeLight-primary")}
                />
              ) : (
                <ChevronDown
                  size={24}
                  className={clsx("text-lavender-300", "theme-is-light:text-slate-600")}
                />
              )}
            </div>
          </button>
          {isOpen && (
            <div className="px-6 pb-6 pt-4">
              <div
                className={clsx(
                  "font-lostbody text-sm sm:text-base leading-relaxed",
                  "text-lavender-200",
                  "theme-is-light:text-themeLight-text"
                )}
              >
                {item.answer.map((part, index) => renderAnswerPartContent(part, index))}
              </div>
            </div>
          )}
        </SharedCard>
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={!isOpen ? "hover" : undefined}
    >
      <SharedCard paddingVariant="none" motion={{ enableEntry: false }}>
        <button
          onClick={onClick}
          className={clsx(
            "flex justify-between items-center w-full p-6 text-left bg-transparent focus:outline-none",
            "focus-visible:ring-2 focus-visible:ring-opacity-75",
            "focus-visible:ring-purple-500",
            "theme-is-light:focus-visible:ring-themeLight-primary"
          )}
          aria-expanded={isOpen}
        >
          <h3
            className={clsx(
              "text-lg sm:text-xl font-semibold font-lostnav",
              "text-white",
              "theme-is-light:text-themeLight-headingText"
            )}
          >
            {item.question}
          </h3>
          <div className="min-w-[24px]">
            {isOpen ? (
              <ChevronUp
                size={24}
                className={clsx("text-lavender-400", "theme-is-light:text-themeLight-primary")}
              />
            ) : (
              <ChevronDown
                size={24}
                className={clsx("text-lavender-300", "theme-is-light:text-slate-600")}
              />
            )}
          </div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: {
                  opacity: 1,
                  height: "auto",
                  transition: {
                    duration: 0.3,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  },
                },
                collapsed: {
                  opacity: 0,
                  height: 0,
                  transition: {
                    duration: 0.3,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  },
                },
              }}
              className="overflow-hidden"
            >
              <div
                className={clsx(
                  "px-6 pb-6 pt-4 font-lostnav text-base leading-relaxed text-justify",
                  "text-lavender-200",
                  "theme-is-light:text-themeLight-text"
                )}
              >
                {item.answer.map((block, index) => renderAnswerPartContent(block, index))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SharedCard>
    </motion.div>
  );
}
