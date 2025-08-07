import CountryFlag from "@/components/atoms/CountryFlag";
import { motion } from "framer-motion";
import { useSettings } from "@lemon-site/shared-ui";
import { TrendingUp } from "lucide-react";
import type { SubmissionDetail } from "@/types/api";

interface Tab {
  id: string;
  label: string;
}

interface ProfileHeaderProps {
  username: string;
  submission: SubmissionDetail;
  isOwnProfile: boolean;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ProfileHeader({
  username,
  submission,
  isOwnProfile,
  tabs,
  activeTab,
  onTabChange,
}: ProfileHeaderProps) {
  const { isMotionDisabled } = useSettings();

  const totalPPGain = submission.summary_stats.delta_pp;
  const potentialPP = submission.summary_stats.potential_pp;
  const lostScoresCount = submission.summary_stats.lost_scores_found;

  const avatarUrl = submission.current_user_stats?.avatar_url || "/images/avatars/avatar-default.webp";
  const countryCode = submission.current_user_stats?.country_code || "XX";
  const globalRank = submission.current_user_stats?.current_global_rank || submission.summary_stats.current_global_rank;
  const countryRank = submission.current_user_stats?.current_country_rank || 0;

  const MotionDiv = isMotionDisabled ? "div" : motion.div;

  return (
    <MotionDiv
      initial={isMotionDisabled ? false : { opacity: 0, y: 20 }}
      animate={isMotionDisabled ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-xl border border-lavender-500/30 shadow-xl theme-is-light:bg-white/60 theme-is-light:border-themeLight-cardBorder"
    >
      <div className="flex justify-between gap-8">
        <div className="flex flex-col">
          <div className="flex gap-6 p-6">
            <div className="h-full py-4">
              <img
                src={avatarUrl}
                alt={`${username} avatar`}
                className="block h-full w-auto rounded-xl object-cover mx-auto border-2 border-lemon-400 shadow-lg theme-is-light:border-sky-600"
                onError={(e) => {
                  e.currentTarget.src = "/images/avatars/avatar-default.webp";
                }}
                style={{ maxHeight: "160px" }}
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-5xl font-lostbody text-white theme-is-light:text-slate-900">
                  {username}
                </h1>
                {isOwnProfile && (
                  <span className="inline-block px-3 py-1 bg-lemon-400/20 text-lemon-400 rounded-md text-xs font-lostbody theme-is-light:bg-sky-600/20 theme-is-light:text-sky-600 whitespace-nowrap">
                    Your Profile
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-lg text-lavender-300 font-lostdescription theme-is-light:text-slate-600">
                <CountryFlag countryCode={countryCode} className="w-8 h-6" />
                <span>{countryCode}</span>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-6 py-2 rounded-lg font-lostbody text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-black/30 text-lemon-400 theme-is-light:bg-slate-200/80 theme-is-light:text-sky-600"
                    : "bg-black/10 text-lavender-300 hover:bg-black/20 hover:text-white theme-is-light:bg-slate-100/50 theme-is-light:text-slate-600 theme-is-light:hover:bg-slate-200/60 theme-is-light:hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-l border-white/10 theme-is-light:border-slate-300"></div>

        <div className="flex items-center gap-6 p-6">
          <div className="flex flex-col items-center justify-center">
            <div className="text-lavender-200 text-xs uppercase font-lostdescription mb-1 theme-is-light:text-slate-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              PP Gain
            </div>
            <div className="text-4xl font-lostbody text-lemon-400 theme-is-light:text-sky-600">
              +{totalPPGain.toFixed(1)}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="bg-black/20 rounded-lg px-8 py-3 border border-lavender-500/20 theme-is-light:bg-slate-100/70 theme-is-light:border-slate-300 flex flex-col items-center justify-center">
              <div className="text-lavender-400 text-xs uppercase font-lostdescription theme-is-light:text-slate-500">
                Potential PP
              </div>
              <div className="text-2xl font-lostbody text-white theme-is-light:text-slate-900">
                {potentialPP.toFixed(0)}pp
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/20 rounded-lg px-4 py-2 border border-lavender-500/20 theme-is-light:bg-slate-100/70 theme-is-light:border-slate-300 flex flex-col items-center justify-center">
                <div className="text-lavender-400 text-xs uppercase font-lostdescription theme-is-light:text-slate-500">
                  Global Rank
                </div>
                <div className="text-lg font-lostbody text-white theme-is-light:text-slate-900">
                  #{globalRank.toLocaleString()}
                </div>
              </div>

              <div className="bg-black/20 rounded-lg px-4 py-2 border border-lavender-500/20 theme-is-light:bg-slate-100/70 theme-is-light:border-slate-300 flex flex-col items-center justify-center">
                <div className="text-lavender-400 text-xs uppercase font-lostdescription theme-is-light:text-slate-500">
                  Country Rank
                </div>
                <div className="text-lg font-lostbody text-white theme-is-light:text-slate-900">
                  #{countryRank.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/20 rounded-lg px-4 py-2 border border-lavender-500/20 theme-is-light:bg-slate-100/70 theme-is-light:border-slate-300 flex flex-col items-center justify-center">
                <div className="text-lavender-400 text-xs uppercase font-lostdescription theme-is-light:text-slate-500">
                  Scans
                </div>
                <div className="text-lg font-lostbody font-bold text-white theme-is-light:text-slate-900">
                  1
                </div>
              </div>

              <div className="bg-black/20 rounded-lg px-4 py-2 border border-lavender-500/20 theme-is-light:bg-slate-100/70 theme-is-light:border-slate-300 flex flex-col items-center justify-center">
                <div className="text-lavender-400 text-xs uppercase font-lostdescription theme-is-light:text-slate-500">
                  Lost Scores
                </div>
                <div className="text-lg font-lostbody font-bold text-white theme-is-light:text-slate-900">
                  {lostScoresCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
