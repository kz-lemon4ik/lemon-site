import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TopRanks from "@/components/profile/TopRanks";
import { motion } from "framer-motion";
import { useSettings } from "@lemon-site/shared-ui";
import { getSubmission } from "@/services/api";
import type { SubmissionDetail } from "@/types/api";

type TabType = "top-ranks" | "scans" | "statistics";

export default function ProfilePage() {
  const { identifier } = useParams<{ identifier: string }>();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { isMotionDisabled } = useSettings();
  const [activeTab, setActiveTab] = useState<TabType>("top-ranks");
  const [submission, setSubmission] = useState<SubmissionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!identifier) return;

    setIsLoading(true);
    setError(null);

    getSubmission(identifier)
      .then((data) => {
        setSubmission(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch submission:", err);
        setError("Failed to load submission data");
        setIsLoading(false);
      });
  }, [identifier]);

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-white text-center">Loading...</div>
      </div>
    );
  }

  if (!identifier) {
    return <Navigate to="/" replace />;
  }

  if (error || !submission) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-2">Submission Not Found</h2>
          <p>{error || "This user hasn't submitted any scans yet."}</p>
        </div>
      </div>
    );
  }

  const username =
    submission.current_user_stats?.username ||
    submission.metadata.user_identifier;
  const isOwnProfile = isAuthenticated && user?.username === username;

  const tabs: { id: TabType; label: string }[] = [
    { id: "top-ranks", label: "Top Ranks" },
    { id: "scans", label: "Scans History" },
    { id: "statistics", label: "Statistics" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ProfileHeader
        username={username}
        submission={submission}
        isOwnProfile={isOwnProfile}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as TabType)}
      />

      <div className="mt-8">
        {activeTab === "scans" && (
          <div className="bg-black/40 backdrop-blur-xl border border-lavender-500/30 rounded-lg p-8 theme-is-light:bg-white/60 theme-is-light:border-themeLight-cardBorder">
            <h3 className="text-2xl font-lostbody text-white mb-4 theme-is-light:text-slate-900">
              Scans History
            </h3>
            <p className="text-lavender-300 font-lostdescription theme-is-light:text-slate-600">
              Multiple scans support coming soon
            </p>
          </div>
        )}

        {activeTab === "top-ranks" && (
          <TopRanks submission={submission} username={username} />
        )}

        {activeTab === "statistics" && (
          <motion.div
            initial={isMotionDisabled ? false : { opacity: 0, y: 20 }}
            animate={isMotionDisabled ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-black/40 backdrop-blur-xl border border-lavender-500/30 rounded-lg p-8 theme-is-light:bg-white/60 theme-is-light:border-themeLight-cardBorder"
          >
            <h3 className="text-2xl font-lostbody text-white mb-4 theme-is-light:text-slate-900">
              Statistics Coming Soon
            </h3>
            <p className="text-lavender-300 font-lostdescription theme-is-light:text-slate-600">
              Detailed statistics and analytics will be available here. This
              section will include:
            </p>
            <ul className="mt-4 space-y-2 text-lavender-200 font-lostdescription list-disc list-inside theme-is-light:text-slate-600">
              <li>PP gain trends over time</li>
              <li>Most improved beatmaps</li>
              <li>Accuracy distribution</li>
              <li>Mod usage statistics</li>
              <li>Performance comparison with previous scans</li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
