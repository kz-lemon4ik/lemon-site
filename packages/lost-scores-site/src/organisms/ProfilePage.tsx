import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ScansList from "@/components/profile/ScansList";
import { MOCK_SCANS } from "@/data/mockScans";
import { motion } from "framer-motion";
import { useSettings } from "@lemon-site/shared-ui";

type TabType = "top-ranks" | "scans" | "statistics";

export default function ProfilePage() {
  const { identifier } = useParams<{ identifier: string }>();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { isMotionDisabled } = useSettings();
  const [activeTab, setActiveTab] = useState<TabType>("top-ranks");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-white text-center">Loading...</div>
      </div>
    );
  }

  if (!identifier) {
    return <Navigate to="/" replace />;
  }

  const isNumericId = /^\d+$/.test(identifier);

  let username: string;
  let isOwnProfile: boolean;

  if (isNumericId) {
    const scan = MOCK_SCANS.find(
      (s) => s.full_json.user_data.user_id.toString() === identifier
    );
    if (!scan) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-white text-center">User not found</div>
        </div>
      );
    }
    username = scan.username;
    isOwnProfile = isAuthenticated && user?.osu_user_id.toString() === identifier;
  } else {
    username = identifier;
    isOwnProfile = isAuthenticated && user?.username === username;
  }

  const userScans = MOCK_SCANS.filter((scan) => scan.username === username);

  const tabs: { id: TabType; label: string }[] = [
    { id: "top-ranks", label: "Top Ranks" },
    { id: "scans", label: "Scans History" },
    { id: "statistics", label: "Statistics" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ProfileHeader
        username={username}
        scans={userScans}
        isOwnProfile={isOwnProfile}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as TabType)}
      />

      <div className="mt-8">
          {activeTab === "scans" && (
            <ScansList scans={userScans} isOwnProfile={isOwnProfile} />
          )}

          {activeTab === "top-ranks" && (
            <motion.div
              initial={isMotionDisabled ? false : { opacity: 0, y: 20 }}
              animate={isMotionDisabled ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-black/40 backdrop-blur-xl border border-lavender-500/30 rounded-lg p-8 theme-is-light:bg-white/60 theme-is-light:border-themeLight-cardBorder"
            >
              <h3 className="text-2xl font-lostbody text-white mb-6 theme-is-light:text-slate-900">
                Top Ranks
              </h3>
              <p className="text-lavender-300 font-lostdescription mb-4 theme-is-light:text-slate-600">
                This section will display your top lost scores by PP gain and your potential top plays (actual + lost scores highlighted).
              </p>
              <ul className="mt-4 space-y-2 text-lavender-200 font-lostdescription list-disc list-inside theme-is-light:text-slate-600">
                <li>Lost Scores Top - sorted by PP gain potential</li>
                <li>Potential Top - your actual top plays combined with lost scores (lost scores highlighted in red)</li>
                <li>Toggle between viewing modes</li>
              </ul>
            </motion.div>
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
                Detailed statistics and analytics will be available here. This section
                will include:
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
