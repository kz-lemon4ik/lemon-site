import type { ReactNode } from "react";
import { Grade, Mods } from "@/components/Chips";

interface Props {
  title: string;
  artist: string | null;
  by: string;
  map: string | null;
  version: ReactNode;
  when: ReactNode;
  grade: string | null;
  accuracy: string;
  extra?: ReactNode;
  sub?: ReactNode;
  who?: ReactNode;
  mods: string[];
  status: ReactNode;
  pp: number | null;
  lost?: boolean;
  menu: ReactNode;
}

export default function MobileScore({ title, artist, by, map, version, when, grade, accuracy, extra, sub, who, mods, status, pp, lost = false, menu }: Props) {
  const name = <span className="block truncate text-[15px] font-medium leading-snug text-lbl">{title}</span>;
  return (
    <div className="sm:hidden">
      <div className={`rounded-t-lg px-3 pb-2 pt-2.5 ${lost ? "bg-row-lost-hover" : "bg-row-hi"}`}>
        {map ? (
          <a href={map} className="block decoration-lbl/40 underline-offset-2 hover:underline">
            {name}
          </a>
        ) : (
          name
        )}
        {artist && (
          <p className="truncate text-[13px] text-by">
            {by} {artist}
          </p>
        )}
        {(version || when) && (
          <p className="mt-0.5 flex items-baseline gap-3 text-[13px]">
            <span className="flex min-w-0 flex-1">{version}</span>
            {when}
          </p>
        )}
      </div>
      <div className={`rounded-b-lg pb-2.5 pl-3 pr-1 pt-2 ${lost ? "bg-row-lost" : "bg-row"}`}>
        <div className="flex items-center gap-3">
          <Grade grade={grade} large />
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-baseline gap-x-3 text-[15px] tabular-nums">
              {accuracy && <span className="font-medium text-lbl">{accuracy}</span>}
              {extra}
            </p>
            {sub && <div className="mt-0.5 flex min-w-0 items-center gap-2 text-[12.5px] text-muted">{sub}</div>}
          </div>
          {menu}
        </div>
        <div className="mt-2 flex items-center gap-3 pr-2">
          <Mods mods={mods} />
          <span className="ml-auto flex min-w-0 items-center gap-1.5">
            {who}
            {status}
            <span className={`text-[22px] font-semibold leading-none tabular-nums ${lost ? "text-lost" : "text-lbl"}`}>
              {pp !== null ? Math.round(pp) : "–"}
              <span className={`ml-0.5 text-sm font-normal ${lost ? "text-lost" : "text-muted"}`}>pp</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
