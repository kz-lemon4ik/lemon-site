import { ChevronsUp, Hourglass, Trophy, Wrench, type LucideIcon } from "lucide-react";
import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { MedalId, MedalState, Progress } from "@/lib/api";
import { useDismiss } from "@/lib/dismiss";
import { useFormat, type Format } from "@/lib/format";
import { useSection, type SectionKey, type Words } from "@/lib/i18n";

type Text = Words<"progress">;
type Align = "start" | "center" | "end";

const MILESTONES: Partial<Record<MedalId, number>> = { quarter: 0.25, half: 0.5, threeQuarters: 0.75, all: 1 };
const COINS: MedalId[] = ["first", "ppQuarter", "ppHalf", "biggest", "five", "oldest", "fc", "ss", "harder"];
const ICONS: Partial<Record<MedalId, LucideIcon>> = { first: Wrench, biggest: Trophy, oldest: Hourglass, harder: ChevronsUp };
const TEXTS: Partial<Record<MedalId, string>> = { five: "5", fc: "FC", ss: "SS" };
const FRACTIONS: Partial<Record<MedalId, string>> = { ppQuarter: "¼", ppHalf: "½" };
const TIP_ROOM = 136;
const TIP_HEIGHT = 300;

function pie(cx: number, cy: number, radius: number, share: number): string {
  const end = -Math.PI / 2 + share * 2 * Math.PI;
  const x = cx + radius * Math.cos(end);
  const y = cy + radius * Math.sin(end);
  return `M ${cx} ${cy} L ${cx} ${cy - radius} A ${radius} ${radius} 0 ${share > 0.5 ? 1 : 0} 1 ${x} ${y} Z`;
}

function Glyph({ id }: { id: MedalId }) {
  const Icon = ICONS[id];
  if (Icon) {
    return <Icon x={14} y={14} width={20} height={20} color="#ffffff" strokeWidth={2.4} />;
  }
  const share = MILESTONES[id];
  if (share !== undefined) {
    return (
      <g>
        <circle cx="24" cy="24" r="8" fill="none" stroke="#ffffff" strokeWidth="2" />
        {share >= 1 ? <circle cx="24" cy="24" r="8" fill="#ffffff" /> : <path d={pie(24, 24, 8, share)} fill="#ffffff" />}
      </g>
    );
  }
  const fraction = FRACTIONS[id];
  if (fraction) {
    return (
      <g fill="#ffffff" fontWeight={700} textAnchor="middle">
        <text x="24" y="23" fontSize="15">
          {fraction}
        </text>
        <text x="24" y="33.5" fontSize="10">
          pp
        </text>
      </g>
    );
  }
  const text = TEXTS[id] ?? "";
  return (
    <text x="24" y="24" dy="0.36em" textAnchor="middle" fontSize={text.length > 1 ? 13 : 17} fontWeight={700} fill="#ffffff">
      {text}
    </text>
  );
}

function Coin({ id, earned, className }: { id: MedalId; earned: boolean; className: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`block ${className}`}>
      <circle cx="24" cy="24" r="23" fill={earned ? "url(#coin-fill)" : "#3a3743"} />
      <circle cx="24" cy="24" r="19.25" fill="none" stroke="#ffffff" strokeOpacity={earned ? 0.3 : 0.08} strokeWidth="1.5" />
      <g opacity={earned ? 1 : 0.35}>
        <Glyph id={id} />
      </g>
    </svg>
  );
}

export function CoinDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <linearGradient id="coin-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ab94f3" />
          <stop offset="1" stopColor="#5e45b6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function status(medal: MedalState, t: Text, f: Format): { text: string; earned: boolean } {
  if (medal.at !== null) {
    return { text: t("earned", { date: f.day(medal.at * 1000) }), earned: true };
  }
  if (medal.need !== undefined && medal.percent) {
    return { text: t("pp", { have: medal.have ?? 0, need: medal.need }), earned: false };
  }
  if (medal.need !== undefined) {
    return { text: t("count", { have: f.whole(medal.have ?? 0), need: f.whole(medal.need) }), earned: false };
  }
  return { text: t("notYet"), earned: false };
}

function nameOf(medal: MedalState, t: Text): [string, string] {
  return [t(`names.${medal.id}` as SectionKey<"progress">), t(`texts.${medal.id}` as SectionKey<"progress">)];
}

function useAlign(): [Align, boolean, (element: HTMLElement) => void] {
  const [align, setAlign] = useState<Align>("center");
  const [below, setBelow] = useState(false);
  const measure = useCallback((element: HTMLElement) => {
    const box = element.getBoundingClientRect();
    const middle = box.left + box.width / 2;
    setAlign(middle < TIP_ROOM ? "start" : middle > window.innerWidth - TIP_ROOM ? "end" : "center");
    setBelow(box.top < TIP_HEIGHT);
  }, []);
  return [align, below, measure];
}

function Tipped({ medal, className, style, button, children }: { medal: MedalState; className: string; style?: CSSProperties; button: string; children?: ReactNode }) {
  const t = useSection("progress");
  const f = useFormat();
  const [align, below, measure] = useAlign();
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, close, box);
  const [name, text] = nameOf(medal, t);
  const line = status(medal, t, f);
  const place = align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";
  const side = below ? "top-full mt-3" : "bottom-full mb-3";
  return (
    <div
      ref={box}
      className={`group ${className}`}
      style={style}
      onMouseEnter={(event) => measure(event.currentTarget)}
      onMouseLeave={() => setMuted(false)}
      onFocus={(event) => measure(event.currentTarget)}
      onBlur={() => setMuted(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setMuted(true);
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-label={`${name}. ${line.text}`}
        aria-expanded={open}
        onClick={() => {
          if (box.current) {
            measure(box.current);
          }
          setOpen((current) => !current);
        }}
        className={button}
      >
        {children}
      </button>
      <div
        role="tooltip"
        className={`pointer-events-none absolute z-20 w-64 rounded-xl bg-bg text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${side} ${place} ${open ? "block" : "hidden"} ${muted ? "" : "group-focus-within:block group-hover:block"}`}
      >
        <div className="px-5 pb-4 pt-5">
          <span className="mx-auto block w-fit">
            <Coin id={medal.id} earned={medal.at !== null} className="h-[60px] w-[60px]" />
          </span>
          <p className="mt-3 text-lg font-semibold leading-tight text-lbl">{name}</p>
          <p className="mt-1 text-balance text-sm text-muted">{text}</p>
        </div>
        <p className={`rounded-b-xl bg-field/60 px-4 py-2.5 text-sm ${line.earned ? "text-acc" : "text-meta"}`}>{line.text}</p>
      </div>
    </div>
  );
}

export function FixBar({ progress }: { progress: Progress }) {
  const t = useSection("progress");
  const f = useFormat();
  const share = progress.total > 0 ? progress.fixed / progress.total : 0;
  const percent = progress.total > 0 ? Math.floor((progress.fixed * 100) / progress.total) : 0;
  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm text-meta">
          {t("fixed")}
          <span className="ml-2 text-xl font-semibold tabular-nums text-lbl sm:text-2xl">{f.whole(progress.fixed)}</span>
          <span className="ml-1.5 text-base text-meta">{t("of", { total: f.whole(progress.total) })}</span>
        </p>
        <p className="text-sm font-medium tabular-nums text-muted">{percent}%</p>
      </div>
      <div className="relative mt-2 h-3.5">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-btn">
          <div className="h-full rounded-full bg-acc" style={{ width: `${share * 100}%` }} />
        </div>
        {progress.medals
          .filter((medal) => MILESTONES[medal.id] !== undefined)
          .map((medal) => {
            const at = MILESTONES[medal.id] ?? 0;
            return (
              <Tipped
                key={medal.id}
                medal={medal}
                className="absolute top-0"
                style={{ left: at >= 1 ? "calc(100% - 14px)" : `calc(${at * 100}% - 7px)` }}
                button={`block h-3.5 w-3.5 rounded-full ring-[3px] ring-card transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-acc motion-safe:hover:scale-125 ${medal.at !== null ? "bg-acc" : "bg-btn"}`}
              />
            );
          })}
      </div>
      {progress.later > 0 && <p className="mt-2 text-xs text-meta">{t("later", { count: f.whole(progress.later) })}</p>}
    </div>
  );
}

export function MedalRow({ medals }: { medals: MedalState[] }) {
  const t = useSection("progress");
  const earned = COINS.map((id) => medals.find((medal) => medal.id === id)).filter((medal): medal is MedalState => medal !== undefined && medal.at !== null);
  if (earned.length === 0) {
    return null;
  }
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-sm text-meta">{t("medals")}</span>
      <div className="flex flex-wrap gap-1.5">
        {earned.map((medal) => (
          <Tipped
            key={medal.id}
            medal={medal}
            className="relative"
            button="block rounded-full transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acc focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-safe:hover:scale-110"
          >
            <Coin id={medal.id} earned className="h-8 w-8" />
          </Tipped>
        ))}
      </div>
    </div>
  );
}
