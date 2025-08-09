import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useSettings } from "@lemon-site/shared-ui";
import { Loader2 } from "lucide-react";
import type { SubmissionDetail, LostScore } from "@/types/api";
import { getSubmission } from "@/services/api";
import ScoreCard from "./ScoreCard";

interface TopRanksProps {
  submission: SubmissionDetail | null;
  username: string;
}

export default function TopRanks({ submission, username }: TopRanksProps) {
  const { isMotionDisabled } = useSettings();
  const [displayedScores, setDisplayedScores] = useState<LostScore[]>([]);
  const [offset, setOffset] = useState(50);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!submission) return;
    setDisplayedScores(submission.lost_scores);
    setHasMore((submission.total_count || 0) > submission.lost_scores.length);
  }, [submission]);

  const loadMoreScores = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const newData = await getSubmission(username, offset, 50);
      if (newData && newData.lost_scores.length > 0) {
        setDisplayedScores((prev) => [...prev, ...newData.lost_scores]);
        setOffset((prev) => prev + 50);
        setHasMore((newData.total_count || 0) > offset + newData.lost_scores.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more scores:", error);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [username, offset, hasMore, isLoadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMoreScores();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, loadMoreScores]);

  if (!submission || !submission.lost_scores.length) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-lavender-500/30 rounded-lg p-8 theme-is-light:bg-white/60 theme-is-light:border-themeLight-cardBorder">
        <h3 className="text-2xl font-lostbody text-white mb-4 theme-is-light:text-slate-900">
          Top Lost Scores
        </h3>
        <p className="text-lavender-300 font-lostdescription theme-is-light:text-slate-600">
          No lost scores found yet. Run a scan to see your potential PP gains!
        </p>
      </div>
    );
  }

  const MotionDiv = isMotionDisabled ? "div" : motion.div;

  return (
    <MotionDiv
      initial={isMotionDisabled ? false : { opacity: 0, y: 20 }}
      animate={isMotionDisabled ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-black/40 backdrop-blur-xl border border-lavender-500/30 rounded-lg p-8 theme-is-light:bg-white/60 theme-is-light:border-themeLight-cardBorder"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-lostbody text-white mb-2 theme-is-light:text-slate-900">
          Top Lost Scores by PP
        </h3>
        <p className="text-lavender-300 font-lostdescription text-sm theme-is-light:text-slate-600">
          Your highest PP lost scores - potential gains waiting to be claimed
        </p>
      </div>

      <div className="mb-6 p-4 bg-black/20 border border-lavender-500/20 rounded-lg theme-is-light:bg-slate-100/50 theme-is-light:border-slate-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lavender-400 text-xs uppercase font-lostdescription mb-1 theme-is-light:text-slate-500">
              Total Lost Scores
            </div>
            <div className="text-white font-lostbody text-xl font-bold theme-is-light:text-slate-900">
              {submission.summary_stats.lost_scores_found}
            </div>
          </div>

          <div>
            <div className="text-lavender-400 text-xs uppercase font-lostdescription mb-1 theme-is-light:text-slate-500">
              Total PP Gain
            </div>
            <div className="text-lemon-400 font-lostbody text-xl font-bold theme-is-light:text-sky-600">
              +{submission.summary_stats.delta_pp.toFixed(1)}
            </div>
          </div>

          <div>
            <div className="text-lavender-400 text-xs uppercase font-lostdescription mb-1 theme-is-light:text-slate-500">
              Current PP
            </div>
            <div className="text-white font-lostbody text-xl font-bold theme-is-light:text-slate-900">
              {submission.summary_stats.current_pp.toFixed(0)}
            </div>
          </div>

          <div>
            <div className="text-lavender-400 text-xs uppercase font-lostdescription mb-1 theme-is-light:text-slate-500">
              Potential PP
            </div>
            <div className="text-lemon-400 font-lostbody text-xl font-bold theme-is-light:text-sky-600">
              {submission.summary_stats.potential_pp.toFixed(0)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {displayedScores.map((score, index) => (
          <ScoreCard
            key={`${score.beatmap_id}-${score.score_time}`}
            score={score}
            index={index}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={observerTarget} className="flex justify-center mt-6 py-4">
          {isLoadingMore && (
            <div className="flex items-center gap-2 text-lavender-300 font-lostdescription theme-is-light:text-slate-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading more scores...
            </div>
          )}
        </div>
      )}
    </MotionDiv>
  );
}
