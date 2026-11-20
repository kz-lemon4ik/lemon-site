import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Avatar from "@/components/Avatar";
import ConfirmButton from "@/components/ConfirmButton";
import Consent from "@/components/Consent";
import FixedTable from "@/components/FixedTable";
import { Cover, PageShell, Sheet } from "@/components/Layout";
import ScansChart from "@/components/ScansChart";
import ModeSwitch from "@/components/ModeSwitch";
import { CoinDefs, FixBar, MedalRow } from "@/components/Progress";
import ScoreTable from "@/components/ScoreTable";
import { Message, Rows } from "@/components/States";
import Tabs from "@/components/Tabs";
import { ApiError, LOGIN_URL, api, type Fix, type LostScore, type Me, type OwnScan, type PotentialRow, type Progress, type ScanPage } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { rememberPage } from "@/lib/back";
import { useFormat } from "@/lib/format";
import { useSection, type Words } from "@/lib/i18n";
import { track } from "@/lib/progress";
import { smoothly } from "@/lib/smooth";
import { useTitle } from "@/lib/title";

type Text = Words<"profile">;

const PAGE = 50;
const FIX_PAGE = 20;
const HALL_TITLE = 50;

type Load =
  | { status: "loading" }
  | { status: "ready"; page: ScanPage; rows: LostScore[] }
  | { status: "missing" }
  | { status: "error" };

type Top = { status: "idle" } | { status: "loading" } | { status: "ready"; rows: PotentialRow[] } | { status: "error" };

type View = "lost" | "fixed" | "potential" | "scans";

function isOwner(me: Me | null, id: string): me is Me {
  return me !== null && (String(me.id) === id || me.username.toLowerCase() === id.toLowerCase());
}

function Cell({ label, value, note }: { label: string; value: ReactNode; note: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm text-meta">{label}</p>
      <p className="mt-0.5 truncate text-[1.75rem] font-semibold leading-tight tabular-nums text-lbl">{value}</p>
      <p className="mt-1 truncate text-sm tabular-nums text-meta">{note}</p>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-semibold tabular-nums text-lbl">{children}</dd>
    </div>
  );
}

function Figures({ page, userId, t }: { page: ScanPage; userId: number | null; t: Text }) {
  const f = useFormat();
  const stats = page.summary_stats;
  const rank = page.potential_rank ?? null;
  const hall = page.hall_rank ?? null;
  const oldest = stats.oldest_played ? new Date(stats.oldest_played).getUTCFullYear() : null;
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="grid grid-cols-2 content-start gap-6 sm:grid-cols-4">
        {rank !== null && (
          <Cell
            label={t("potentialRank")}
            value={`#${f.whole(rank)}`}
            note={stats.current_global_rank > 0 ? t("now", { value: `#${f.whole(stats.current_global_rank)}` }) : ""}
          />
        )}
        <Cell
          label={t("potentialPp")}
          value={f.whole(stats.potential_pp)}
          note={
            <>
              {t("now", { value: f.whole(stats.current_pp) })} · <span className="font-medium text-up">+{f.tenths(stats.delta_pp)}</span>
            </>
          }
        />
        {stats.current_accuracy !== null && stats.potential_accuracy !== null && (
          <Cell label={t("potentialAccuracy")} value={f.accuracy(stats.potential_accuracy)} note={t("now", { value: f.accuracy(stats.current_accuracy) })} />
        )}
        {hall !== null && (
          <Cell
            label="Hall of Copium"
            value={
              userId !== null ? (
                <Link to={`/rankings?me=${userId}`} className="decoration-lbl/40 underline-offset-4 hover:underline">
                  #{f.whole(hall)}
                </Link>
              ) : (
                `#${f.whole(hall)}`
              )
            }
            note={t("byLostPp")}
          />
        )}
      </div>
      <dl className="self-start rounded-xl bg-row px-4 py-3">
        <Detail label={t("lostPlays")}>{f.whole(stats.lost_scores_total)}</Detail>
        {page.include_all === true && <Detail label={t("onRanked")}>{f.whole(stats.lost_scores_found)}</Detail>}
        {stats.average_gap != null && <Detail label={t("averageLost")}>{f.tenths(stats.average_gap)}</Detail>}
        {stats.biggest_gap != null && <Detail label={t("biggestLoss")}>-{f.tenths(stats.biggest_gap)} pp</Detail>}
        {oldest !== null && <Detail label={t("oldestLost")}>{oldest}</Detail>}
      </dl>
    </div>
  );
}

function ScanState({ scan, t }: { scan: OwnScan; t: Text }) {
  const check = useSection("check");
  if (scan.visibility === "private") {
    return <span className="chip bg-btn text-muted">{t("private")}</span>;
  }
  const [Icon, tone, label] =
    scan.status === "verified"
      ? [CheckCircle2, "text-up", `${t("verifiedState")}. ${check("verifiedHint")}`]
      : scan.status === "unverified"
        ? [HelpCircle, "text-meta", `${t("checkingState")}. ${check("checkingHint")}`]
        : [XCircle, "text-down", `${scan.status === "failed" ? t("checkFailed") : t("hidden")}. ${t("hiddenHint")}`];
  return (
    <span role="img" aria-label={label} title={label} className="grid place-items-center">
      <Icon aria-hidden size={20} className={tone} />
    </span>
  );
}

function Band({ progress }: { progress: Progress | "loading" }) {
  return (
    <div className="-mx-4 mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-divider bg-band px-4 py-4 sm:-mx-6 sm:px-6">
      <div className="flex min-h-10 min-w-0 flex-1 flex-col justify-center">
        <MedalRow medals={progress === "loading" ? null : progress.medals} />
      </div>
      <div className="w-full sm:w-80">
        {progress === "loading" ? (
          <div aria-hidden>
            <span className="block h-5 w-32 animate-pulse rounded bg-btn" />
            <span className="mt-2 block h-3.5 animate-pulse rounded-full bg-btn" />
          </div>
        ) : (
          <FixBar progress={progress} />
        )}
      </div>
    </div>
  );
}

type Action = "unpublish" | "delete";

function OwnScans({
  id,
  scans,
  current,
  act,
  t,
}: {
  id: string;
  scans: OwnScan[];
  current: string | null;
  act: (scan: OwnScan, action: Action) => Promise<void>;
  t: Text;
}) {
  const f = useFormat();
  if (scans.length === 0) {
    return <Message title={t("noScansTitle")}>{t("noScans")}</Message>;
  }
  return (
    <ol className="space-y-1.5 pt-3">
      {scans.map((scan) => (
        <li
          key={scan.id}
          className={`flex flex-wrap items-center gap-x-3 rounded-lg bg-row pr-3 ${scan.id === current ? "ring-1 ring-acc/50" : ""}`}
        >
          <Link
            to={`/u/${encodeURIComponent(id)}?scan=${scan.id}`}
            aria-current={scan.id === current ? "page" : undefined}
            className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-1 rounded-lg px-4 py-3 transition-colors hover:bg-btn/60"
          >
            <span className="font-medium text-lbl">{f.day(scan.made_at * 1000)}</span>
            <span className="font-semibold text-up">{f.gain(scan.lost_pp)}</span>
            <span className="text-muted">
              {t("scanLost", { count: scan.lost_ranked })}
              {scan.lost_total > scan.lost_ranked && t("scanOf", { total: f.whole(scan.lost_total) })}
            </span>
            <span className="ml-auto">
              <ScanState scan={scan} t={t} />
            </span>
          </Link>
          <span className="flex w-full gap-2 pb-3 pl-4 sm:w-auto sm:pb-0 sm:pl-0">
            {scan.visibility === "public" && (
              <ConfirmButton label={t("unpublish")} hint={t("unpublishHint")} confirmText={t("confirmAgain")} run={() => act(scan, "unpublish")} />
            )}
            <ConfirmButton label={t("delete")} hint={t("deleteHint")} confirmText={t("confirmAgain")} run={() => act(scan, "delete")} />
          </span>
        </li>
      ))}
    </ol>
  );
}

function PotentialTop({ top, retry, t }: { top: Top; retry: () => void; t: Text }) {
  if (top.status === "idle" || top.status === "loading") {
    return <Rows />;
  }
  if (top.status === "error") {
    return (
      <Message
        title={t("topFailed")}
        action={
          <button type="button" className="btn-small" onClick={retry}>
            {t("tryAgain")}
          </button>
        }
      />
    );
  }
  if (top.rows.length === 0) {
    return <Message title={t("noTopTitle")}>{t("noTop")}</Message>;
  }
  return <ScoreTable rows={top.rows} kind="potential" />;
}

function Profile({ id, scan }: { id: string; scan: string | null }) {
  const t = useSection("profile");
  const fixedText = useSection("progress");
  const f = useFormat();
  const { me, ready } = useAuth();
  const owner = isOwner(me, id);
  const [load, setLoad] = useState<Load>({ status: "loading" });
  const [own, setOwn] = useState<OwnScan[] | null>(null);
  const location = useLocation();
  const [view, setView] = useState<View>(() => ((location.state as { view?: View } | null)?.view === "scans" ? "scans" : "lost"));
  const [more, setMore] = useState<"idle" | "loading" | "error">("idle");
  const [top, setTop] = useState<Top>({ status: "idle" });
  const [sort, setSort] = useState<"pp" | "gap">("pp");
  const [version, setVersion] = useState(0);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState<Progress | "loading" | "failed">("loading");
  const [fixes, setFixes] = useState<Fix[]>([]);
  const [fixesBusy, setFixesBusy] = useState(false);
  const loadingFixes = useRef(false);
  const navigate = useNavigate();
  const shown = useRef(false);
  const pages = useRef(new Map<string, ScanPage>());
  const topRequest = useRef<Promise<PotentialRow[]> | null>(null);
  const gap = sort === "gap";

  const fetchTop = useCallback(() => {
    if (!topRequest.current) {
      const query = { offset: 0, limit: 1, potential: true };
      const request = (scan ? api.scan(scan, query) : api.player(id, query)).then((found) => found.potential_top ?? []);
      topRequest.current = request;
      request.catch(() => {
        if (topRequest.current === request) {
          topRequest.current = null;
        }
      });
    }
    return topRequest.current;
  }, [id, scan]);

  useEffect(() => {
    const keyOf = (sorted: boolean) => `${version}:${sorted ? "gap" : "pp"}`;
    const show = (page: ScanPage) => {
      const apply = () => setLoad({ status: "ready", page, rows: page.lost_scores });
      if (shown.current) {
        smoothly(apply);
      } else {
        apply();
      }
      shown.current = true;
    };
    const cached = pages.current.get(keyOf(gap));
    if (cached) {
      show(cached);
      return;
    }
    const controller = new AbortController();
    const ask = (sorted: boolean) => {
      const query = { offset: 0, limit: PAGE, gap: sorted };
      return scan ? api.scan(scan, query, controller.signal) : api.player(id, query, controller.signal);
    };
    track(ask(gap)).then(
      (page) => {
        pages.current.set(keyOf(gap), page);
        show(page);
        if (!pages.current.has(keyOf(!gap))) {
          ask(!gap).then(
            (other) => pages.current.set(keyOf(!gap), other),
            () => undefined,
          );
        }
        fetchTop().then(
          (rows) => setTop((current) => (current.status === "ready" ? current : { status: "ready", rows })),
          () => undefined,
        );
      },
      (error: unknown) => {
        if (!controller.signal.aborted) {
          setLoad({ status: error instanceof ApiError && error.status === 404 ? "missing" : "error" });
        }
      },
    );
    return () => controller.abort();
  }, [id, scan, gap, version, fetchTop]);

  useEffect(() => {
    if (!owner) {
      return;
    }
    const controller = new AbortController();
    api.ownScans(controller.signal).then(
      (scans) => setOwn(scans),
      () => {
        if (!controller.signal.aborted) {
          setOwn([]);
        }
      },
    );
    return () => controller.abort();
  }, [owner, version]);

  const act = async (target: OwnScan, action: Action) => {
    setFailed(false);
    try {
      await (action === "unpublish" ? api.unpublishOwn(target.id) : api.deleteOwn(target.id));
    } catch {
      setFailed(true);
      return;
    }
    if (action === "delete" && scan === target.id) {
      navigate(`/u/${encodeURIComponent(id)}`, { replace: true, state: { view: "scans" } });
    }
    setVersion((value) => value + 1);
  };

  const openView = (next: View) => {
    setView(next);
    if (next !== "potential" || top.status === "loading" || top.status === "ready") {
      return;
    }
    setTop({ status: "loading" });
    track(fetchTop()).then(
      (rows) => setTop({ status: "ready", rows }),
      () => setTop({ status: "error" }),
    );
  };

  const page = load.status === "ready" ? load.page : null;
  const name = page?.metadata.user_identifier ?? (owner ? me.username : /^\d+$/.test(id) ? null : id);
  const userId = page?.metadata.user_id ?? (owner ? me.id : /^\d+$/.test(id) ? Number(id) : null);
  useTitle(name ?? undefined);
  const early = scan === null && /^\d+$/.test(id) ? Number(id) : null;
  const progressId = page?.metadata.user_id ?? early;
  const latest = page !== null && progressId !== null && page.hall_rank != null;
  const wanted = page === null ? early !== null : latest;

  useEffect(() => {
    if (!wanted || progressId === null) {
      return;
    }
    const controller = new AbortController();
    api.progress(progressId, 0, FIX_PAGE, controller.signal).then(
      (next) => {
        setProgress(next);
        setFixes(next.fixes);
      },
      () => {
        if (!controller.signal.aborted) {
          setProgress("failed");
          setFixes([]);
        }
      },
    );
    return () => controller.abort();
  }, [wanted, progressId, version]);

  const moreFixes = () => {
    if (progressId === null || loadingFixes.current) {
      return;
    }
    loadingFixes.current = true;
    setFixesBusy(true);
    track(api.progress(progressId, fixes.length, FIX_PAGE))
      .then(
        (next) => setFixes((current) => [...current, ...next.fixes.filter((fix) => !current.some((known) => known.beatmap_id === fix.beatmap_id))]),
        () => undefined,
      )
      .finally(() => {
        loadingFixes.current = false;
        setFixesBusy(false);
      });
  };
  const tracked = latest && typeof progress === "object" ? progress : null;
  const banded = latest && progress !== "failed";

  const showMore = async () => {
    if (load.status !== "ready") {
      return;
    }
    setMore("loading");
    try {
      const offset = load.rows.length;
      const query = { offset, limit: PAGE, gap };
      const next = await track(scan ? api.scan(scan, query) : api.player(id, query));
      setLoad({ status: "ready", page: load.page, rows: [...load.rows, ...next.lost_scores] });
      setMore("idle");
    } catch {
      setMore("error");
    }
  };

  const tabs: { id: View; label: string }[] = [{ id: "lost", label: page ? `${t("tabLost")} · ${f.whole(page.total_count)}` : t("tabLost") }];
  if (banded) {
    tabs.push({ id: "fixed", label: tracked ? `${fixedText("tabFixed")} · ${f.whole(tracked.fixed)}` : fixedText("tabFixed") });
  }
  if (page) {
    tabs.push({ id: "potential", label: t("tabPotential") });
  }
  if (owner) {
    tabs.push({ id: "scans", label: own ? `${t("tabScans")} · ${own.length}` : t("tabScans") });
  }
  const viewing = owner && own ? own.find((item) => item.id === scan) : undefined;

  if (load.status === "missing" && !owner && ready) {
    return (
      <PageShell>
        <Cover />
        <Sheet>
          <Message
            title={t("noScanTitle")}
            action={
              <>
                <a href={LOGIN_URL} onClick={rememberPage} className="btn-login">
                  {t("logIn")}
                </a>
                <Link to="/rankings" className="btn-small px-4 py-2">
                  Hall of Copium
                </Link>
                <Consent className="basis-full" />
              </>
            }
          >
            {t("noScan")}
          </Message>
        </Sheet>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {tracked && <CoinDefs />}
      <Cover tall />
      <Sheet>
        <div className="relative z-10 flex flex-wrap items-end gap-x-5 gap-y-2 pt-1">
          <div className="-mt-[64px] shrink-0 sm:-mt-[84px]">
            <span className="sm:hidden">
              <Avatar id={userId} name={name ?? ""} size={96} square className="border-4 border-card" />
            </span>
            <span className="hidden sm:block">
              <Avatar id={userId} name={name ?? ""} size={124} square className="border-4 border-card" />
            </span>
          </div>
          <div className="min-w-0 flex-1 pb-1.5 pr-12">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <h1 title={name ?? undefined} className="truncate text-xl sm:text-4xl">
                {name ?? <span aria-hidden className="inline-block h-[0.8em] w-40 animate-pulse rounded-lg bg-btn align-middle sm:w-56" />}
              </h1>
              {page?.hall_rank && page.hall_rank <= HALL_TITLE && !viewing && userId && (
                <Link to={`/rankings?me=${userId}`} className="chip bg-acc/15 text-acc transition-colors hover:bg-acc/25">
                  {t("hallPlace", { place: f.whole(page.hall_rank) })}
                </Link>
              )}
            </div>
            {page?.metadata.analysis_timestamp && <p className="mt-1 text-xs text-meta">{t("scannedOn", { date: f.day(page.metadata.analysis_timestamp) })}</p>}
          </div>
          {userId && (
            <a
              href={`https://osu.ppy.sh/users/${userId}`}
              aria-label={t("osuProfile")}
              title={t("osuProfile")}
              className="absolute right-0 top-2 grid h-9 w-9 place-items-center rounded-full bg-btn text-lbl transition-colors hover:bg-osu hover:text-white"
            >
              <span aria-hidden className="osu-cookie h-7 w-7" />
            </a>
          )}
        </div>

        {viewing?.visibility === "private" && (
          <p className="mt-5 rounded-xl bg-btn px-4 py-3 text-muted">
            {t("privateNote")}{" "}
            <Link to={`/u/${encodeURIComponent(id)}`} className="link">
              {t("backToPublished")}
            </Link>
          </p>
        )}

        {page && <Figures page={page} userId={userId} t={t} />}
        {banded && <Band progress={tracked ?? "loading"} />}

        <div className="mt-2">
          <Tabs label={t("tabsLabel")} tabs={tabs} active={view} onChange={openView} />
        </div>

        {view === "scans" &&
          owner &&
          (own ? (
            <>
              <ScansChart scans={own} />
              {failed && <p className="pt-3 text-sm text-down">{t("actionFailed")}</p>}
              <OwnScans id={id} scans={own} current={scan} act={act} t={t} />
            </>
          ) : (
            <Rows count={3} />
          ))}

        {view === "fixed" &&
          (tracked ? (
            <FixedTable fixes={fixes} total={tracked.fixes_total} more={moreFixes} busy={fixesBusy} />
          ) : progress === "failed" ? (
            <Message title={t("loadFailedTitle")}>{t("loadFailed")}</Message>
          ) : (
            <Rows count={3} />
          ))}

        {view === "potential" && <PotentialTop top={top} retry={() => openView("potential")} t={t} />}

        {view === "lost" && (
          <>
            {load.status === "loading" && <Rows />}
            {load.status === "error" && <Message title={t("loadFailedTitle")}>{t("loadFailed")}</Message>}
            {load.status === "missing" && owner && (
              <Message
                title={scan ? t("goneTitle") : t("nothingTitle")}
                action={
                  <button type="button" className="btn-small" onClick={() => openView("scans")}>
                    {t("tabScans")}
                  </button>
                }
              >
                {scan ? t("gone") : t("nothing")}
              </Message>
            )}
            {load.status === "ready" && (
              <>
                {load.rows.length === 0 ? (
                  <Message title={t("noLostTitle")}>{t("noLost")}</Message>
                ) : (
                  <ScoreTable
                    rows={load.rows}
                    toolbar={
                      <div className="flex justify-end pb-3">
                        <ModeSwitch
                          value={sort}
                          label={t("sortLabel")}
                          onChange={setSort}
                          options={[
                            { id: "pp", label: t("byPp") },
                            { id: "gap", label: t("byGap") },
                          ]}
                        />
                      </div>
                    }
                  />
                )}
                {load.rows.length < load.page.total_count && (
                  <div className="mt-4 text-center">
                    <button type="button" className="btn-small px-5 py-2" disabled={more === "loading"} onClick={showMore}>
                      {more === "loading" ? t("loading") : more === "error" ? t("tryAgain") : t("showMore")}
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </Sheet>
    </PageShell>
  );
}

export default function ProfileRoute() {
  const { id = "" } = useParams();
  const [params] = useSearchParams();
  const scan = params.get("scan");
  return <Profile key={`${id}/${scan ?? ""}`} id={id} scan={scan} />;
}
