import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Avatar from "@/components/Avatar";
import { CheckMark } from "@/components/Chips";
import { Cover, CoverTitle, PageShell, Sheet } from "@/components/Layout";
import ModeSwitch from "@/components/ModeSwitch";
import ScoreTable from "@/components/ScoreTable";
import { Message, Rows } from "@/components/States";
import Tabs from "@/components/Tabs";
import { api, type Hall, type Plays, type RankingRow } from "@/lib/api";
import { FEATURED } from "@/lib/featured";
import { useFormat } from "@/lib/format";
import { useSection, type Words } from "@/lib/i18n";
import { track } from "@/lib/progress";
import { smoothly } from "@/lib/smooth";
import { useTitle } from "@/lib/title";

const SIZE = 50;

type Text = Words<"hall">;

type Load<T> = { status: "loading" } | { status: "ready"; data: T } | { status: "error" };

function pageParam(params: URLSearchParams): number {
  const page = Number(params.get("page") ?? "1");
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

function useLoad<T>(load: (signal: AbortSignal) => Promise<T>, key: string): [Load<T>, () => void] {
  const [state, setState] = useState<Load<T>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const latest = useRef(load);
  const shown = useRef(false);
  latest.current = load;
  useEffect(() => {
    const controller = new AbortController();
    setState((current) => (current.status === "ready" ? current : { status: "loading" }));
    track(latest.current(controller.signal)).then(
      (data) => {
        const show = () => setState({ status: "ready", data });
        if (shown.current) {
          smoothly(show);
        } else {
          show();
        }
        shown.current = true;
      },
      () => {
        if (!controller.signal.aborted) {
          setState({ status: "error" });
        }
      },
    );
    return () => controller.abort();
  }, [key, attempt]);
  return [state, () => setAttempt((current) => current + 1)];
}

function Pages({ page, total, params, t }: { page: number; total: number; params: URLSearchParams; t: Text }) {
  const last = Math.max(1, Math.ceil(total / SIZE));
  if (last === 1) {
    return null;
  }
  const to = (target: number) => {
    const next = new URLSearchParams(params);
    next.delete("me");
    if (target === 1) {
      next.delete("page");
    } else {
      next.set("page", String(target));
    }
    const query = next.toString();
    return query ? `?${query}` : "?";
  };
  const shown = [...new Set([1, page - 1, page, page + 1, last])].filter((value) => value >= 1 && value <= last).sort((a, b) => a - b);
  const button = "grid h-9 min-w-9 place-items-center rounded-lg px-2 text-sm font-medium transition-colors";
  return (
    <nav aria-label={t("pageOf", { page })} className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
      {page > 1 && (
        <Link to={to(page - 1)} aria-label={t("previous")} className={`${button} text-muted hover:bg-btn hover:text-lbl`}>
          <ChevronLeft aria-hidden size={18} />
        </Link>
      )}
      {shown.map((value, index) => (
        <span key={value} className="flex items-center gap-1.5">
          {index > 0 && value - shown[index - 1] > 1 && <span className="px-1 text-muted">…</span>}
          <Link
            to={to(value)}
            aria-label={t("pageOf", { page: value })}
            aria-current={value === page ? "page" : undefined}
            className={`${button} ${value === page ? "bg-acc/20 text-lbl" : "text-muted hover:bg-btn hover:text-lbl"}`}
          >
            {value}
          </Link>
        </span>
      ))}
      {page < last && (
        <Link to={to(page + 1)} aria-label={t("next")} className={`${button} text-muted hover:bg-btn hover:text-lbl`}>
          <ChevronRight aria-hidden size={18} />
        </Link>
      )}
    </nav>
  );
}

function Find({ t }: { t: Text }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const wanted = name.trim();
    if (wanted) {
      navigate(`/u/${encodeURIComponent(wanted)}`);
    }
  };
  return (
    <form role="search" onSubmit={submit} className="flex h-10 w-full items-center gap-1 rounded-xl bg-field pl-3.5 pr-1 ring-1 ring-divider focus-within:ring-acc sm:w-64">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={t("find")}
        aria-label={t("find")}
        maxLength={32}
        className="min-w-0 flex-1 bg-transparent text-lbl outline-none placeholder:text-muted"
      />
      <button type="submit" aria-label={t("open")} className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-btn hover:text-lbl">
        <Search aria-hidden size={17} />
      </button>
    </form>
  );
}

const COLUMNS = "grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3rem_1fr_7rem_11rem_5.5rem] lg:grid-cols-[3rem_1fr_8rem_12rem_6rem_5.5rem]";

function PlayerRow({ row, mine, world }: { row: RankingRow; mine: boolean; world?: string }) {
  const f = useFormat();
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (mine) {
      ref.current?.scrollIntoView({ block: "center" });
    }
  }, [mine]);
  return (
    <li ref={ref}>
      <Link
        to={`/u/${row.user_id}`}
        aria-current={mine ? "true" : undefined}
        className={`grid items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-btn sm:px-4 ${COLUMNS} ${mine ? "bg-row-hi ring-1 ring-acc/60" : "bg-row"}`}
      >
        <span className={`text-lg font-semibold tabular-nums ${row.place <= 3 ? "text-gold" : "text-muted"}`}>{row.place}</span>
        <span className="flex min-w-0 items-center gap-3">
          <Avatar id={row.user_id} name={row.username} size={38} />
          <span className="min-w-0">
            <span className="block truncate font-medium text-lbl">{row.username}</span>
            {world ? <span className="block text-sm text-meta">{world}</span> : row.scan_date && <span className="block text-sm text-meta">{f.ago(row.scan_date)}</span>}
          </span>
        </span>
        <span className="text-right text-lg font-medium text-up md:text-left">{f.gain(row.total_pp_gain)}</span>
        <span className="hidden text-ink md:block">
          {f.whole(row.current_pp)} → <span className="font-medium text-up">{f.whole(row.potential_pp)}</span>
        </span>
        <span className="hidden text-ink lg:block">{f.whole(row.lost_scores_count)}</span>
        <span className="hidden justify-center md:flex">
          <CheckMark verified={row.verified} />
        </span>
      </Link>
    </li>
  );
}

function Failed({ t, retry }: { t: Text; retry: () => void }) {
  return (
    <Message
      title={t("failedTitle")}
      action={
        <button type="button" className="btn-small" onClick={retry}>
          {t("tryAgain")}
        </button>
      }
    >
      {t("failed")}
    </Message>
  );
}

function PlayersView({ t }: { t: Text }) {
  const [params, setParams] = useSearchParams();
  const page = pageParam(params);
  const me = params.get("me");
  useEffect(() => {
    if (!me || !/^\d{1,10}$/.test(me)) {
      return;
    }
    const controller = new AbortController();
    api.player(me, { offset: 0, limit: 1 }, controller.signal).then(
      (found) => {
        const target = found.hall_rank ? Math.ceil(found.hall_rank / SIZE) : 1;
        if (target !== page) {
          setParams({ page: String(target), me }, { replace: true });
        }
      },
      () => undefined,
    );
    return () => controller.abort();
  }, [me, page, setParams]);
  const [load, retry] = useLoad<Hall>((signal) => api.rankings((page - 1) * SIZE, SIZE, signal), String(page));
  const ready = load.status === "ready";
  useEffect(() => {
    if (ready) {
      void Promise.allSettled([api.plays(0, SIZE, false), api.players(FEATURED), api.notable()]);
    }
  }, [ready]);

  return (
    <>
      {load.status === "loading" && <Rows />}
      {load.status === "error" && <Failed t={t} retry={retry} />}
      {load.status === "ready" && load.data.total === 0 && (
        <Message
          title={t("emptyTitle")}
          action={
            <Link to="/download" className="btn-small">
              {t("get")}
            </Link>
          }
        >
          {t("empty")}
        </Message>
      )}
      {load.status === "ready" && load.data.rows.length > 0 && (
        <>
          <div className={`hidden gap-3 px-4 pb-1 pt-4 text-sm text-meta md:grid ${COLUMNS}`}>
            <span>#</span>
            <span>{t("player")}</span>
            <span>{t("lost")}</span>
            <span>{t("profilePp")}</span>
            <span className="hidden lg:block">{t("lostPlays")}</span>
            <span className="text-center">{t("check")}</span>
          </div>
          <ol className="space-y-2 pt-3 sm:pt-1">
            {load.data.rows.map((row) => (
              <PlayerRow key={row.user_id} row={row} mine={String(row.user_id) === me} />
            ))}
          </ol>
          <Pages page={page} total={load.data.total} params={params} t={t} />
        </>
      )}
    </>
  );
}

function KnownView({ t }: { t: Text }) {
  const f = useFormat();
  const [rows, setRows] = useState<RankingRow[] | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    void track(Promise.allSettled([api.players(FEATURED, controller.signal), api.notable(controller.signal)])).then((answers) => {
      const found = new Map<number, RankingRow>();
      for (const answer of answers) {
        if (answer.status === "fulfilled") {
          for (const row of answer.value.rows) {
            found.set(row.user_id, row);
          }
        }
      }
      setRows([...found.values()].sort((a, b) => (a.global_rank || Infinity) - (b.global_rank || Infinity)));
    });
    return () => controller.abort();
  }, []);
  if (rows === null) {
    return <Rows />;
  }
  if (rows.length === 0) {
    return <Message title={t("noKnownTitle")}>{t("noKnown")}</Message>;
  }
  return (
    <>
      <p className="pt-4 text-sm text-muted">{t("knownIntro")}</p>
      <ol className="space-y-2 pt-3">
        {rows.map((row) => (
          <PlayerRow key={row.user_id} row={row} mine={false} world={row.global_rank ? t("globalRank", { rank: f.whole(row.global_rank) }) : undefined} />
        ))}
      </ol>
    </>
  );
}

function PlaysView({ t }: { t: Text }) {
  const [params, setParams] = useSearchParams();
  const page = pageParam(params);
  const replay = params.get("replay") === "1";
  const [load, retry] = useLoad<Plays>((signal) => api.plays((page - 1) * SIZE, SIZE, replay, signal), `${page}|${replay}`);
  const toggle = (value: "all" | "replay") => setParams(value === "replay" ? { replay: "1" } : {});
  const toolbar = (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
      <p className="max-w-2xl text-sm text-muted">{t("playsIntro")}</p>
      <ModeSwitch
        value={replay ? "replay" : "all"}
        label={t("replayLabel")}
        onChange={toggle}
        options={[
          { id: "all", label: t("allPlays") },
          { id: "replay", label: t("withReplay") },
        ]}
      />
    </div>
  );
  return (
    <>
      {load.status === "loading" && <Rows />}
      {load.status === "error" && <Failed t={t} retry={retry} />}
      {load.status === "ready" && load.data.rows.length === 0 && (
        <>
          <div className="pt-3">{toolbar}</div>
          <Message title={t("noPlaysTitle")}>{replay ? t("noReplays") : t("noPlays")}</Message>
        </>
      )}
      {load.status === "ready" && load.data.rows.length > 0 && (
        <>
          <ScoreTable rows={load.data.rows} kind="plays" toolbar={toolbar} />
          <Pages page={page} total={load.data.total} params={params} t={t} />
        </>
      )}
    </>
  );
}

export default function Rankings() {
  const t = useSection("hall");
  useTitle("Hall of Copium");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const view = pathname.endsWith("/plays") ? "plays" : pathname.endsWith("/known") ? "known" : "players";
  return (
    <PageShell>
      <Cover>
        <CoverTitle title="Hall of Copium" subtitle={t("subtitle")} />
      </Cover>
      <Sheet>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <Tabs
              label={t("tabsLabel")}
              tabs={[
                { id: "players", label: t("players") },
                { id: "plays", label: t("plays") },
                { id: "known", label: t("known") },
              ]}
              active={view}
              onChange={(next) => navigate(next === "players" ? "/rankings" : `/rankings/${next}`)}
            />
          </div>
          <div className="sm:pb-2">
            <Find t={t} />
          </div>
        </div>
        {view === "players" && <PlayersView t={t} />}
        {view === "plays" && <PlaysView t={t} />}
        {view === "known" && <KnownView t={t} />}
      </Sheet>
    </PageShell>
  );
}
