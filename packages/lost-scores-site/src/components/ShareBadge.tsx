import { useState } from "react";
import type { ScanPage } from "@/lib/api";
import { useFormat } from "@/lib/format";
import { useSection } from "@/lib/i18n";

export default function ShareBadge({ page }: { page: ScanPage }) {
  const t = useSection("home");
  const f = useFormat();
  const stats = page.summary_stats;
  const [avatarFailed, setAvatarFailed] = useState(false);
  const userId = page.metadata.user_id;
  const accuracyFrom = stats.current_accuracy;
  const accuracyTo = stats.potential_accuracy;
  const rises = accuracyFrom !== null && accuracyTo !== null && accuracyTo >= accuracyFrom;
  const rank = stats.current_global_rank > 0 ? `#${f.whole(stats.current_global_rank)}` : null;
  const date = page.metadata.analysis_timestamp ? f.day(page.metadata.analysis_timestamp) : null;
  const change = accuracyFrom !== null && accuracyTo !== null ? `${rises ? "+" : "-"}${f.accuracy(Math.abs(accuracyTo - accuracyFrom))}` : "";

  return (
    <div className="theme-dark relative aspect-[26/7] w-full overflow-hidden rounded-[3cqw] text-left font-sans [container-type:inline-size]">
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
          <span className="font-semibold text-white">{f.whole(stats.current_pp)}</span>
          <span className="text-[#878198]">→</span>
          <span className="font-semibold text-up">{f.whole(stats.potential_pp)}pp</span>
          <span className="text-[2.5cqw] text-up">({f.delta(stats.delta_pp)})</span>
        </div>
        {accuracyFrom !== null && accuracyTo !== null && (
          <div className="flex items-baseline gap-[0.96cqw] text-[2.885cqw]">
            <span className="font-semibold text-white">{f.accuracy(accuracyFrom)}</span>
            <span className="text-[#878198]">→</span>
            <span className={`font-semibold ${rises ? "text-up" : "text-down"}`}>{f.accuracy(accuracyTo)}</span>
            <span className={`text-[2.5cqw] ${rises ? "text-up" : "text-down"}`}>({change})</span>
          </div>
        )}
        <div className="flex gap-[1.54cqw] text-[2.4cqw] text-meta">
          <span className="min-w-0 flex-1 truncate">
            {t("badgeLost", { count: stats.lost_scores_total, ranked: f.whole(stats.lost_scores_found) })}
          </span>
          <span>{[rank, date].filter(Boolean).join(" · ")}</span>
        </div>
      </div>
    </div>
  );
}
