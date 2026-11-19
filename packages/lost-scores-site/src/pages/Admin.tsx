import { ExternalLink } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/Avatar";
import ConfirmButton from "@/components/ConfirmButton";
import { Cover, CoverTitle, PageShell, Sheet } from "@/components/Layout";
import { Message, Rows } from "@/components/States";
import Tabs from "@/components/Tabs";
import NotFound from "@/pages/NotFound";
import { admin, type AdminList, type AdminLogEntry, type AdminNote, type AdminRow } from "@/lib/api";
import { useFormat } from "@/lib/format";
import { useSection, type Words } from "@/lib/i18n";
import { useTitle } from "@/lib/title";

type Text = Words<"admin">;
type View = "all" | "waiting" | "flagged" | "hidden";
type Detail = Awaited<ReturnType<typeof admin.scan>>;
type Action = "hidden" | "rejected" | "verified" | "unverified" | "recheck" | "replays";

const VIEWS: View[] = ["all", "waiting", "flagged", "hidden"];
const COLUMNS = "grid-cols-[minmax(0,1fr)_6rem] md:grid-cols-[minmax(0,1.4fr)_7rem_6.5rem_6.5rem_6.5rem_4rem_4rem]";

function StatusChip({ status }: { status: string }) {
  const look: Record<string, string> = {
    verified: "bg-up/10 text-up",
    unverified: "bg-btn text-meta",
    hidden: "bg-down/10 text-down",
    rejected: "bg-down/20 text-down",
  };
  return <span className={`chip ${look[status] ?? "bg-btn text-meta"}`}>{status}</span>;
}

function VerdictChip({ verdict }: { verdict: string | null }) {
  if (!verdict) {
    return <span className="chip bg-btn text-meta">—</span>;
  }
  const look = verdict === "passed" ? "bg-up/10 text-up" : verdict === "flagged" ? "bg-gold/15 text-gold" : "bg-down/10 text-down";
  return <span className={`chip ${look}`}>{verdict}</span>;
}

function Notes({ notes, t }: { notes: AdminNote[]; t: Text }) {
  if (notes.length === 0) {
    return <p className="text-sm text-meta">{t("noNotes")}</p>;
  }
  return (
    <ul className="space-y-1.5 text-sm">
      {notes.map((note, index) => (
        <li key={`${note.code}-${index}`} className="flex gap-2">
          <span className={`chip shrink-0 ${note.flag ? "bg-down/10 text-down" : "bg-btn text-meta"}`}>{note.flag ? t("flagNote") : t("infoNote")}</span>
          <span className="min-w-0 text-ink">
            <span className="font-mono text-xs text-meta">{note.code}</span> {note.detail}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ScanDetail({ id, t, changed }: { id: string; t: Text; changed: () => void }) {
  const f = useFormat();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const load = useCallback(() => {
    void admin.scan(id).then(setDetail, () => setMessage(t("failed")));
  }, [id, t]);
  useEffect(load, [load]);
  if (!detail) {
    return <Rows count={2} />;
  }
  const run = (action: Action) => async () => {
    try {
      if (action === "recheck") {
        await admin.recheck(id);
      } else if (action === "replays") {
        await admin.replays(id);
      } else {
        await admin.status(id, action);
      }
      setMessage(t("done"));
      load();
      changed();
    } catch {
      setMessage(t("failed"));
    }
  };
  const actions: Action[] = ["hidden", "rejected", "verified", "unverified", "recheck"];
  if (detail.replays > 0) {
    actions.push("replays");
  }
  return (
    <div className="space-y-4 rounded-b-lg bg-row-hi px-4 pb-4 pt-3">
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-meta">
        <span>{detail.attempts !== null ? t("attempts", { count: detail.attempts }) : t("notChecked")}</span>
        {detail.checked_at && <span>{t("checkedAt", { when: f.ago(detail.checked_at * 1000) })}</span>}
        <span>{t("appFormula", { app: detail.app, formula: detail.formula })}</span>
        {detail.previous_names.length > 0 && <span>{t("previous", { names: detail.previous_names.join(", ") })}</span>}
        <Link to={`/u/${detail.osu_id}?scan=${detail.id}`} className="link inline-flex items-center gap-1">
          {t("open")}
          <ExternalLink aria-hidden size={13} />
        </Link>
      </div>
      <Notes notes={detail.notes} t={t} />
      <div className="flex flex-wrap items-center gap-2">
        {actions
          .filter((action) => action !== detail.status)
          .map((action) => (
            <ConfirmButton key={action} label={t(`actions.${action}`)} confirmText={t("confirm")} run={run(action)} />
          ))}
        {message && <span className="text-sm text-meta">{message}</span>}
      </div>
    </div>
  );
}

function ScanRow({ row, open, toggle, t, changed }: { row: AdminRow; open: boolean; toggle: () => void; t: Text; changed: () => void }) {
  const f = useFormat();
  return (
    <li className="overflow-hidden rounded-lg bg-row">
      <button type="button" aria-expanded={open} onClick={toggle} className={`grid w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-btn ${COLUMNS}`}>
        <span className="flex min-w-0 items-center gap-3">
          <Avatar id={row.osu_id} name={row.username} size={32} />
          <span className="min-w-0">
            <span className="block truncate font-medium text-lbl">{row.username}</span>
            <span className="block text-xs text-meta">{f.day((row.published_at ?? row.created_at) * 1000)}</span>
          </span>
        </span>
        <span className="hidden text-sm text-meta md:block">{f.day(row.made_at * 1000)}</span>
        <span className="text-right font-semibold text-up md:text-left">{row.lost_pp !== null ? f.gain(row.lost_pp) : "—"}</span>
        <span className="hidden md:block">
          <StatusChip status={row.status} />
        </span>
        <span className="hidden md:block">
          <VerdictChip verdict={row.verdict} />
        </span>
        <span className="hidden text-sm tabular-nums text-ink md:block">{row.notes}</span>
        <span className={`hidden text-sm tabular-nums md:block ${row.flags > 0 ? "text-down" : "text-ink"}`}>{row.flags}</span>
      </button>
      {open && <ScanDetail id={row.id} t={t} changed={changed} />}
    </li>
  );
}

function Scans({ t }: { t: Text }) {
  const [view, setView] = useState<View>("all");
  const [list, setList] = useState<AdminList | "error" | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    admin.scans(view, 0, controller.signal).then(setList, () => {
      if (!controller.signal.aborted) {
        setList("error");
      }
    });
    return () => controller.abort();
  }, [view, version]);
  const changed = useCallback(() => setVersion((value) => value + 1), []);
  return (
    <div className="pt-4">
      {list && list !== "error" && (
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-meta">
          <span>
            <span className="font-semibold text-lbl">{list.summary.published}</span> {t("published")}
          </span>
          <span>
            <span className="font-semibold text-lbl">{list.summary.waiting}</span> {t("waiting")}
          </span>
          <span>
            <span className={`font-semibold ${list.summary.flagged > 0 ? "text-down" : "text-lbl"}`}>{list.summary.flagged}</span> {t("flagged")}
          </span>
          <span>
            <span className="font-semibold text-lbl">{list.summary.hidden}</span> {t("hidden")}
          </span>
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {VIEWS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={item === view}
            onClick={() => {
              setView(item);
              setOpen(null);
            }}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${item === view ? "bg-acc/20 text-lbl" : "text-muted hover:bg-btn hover:text-lbl"}`}
          >
            {t(`views.${item}`)}
          </button>
        ))}
      </div>
      {list === null && <Rows count={4} />}
      {list === "error" && (
        <Message
          title={t("loadFailed")}
          action={
            <button type="button" className="btn-small" onClick={changed}>
              {t("tryAgain")}
            </button>
          }
        />
      )}
      {list && list !== "error" && list.rows.length === 0 && <Message title={t("noScans")} />}
      {list && list !== "error" && list.rows.length > 0 && (
        <>
          <div className={`hidden gap-3 px-4 pb-1 pt-4 text-xs text-meta md:grid ${COLUMNS}`}>
            <span>{t("player")}</span>
            <span>{t("made")}</span>
            <span>{t("lost")}</span>
            <span>{t("status")}</span>
            <span>{t("check")}</span>
            <span>{t("notes")}</span>
            <span>{t("flags")}</span>
          </div>
          <ol className="space-y-1.5 pt-2">
            {list.rows.map((row) => (
              <ScanRow key={row.id} row={row} open={open === row.id} toggle={() => setOpen(open === row.id ? null : row.id)} t={t} changed={changed} />
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

function Log({ t }: { t: Text }) {
  const f = useFormat();
  const [entries, setEntries] = useState<AdminLogEntry[] | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    admin.log(controller.signal).then(setEntries, () => setEntries([]));
    return () => controller.abort();
  }, []);
  if (entries === null) {
    return <Rows count={3} />;
  }
  if (entries.length === 0) {
    return <Message title={t("logEmpty")} />;
  }
  return (
    <ol className="space-y-1.5 pt-4">
      {entries.map((entry, index) => (
        <li key={`${entry.at}-${index}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-row px-4 py-2.5 text-sm">
          <span className="text-meta">{f.ago(entry.at * 1000)}</span>
          <span className="font-medium text-lbl">{entry.action}</span>
          {entry.detail && <span className="text-ink">{entry.detail}</span>}
          {entry.submission_id && <span className="font-mono text-xs text-meta">{entry.submission_id}</span>}
          <span className="ml-auto text-meta">{entry.username ?? entry.osu_id}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Admin() {
  const t = useSection("admin");
  useTitle(t("title"));
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"scans" | "log">("scans");
  useEffect(() => {
    const controller = new AbortController();
    admin.me(controller.signal).then(
      () => setAllowed(true),
      () => {
        if (!controller.signal.aborted) {
          setAllowed(false);
        }
      },
    );
    return () => controller.abort();
  }, []);
  if (allowed === false) {
    return <NotFound />;
  }
  if (allowed === null) {
    return null;
  }
  return (
    <PageShell>
      <Cover>
        <CoverTitle title={t("title")} subtitle={t("subtitle")} />
      </Cover>
      <Sheet>
        <Tabs
          label={t("title")}
          tabs={[
            { id: "scans", label: t("tabs.scans") },
            { id: "log", label: t("tabs.log") },
          ]}
          active={tab}
          onChange={setTab}
        />
        {tab === "scans" ? <Scans t={t} /> : <Log t={t} />}
      </Sheet>
    </PageShell>
  );
}
