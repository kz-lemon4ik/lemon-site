import { Link } from "react-router-dom";
import { useSection } from "@/lib/i18n";

const GRADES: Record<string, { label: string; color: string; name: string }> = {
  XH: { label: "SS", color: "#dfe6ee", name: "Silver SS" },
  X: { label: "SS", color: "#de31ae", name: "SS" },
  SH: { label: "S", color: "#c8d3dd", name: "Silver S" },
  S: { label: "S", color: "#02b5c3", name: "S" },
  A: { label: "A", color: "#88da20", name: "A" },
  B: { label: "B", color: "#e3b130", name: "B" },
  C: { label: "C", color: "#ff8e5d", name: "C" },
  D: { label: "D", color: "#ff5a5a", name: "D" },
};

export function Grade({ grade }: { grade: string | null }) {
  const shown = grade ? GRADES[grade] : undefined;
  if (!shown) {
    return <span aria-hidden className="h-6 w-11 shrink-0" />;
  }
  return (
    <span
      title={shown.name}
      className="inline-grid h-6 w-11 shrink-0 place-items-center rounded-full text-[13px] font-semibold text-dark"
      style={{ backgroundColor: shown.color }}
    >
      {shown.label}
    </span>
  );
}

function modColor(mod: string): string {
  if (["HD", "DT", "NC", "HR", "FL", "SD", "PF"].includes(mod)) {
    return "#ff6666";
  }
  if (["EZ", "NF", "HT"].includes(mod)) {
    return "#b3ff66";
  }
  if (["SO", "AP", "RX"].includes(mod)) {
    return "#66ccff";
  }
  if (mod === "TD") {
    return "#ffcc22";
  }
  return "#9aa0aa";
}

export function Mods({ mods }: { mods: string[] }) {
  if (mods.length === 0) {
    return null;
  }
  return (
    <span className="inline-flex flex-wrap gap-1" aria-label={mods.join(" ")}>
      {mods.map((mod, index) => (
        <span
          key={`${mod}-${index}`}
          aria-hidden
          className="inline-grid h-[17px] min-w-[26px] place-items-center rounded-[5px] px-1 text-[11px] font-semibold text-dark"
          style={{ backgroundColor: modColor(mod) }}
        >
          {mod}
        </span>
      ))}
    </span>
  );
}

const MAP_STATUS: Record<string, { label: string; background: string; color: string }> = {
  loved: { label: "loved", background: "#ff66ab", color: "#1b1825" },
  qualified: { label: "qualified", background: "#66ccff", color: "#1b1825" },
  pending: { label: "pending", background: "#55535c", color: "#e5e2ec" },
  wip: { label: "WIP", background: "#55535c", color: "#e5e2ec" },
  graveyard: { label: "graveyard", background: "#55535c", color: "#e5e2ec" },
  unknown: { label: "unknown", background: "#3a3743", color: "#9f9aac" },
};

export function MapStatus({ status }: { status: string | null }) {
  const shown = status ? MAP_STATUS[status] : undefined;
  if (!shown) {
    return null;
  }
  return (
    <span
      className="inline-grid h-[17px] shrink-0 place-items-center rounded px-1.5 text-[11px] font-semibold"
      style={{ backgroundColor: shown.background, color: shown.color }}
    >
      {shown.label}
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
