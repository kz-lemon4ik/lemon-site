import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { Calculator, LucideIcon, ShieldCheck, Wrench } from "lucide-react";
import { useRef, useState } from "react";
import { Heading, Section, SharedCard, useSettings } from "@lemon-site/shared-ui";
import FaqItem, { FaqDataItem } from "@/molecules/FaqItem";

const generalFaqData: FaqDataItem[] = [
  {
    question: 'Is it safe to use "osu! Lost Scores Analyzer"? Will it affect my osu! account?',
    answer: [
      'Yes, using "osu! Lost Scores Analyzer" is completely safe.',
      {
        type: "list",
        items: [
          [
            "The program runs locally on your computer, analyzing your .osr files and data obtained from the official osu! API using your key.",
          ],
          [
            "It does not modify game files, interfere with gameplay, or send any data about your scores to osu! servers to change or overwrite them. All operations are purely informational and analytical.",
          ],
          [
            'Using an API key to obtain information about scores and maps is a standard and permitted practice. By default, the program makes requests at an interval corresponding to the official limit of 60 requests per minute to avoid overloading osu! servers. The osu! developer (peppy) has mentioned the permissibility of short-term "bursts" of up to 1200 requests per minute for API, but constant use of such a high limit is not recommended. If necessary, experienced users can change the ',
            { type: "code", content: "api_request_delay" },
            " parameter (interval in seconds between requests) in the program's configuration file (",
            { type: "code", content: ".env" },
            "), but they do so at their own risk. We recommend sticking to the standard settings.",
          ],
          [
            "The project's source code is open (MIT License), allowing anyone to verify its absence of malicious functions.",
          ],
        ],
      },
      "The program does not violate osu! rules and should not lead to any sanctions against your account with responsible use.",
    ],
  },
  {
    question: "Which versions of osu! does the program support?",
    answer: [
      '"osu! Lost Scores Analyzer" is designed exclusively for osu!stable. It does not support osu!lazer and unofficial game clients and servers. The main purpose of the analysis is to find scores potentially "lost" due to ScoreV1 mechanics, which were relevant specifically in osu!stable.',
    ],
  },
  {
    question: "Can I use the program to analyze another player's replays?",
    answer: [
      "The program's main functionality is focused on analyzing your own local replays and comparing them with your osu! online profile. This requires your nickname/ID and your osu! API key.",
      "Theoretically, if you have another player's .osr files and enter their nickname/ID (using your API key for API requests), the program will try to perform an analysis. However, this is not the primary purpose, and the correctness of such analysis will depend on the completeness of the other player's replay collection and the availability of their online statistics. Your key is still used for API requests to get information about another player's profile.",
    ],
  },
];

const technicalFaqData: FaqDataItem[] = [
  {
    question: "Why is an osu! API key needed and how do I get it?",
    answer: [
      "The osu! API key is necessary for the program to:",
      {
        type: "list",
        items: [
          ["Obtain your current top online scores from the official osu! servers."],
          [
            "Download information about beatmaps on which your local records were set, for correct PP calculation.",
          ],
        ],
      },
      "Without an API key, the program cannot compare your local replays with your online profile and provide a full analysis.",
      { type: "strong", content: "How to get the key:" },
      {
        type: "list",
        items: [
          [
            "1. Go to the official osu! API key request page: ",
            { type: "link", href: "https://osu.ppy.sh/p/api", text: "https://osu.ppy.sh/p/api" },
            " (you need to be logged into your osu! account).",
          ],
          [
            '2. Fill out a short form, indicating your application name (e.g., "osu! Lost Scores Analyzer access") and a brief description of the purpose (e.g., "For personal analysis of old replays and lost PP").',
          ],
          ["3. After submitting the form, you will be provided with an API key. Copy it."],
          [
            '4. Paste this key into the corresponding field in the "osu! Lost Scores Analyzer" settings.',
          ],
        ],
      },
      { type: "strong", content: "Important:" },
      " Treat your API key like a password and do not share it with anyone.",
    ],
  },
  {
    question:
      "What should I do if the program doesn't start, gives an error, or can't find my osu! folder?",
    answer: [
      "Here are some general tips:",
      {
        type: "list",
        items: [
          [
            { type: "strong", content: "osu! folder not found:" },
            " Ensure you have correctly specified the path to the root osu! folder (where ",
            { type: "code", content: "osu!.exe" },
            " and the ",
            { type: "code", content: "Songs" },
            " folder are located) in the program settings. The program tries to detect the path automatically, but this is not always successful.",
          ],
          [
            { type: "strong", content: "Blocked by antivirus:" },
            " Some antiviruses may mistakenly react to the program or its launcher (especially if it's a new release). Try temporarily disabling your antivirus or adding the program's folder (and its executable files) to exclusions.",
          ],
          [
            {
              type: "strong",
              content: "Dependency problems (especially when installing from source code):",
            },
            " Ensure all dependencies from the ",
            { type: "code", content: "requirements.txt" },
            " file are installed correctly in your virtual environment. For the .exe version, the launcher should have installed them automatically; if an error occurred, check your internet connection and try running the launcher as an administrator.",
          ],
          [
            { type: "strong", content: "Incorrect API key:" },
            " Check if you copied and pasted the osu! API key correctly in the settings.",
          ],
          [
            { type: "strong", content: "Check logs:" },
            " The program creates detailed log files in the ",
            { type: "code", content: "log/" },
            " folder with timestamped subdirectories (e.g., ",
            { type: "code", content: "log/2025-06-24_12-34-56/" },
            "), which contain error messages and processing details.",
          ],
          [
            { type: "strong", content: "Seek help:" },
            ' If the problem persists, visit the "Issues" page on the project\'s GitHub (',
            {
              type: "link",
              href: "https://github.com/kz-lemon4ik/osu-lost-scores/issues",
              text: "https://github.com/kz-lemon4ik/osu-lost-scores/issues",
            },
            "). Check if your problem is already described, or create a new detailed issue.",
          ],
        ],
      },
    ],
  },
  {
    question: "Does the program require internet access to work?",
    answer: [
      "Yes, full program functionality requires internet access for several reasons:",
      {
        type: "list",
        items: [
          ["Obtaining data via osu! API: Downloading your online records and map information."],
          [
            "First run of the .exe version: The launcher downloads necessary dependencies (PySide6, pandas, Pillow, ",
            { type: "code", content: "rosu-pp-py" },
            " v3+, and others) during the first installation.",
          ],
          [
            "Checking for dependency updates (for .exe version): The launcher may check and update key libraries on subsequent launches.",
          ],
        ],
      },
      "Analysis of already downloaded .osr files and their PP calculation can occur locally (if map data was cached), but an internet connection is necessary for comparison with online statistics and to get the full picture.",
    ],
  },
  {
    question: "Are other operating systems besides Windows supported?",
    answer: [
      'Currently, "osu! Lost Scores Analyzer" is officially developed and tested only for Windows (10/11). The executable file (.exe) is intended for this OS.',
      "Users of other operating systems (Linux, macOS) can theoretically try to run the program from source code by installing Python and all necessary dependencies. However, stable operation and full functionality on these systems are not guaranteed, and official support for them is currently unavailable.",
    ],
  },
  {
    question: "Where does the program store its data and settings?",
    answer: [
      "The program stores its data locally on your computer:",
      {
        type: "list",
        items: [
          [
            "Configuration files (user settings, osu! path, API request delay, etc.) are saved in the ",
            { type: "code", content: "config/" },
            " folder (e.g., ",
            { type: "code", content: "gui_config.json" },
            ") inside the program directory.",
          ],
          [
            "Sensitive data like API credentials are securely stored in the system keyring using the ",
            { type: "code", content: "keyring" },
            " library for enhanced security.",
          ],
          [
            "Beatmap and replay cache (processed .osr files, map MD5 hashes, beatmap info) is saved in the ",
            { type: "code", content: "cache/" },
            " folder to speed up subsequent launches.",
          ],
          [
            "Operation logs and error reports are saved in the ",
            { type: "code", content: "log/" },
            " folder with timestamped subdirectories.",
          ],
          [
            "Analysis results (CSV files with found scores) are saved in the ",
            { type: "code", content: "csv/" },
            " folder.",
          ],
          [
            "Generated result images are saved in the ",
            { type: "code", content: "results/" },
            " folder.",
          ],
        ],
      },
      "All this data is stored locally and is not transmitted to any external servers, except for requests to the osu! API.",
    ],
  },
];

const functionalityFaqData: FaqDataItem[] = [
  {
    question: "How accurate is the PP calculation in the program?",
    answer: [
      "The program uses the ",
      { type: "code", content: "rosu-pp-py" },
      " library for PP calculation. This library is a port of the official PP calculator from osu!lazer and aims for maximum accuracy according to the current PP calculation algorithms used in osu! (stable) for replays with classic mods. However, there may always be minor discrepancies due to updates in osu!'s algorithms or the library itself. The program is focused on identifying potentially better scores with high accuracy.",
    ],
  },
  {
    question: 'Why can\'t the program automatically submit found "lost" scores to the osu! server?',
    answer: [
      'Official osu! servers do not provide the ability to submit or overwrite old records in this way. The osu! records system registers scores at the moment they are set. "osu! Lost Scores Analyzer" is an analysis and information tool; it helps you see missed potential or find forgotten outstanding results, but it cannot change your online record history.',
    ],
  },
];

const accentLinkStyles = clsx(
  "underline hover:no-underline font-semibold transition-colors duration-200",
  "text-lemon-400 hover:text-lavender-300",
  "theme-is-light:text-themeLight-linkText theme-is-light:hover:text-themeLight-linkTextHover"
);

const CategoryHeader = ({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { isMotionDisabled } = useSettings();

  if (isMotionDisabled) {
    return (
      <h2
        ref={ref}
        className="flex items-center justify-center sm:justify-start gap-x-3 text-2xl sm:text-3xl font-semibold font-lostheading text-white theme-is-light:text-themeLight-headingText"
      >
        <Icon
          className="w-7 h-7 text-purple-400 theme-is-light:text-themeLight-primary"
          strokeWidth={2}
        />
        <span>{children}</span>
      </h2>
    );
  }

  return (
    <motion.h2
      ref={ref}
      className="flex items-center justify-center sm:justify-start gap-x-3 text-2xl sm:text-3xl font-semibold font-lostheading text-white theme-is-light:text-themeLight-headingText"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Icon
        className="w-7 h-7 text-purple-400 theme-is-light:text-themeLight-primary"
        strokeWidth={2}
      />
      <span>{children}</span>
    </motion.h2>
  );
};

export default function Faq() {
  const { isMotionDisabled } = useSettings();
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleFaqItem = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <Section id="faq" className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Heading
          size="xl"
          className={clsx(
            "text-center sm:text-center mb-12 font-losttitle",
            "text-white",
            "theme-is-light:text-themeLight-headingText"
          )}
        >
          Frequently Asked Questions
        </Heading>

        <SharedCard
          motion={{ enableEntry: !isMotionDisabled }}
          className="mb-12 text-center"
          textStyles={{
            base: "font-lostbody text-lg text-lavender-200 theme-is-light:text-themeLight-text font-bold",
          }}
        >
          <p>
            Here you'll find answers to common questions. If you don't see your question here, feel
            free to reach out via{" "}
            <a href="mailto:feedback@lemon4ik.kz" className={accentLinkStyles}>
              feedback@lemon4ik.kz
            </a>
            .
          </p>
        </SharedCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10">
          <div className="space-y-6">
            <CategoryHeader icon={ShieldCheck}>General & Safety</CategoryHeader>
            {generalFaqData.map((item) => (
              <FaqItem
                key={item.question}
                item={item}
                isOpen={openQuestion === item.question}
                onClick={() => toggleFaqItem(item.question)}
              />
            ))}
            <div className="pt-4 space-y-6">
              <CategoryHeader icon={Calculator}>Functionality</CategoryHeader>
              {functionalityFaqData.map((item) => (
                <FaqItem
                  key={item.question}
                  item={item}
                  isOpen={openQuestion === item.question}
                  onClick={() => toggleFaqItem(item.question)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <CategoryHeader icon={Wrench}>Technical & Setup</CategoryHeader>
            {technicalFaqData.map((item) => (
              <FaqItem
                key={item.question}
                item={item}
                isOpen={openQuestion === item.question}
                onClick={() => toggleFaqItem(item.question)}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
