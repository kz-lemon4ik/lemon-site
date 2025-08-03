import clsx from "clsx";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useEffect } from "react";
import { useSettings } from "@lemon-site/shared-ui";

interface ImageGalleryModalProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const { setIsHeaderHidden } = useSettings();
  useEffect(() => {
    const handleGalleryKeyboard = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight" && images.length > 1) onNext();
      else if (event.key === "ArrowLeft" && images.length > 1) onPrev();
    };
    window.addEventListener("keydown", handleGalleryKeyboard);
    return () => window.removeEventListener("keydown", handleGalleryKeyboard);
  }, [isOpen, onClose, onNext, onPrev, images.length]);

  useEffect(() => {
    setIsHeaderHidden(isOpen);
    return () => setIsHeaderHidden(false);
  }, [isOpen, setIsHeaderHidden]);

  if (!isOpen || images.length === 0) return null;
  const currentImage = images[currentIndex];

  const buttonBase =
    "fixed p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75";
  const buttonDark = "bg-black/50 hover:bg-black/70 text-white focus-visible:ring-slate-300";
  const buttonLight =
    "theme-is-light:bg-themeLight-actionButtonBaseBg theme-is-light:hover:bg-themeLight-actionButtonHoverBg theme-is-light:text-themeLight-actionButtonText theme-is-light:focus-visible:ring-themeLight-primary";

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[70] flex items-center justify-center p-1 sm:p-4 transition-opacity duration-300 ease-out",
        "bg-black/95 backdrop-blur-xl",
        "theme-is-light:bg-slate-900/90 theme-is-light:backdrop-blur-xl"
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-image-description"
    >
      <span id="gallery-image-description" className="sr-only">
        {" "}
        Image {currentIndex + 1} of {images.length}: {currentImage}{" "}
      </span>
      <img
        src={currentImage}
        alt={`Gallery image ${currentIndex + 1} of ${images.length}`}
        className="max-w-[95vw] sm:max-w-[90vw] max-h-[95vh] sm:max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={clsx(
          buttonBase,
          buttonDark,
          buttonLight,
          "top-3 right-3 sm:top-4 sm:right-4 z-10"
        )}
        aria-label="Close gallery"
      >
        {" "}
        <X size={24} strokeWidth={2.5} />{" "}
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className={clsx(
              buttonBase,
              buttonDark,
              buttonLight,
              "left-1 sm:left-4 top-1/2 -translate-y-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Previous image"
            disabled={currentIndex === 0}
          >
            {" "}
            <ChevronLeft size={28} strokeWidth={2.5} />{" "}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className={clsx(
              buttonBase,
              buttonDark,
              buttonLight,
              "right-1 sm:right-4 top-1/2 -translate-y-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Next image"
            disabled={currentIndex === images.length - 1}
          >
            {" "}
            <ChevronRight size={28} strokeWidth={2.5} />{" "}
          </button>
          <div
            className={clsx(
              "fixed bottom-3 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 rounded-full select-none",
              "bg-black/60 text-white",
              "theme-is-light:bg-themeLight-card/80 theme-is-light:text-themeLight-text"
            )}
          >
            {" "}
            {currentIndex + 1} / {images.length}{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGalleryModal;
