import { useState } from "react";
import type { ScanPage } from "@/lib/api";
import { english as en } from "@/lib/format";

const tenths = new Intl.NumberFormat("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1, signDisplay: "always" });

function signedPercent(value: number): string {
  return `${value >= 0 ? "+" : "-"}${Math.abs(value).toFixed(2)}%`;
}

export default function ShareBadge({ page }: { page: ScanPage }) {
  const stats = page.summary_stats;
  const [avatarFailed, setAvatarFailed] = useState(false);
  const userId = page.metadata.user_id;
  const accuracyFrom = stats.current_accuracy;
  const accuracyTo = stats.potential_accuracy;
  const rises = accuracyFrom !== null && accuracyTo !== null && accuracyTo >= accuracyFrom;
  const rank = stats.current_global_rank > 0 ? `#${en.whole(stats.current_global_rank)}` : null;
  const date = page.metadata.analysis_timestamp ? en.day(page.metadata.analysis_timestamp) : null;

  return (
    <div className="relative aspect-[26/7] w-full overflow-hidden rounded-[3cqw] bg-[#202027] text-left font-sans [container-type:inline-size]">
      <img src="/images/badge-backdrop.webp" alt="" className="absolute inset-0 h-full w-full" />
      <div className="absolute left-[3.46cqw] top-[3.46cqw] h-[20cqw] w-[20cqw] overflow-hidden rounded-[2.7cqw] bg-btn">
        {userId && !avatarFailed && (
          <img src={`https://a.ppy.sh/${userId}`} alt="" onError={() => setAvatarFailed(true)} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="absolute left-[26.92cqw] top-[3.46cqw] flex h-[20cqw] w-[69.6cqw] flex-col justify-center gap-[0.58cqw] leading-tight">
        <div className="flex items-center gap-[1.54cqw]">
          <span className="min-w-0 flex-1 truncate text-[5cqw] font-semibold text-white">{page.metadata.user_identifier}</span>
          <img src="/lemon.svg" alt="" className="h-[4.62cqw] w-[4.62cqw]" />
        </div>
        <div className="flex items-baseline gap-[0.96cqw] text-[2.885cqw]">
          <span className="font-semibold text-white">{en.whole(stats.current_pp)}</span>
          <span className="text-[#878198]">→</span>
          <span className="font-semibold text-up">{en.whole(stats.potential_pp)}pp</span>
          <span className="text-[2.5cqw] text-up">({tenths.format(stats.delta_pp)})</span>
        </div>
        {accuracyFrom !== null && accuracyTo !== null && (
          <div className="flex items-baseline gap-[0.96cqw] text-[2.885cqw]">
            <span className="font-semibold text-white">{accuracyFrom.toFixed(2)}%</span>
            <span className="text-[#878198]">→</span>
            <span className={`font-semibold ${rises ? "text-up" : "text-down"}`}>{accuracyTo.toFixed(2)}%</span>
            <span className={`text-[2.5cqw] ${rises ? "text-up" : "text-down"}`}>({signedPercent(accuracyTo - accuracyFrom)})</span>
          </div>
        )}
        <div className="flex gap-[1.54cqw] text-[2.4cqw] text-meta">
          <span className="min-w-0 flex-1 truncate">
            {en.whole(stats.lost_scores_total)} lost plays, {en.whole(stats.lost_scores_found)} ranked
          </span>
          <span>{[rank, date].filter(Boolean).join(" · ")}</span>
        </div>
      </div>
    </div>
  );
}
