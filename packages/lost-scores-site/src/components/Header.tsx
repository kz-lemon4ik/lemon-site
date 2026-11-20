import { ChevronLeft, ChevronRight, Globe, LogOut, Menu, Shield, SlidersHorizontal, User, X, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { FaDiscord } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Avatar from "@/components/Avatar";
import Brand from "@/components/Brand";
import Consent from "@/components/Consent";
import Flag from "@/components/Flag";
import Settings from "@/components/Settings";
import Slider from "@/components/Slider";
import { LOGIN_URL, admin, type Me } from "@/lib/api";
import { DISCORD_URL } from "@/lib/author";
import { useAuth } from "@/lib/auth";
import { rememberPage } from "@/lib/back";
import { useDismiss } from "@/lib/dismiss";
import { flagOf } from "@/lib/flag";
import { LANGS, useLang, useSection, type Words } from "@/lib/i18n";
import { useScrolled } from "@/lib/scroll";
import { useSlider } from "@/lib/slider";

type Text = Words<"header">;

const GUEST = "/images/avatar-guest.png";

function navOf(t: Text) {
  return [
    { to: "/rankings", label: t("nav.rankings") },
    { to: "/download", label: t("nav.download") },
    { to: "/faq", label: t("nav.faq") },
  ];
}

function useFlagged(me: Me | null, open: boolean): number | null {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    if (!me || !open) {
      return;
    }
    const controller = new AbortController();
    admin.me(controller.signal).then(
      (answer) => setCount(answer.admin ? (answer.flagged_waiting ?? 0) : null),
      () => {
        if (!controller.signal.aborted) {
          setCount(null);
        }
      },
    );
    return () => controller.abort();
  }, [me, open]);
  return me ? count : null;
}

function AvatarCircle({ me, large }: { me: Me | null; large: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`relative block overflow-hidden rounded-full bg-btn transition-[width,height] duration-300 ${large ? "h-12 w-12 xl:h-14 xl:w-14" : "h-10 w-10"}`}>
      {!failed ? (
        <img src={me ? `https://a.ppy.sh/${me.id}` : GUEST} alt="" onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <User aria-hidden className="absolute inset-0 m-auto h-1/2 w-1/2 text-muted" />
      )}
      <span className={`absolute inset-0 rounded-full ring-[3px] ring-inset ring-transparent transition-shadow duration-200 ${me ? "group-hover:ring-white group-focus-visible:ring-white" : "group-hover:ring-acc group-focus-visible:ring-acc"}`} />
    </span>
  );
}

function ProfileBlock({ me, close, t }: { me: Me | null; close: () => void; t: Text }) {
  const look = "relative isolate block h-28 overflow-hidden bg-gradient-to-br from-[#5b4893] to-[#2f2552] transition-[filter] hover:brightness-110";
  const inside = (
    <>
      <img src="/images/triangles.svg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <span className="flex h-full flex-col items-center justify-center gap-2 px-4">
        {me ? (
          <Avatar id={me.id} name={me.username} size={48} className="ring-2 ring-white/70" />
        ) : (
          <img src={GUEST} alt="" width={48} height={48} className="h-12 w-12 rounded-full ring-2 ring-white/70" />
        )}
        <span className="max-w-full truncate font-medium text-white">{me ? me.username : t("logInOsu")}</span>
      </span>
    </>
  );
  return me ? (
    <Link to={`/u/${me.id}`} onClick={close} aria-label={`${me.username} · ${t("profile")}`} className={look}>
      {inside}
    </Link>
  ) : (
    <>
      <a href={LOGIN_URL} onClick={rememberPage} className={look}>
        {inside}
      </a>
      <Consent className="px-4 pt-3" />
    </>
  );
}

const ITEM = "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-lbl transition-colors hover:bg-btn focus-visible:bg-btn focus-visible:outline-none";

function Item({ icon: Icon, label, value, more, onClick }: { icon: LucideIcon; label: string; value?: ReactNode; more?: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={ITEM}>
      <Icon aria-hidden size={16} className="text-muted" />
      <span className="flex-1">{label}</span>
      {value}
      {more && <ChevronRight aria-hidden size={15} className="text-meta" />}
    </button>
  );
}

function MenuItems({ me, flagged, close, t }: { me: Me | null; flagged: number | null; close: () => void; t: Text }) {
  const [view, setView] = useState<"main" | "language" | "settings">("main");
  const { language, setLang } = useLang();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const back = (
    <button type="button" onClick={() => setView("main")} className={`${ITEM} text-muted`}>
      <ChevronLeft aria-hidden size={16} />
      {t("back")}
    </button>
  );
  if (view === "language") {
    return (
      <div className="p-1">
        {back}
        {LANGS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={item.id === language.id ? "true" : undefined}
            onClick={() => {
              setLang(item.id);
              setView("main");
            }}
            className={`${ITEM} relative pl-5 ${item.id === language.id ? "" : "text-muted"}`}
          >
            {item.id === language.id && <span aria-hidden className="absolute inset-y-2.5 left-2 w-1 rounded-full bg-acc" />}
            <Flag code={flagOf(item)} className="!h-5 !w-5" />
            {item.name}
          </button>
        ))}
      </div>
    );
  }
  if (view === "settings") {
    return (
      <div className="p-1">
        {back}
        <div className="px-3 text-sm">
          <Settings />
        </div>
      </div>
    );
  }
  return (
    <div className="p-1">
      <Item icon={Globe} label={t("language")} value={<span className="text-meta">{language.name}</span>} more onClick={() => setView("language")} />
      <Item icon={SlidersHorizontal} label={t("settings")} more onClick={() => setView("settings")} />
      {flagged !== null && (
        <Link to="/admin" onClick={close} className={ITEM}>
          <Shield aria-hidden size={16} className="text-muted" />
          <span className="flex-1">{t("admin")}</span>
          {flagged > 0 && (
            <span title={t("flaggedWaiting", { count: flagged })} className="rounded-full bg-down/15 px-2 text-xs font-semibold tabular-nums leading-5 text-down">
              {flagged}
            </span>
          )}
        </Link>
      )}
      {me && (
        <Item
          icon={LogOut}
          label={t("logOut")}
          onClick={async () => {
            close();
            await logout();
            navigate("/");
          }}
        />
      )}
    </div>
  );
}

function Account({ large, t }: { large: boolean; t: Text }) {
  const { me, ready } = useAuth();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, close, box);
  const flagged = useFlagged(me, open);
  if (!ready) {
    return <span className={`block ${large ? "h-12 w-12 xl:h-14 xl:w-14" : "h-10 w-10"}`} />;
  }
  const label = me ? t("accountOf", { name: me.username }) : t("logIn");
  return (
    <div ref={box} className="relative">
      <button type="button" aria-haspopup="dialog" aria-expanded={open} aria-label={label} title={label} onClick={() => setOpen((current) => !current)} className="group block rounded-full">
        <AvatarCircle me={me} large={large} />
      </button>
      {open && (
        <div className="menu-pop absolute right-0 mt-3 w-72 overflow-hidden rounded-xl bg-card shadow-2xl ring-1 ring-divider">
          <ProfileBlock me={me} close={close} t={t} />
          <MenuItems me={me} flagged={flagged} close={close} t={t} />
        </div>
      )}
    </div>
  );
}

function MobilePanel({ close, t }: { close: () => void; t: Text }) {
  const { me } = useAuth();
  const flagged = useFlagged(me, true);
  return (
    <div id="mobile-menu" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-divider lg:hidden">
      <ProfileBlock me={me} close={close} t={t} />
      <nav aria-label={t("mainNav")} className="space-y-1 p-2">
        {navOf(t).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={close}
            className={({ isActive }) => `block rounded-lg px-3 py-2.5 text-base font-medium ${isActive ? "bg-btn text-lbl" : "text-muted"}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mx-3 border-t border-divider" />
      <div className="px-1 pb-3 pt-1">
        <MenuItems me={me} flagged={flagged} close={close} t={t} />
      </div>
    </div>
  );
}

export default function Header() {
  const t = useSection("header");
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const bar = useRef<HTMLElement>(null);
  const [shownFor, setShownFor] = useState(pathname);
  if (shownFor !== pathname) {
    setShownFor(pathname);
    setOpen(false);
  }
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, close, bar);
  const solid = scrolled || open;
  const { box: navBox, bar: navBar } = useSlider<HTMLDivElement>(`${pathname}|${t("nav.rankings")}|${scrolled}`);

  return (
    <header
      ref={bar}
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
        solid ? "border-divider bg-header/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-page items-center gap-7 px-4 transition-[height] duration-300 sm:px-6 ${scrolled ? "h-16" : "h-16 lg:h-20 xl:h-24"}`}>
        <div ref={navBox} className="relative flex h-full items-center gap-7">
          <Brand large={!scrolled} label={t("nav.home")} />
          <nav aria-label={t("mainNav")} className="hidden h-full items-center gap-6 lg:flex">
            {navOf(t).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `flex h-full items-center font-medium transition-colors ${isActive ? "text-lbl" : "text-muted hover:text-lbl"}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Slider bar={navBar} className="hidden lg:block" />
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Discord"
            title="Discord"
            className="grid h-10 w-10 place-items-center rounded-xl text-muted transition-colors hover:bg-btn hover:text-lbl"
          >
            <FaDiscord aria-hidden size={22} />
          </a>
          <span className="hidden lg:block">
            <Account large={!scrolled} t={t} />
          </span>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((current) => !current)}
            className="grid h-10 w-10 place-items-center rounded-xl text-lbl transition-colors hover:bg-btn lg:hidden"
          >
            {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
          </button>
        </div>
      </div>
      {open && <MobilePanel close={close} t={t} />}
    </header>
  );
}
