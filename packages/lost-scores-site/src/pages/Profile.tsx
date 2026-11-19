import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Avatar from "@/components/Avatar";
import { Check } from "@/components/Chips";
import ConfirmButton from "@/components/ConfirmButton";
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

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-sm text-meta">{label}</p>
      <p className="text-xl font-semibold text-lbl sm:text-2xl">{children}</p>
    </div>
  );
}

function Stats({ page, t }: { page: ScanPage; t: Text }) {
  const f = useFormat();
  const stats = page.summary_stats;
  return (
    <div className="flex flex-wrap content-start gap-x-9 gap-y-4">
      <Stat label={t("profilePp")}>
        {f.whole(stats.current_pp)} → <span className="text-up">{f.whole(stats.potential_pp)}</span>{" "}
        <span className="text-base font-normal text-up">({f.delta(stats.delta_pp)})</span>
      </Stat>
      <Stat label={t("lostPlays")}>
        {f.whole(stats.lost_scores_found)}
        {stats.lost_scores_total > stats.lost_scores_found && (
          <span className="ml-1.5 text-base font-normal text-meta">{t("withLoved", { total: f.whole(stats.lost_scores_total) })}</span>
        )}
      </Stat>
      {stats.current_global_rank > 0 && <Stat label={t("globalRank")}>#{f.whole(stats.current_global_rank)}</Stat>}
      {page.metadata.analysis_timestamp && <Stat label={t("scanned")}>{f.day(page.metadata.analysis_timestamp)}</Stat>}
    </div>
  );
}

function ScanState({ scan, t }: { scan: OwnScan; t: Text }) {
  if (scan.visibility === "private") {
    return <span className="chip bg-btn text-muted">{t("private")}</span>;
  }
  if (scan.status === "verified" || scan.status === "unverified") {
    return <Check verified={scan.status === "verified"} />;
  }
  return (
    <span className="chip bg-down/10 text-down" title={t("hiddenHint")}>
      {scan.status === "failed" ? t("checkFailed") : t("hidden")}
    </span>
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

function PotentialTop({ top, page, retry, t }: { top: Top; page: ScanPage | null; retry: () => void; t: Text }) {
  const f = useFormat();
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
  const stats = page?.summary_stats;
  const inTop = stats?.lost_in_top ?? top.rows.filter((row) => row.lost).length;
  const from = stats?.current_accuracy != null ? f.accuracy(stats.current_accuracy) : null;
  const to = stats?.potential_accuracy != null ? f.accuracy(stats.potential_accuracy) : null;
  return (
    <>
      <p className="pt-4 text-muted">{from && to ? t("topIntro", { size: top.rows.length, inTop, from, to }) : t("topIntroShort", { size: top.rows.length, inTop })}</p>
      <ScoreTable rows={top.rows} kind="potential" />
    </>
  );
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
  const [progress, setProgress] = useState<Progress | null>(null);
  const [fixes, setFixes] = useState<Fix[]>([]);
  const [fixesBusy, setFixesBusy] = useState(false);
  const loadingFixes = useRef(false);
  const navigate = useNavigate();
  const shown = useRef(false);
  const gap = sort === "gap";

  useEffect(() => {
    const controller = new AbortController();
    const query = { offset: 0, limit: PAGE, gap };
    const request = scan ? api.scan(scan, query, controller.signal) : api.player(id, query, controller.signal);
    track(request).then(
      (page) => {
        const show = () => setLoad({ status: "ready", page, rows: page.lost_scores });
        if (shown.current) {
          smoothly(show);
        } else {
          show();
        }
        shown.current = true;
      },
      (error: unknown) => {
        if (!controller.signal.aborted) {
          setLoad({ status: error instanceof ApiError && error.status === 404 ? "missing" : "error" });
        }
      },
    );
    return () => controller.abort();
  }, [id, scan, gap, version]);

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
    const query = { offset: 0, limit: 1, potential: true };
    const request = scan ? api.scan(scan, query) : api.player(id, query);
    track(request).then(
      (page) => setTop({ status: "ready", rows: page.potential_top ?? [] }),
      () => setTop({ status: "error" }),
    );
  };

  const page = load.status === "ready" ? load.page : null;
  const name = page?.metadata.user_identifier ?? (owner ? me.username : id);
  const userId = page?.metadata.user_id ?? (owner ? me.id : /^\d+$/.test(id) ? Number(id) : null);
  useTitle(name);
  const progressId = page?.metadata.user_id ?? null;

  useEffect(() => {
    if (progressId === null) {
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
          setProgress(null);
          setFixes([]);
        }
      },
    );
    return () => controller.abort();
  }, [progressId]);

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
  const tracked = progress !== null && progress.total > 0 ? progress : null;

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
  if (tracked) {
    tabs.push({ id: "fixed", label: `${fixedText("tabFixed")} · ${f.whole(tracked.fixed)}` });
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
        <div className="relative z-10 -mt-12 flex items-end gap-4 sm:gap-5">
          <Avatar id={userId} name={name} size={104} square className="border-4 border-card" />
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 pb-1.5">
            <h1 className="truncate text-3xl sm:text-4xl">{name}</h1>
            {page && !viewing && <Check verified={page.verified} linked />}
            {page?.hall_rank && !viewing && userId && (
              <Link to={`/rankings?me=${userId}`} className="chip bg-acc/15 text-acc transition-colors hover:bg-acc/25">
                {t("hallPlace", { place: f.whole(page.hall_rank) })}
              </Link>
            )}
            {userId && (
              <a
                href={`https://osu.ppy.sh/users/${userId}`}
                aria-label={t("osuProfile")}
                title={t("osuProfile")}
                className="grid h-9 w-9 place-items-center rounded-full bg-btn text-lbl transition-colors hover:bg-osu hover:text-white"
              >
                <span aria-hidden className="osu-cookie h-7 w-7" />
              </a>
            )}
          </div>
        </div>

        {viewing?.visibility === "private" && (
          <p className="mt-5 rounded-xl bg-btn px-4 py-3 text-muted">
            {t("privateNote")}{" "}
            <Link to={`/u/${encodeURIComponent(id)}`} className="link">
              {t("backToPublished")}
            </Link>
          </p>
        )}

        {page && (
          <div className="mt-6 border-b border-divider pb-6">
            <Stats page={page} t={t} />
            {tracked && (
              <>
                <FixBar progress={tracked} />
                <MedalRow medals={tracked.medals} />
              </>
            )}
          </div>
        )}

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

        {view === "fixed" && tracked && <FixedTable fixes={fixes} total={tracked.fixes_total} more={moreFixes} busy={fixesBusy} />}

        {view === "potential" && <PotentialTop top={top} page={page} retry={() => openView("potential")} t={t} />}

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
