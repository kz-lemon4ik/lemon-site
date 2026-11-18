import { X } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { useSection } from "@/lib/i18n";

export default function Zoom({ src, alt, children }: { src: string; alt: string; children: ReactNode }) {
  const t = useSection("zoom");
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" aria-label={t("open")} onClick={() => dialog.current?.showModal()} className="block w-full cursor-zoom-in">
        {children}
      </button>
      <dialog
        ref={dialog}
        aria-label={alt}
        onClick={() => dialog.current?.close()}
        className="zoom m-0 h-full max-h-none w-full max-w-none cursor-zoom-out bg-transparent p-0 backdrop:cursor-zoom-out"
      >
        <span className="grid h-full w-full place-items-center p-3 sm:p-6">
          <img src={src} alt={alt} className="max-h-full max-w-full rounded-xl object-contain shadow-2xl" />
        </span>
        <button
          type="button"
          aria-label={t("close")}
          className="fixed right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
        >
          <X aria-hidden size={22} />
        </button>
      </dialog>
    </>
  );
}
