import clsx from "clsx";
import { Link } from "react-router-dom";

interface FooterProps {
  isHomePage: boolean;
}

export default function Footer({ isHomePage }: FooterProps) {
  const linkStyles = clsx(
    "text-sm transition-colors duration-200 font-lostnav",
    isHomePage
      ? "text-slate-300 hover:text-white theme-is-light:text-slate-600 theme-is-light:hover:text-slate-900"
      : "text-slate-400 hover:text-slate-200 theme-is-light:text-slate-600 theme-is-light:hover:text-slate-900"
  );

  const copyrightStyles = clsx(
    "text-xs mt-1.5 font-lostnav",
    isHomePage
      ? "text-slate-400/80 theme-is-light:text-slate-500"
      : "text-slate-500 theme-is-light:text-slate-500"
  );

  const footerBaseClasses = "w-full h-16 flex items-center justify-center px-4 sm:px-6 lg:px-8";

  const footerConditionalClasses = isHomePage
    ? "absolute bottom-0 left-0 right-0 z-10 bg-transparent"
    : "relative z-10 mt-auto bg-black/30 theme-is-light:bg-white/65 backdrop-blur-xl";

  return (
    <footer className={clsx(footerBaseClasses, footerConditionalClasses)}>
      <div className="max-w-6xl mx-auto w-full flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-x-6">
            <Link to="/feedback" className={linkStyles}>
              Feedback
            </Link>
            <a
              href="https://www.paypal.com/ncp/payment/KBKQKZU6CNFGY"
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyles}
            >
              Donate
            </a>
          </div>
          <p className={copyrightStyles}>KZ_Lemon4ik powered | 2025</p>
        </div>
      </div>
    </footer>
  );
}
