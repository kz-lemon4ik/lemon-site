import { Link } from "react-router-dom";
import { AUTHOR, CONTACT, DONATE_URL } from "@/lib/author";
import { useSection } from "@/lib/i18n";
import { REPOSITORY } from "@/lib/release";

export default function Footer() {
  const t = useSection("footer");
  return (
    <footer className="mt-10 border-t border-divider">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-4 pt-7 text-sm text-meta sm:px-6 md:flex-row md:items-center">
        <nav aria-label={t("nav")} className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/privacy" className="hover:text-lbl">
            {t("privacy")}
          </Link>
          <a href={REPOSITORY} className="hover:text-lbl">
            GitHub
          </a>
          <a href={`mailto:${CONTACT}`} className="hover:text-lbl">
            {t("contact")}
          </a>
          <a href={DONATE_URL} className="hover:text-lbl">
            {t("donate")}
          </a>
        </nav>
        <p className="md:ml-auto">
          {t("madeBy")}{" "}
          <Link to={`/u/${AUTHOR.id}`} className="text-link hover:text-lbl">
            {AUTHOR.name}
          </Link>{" "}
          · {t("notPpy")}
        </p>
      </div>
      <p className="mx-auto max-w-page px-4 pb-7 pt-4 text-xs text-faint sm:px-6">{t("credits")}</p>
    </footer>
  );
}
