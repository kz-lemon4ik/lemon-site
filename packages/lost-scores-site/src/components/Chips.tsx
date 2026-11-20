import { ChevronsUp, Heart, HelpCircle, TrendingDown } from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useSection, type SectionKey } from "@/lib/i18n";

const GRADES: Record<string, { file: string; name: string }> = {
  XH: { file: "SS-Silver", name: "Silver SS" },
  X: { file: "SS", name: "SS" },
  SH: { file: "S-Silver", name: "Silver S" },
  S: { file: "S", name: "S" },
  A: { file: "A", name: "A" },
  B: { file: "B", name: "B" },
  C: { file: "C", name: "C" },
  D: { file: "D", name: "D" },
};

export function Grade({ grade }: { grade: string | null }) {
  const shown = grade ? GRADES[grade] : undefined;
  if (!shown) {
    return <span aria-hidden className="h-5 w-10 shrink-0 sm:h-6 sm:w-12" />;
  }
  return <img src={`/icons/grade-${shown.file}.svg`} alt={shown.name} title={shown.name} width={48} height={24} className="h-5 w-10 shrink-0 sm:h-6 sm:w-12" />;
}

const INCREASE = "#ff6666";
const REDUCTION = "#b2ff66";
const AUTOMATION = "#66ccff";
const SYSTEM = "#ffcc22";

const MOD_ICONS: Record<string, [string, string]> = {
  HD: ["hidden", INCREASE],
  DT: ["double-time", INCREASE],
  NC: ["nightcore", INCREASE],
  HR: ["hard-rock", INCREASE],
  FL: ["flashlight", INCREASE],
  SD: ["sudden-death", INCREASE],
  PF: ["perfect", INCREASE],
  EZ: ["easy", REDUCTION],
  NF: ["no-fail", REDUCTION],
  HT: ["half-time", REDUCTION],
  SO: ["spun-out", AUTOMATION],
  TD: ["touch-device", SYSTEM],
};

function masked(url: string): CSSProperties {
  const mask = `url(${url}) center / contain no-repeat`;
  return { mask, WebkitMask: mask };
}

function Mod({ mod }: { mod: string }) {
  const icon = MOD_ICONS[mod];
  const colour = icon?.[1] ?? SYSTEM;
  const ink = `color-mix(in srgb-linear, black, ${colour} 10%)`;
  return (
    <span title={mod} className="relative inline-block h-[23px] w-[33px] shrink-0" style={{ backgroundColor: colour, ...masked("/icons/mod-icon.svg") }}>
      {icon ? (
        <span className="absolute inset-0" style={{ backgroundColor: ink, ...masked(`/icons/mod-${icon[0]}.svg`) }} />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-[10px] font-semibold" style={{ color: ink }}>
          {mod}
        </span>
      )}
    </span>
  );
}

export const MOD_WIDTH = 37;

export function Mods({ mods }: { mods: string[] }) {
  if (mods.length === 0) {
    return null;
  }
  return (
    <span role="img" aria-label={mods.join(" ")} className="inline-flex flex-wrap gap-1">
      {mods.map((mod, index) => (
        <Mod key={`${mod}-${index}`} mod={mod} />
      ))}
    </span>
  );
}

const STATUSES = new Set(["ranked", "approved", "qualified", "loved", "pending", "wip", "graveyard"]);

function statusName(status: string | null, lost: boolean): string {
  return lost ? "lost" : status && STATUSES.has(status) ? status : "unknown";
}

function StatusGlyph({ name }: { name: string }) {
  if (name === "lost") {
    return <TrendingDown aria-hidden size={19} strokeWidth={2.6} className="text-down" />;
  }
  if (name === "ranked" || name === "approved") {
    return <ChevronsUp aria-hidden size={19} strokeWidth={2.6} className="text-ranked" />;
  }
  if (name === "loved") {
    return <Heart aria-hidden size={16} fill="currentColor" className="text-loved" />;
  }
  return <HelpCircle aria-hidden size={17} className="text-meta" />;
}

export function StatusIcon({ status, lost = false }: { status: string | null; lost?: boolean }) {
  const t = useSection("table");
  const name = statusName(status, lost);
  const label = t(`status.${name}` as SectionKey<"table">);
  return (
    <span role="img" aria-label={label} title={label} className="grid place-items-center">
      <StatusGlyph name={name} />
    </span>
  );
}

export function StatusLabel({ status }: { status: string | null }) {
  const t = useSection("table");
  const name = statusName(status, false);
  return (
    <span className="inline-flex items-center gap-1.5 text-meta">
      <StatusGlyph name={name} />
      {t(`status.${name}` as SectionKey<"table">)}
    </span>
  );
}

export function Check({ verified, linked = false }: { verified: boolean; linked?: boolean }) {
  const t = useSection("check");
  const look = verified ? "chip bg-up/10 text-up" : "chip bg-btn text-meta";
  const text = verified ? t("verified") : t("checking");
  const hint = verified ? t("verifiedHint") : t("checkingHint");
  if (linked) {
    return (
      <Link to="/faq#verified" title={`${hint}. ${t("more")}`} className={`${look} transition-colors hover:brightness-125`}>
        {text}
      </Link>
    );
  }
  return (
    <span className={look} title={hint}>
      {text}
    </span>
  );
}
