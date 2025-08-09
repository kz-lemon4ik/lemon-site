import type { LostScore } from "@/types/api";
import BeatmapCover from "./BeatmapCover";
import RankBadge from "./RankBadge";
import ModIcons from "./ModIcons";
import { MoreVertical, Eye, Download } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@lemon-site/shared-ui";

interface ScoreCardProps {
  score: LostScore;
  index: number;
  className?: string;
}

function formatTimeSince(dateStr: string): string {
  try {
    const [datePart, timePart] = dateStr.split(" ");
    const [day, month, year] = datePart.split("-");
    const [hour, minute, second] = timePart.split("-");

    const scoreDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );

    const now = new Date();
    const diffMs = now.getTime() - scoreDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Unknown date";

    const months = diffDays / 30;
    if (months < 1.5) return "about a month ago";
    if (months < 11.5) return `${Math.round(months)} months ago`;

    const years = months / 12;
    if (years < 1.5) return "a year ago";

    const yearRounded = Math.round(years);
    if (yearRounded === 1) return "a year ago";
    if (yearRounded === 2) return "two years ago";
    return `${yearRounded} years ago`;
  } catch {
    return "Unknown date";
  }
}

export default function ScoreCard({ score, className = "" }: ScoreCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isMotionDisabled } = useSettings();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.right - 192
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  const MotionDiv = isMotionDisabled ? "div" : motion.div;

  return (
    <div
      className={`group relative bg-black/30 backdrop-blur-md border border-lavender-500/20 rounded-lg overflow-visible hover:bg-black/40 hover:border-lavender-500/30 transition-all theme-is-light:bg-white/40 theme-is-light:border-slate-300 theme-is-light:hover:bg-white/50 ${className}`}
      style={{ height: "90px" }}
    >
      <div className="flex items-center h-full">
        <BeatmapCover
          beatmapsetId={score.beatmapset_id}
          width={200}
          height={90}
          className="flex-shrink-0"
        />

        <div className="flex items-center flex-1 px-4 gap-4 min-w-0">
          <div className="flex-shrink-0">
            <RankBadge rank={score.rank} size={50} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-x-2 overflow-hidden">
              <a
                href={`https://osu.ppy.sh/beatmapsets/${score.beatmap_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl font-lostbody hover:text-lemon-400 transition-colors truncate flex-shrink-0 theme-is-light:text-slate-900 theme-is-light:hover:text-sky-600"
              >
                {score.title}
              </a>
              <span className="text-lavender-300 text-sm font-lostdescription truncate min-w-0 theme-is-light:text-slate-500">
                by {score.artist}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1 min-w-0">
              <span className="text-orange-400 text-sm font-lostdescription font-bold truncate theme-is-light:text-orange-600">
                {score.version}
              </span>
              <span className="text-lavender-300 text-xs font-lostdescription shrink-0 theme-is-light:text-slate-500" style={{ fontSize: "0.7rem" }}>
                by {score.creator}
              </span>
            </div>

            <div className="flex items-center mt-1">
              <span className="text-slate-500 text-xs font-lostdescription theme-is-light:text-slate-400">
                {formatTimeSince(score.score_time)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <ModIcons mods={score.mods} size={40} spacing={5} />

            <div className="text-yellow-300 text-lg font-lostbody font-bold theme-is-light:text-yellow-600">
              {score.accuracy.toFixed(2)}%
            </div>

            <div className="bg-lavender-500/20 border border-lavender-500/30 backdrop-blur-sm rounded-lg px-4 py-2 min-w-[100px] flex items-center justify-center theme-is-light:bg-sky-600/10 theme-is-light:border-sky-600/30">
              <span className="text-white text-xl font-lostbody font-bold theme-is-light:text-sky-600">
                {Math.round(score.pp)}pp
              </span>
            </div>

            <button
              ref={buttonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-lavender-400 hover:text-white hover:bg-white/5 rounded transition-colors theme-is-light:text-slate-500 theme-is-light:hover:text-slate-900 theme-is-light:hover:bg-slate-200/50"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && menuPosition && createPortal(
        <AnimatePresence>
          <MotionDiv
            ref={menuRef}
            initial={isMotionDisabled ? undefined : { opacity: 0, y: -10 }}
            animate={isMotionDisabled ? undefined : { opacity: 1, y: 0 }}
            exit={isMotionDisabled ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed w-48 bg-[#1a1625]/98 backdrop-blur-2xl border border-white/5 rounded-lg shadow-2xl z-50 py-2 px-2 theme-is-light:bg-white/98 theme-is-light:border-slate-100/30"
            style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
          >
            <button className="w-full py-2 text-left transition-colors rounded-md flex items-center gap-2 text-xs border-l-4 border-transparent hover:border-lemon-400 pl-2 pr-3 text-white hover:bg-black/30 theme-is-light:text-slate-700 theme-is-light:hover:bg-black/5 theme-is-light:hover:border-sky-600 font-lostbody font-semibold">
              <Eye className="w-5 h-5 text-lavender-300 theme-is-light:text-slate-600" />
              <span>View Details</span>
            </button>
            <button className="w-full py-2 text-left transition-colors rounded-md flex items-center gap-2 text-xs border-l-4 border-transparent hover:border-lemon-400 pl-2 pr-3 text-white hover:bg-black/30 theme-is-light:text-slate-700 theme-is-light:hover:bg-black/5 theme-is-light:hover:border-sky-600 font-lostbody font-semibold">
              <Download className="w-5 h-5 text-lavender-300 theme-is-light:text-slate-600" />
              <span>Download Replay</span>
            </button>
          </MotionDiv>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
