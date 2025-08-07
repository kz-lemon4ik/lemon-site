import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useSettings } from "@lemon-site/shared-ui";
import { ExternalLink, Loader2 } from "lucide-react";
import type { SubmissionDetail, LostScore } from "@/types/api";
import { getSubmission } from "@/services/api";

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
          <div
            key={`${score.beatmap_id}-${score.score_time}`}
            className="bg-black/30 border border-lavender-500/20 rounded-lg p-4 hover:bg-black/40 hover:border-lavender-400/30 transition-all theme-is-light:bg-slate-100/70 theme-is-light:border-slate-300 theme-is-light:hover:bg-slate-200/80"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lavender-400 font-lostbody text-lg font-bold theme-is-light:text-slate-500">
                    #{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <a
                      href={`https://osu.ppy.sh/beatmapsets/${score.beatmap_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-lostbody text-lg hover:text-lemon-400 transition-colors inline-flex items-center gap-2 theme-is-light:text-slate-900 theme-is-light:hover:text-sky-600"
                    >
                      {score.artist} - {score.title}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <div className="text-lavender-300 font-lostdescription text-sm theme-is-light:text-slate-600">
                      [{score.version}] by {score.creator}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  <div className="bg-black/20 rounded px-3 py-2 theme-is-light:bg-slate-200/50">
                    <div className="text-lavender-400 text-xs uppercase font-lostdescription theme-is-light:text-slate-500">
                      Mods
                    </div>
                    <div className="text-white font-lostbody theme-is-light:text-slate-900">
                      {score.mods.length > 0 ? score.mods.join(", ") : "None"}
                    </div>
                  </div>

                  <div className="bg-black/20 rounded px-3 py-2 theme-is-light:bg-slate-200/50">
                    <div className="text-lavender-400 text-xs uppercase font-lostdescription theme-is-light:text-slate-500">
                      Accuracy
                    </div>
                    <div className="text-white font-lostbody theme-is-light:text-slate-900">
                      {score.accuracy.toFixed(2)}%
                    </div>
                  </div>

                  <div className="bg-black/20 rounded px-3 py-2 theme-is-light:bg-slate-200/50">
                    <div className="text-lavender-400 text-xs uppercase font-lostdescription theme-is-light:text-slate-500">
                      Rank
                    </div>
                    <div className="text-white font-lostbody theme-is-light:text-slate-900">
                      {score.rank}
                    </div>
                  </div>

                  <div className="bg-black/20 rounded px-3 py-2 theme-is-light:bg-slate-200/50">
                    <div className="text-lavender-400 text-xs uppercase font-lostdescription theme-is-light:text-slate-500">
                      Misses
                    </div>
                    <div className="text-white font-lostbody theme-is-light:text-slate-900">
                      {score.countMiss}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="bg-gradient-to-br from-lemon-500/20 to-lemon-600/10 rounded-lg px-4 py-2 theme-is-light:from-sky-500/20 theme-is-light:to-sky-600/10">
                  <div className="text-lavender-200 text-xs uppercase font-lostdescription text-center theme-is-light:text-slate-600">
                    PP
                  </div>
                  <div className="text-lemon-400 font-lostbody text-2xl font-bold text-center theme-is-light:text-sky-600">
                    {score.pp.toFixed(0)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lavender-400 text-xs font-lostdescription theme-is-light:text-slate-500">
                    {score.score_time}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
