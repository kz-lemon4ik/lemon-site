import { LogIn, Menu, SlidersHorizontal, User, X } from "lucide-react";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Brand from "@/components/Brand";
import Flag from "@/components/Flag";
import Settings from "@/components/Settings";
import Slider from "@/components/Slider";
import { LOGIN_URL, type Me } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { rememberPage } from "@/lib/back";
import { useDismiss } from "@/lib/dismiss";
import { LANGS, useLang, useSection, type Words } from "@/lib/i18n";
import { useScrolled } from "@/lib/scroll";
import { useSlider } from "@/lib/slider";

type Text = Words<"header">;

function navOf(t: Text) {
  return [
    { to: "/rankings", label: t("nav.rankings") },
    { to: "/download", label: t("nav.download") },
    { to: "/faq", label: t("nav.faq") },
  ];
}

function Popover({ button, label, children, width = "w-72" }: { button: ReactNode; label: string; children: (close: () => void) => ReactNode; width?: string }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, close, box);
  return (
    <div ref={box} className="relative">
      <button type="button" aria-haspopup="dialog" aria-expanded={open} aria-label={label} title={label} onClick={() => setOpen((current) => !current)} className="group block rounded-full">
        {button}
      </button>
      {open && <div className={`menu-pop absolute right-0 mt-3 ${width} overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-divider`}>{children(close)}</div>}
    </div>
  );
}

function RoundIcon({ children }: { children: ReactNode }) {
  return <span className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors group-hover:bg-btn group-hover:text-lbl">{children}</span>;
}

function AvatarCircle({ me, large }: { me: Me; large: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`relative block overflow-hidden rounded-full bg-btn transition-[width,height] duration-300 ${large ? "h-12 w-12 xl:h-14 xl:w-14" : "h-10 w-10"}`}>
      {!failed ? (
        <img src={`https://a.ppy.sh/${me.id}`} alt="" onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <User aria-hidden className="absolute inset-0 m-auto h-1/2 w-1/2 text-muted" />
      )}
      <span className="absolute inset-0 rounded-full ring-[3px] ring-inset ring-transparent transition-colors duration-200 group-hover:ring-hero group-focus-visible:ring-hero" />
    </span>
  );
}

function LanguageMenu({ label }: { label: string }) {
  const { language, setLang } = useLang();
  const lang = language.id;
  const current = LANGS.find((item) => item.id === lang) ?? LANGS[0];
  return (
    <Popover label={label} width="w-56" button={<RoundIcon><Flag code={current.flag} /></RoundIcon>}>
      {(close) => (
        <div className="p-2">
          {LANGS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setLang(item.id);
                close();
              }}
              aria-current={item.id === lang ? "true" : undefined}
              className={`relative flex w-full items-center gap-3 rounded-xl py-2.5 pl-5 pr-3 text-left transition-colors hover:bg-btn ${item.id === lang ? "text-lbl" : "text-muted"}`}
            >
              {item.id === lang && <span aria-hidden className="absolute inset-y-2.5 left-2 w-1 rounded-full bg-acc" />}
              <Flag code={item.flag} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </Popover>
  );
}

function Account({ large, t }: { large: boolean; t: Text }) {
  const { me, ready, logout } = useAuth();
  const navigate = useNavigate();
  if (!ready) {
    return <span className={large ? "h-12 w-12 xl:h-14 xl:w-14" : "h-10 w-10"} />;
  }
  if (!me) {
    return (
      <a href={LOGIN_URL} onClick={rememberPage} className="btn-login gap-2 px-5 py-2.5">
        <LogIn aria-hidden size={17} />
        {t("logIn")}
      </a>
    );
  }
  return (
    <Popover label={t("accountOf", { name: me.username })} width="w-64" button={<AvatarCircle me={me} large={large} />}>
      {(close) => (
        <>
          <Link
            to={`/u/${me.id}`}
            onClick={close}
            className="block bg-gradient-to-br from-[#4b3f78] via-[#3a3352] to-[#2c2932] px-5 py-6 transition-[filter] hover:brightness-110"
          >
            <span className="block truncate text-xl font-semibold text-white">{me.username}</span>
            <span className="text-sm text-[#d9d2ec]">{t("profile")}</span>
          </Link>
          <div className="py-2">
            <button
              type="button"
              onClick={async () => {
                close();
                await logout();
                navigate("/");
              }}
              className="block w-full px-5 py-2.5 text-left text-lbl transition-colors hover:bg-btn"
            >
              {t("logOut")}
            </button>
          </div>
        </>
      )}
    </Popover>
  );
}

function MobilePanel({ close, t }: { close: () => void; t: Text }) {
  const { me, logout } = useAuth();
  const { language, setLang } = useLang();
  const lang = language.id;
  const navigate = useNavigate();
  return (
    <div id="mobile-menu" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-divider px-3 pb-4 pt-3 lg:hidden">
      {me ? (
        <Link to={`/u/${me.id}`} onClick={close} className="mb-2 flex items-center gap-3 rounded-xl bg-btn/60 px-3 py-3">
          <img src={`https://a.ppy.sh/${me.id}`} alt="" className="h-10 w-10 rounded-full object-cover" />
          <span className="min-w-0">
            <span className="block truncate font-semibold text-lbl">{me.username}</span>
            <span className="text-sm text-meta">{t("profile")}</span>
          </span>
        </Link>
      ) : (
        <a href={LOGIN_URL} onClick={rememberPage} className="btn-login mb-2 w-full gap-2 py-3 text-base">
          <LogIn aria-hidden size={18} />
          {t("logInOsu")}
        </a>
      )}
      <nav aria-label={t("mainNav")}>
        {navOf(t).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={close}
            className={({ isActive }) => `block rounded-xl px-4 py-3 text-lg font-medium ${isActive ? "bg-btn text-lbl" : "text-muted"}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-3 rounded-2xl bg-card px-4 py-1">
        <Settings />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {LANGS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === lang}
            onClick={() => setLang(item.id)}
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 font-medium transition-colors ${item.id === lang ? "bg-btn text-lbl" : "text-muted"}`}
          >
            <Flag code={item.flag} />
            {item.name}
          </button>
        ))}
      </div>
      {me && (
        <button
          type="button"
          onClick={async () => {
            close();
            await logout();
            navigate("/");
          }}
          className="mt-3 w-full rounded-xl px-4 py-3 text-left text-lg font-medium text-muted"
        >
          {t("logOut")}
        </button>
      )}
    </div>
  );
}

export default function Header() {
  const t = useSection("header");
  const scrolled = useScrolled();
  const { me } = useAuth();
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
          <div className="hidden items-center gap-1 lg:flex">
            <LanguageMenu label={t("language")} />
            <Popover label={t("settings")} button={<RoundIcon><SlidersHorizontal aria-hidden size={19} /></RoundIcon>}>
              {() => (
                <div className="px-5 py-2">
                  <Settings />
                </div>
              )}
            </Popover>
          </div>
          <span className={me ? "" : "hidden sm:block"}>
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
