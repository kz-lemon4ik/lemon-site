import { useState } from "react";
import { Calendar, Clock, TrendingUp, Trash2, Image, Share2 } from "lucide-react";
import { MockScan } from "@/data/mockScans";
import { motion } from "framer-motion";
import { useSettings } from "@lemon-site/shared-ui";

interface ScanCardProps {
  scan: MockScan;
  isOwnProfile: boolean;
  onDelete?: (scanId: string) => void;
  index?: number;
}

export default function ScanCard({ scan, isOwnProfile, onDelete, index = 0 }: ScanCardProps) {
  const { isMotionDisabled } = useSettings();
  const [isExpanded, setIsExpanded] = useState(false);

  const MotionDiv = isMotionDisabled ? "div" : motion.div;

  const scanDate = new Date(scan.date);
  const formattedDate = scanDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = scanDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleDelete = () => {
    if (onDelete && confirm("Are you sure you want to delete this scan?")) {
      onDelete(scan.id);
    }
  };

  return (
    <MotionDiv
      initial={isMotionDisabled ? false : { opacity: 0, y: 20 }}
      animate={isMotionDisabled ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-black/30 backdrop-blur-xl border border-lavender-500/30 rounded-lg overflow-hidden hover:border-lavender-500/50 hover:shadow-lg transition-all theme-is-light:bg-white/60 theme-is-light:border-themeLight-cardBorder"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3 flex-1">
            <h3 className="text-base font-lostbody text-white">
              {formattedDate}
            </h3>
            <div className="flex gap-3 text-xs text-lavender-400 font-lostdescription">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formattedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatDuration(scan.summary.duration_sec)}</span>
              </div>
            </div>
          </div>
          {isOwnProfile && (
            <button
              onClick={handleDelete}
              className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
              aria-label="Delete scan"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          <div className="bg-black/20 rounded p-2 hover:bg-black/30 transition-colors">
            <div className="text-xs text-lavender-400 font-lostdescription mb-0.5">
              Lost Scores
            </div>
            <div className="text-base font-lostbody text-white">
              {scan.summary.lost_scores_count}
            </div>
          </div>

          <div className="bg-black/20 rounded p-2 hover:bg-black/30 transition-colors">
            <div className="text-xs text-lavender-400 font-lostdescription mb-0.5">
              PP Gain
            </div>
            <div className="text-base font-lostbody text-lemon-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +{scan.summary.pp_gain.toFixed(1)}
            </div>
          </div>

          <div className="bg-black/20 rounded p-2 hover:bg-black/30 transition-colors">
            <div className="text-xs text-lavender-400 font-lostdescription mb-0.5">
              Current PP
            </div>
            <div className="text-base font-lostbody text-white">
              {scan.summary.current_pp.toFixed(0)}
            </div>
          </div>

          <div className="bg-black/20 rounded p-2 hover:bg-black/30 transition-colors">
            <div className="text-xs text-lavender-400 font-lostdescription mb-0.5">
              Potential PP
            </div>
            <div className="text-base font-lostbody text-white">
              {scan.summary.potential_pp.toFixed(0)}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-base rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-300 backdrop-blur-md shadow-lg border bg-purple-600/20 hover:bg-purple-600/30 border-purple-500/40 text-purple-400 hover:text-purple-300 focus:ring-purple-500 theme-is-light:bg-themeLight-primary/20 theme-is-light:hover:bg-themeLight-primary/30 theme-is-light:border-themeLight-primary/40 theme-is-light:text-themeLight-primary theme-is-light:hover:text-themeLight-primaryHover theme-is-light:focus:ring-themeLight-primary"
          >
            <Image className="w-5 h-5" />
            <span>View Image</span>
          </button>
          <button
            onClick={() => {
              console.log("Share scan:", scan.id);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-base rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-300 backdrop-blur-md shadow-lg border bg-purple-600/20 hover:bg-purple-600/30 border-purple-500/40 text-purple-400 hover:text-purple-300 focus:ring-purple-500 theme-is-light:bg-themeLight-primary/20 theme-is-light:hover:bg-themeLight-primary/30 theme-is-light:border-themeLight-primary/40 theme-is-light:text-themeLight-primary theme-is-light:hover:text-themeLight-primaryHover theme-is-light:focus:ring-themeLight-primary"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={isMotionDisabled ? false : { height: 0, opacity: 0 }}
          animate={isMotionDisabled ? false : { height: "auto", opacity: 1 }}
          exit={isMotionDisabled ? false : { height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-lavender-500/30 bg-gray-950/50 p-4 theme-is-light:bg-slate-100/50"
        >
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-lostbody text-lavender-300">Full Scan Data</h4>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  JSON.stringify(scan.full_json, null, 2)
                );
              }}
              className="text-xs px-2 py-1 bg-lavender-600 hover:bg-lavender-700 text-white rounded font-lostdescription transition-colors shadow-md hover:shadow-lg"
            >
              Copy JSON
            </button>
          </div>
          <pre className="bg-black/40 backdrop-blur-xl rounded p-3 overflow-x-auto text-xs text-lavender-100 font-mono border border-lavender-500/20 max-h-64 overflow-y-auto">
            {JSON.stringify(scan.full_json, null, 2)}
          </pre>
        </motion.div>
      )}
    </MotionDiv>
  );
}
