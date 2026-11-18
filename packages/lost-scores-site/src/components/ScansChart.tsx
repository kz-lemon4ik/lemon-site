import type { OwnScan } from "@/lib/api";
import { useFormat } from "@/lib/format";
import { useSection } from "@/lib/i18n";

const WIDTH = 640;
const HEIGHT = 170;
const PAD = { left: 52, right: 12, top: 12, bottom: 26 };

export default function ScansChart({ scans }: { scans: OwnScan[] }) {
  const t = useSection("chart");
  const f = useFormat();
  const points = [...scans].sort((a, b) => a.made_at - b.made_at);
  if (points.length < 2) {
    return null;
  }
  const low = Math.min(...points.map((scan) => scan.current_pp));
  const high = Math.max(...points.map((scan) => scan.potential_pp));
  const span = Math.max(high - low, 20);
  const bottom = low - span * 0.12;
  const top = high + span * 0.12;
  const first = points[0].made_at;
  const last = points[points.length - 1].made_at;
  const x = (at: number) => PAD.left + ((at - first) / Math.max(last - first, 1)) * (WIDTH - PAD.left - PAD.right);
  const y = (pp: number) => PAD.top + (1 - (pp - bottom) / (top - bottom)) * (HEIGHT - PAD.top - PAD.bottom);
  const path = (pick: (scan: OwnScan) => number) => points.map((scan) => `${x(scan.made_at).toFixed(1)},${y(pick(scan)).toFixed(1)}`);
  const current = path((scan) => scan.current_pp);
  const potential = path((scan) => scan.potential_pp);
  const band = [...potential, ...[...current].reverse()].join(" ");

  return (
    <figure className="mt-4 rounded-xl bg-row px-4 pb-3 pt-3.5">
      <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-meta">
        <span className="font-medium text-lbl">{t("title")}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded bg-lbl" /> {t("profile")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded bg-up" /> {t("potential")}
        </span>
      </figcaption>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mt-2 h-auto w-full" role="img" aria-label={t("label")}>
        {[low, high].map((value) => (
          <g key={value}>
            <line x1={PAD.left} x2={WIDTH - PAD.right} y1={y(value)} y2={y(value)} className="stroke-divider" strokeWidth="1" />
            <text x={PAD.left - 8} y={y(value) + 4} textAnchor="end" fontSize="11" className="fill-meta">
              {f.whole(value)}
            </text>
          </g>
        ))}
        <polygon points={band} className="fill-up/10" />
        <polyline points={current.join(" ")} fill="none" className="stroke-lbl" strokeWidth="2" strokeLinejoin="round" />
        <polyline points={potential.join(" ")} fill="none" className="stroke-up" strokeWidth="2" strokeLinejoin="round" />
        {points.map((scan) => (
          <g key={scan.id}>
            <circle cx={x(scan.made_at)} cy={y(scan.current_pp)} r="3" className="fill-lbl" />
            <circle cx={x(scan.made_at)} cy={y(scan.potential_pp)} r="3" className="fill-up" />
          </g>
        ))}
        <text x={PAD.left} y={HEIGHT - 6} fontSize="11" className="fill-meta">
          {f.day(first * 1000)}
        </text>
        <text x={WIDTH - PAD.right} y={HEIGHT - 6} textAnchor="end" fontSize="11" className="fill-meta">
          {f.day(last * 1000)}
        </text>
      </svg>
    </figure>
  );
}
