import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@lemon-site/shared-ui";

interface UserAvatarProps {
  isScrolled?: boolean;
  isMobile?: boolean;
  className?: string;
}

export default function UserAvatar({
  isScrolled = false,
  isMobile = false,
  className,
}: UserAvatarProps) {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { isMotionDisabled } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.right - 224
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const avatarUrl = user?.avatar_url || "/images/avatars/avatar-default.webp";

  const sizeClasses = isMobile
    ? "w-12 h-12"
    : isScrolled
      ? "w-10 h-10"
      : "w-16 h-16 sm:w-20 sm:h-20";

  return (
    <div className={clsx("relative", className)}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-transparent rounded-full"
        aria-label="User menu"
      >
        <div
          className={clsx(
            "relative rounded-full overflow-hidden border-2 border-transparent group-hover:border-lemon-400 theme-is-light:group-hover:border-sky-600",
            !isMotionDisabled && !isMobile && "transition-all duration-300 ease-in-out",
            "group-hover:shadow-[0_0_10px_rgba(250,204,21,0.5)] theme-is-light:group-hover:shadow-[0_0_10px_rgba(2,132,199,0.5)]",
            sizeClasses
          )}
        >
          <img
            src={avatarUrl}
            alt={user?.username || "User avatar"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/avatars/avatar-default.webp";
            }}
          />
        </div>
      </button>

      {isOpen && dropdownPosition && createPortal(
        <AnimatePresence>
          <motion.div
            ref={dropdownRef}
            initial={isMotionDisabled ? undefined : { opacity: 0, y: -10 }}
            animate={isMotionDisabled ? undefined : { opacity: 1, y: 0 }}
            exit={isMotionDisabled ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed w-56 backdrop-blur-2xl bg-[#1a1625]/98 rounded-lg shadow-2xl z-50 border border-lavender-500/30 py-3 px-2 theme-is-light:bg-white/98 theme-is-light:border-slate-300"
            style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
          >
            {!isAuthenticated ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  login();
                }}
                className="w-full py-2 text-left transition-colors rounded-md flex items-center gap-2 text-xs border-l-4 border-transparent hover:border-lemon-400 pl-2 pr-3 text-white hover:bg-black/30 theme-is-light:text-slate-700 theme-is-light:hover:bg-black/5 theme-is-light:hover:border-sky-600 font-lostbody font-semibold"
              >
                <User className="w-5 h-5 text-lemon-400 theme-is-light:text-sky-600" />
                <span>Login with osu!</span>
              </button>
            ) : (
              <>
                <Link
                  to={`/profile/${user?.username}`}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center gap-2 px-2 py-3 mb-2 bg-black/20 rounded-md hover:bg-black/30 transition-colors theme-is-light:bg-slate-200/70 theme-is-light:hover:bg-slate-300/70"
                >
                  <div className="w-16 h-16 rounded-full bg-lemon-400/20 theme-is-light:bg-sky-600/20 flex items-center justify-center">
                    <User className="w-10 h-10 text-lemon-400 theme-is-light:text-sky-600" strokeWidth={2} />
                  </div>
                  <p className="text-sm text-white theme-is-light:text-slate-900 font-bold font-lostbody truncate w-full text-center">
                    {user?.username}
                  </p>
                </Link>

                <Link
                  to={`/profile/${user?.username}`}
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 text-left transition-colors rounded-md flex items-center gap-2 text-xs border-l-4 border-transparent hover:border-lemon-400 pl-2 pr-3 text-white hover:bg-black/30 theme-is-light:text-slate-700 theme-is-light:hover:bg-black/5 theme-is-light:hover:border-sky-600 font-lostbody font-semibold"
                >
                  <User className="w-5 h-5 text-lavender-300 theme-is-light:text-slate-600" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 text-left transition-colors rounded-md flex items-center gap-2 text-xs border-l-4 border-transparent hover:border-lemon-400 pl-2 pr-3 text-white hover:bg-black/30 theme-is-light:text-slate-700 theme-is-light:hover:bg-black/5 theme-is-light:hover:border-sky-600 font-lostbody font-semibold"
                >
                  <Settings className="w-5 h-5 text-lavender-300 theme-is-light:text-slate-600" />
                  <span>Settings</span>
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full py-2 text-left transition-colors rounded-md flex items-center gap-2 text-xs border-l-4 border-transparent hover:border-lemon-400 pl-2 pr-3 text-red-400 hover:bg-red-500/20 theme-is-light:text-red-600 theme-is-light:hover:bg-red-100 theme-is-light:hover:border-red-600 font-lostbody font-semibold"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
